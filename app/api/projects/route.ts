import { isAdminAuthenticated } from "@/lib/auth/admin";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";
import { seedProjects } from "@/lib/data/seed-projects";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const top3 = searchParams.get("top3");
    const featured = searchParams.get("featured");

    if (top3 === "true") {
      const projects = await Project.find({ featuredOrder: { $ne: null } })
        .sort({ featuredOrder: 1 })
        .limit(3);
      return Response.json(projects);
    }

    const filter = featured === "true" ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    return Response.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const project = await Project.create({
      title: body.title,
      description: body.description,
      longDescription: body.longDescription,
      images: body.images ?? [],
      video: body.video ?? "",
      github: body.github ?? "#",
      demo: body.demo ?? "#",
      tech: body.tech ?? [],
      featured: body.featured ?? true,
      order: body.order ?? 0,
    });

    return Response.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}

/** One-time seed — protected by admin auth */
export async function PUT(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    if (searchParams.get("seed") !== "true") {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    await connectDB();
    const count = await Project.countDocuments();
    if (count > 0) {
      return Response.json({ message: "Already seeded", count });
    }

    await Project.insertMany(seedProjects);
    return Response.json({ message: "Seeded successfully", count: seedProjects.length });
  } catch (error) {
    console.error("Seed error:", error);
    return Response.json({ error: "Seed failed" }, { status: 500 });
  }
}
