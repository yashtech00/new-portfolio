import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

function getS3Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

async function checkR2ObjectExists(key) {
  const client = getS3Client();
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      })
    );
    return true;
  } catch (err) {
    if (err?.name === "NotFound" || err?.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw err;
  }
}

async function runAudit() {
  console.log("=== PHASE 3D–3E PRODUCTION AUDIT & VERIFICATION ===\n");
  console.log(`Target Base URL: ${BASE_URL}`);

  let cookie = "";

  async function api(path, options = {}) {
    const headers = { ...options.headers };
    if (cookie) headers["Cookie"] = cookie;
    return fetch(`${BASE_URL}${path}`, { ...options, headers });
  }

  // ==========================================
  // SECTION 1: AUTHENTICATION AUDIT
  // ==========================================
  console.log("\n--- [Audit 1] Authentication on All Mutations ---");

  const unauthTests = [
    { method: "POST", path: "/api/projects", body: { title: "Test" } },
    { method: "PUT", path: "/api/projects/507f1f77bcf86cd799439011", body: { title: "Test" } },
    { method: "DELETE", path: "/api/projects/507f1f77bcf86cd799439011" },
    { method: "PUT", path: "/api/projects/top3", body: { slots: [] } },
    { method: "POST", path: "/api/upload", isForm: true },
    { method: "DELETE", path: "/api/upload", body: { key: "some/key" } },
  ];

  for (const t of unauthTests) {
    let res;
    if (t.isForm) {
      const fd = new FormData();
      fd.append("type", "image");
      res = await fetch(`${BASE_URL}${t.path}`, { method: t.method, body: fd });
    } else {
      res = await fetch(`${BASE_URL}${t.path}`, {
        method: t.method,
        headers: { "Content-Type": "application/json" },
        body: t.body ? JSON.stringify(t.body) : undefined,
      });
    }

    if (res.status !== 401) {
      throw new Error(`Auth Audit Failed: ${t.method} ${t.path} returned ${res.status}, expected 401`);
    }
    console.log(`  ✓ ${t.method} ${t.path} -> 401 Unauthorized (Protected)`);
  }

  // Log in as admin
  console.log("\nLogging in as admin...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
  });
  if (!loginRes.ok) throw new Error("Admin login failed");
  cookie = loginRes.headers.get("set-cookie")?.split(";")[0] || "";
  console.log("  ✓ Admin authenticated.");

  // ==========================================
  // SECTION 2: UPLOAD & MIME VALIDATION
  // ==========================================
  console.log("\n--- [Audit 2] Upload MIME and Size Validation ---");

  // Invalid MIME test
  const invalidFd = new FormData();
  invalidFd.append("file", new Blob(["%PDF-1.4..."], { type: "application/pdf" }), "document.pdf");
  invalidFd.append("type", "image");
  const invalidRes = await api("/api/upload", { method: "POST", body: invalidFd });
  if (invalidRes.status !== 400) {
    throw new Error(`Upload validation failed: Expected 400 for invalid MIME type, got ${invalidRes.status}`);
  }
  console.log("  ✓ Upload correctly rejected unsupported MIME type (application/pdf).");

  // Valid image upload
  const imgBlob = new Blob([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64")], { type: "image/png" });
  const imgFd = new FormData();
  imgFd.append("file", imgBlob, "audit-test-image.png");
  imgFd.append("type", "image");
  const imgRes = await api("/api/upload", { method: "POST", body: imgFd });
  if (!imgRes.ok) throw new Error("Valid image upload failed");
  const uploadedImage = await imgRes.json();
  console.log(`  ✓ Image uploaded to R2: ${uploadedImage.key}`);

  // Valid video upload
  const vidBlob = new Blob([Buffer.from("fake-mp4-stream-data")], { type: "video/mp4" });
  const vidFd = new FormData();
  vidFd.append("file", vidBlob, "audit-test-video.mp4");
  vidFd.append("type", "video");
  const vidRes = await api("/api/upload", { method: "POST", body: vidFd });
  if (!vidRes.ok) throw new Error("Valid video upload failed");
  const uploadedVideo = await vidRes.json();
  console.log(`  ✓ Video uploaded to R2: ${uploadedVideo.key}`);

  // Verify both exist in R2
  const imgExistsBefore = await checkR2ObjectExists(uploadedImage.key);
  const vidExistsBefore = await checkR2ObjectExists(uploadedVideo.key);
  if (!imgExistsBefore || !vidExistsBefore) {
    throw new Error("Uploaded assets not found in R2 bucket");
  }
  console.log("  ✓ Verified existence in R2 bucket via HeadObject.");

  // ==========================================
  // SECTION 3: PROJECT DELETE -> R2 CLEANUP
  // ==========================================
  console.log("\n--- [Audit 3] Project Delete -> R2 Cleanup & Cloudinary Compatibility ---");

  // Create temporary project with 1 R2 image, 1 R2 video, and 1 legacy Cloudinary URL
  const legacyCloudinaryUrl = "https://res.cloudinary.com/demo/image/upload/v12345/portfolio/projects/legacy.jpg";
  const createRes = await api("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Temporary Audit Project",
      description: "Short description",
      longDescription: "Detailed description for audit",
      images: [uploadedImage.url, legacyCloudinaryUrl],
      video: uploadedVideo.url,
      github: "https://github.com",
      demo: "https://demo.com",
      tech: ["Next.js", "R2"],
      featured: false,
      order: 999,
    }),
  });
  if (!createRes.ok) throw new Error("Failed to create temporary project");
  const createdProject = await createRes.json();
  console.log(`  ✓ Created temporary project in MongoDB: ID ${createdProject._id}`);

  // Delete project
  console.log("  Deleting project via DELETE /api/projects/:id...");
  const delProjRes = await api(`/api/projects/${createdProject._id}`, { method: "DELETE" });
  if (!delProjRes.ok) throw new Error(`Delete project failed: ${delProjRes.status}`);
  console.log("  ✓ DELETE /api/projects/:id succeeded.");

  // Verify MongoDB project is deleted
  const getProjRes = await fetch(`${BASE_URL}/api/projects`);
  const currentProjects = await getProjRes.json();
  const foundInMongo = currentProjects.some((p) => p._id === createdProject._id);
  if (foundInMongo) throw new Error("Project was not deleted from MongoDB");
  console.log("  ✓ MongoDB document deleted.");

  // Verify R2 media is cleaned up
  const imgExistsAfter = await checkR2ObjectExists(uploadedImage.key);
  const vidExistsAfter = await checkR2ObjectExists(uploadedVideo.key);
  if (imgExistsAfter) throw new Error(`R2 image ${uploadedImage.key} was NOT deleted`);
  if (vidExistsAfter) throw new Error(`R2 video ${uploadedVideo.key} was NOT deleted`);
  console.log("  ✓ R2 image cleaned up from storage (404/NotFound verified).");
  console.log("  ✓ R2 video cleaned up from storage (404/NotFound verified).");
  console.log("  ✓ Legacy Cloudinary URL was safely skipped without R2 error.");

  // ==========================================
  // SECTION 4: INDIVIDUAL MEDIA REMOVAL TEST
  // ==========================================
  console.log("\n--- [Audit 4] Individual Media Removal & Project Edit ---");

  // Upload Image A and Image B
  const imgAFd = new FormData();
  imgAFd.append("file", imgBlob, "image-a.png");
  imgAFd.append("type", "image");
  const imgARes = await (await api("/api/upload", { method: "POST", body: imgAFd })).json();

  const imgBFd = new FormData();
  imgBFd.append("file", imgBlob, "image-b.png");
  imgBFd.append("type", "image");
  const imgBRes = await (await api("/api/upload", { method: "POST", body: imgBFd })).json();

  // Create project with Image A, Image B
  const p2Res = await api("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Media Removal Test Project",
      description: "Test description",
      longDescription: "Detailed description",
      images: [imgARes.url, imgBRes.url],
      github: "#",
      demo: "#",
      tech: ["Test"],
      order: 998,
    }),
  });
  const project2 = await p2Res.json();
  console.log(`  ✓ Created project with Image A and Image B: ID ${project2._id}`);

  // Remove Image A via DELETE /api/upload
  const delImgARes = await api("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: imgARes.url }),
  });
  if (!delImgARes.ok) throw new Error("DELETE /api/upload failed for Image A");
  console.log("  ✓ Deleted Image A via DELETE /api/upload.");

  // Verify Image A is gone from R2, Image B still exists
  const imgAExists = await checkR2ObjectExists(imgARes.key);
  const imgBExists = await checkR2ObjectExists(imgBRes.key);
  if (imgAExists) throw new Error("Image A was not deleted from R2");
  if (!imgBExists) throw new Error("Image B was incorrectly deleted from R2");
  console.log("  ✓ Image A confirmed deleted; Image B confirmed still present in R2.");

  // Update project in MongoDB with remaining Image B
  const putP2Res = await api(`/api/projects/${project2._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: project2.title,
      description: project2.description,
      longDescription: project2.longDescription,
      images: [imgBRes.url],
      github: project2.github,
      demo: project2.demo,
      tech: project2.tech,
      order: project2.order,
    }),
  });
  if (!putP2Res.ok) throw new Error("PUT /api/projects/:id failed");
  const updatedP2 = await putP2Res.json();
  if (updatedP2.images.length !== 1 || updatedP2.images[0] !== imgBRes.url) {
    throw new Error("Project in MongoDB does not reflect only Image B");
  }
  console.log("  ✓ MongoDB project updated to contain only remaining Image B.");

  // Delete project2 and verify Image B is cleaned up
  await api(`/api/projects/${project2._id}`, { method: "DELETE" });
  const imgBExistsAfterCleanup = await checkR2ObjectExists(imgBRes.key);
  if (imgBExistsAfterCleanup) throw new Error("Image B was not cleaned up upon project deletion");
  console.log("  ✓ Project deleted and Image B automatically cleaned up.");

  // ==========================================
  // SECTION 5: TOP 3 FULL REGRESSION
  // ==========================================
  console.log("\n--- [Audit 5] Full Top 3 Regression ---");
  const resAllProjects = await api("/api/projects");
  const allProjects = await resAllProjects.json();
  if (allProjects.length < 3) throw new Error("Need at least 3 projects in database");
  const [pA, pB, pC] = allProjects;

  // 1. Set A -> 1, B -> 2, C -> 3
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: pA._id },
        { position: 2, projectId: pB._id },
        { position: 3, projectId: pC._id },
      ],
    }),
  });
  const top1Res = await (await fetch(`${BASE_URL}/api/projects?top3=true`)).json();
  if (top1Res[0]._id !== pA._id || top1Res[1]._id !== pB._id || top1Res[2]._id !== pC._id) {
    throw new Error("Top 3 regression failed on initial order");
  }
  console.log("  ✓ Top 3: A -> #1, B -> #2, C -> #3 verified.");

  // 2. Swap: C -> 1, A -> 2, B -> 3
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: pC._id },
        { position: 2, projectId: pA._id },
        { position: 3, projectId: pB._id },
      ],
    }),
  });
  const top2Res = await (await fetch(`${BASE_URL}/api/projects?top3=true`)).json();
  if (top2Res[0]._id !== pC._id || top2Res[1]._id !== pA._id || top2Res[2]._id !== pB._id) {
    throw new Error("Top 3 swap regression failed");
  }
  console.log("  ✓ Top 3 Swap: C -> #1, A -> #2, B -> #3 verified.");

  // 3. View All returns all projects
  const viewAllRes = await (await fetch(`${BASE_URL}/api/projects`)).json();
  if (viewAllRes.length !== allProjects.length) {
    throw new Error("View All did not return all projects");
  }
  console.log(`  ✓ View All (/api/projects) returned all ${viewAllRes.length} projects.`);

  // 4. Partial Top 3 testing: 1 project, 2 projects
  console.log("\n--- [Audit 6] Partial Top 3 Regression ---");
  // Slot 1 only
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [{ position: 1, projectId: pA._id }],
    }),
  });
  const topPartial1 = await (await fetch(`${BASE_URL}/api/projects?top3=true`)).json();
  if (topPartial1.length !== 1 || topPartial1[0]._id !== pA._id) {
    throw new Error("1-slot partial top 3 failed");
  }
  console.log("  ✓ Partial 1 slot: returns exactly 1 project.");

  // Slots 1 and 2
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: pA._id },
        { position: 2, projectId: pB._id },
      ],
    }),
  });
  const topPartial2 = await (await fetch(`${BASE_URL}/api/projects?top3=true`)).json();
  if (topPartial2.length !== 2) {
    throw new Error("2-slot partial top 3 failed");
  }
  console.log("  ✓ Partial 2 slots: returns exactly 2 projects.");

  // Restore A -> 1, B -> 2, C -> 3
  await api("/api/projects/top3", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slots: [
        { position: 1, projectId: pA._id },
        { position: 2, projectId: pB._id },
        { position: 3, projectId: pC._id },
      ],
    }),
  });
  console.log("  ✓ Restored standard Top 3 (A -> 1, B -> 2, C -> 3).");

  console.log("\n==================================================");
  console.log("🎉 ALL AUDITS AND REGRESSIONS PASSED! 🎉");
  console.log("==================================================");
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
