import { isAdminAuthenticated } from "@/lib/auth/admin";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";
import { deleteFromR2, extractR2Key } from "@/lib/r2";

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
      { returnDocument: "after" }
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

    const project = await Project.findById(id);
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    // Collect all media from the project
    const mediaUrls: string[] = [];
    if (Array.isArray(project.images)) {
      mediaUrls.push(...project.images);
    }
    if (project.video && typeof project.video === "string") {
      mediaUrls.push(project.video);
    }

    // Filter only R2-owned assets (excluding legacy Cloudinary or external URLs)
    const r2Assets = mediaUrls.filter((url) => {
      if (!url || typeof url !== "string") return false;
      return extractR2Key(url) !== null;
    });

    // Delete R2 assets before deleting MongoDB document
    for (const asset of r2Assets) {
      try {
        await deleteFromR2(asset);
      } catch (err: any) {
        console.error(`Failed to delete R2 asset ${asset}:`, err);
        return Response.json(
          {
            error: `Failed to delete project media from storage: ${err?.message || "Unknown error"}`,
          },
          { status: 500 }
        );
      }
    }

    // Delete MongoDB project
    await Project.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
