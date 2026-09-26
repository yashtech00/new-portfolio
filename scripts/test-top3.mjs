const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log("=== Starting Top 3 Project Selection System Tests ===");
  console.log(`Target URL: ${BASE_URL}\n`);

  let cookie = "";

  // Helper fetch with cookie
  async function api(path, options = {}) {
    const headers = { ...options.headers };
    if (cookie) {
      headers["Cookie"] = cookie;
    }
    return fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });
  }

  // --- Step 0: Fetch current projects to obtain IDs ---
  console.log("Step 0: Fetching all projects to identify IDs...");
  const resAll = await api("/api/projects");
  if (!resAll.ok) {
    throw new Error(`Failed to fetch projects: ${resAll.statusText}`);
  }
  const allProjects = await resAll.json();
  console.log(`Found ${allProjects.length} projects in DB.`);
  if (allProjects.length < 3) {
    throw new Error("Need at least 3 projects in the database for the test suite");
  }

  const [projA, projB, projC] = allProjects;
  console.log(`  Project A: ${projA._id} ("${projA.title}")`);
  console.log(`  Project B: ${projB._id} ("${projB.title}")`);
  console.log(`  Project C: ${projC._id} ("${projC.title}")\n`);

  // --- Test 1: Authentication ---
  console.log("Test 1: PUT /api/projects/top3 WITHOUT auth -> Expect 401");
  const resNoAuth = await fetch(`${BASE_URL}/api/projects/top3`, {
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
  console.log(`  Status: ${resNoAuth.status}`);
  if (resNoAuth.status !== 401) {
    throw new Error(`Test 1 Failed: Expected 401, got ${resNoAuth.status}`);
  }
  console.log("  ✓ Test 1 Passed: Unauthorized request rejected with 401.\n");

  // Login as admin for subsequent tests
  console.log("Logging in as admin...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
  });
  if (!loginRes.ok) {
    throw new Error(`Admin login failed: ${loginRes.status}`);
  }
  const setCookie = loginRes.headers.get("set-cookie");
  if (setCookie) {
    cookie = setCookie.split(";")[0];
  }
  console.log("  ✓ Admin logged in successfully.\n");

  // --- Test 2: Valid selection (A -> 1, B -> 2, C -> 3) ---
  console.log("Test 2: Valid selection: A -> 1, B -> 2, C -> 3");
  const resValid = await api("/api/projects/top3", {
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
  const validData = await resValid.json();
  console.log(`  Status: ${resValid.status}, success: ${validData.success}`);
  if (resValid.status !== 200 || !validData.success) {
    throw new Error(`Test 2 Failed: ${JSON.stringify(validData)}`);
  }
  if (
    validData.top3[0]._id !== projA._id ||
    validData.top3[1]._id !== projB._id ||
    validData.top3[2]._id !== projC._id
  ) {
    throw new Error("Test 2 Failed: Top 3 array order did not match positions 1, 2, 3");
  }
  console.log("  ✓ Test 2 Passed: Valid selection assigned and returned correctly.\n");

  // --- Test 3: Swap (C -> 1, A -> 2, B -> 3) ---
  console.log("Test 3: Swap: C -> 1, A -> 2, B -> 3");
  const resSwap = await api("/api/projects/top3", {
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
  const swapData = await resSwap.json();
  console.log(`  Status: ${resSwap.status}, success: ${swapData.success}`);
  if (resSwap.status !== 200 || !swapData.success) {
    throw new Error(`Test 3 Failed: ${JSON.stringify(swapData)}`);
  }
  if (
    swapData.top3[0]._id !== projC._id ||
    swapData.top3[1]._id !== projA._id ||
    swapData.top3[2]._id !== projB._id
  ) {
    throw new Error("Test 3 Failed: Swapped order did not match expected");
  }
  console.log("  ✓ Test 3 Passed: Swap without transient duplicate key collision succeeded.\n");

  // --- Test 4: Duplicate project (A -> 1, A -> 2) ---
  console.log("Test 4: Duplicate project: A -> 1, A -> 2 (Must reject)");
  const resDupProj = await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: projA._id },
        { position: 2, projectId: projA._id },
      ],
    }),
  });
  const dupProjData = await resDupProj.json();
  console.log(`  Status: ${resDupProj.status}, error: ${dupProjData.error}`);
  if (resDupProj.status !== 400) {
    throw new Error(`Test 4 Failed: Expected 400 for duplicate project, got ${resDupProj.status}`);
  }
  console.log("  ✓ Test 4 Passed: Duplicate project rejected.\n");

  // --- Test 5: Duplicate position (A -> 1, B -> 1) ---
  console.log("Test 5: Duplicate position: A -> 1, B -> 1 (Must reject)");
  const resDupPos = await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: projA._id },
        { position: 1, projectId: projB._id },
      ],
    }),
  });
  const dupPosData = await resDupPos.json();
  console.log(`  Status: ${resDupPos.status}, error: ${dupPosData.error}`);
  if (resDupPos.status !== 400) {
    throw new Error(`Test 5 Failed: Expected 400 for duplicate position, got ${resDupPos.status}`);
  }
  console.log("  ✓ Test 5 Passed: Duplicate position rejected.\n");

  // --- Test 6: Nonexistent project ---
  console.log("Test 6: Nonexistent project ID (Must reject)");
  const fakeId = "507f1f77bcf86cd799439011";
  const resNonExistent = await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: fakeId },
        { position: 2, projectId: projB._id },
        { position: 3, projectId: projC._id },
      ],
    }),
  });
  const nonExistentData = await resNonExistent.json();
  console.log(`  Status: ${resNonExistent.status}, error: ${nonExistentData.error}`);
  if (resNonExistent.status !== 400) {
    throw new Error(`Test 6 Failed: Expected 400 for nonexistent project, got ${resNonExistent.status}`);
  }
  console.log("  ✓ Test 6 Passed: Nonexistent project rejected.\n");

  // --- Test 7: Homepage query GET /api/projects?top3=true ---
  console.log("Test 7: Homepage query: GET /api/projects?top3=true");
  const resTop3 = await fetch(`${BASE_URL}/api/projects?top3=true`);
  const top3List = await resTop3.json();
  console.log(`  Status: ${resTop3.status}, length: ${top3List.length}`);
  if (resTop3.status !== 200 || !Array.isArray(top3List)) {
    throw new Error(`Test 7 Failed: Expected 200 with array, got ${resTop3.status}`);
  }
  if (top3List.length > 3) {
    throw new Error(`Test 7 Failed: Expected at most 3 items, got ${top3List.length}`);
  }
  for (let i = 0; i < top3List.length; i++) {
    if (top3List[i].featuredOrder !== i + 1) {
      throw new Error(`Test 7 Failed: Expected featuredOrder ${i + 1}, got ${top3List[i].featuredOrder}`);
    }
  }
  console.log("  ✓ Test 7 Passed: Returns maximum 3 and correctly sorted by featuredOrder ASC.\n");

  // --- Test 8: Existing API GET /api/projects ---
  console.log("Test 8: Existing API: GET /api/projects");
  const resAllProjects = await fetch(`${BASE_URL}/api/projects`);
  const allList = await resAllProjects.json();
  console.log(`  Status: ${resAllProjects.status}, length: ${allList.length}`);
  if (resAllProjects.status !== 200 || !Array.isArray(allList)) {
    throw new Error(`Test 8 Failed: Expected 200 with array, got ${resAllProjects.status}`);
  }
  if (allList.length !== allProjects.length) {
    throw new Error(`Test 8 Failed: Expected ${allProjects.length} projects, got ${allList.length}`);
  }
  console.log("  ✓ Test 8 Passed: Existing API still returns all projects.\n");

  // Reset back to A -> 1, B -> 2, C -> 3
  console.log("Resetting top 3 back to A -> 1, B -> 2, C -> 3...");
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
  console.log("  ✓ Reset completed.\n");

  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
