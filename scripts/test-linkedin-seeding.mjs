const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function verify() {
  console.log("=== VERIFYING LINKEDIN SEEDED PROJECTS ===\n");

  // 1. Fetch all projects
  console.log("1. Fetching all projects via GET /api/projects...");
  const resAll = await fetch(`${BASE_URL}/api/projects`);
  if (!resAll.ok) throw new Error("Failed to fetch /api/projects: " + resAll.status);
  const allProjects = await resAll.json();
  console.log(`  ✓ Total projects returned: ${allProjects.length} (Expected: 11)`);
  if (allProjects.length !== 11) {
    throw new Error(`Expected 11 projects, got ${allProjects.length}`);
  }

  // Verify fields
  console.log("\n2. Verifying schema fields and R2 images for all projects:");
  for (const p of allProjects) {
    console.log(`  Project: "${p.title}" (order: ${p.order}, top3: ${p.featuredOrder})`);
    console.log(`    - Tech: ${p.tech.join(", ")}`);
    console.log(`    - Images: ${p.images.length}`);
    if (p.video) console.log(`    - Video: ${p.video}`);
    if (p.github) console.log(`    - GitHub: ${p.github}`);

    for (const imgUrl of p.images) {
      if (!imgUrl.includes(".r2.dev") && !imgUrl.includes("r2.cloudflarestorage.com")) {
        throw new Error(`Project ${p.title} has non-R2 image URL: ${imgUrl}`);
      }
      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) {
        throw new Error(`R2 image fetch failed (${imgRes.status}) for ${imgUrl}`);
      }
    }
  }
  console.log("  ✓ All images are hosted on Cloudflare R2 and return HTTP 200!");

  // 3. Verify Top 3 query
  console.log("\n3. Verifying GET /api/projects?top3=true...");
  const resTop3 = await fetch(`${BASE_URL}/api/projects?top3=true`);
  const top3 = await resTop3.json();
  console.log(`  Current Top 3 count: ${top3.length}`);

  // 4. Admin Top 3 Configuration Test
  console.log("\n4. Testing Admin Top 3 configuration with LinkedIn projects...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
  });
  if (!loginRes.ok) throw new Error("Admin login failed");
  const cookie = loginRes.headers.get("set-cookie")?.split(";")[0] || "";

  // Assign Top 3: CodePlus -> 1, EchoLearnAI -> 2, Prabo -> 3
  const pCodePlus = allProjects.find(p => p.title.includes("CodePlus"));
  const pEcho = allProjects.find(p => p.title.includes("EchoLearnAI"));
  const pPrabo = allProjects.find(p => p.title.includes("Prabo"));

  const putTop3 = await fetch(`${BASE_URL}/api/projects/top3`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: pCodePlus._id },
        { position: 2, projectId: pEcho._id },
        { position: 3, projectId: pPrabo._id },
      ],
    }),
  });
  if (!putTop3.ok) throw new Error("Failed to set Top 3: " + putTop3.status);
  console.log("  ✓ Successfully assigned Top 3 (CodePlus -> #1, EchoLearnAI -> #2, Prabo -> #3).");

  // Verify GET /api/projects?top3=true
  const checkTop3 = await (await fetch(`${BASE_URL}/api/projects?top3=true`)).json();
  console.log("  Top 3 response:");
  checkTop3.forEach((t) => console.log(`    #${t.featuredOrder}: "${t.title}"`));
  if (
    checkTop3.length !== 3 ||
    checkTop3[0]._id !== pCodePlus._id ||
    checkTop3[1]._id !== pEcho._id ||
    checkTop3[2]._id !== pPrabo._id
  ) {
    throw new Error("Top 3 assignment verification failed");
  }
  console.log("  ✓ Verified: Homepage query returns exactly 3 assigned projects in correct order.");

  console.log("\n==========================================");
  console.log("🎉 ALL VERIFICATIONS PASSED SUCCESSFULLY! 🎉");
  console.log("==========================================");
}

verify().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
