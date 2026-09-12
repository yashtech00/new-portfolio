import { isAdminAuthenticated } from "@/lib/auth/admin";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(project);
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return Response.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
