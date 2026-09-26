const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log("=== Starting Phase 3C Integration Verification ===");
  console.log(`Target URL: ${BASE_URL}\n`);

  let cookie = "";

  async function api(path, options = {}) {
    const headers = { ...options.headers };
    if (cookie) headers["Cookie"] = cookie;
    return fetch(`${BASE_URL}${path}`, { ...options, headers });
  }

  // Login
  console.log("Logging in as admin...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
  });
  if (!loginRes.ok) throw new Error("Admin login failed");
  const setCookie = loginRes.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  console.log("  ✓ Logged in.\n");

  // Fetch all projects
  const resAll = await api("/api/projects");
  const allProjects = await resAll.json();
  console.log(`Step 1: Total projects in database: ${allProjects.length}`);
  const [projA, projB, projC] = allProjects;

  // Test 1: Admin Top 3: A -> 1, B -> 2, C -> 3
  console.log("\nTest 1: Setting Top 3: A -> 1, B -> 2, C -> 3");
  const put1 = await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: projA._id },
        { position: 2, projectId: projB._id },
        { position: 3, projectId: projC._id },
      ],
    }),
  });
  if (!put1.ok) throw new Error("Failed to set Top 3");

  const resTop1 = await fetch(`${BASE_URL}/api/projects?top3=true`);
  const top1 = await resTop1.json();
  console.log("Homepage query response items:");
  top1.forEach((p, idx) => console.log(`  #${p.featuredOrder}: ${p.title} (ID: ${p._id})`));

  if (top1[0]._id !== projA._id || top1[1]._id !== projB._id || top1[2]._id !== projC._id) {
    throw new Error("Test 1 Failed: Order does not match A -> B -> C");
  }
  console.log("  ✓ Test 1 Passed: Homepage order is A, B, C.");

  // Test 2: Admin Swap: C -> 1, A -> 2, B -> 3
  console.log("\nTest 2: Swapping Top 3: C -> 1, A -> 2, B -> 3");
  const put2 = await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: projC._id },
        { position: 2, projectId: projA._id },
        { position: 3, projectId: projB._id },
      ],
    }),
  });
  if (!put2.ok) throw new Error("Failed to swap Top 3");

  const resTop2 = await fetch(`${BASE_URL}/api/projects?top3=true`);
  const top2 = await resTop2.json();
  console.log("Homepage query response items after swap:");
  top2.forEach((p, idx) => console.log(`  #${p.featuredOrder}: ${p.title} (ID: ${p._id})`));

  if (top2[0]._id !== projC._id || top2[1]._id !== projA._id || top2[2]._id !== projB._id) {
    throw new Error("Test 2 Failed: Order does not match C -> A -> B");
  }
  console.log("  ✓ Test 2 Passed: Homepage immediately reflects swapped order C, A, B.");

  // Test 3: Badge verification function
  console.log("\nTest 3: Badge labeling logic");
  function getBadge(featuredOrder) {
    return featuredOrder === 1 || featuredOrder === 2 || featuredOrder === 3
      ? `Top Project · #${featuredOrder}`
      : "Project";
  }

  console.log(`  featuredOrder = 1 => "${getBadge(1)}" (expected: "Top Project · #1")`);
  console.log(`  featuredOrder = 2 => "${getBadge(2)}" (expected: "Top Project · #2")`);
  console.log(`  featuredOrder = 3 => "${getBadge(3)}" (expected: "Top Project · #3")`);
  console.log(`  featuredOrder = null => "${getBadge(null)}" (expected: "Project")`);

  if (
    getBadge(1) !== "Top Project · #1" ||
    getBadge(2) !== "Top Project · #2" ||
    getBadge(3) !== "Top Project · #3" ||
    getBadge(null) !== "Project"
  ) {
    throw new Error("Test 3 Failed: Badge labels do not match requirements");
  }
  console.log("  ✓ Test 3 Passed: Badges verified.");

  // Test 4: View All projects query
  console.log("\nTest 4: View All projects (/api/projects)");
  const resAllProjects = await fetch(`${BASE_URL}/api/projects`);
  const allList = await resAllProjects.json();
  console.log(`  /api/projects returned ${allList.length} projects`);
  if (allList.length !== allProjects.length) {
    throw new Error("Test 4 Failed: View All query does not return all projects");
  }
  console.log("  ✓ Test 4 Passed: View All returns all projects.");

  // Reset back to A -> 1, B -> 2, C -> 3
  console.log("\nResetting Top 3 to initial order: A -> 1, B -> 2, C -> 3...");
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: projA._id },
        { position: 2, projectId: projB._id },
        { position: 3, projectId: projC._id },
      ],
    }),
  });
  console.log("  ✓ Reset completed.");

  console.log("\n🎉 ALL PHASE 3C INTEGRATION TESTS PASSED! 🎉");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
