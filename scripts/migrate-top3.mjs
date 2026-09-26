import mongoose from "mongoose";

async function runMigration() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not found in environment");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;
  const collection = db.collection("projects");

  console.log("\n--- Checking Existing Indexes ---");
  const indexes = await collection.indexes();
  console.log("Current indexes:", indexes.map((i) => i.name));

  const hasTop3Index = indexes.some(
    (i) => i.name === "featuredOrder_1" || (i.key && i.key.featuredOrder === 1)
  );

  if (!hasTop3Index) {
    console.log("Creating partial unique index for featuredOrder...");
    await collection.createIndex(
      { featuredOrder: 1 },
      {
        unique: true,
        partialFilterExpression: { featuredOrder: { $type: "number" } },
      }
    );
    console.log("Index featuredOrder_1 created successfully.");
  } else {
    console.log("Index for featuredOrder already exists.");
  }

  console.log("\n--- Inspecting Projects ---");
  const allProjects = await collection.find({}).toArray();
  console.log(`Total projects in database: ${allProjects.length}`);

  // Query projects with featured=true, sorted by order ASC, createdAt DESC
  const featuredProjects = await collection
    .find({ featured: true })
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  console.log(`Featured projects count: ${featuredProjects.length}`);
  featuredProjects.forEach((p, idx) => {
    console.log(`  [${idx}] "${p.title}" (order: ${p.order}, createdAt: ${p.createdAt})`);
  });

  const top3Candidates = featuredProjects.slice(0, 3);
  const top3Ids = top3Candidates.map((p) => p._id.toString());

  console.log("\n--- Applying Migration ---");
  // 1. First set featuredOrder: null for all projects that are NOT in top3
  const resetResult = await collection.updateMany(
    { _id: { $nin: top3Candidates.map((p) => p._id) } },
    { $set: { featuredOrder: null } }
  );
  console.log(`Cleared/set featuredOrder=null for ${resetResult.modifiedCount} non-top3 projects.`);

  // 2. Set featuredOrder = 1, 2, 3 for top 3 candidates
  const changes = [];
  for (let i = 0; i < top3Candidates.length; i++) {
    const project = top3Candidates[i];
    const newSlot = i + 1;
    await collection.updateOne(
      { _id: project._id },
      { $set: { featuredOrder: newSlot } }
    );
    changes.push({
      id: project._id.toString(),
      title: project.title,
      order: project.order,
      assignedSlot: newSlot,
    });
  }

  console.log("\n--- Migration Results ---");
  console.log("Assigned Top 3 slots:");
  changes.forEach((c) => {
    console.log(`  Position #${c.assignedSlot}: "${c.title}" (ID: ${c.id}, order: ${c.order})`);
  });

  console.log("\nVerifying final state in database:");
  const finalProjects = await collection.find({}).sort({ featuredOrder: 1, order: 1 }).toArray();
  finalProjects.forEach((p) => {
    console.log(`  ID: ${p._id} | Title: "${p.title}" | featuredOrder: ${p.featuredOrder} | featured: ${p.featured}`);
  });

  await mongoose.disconnect();
  console.log("\nMigration completed successfully.");
}

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
