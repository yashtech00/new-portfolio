import { isAdminAuthenticated } from "@/lib/auth/admin";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";
import mongoose from "mongoose";

interface SlotPayload {
  position: number;
  projectId: string;
}

export async function GET() {
  try {
    await connectDB();
    const top3 = await Project.find({ featuredOrder: { $ne: null } })
      .sort({ featuredOrder: 1 })
      .limit(3);

    return Response.json({ success: true, top3 });
  } catch (error) {
    console.error("GET /api/projects/top3 error:", error);
    return Response.json(
      { error: "Failed to fetch top 3 projects" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body || !Array.isArray(body.slots)) {
      return Response.json(
        { error: "Invalid request payload: 'slots' array is required" },
        { status: 400 }
      );
    }

    const slots: SlotPayload[] = body.slots;

    if (slots.length < 1 || slots.length > 3) {
      return Response.json(
        { error: "Slots array must contain between 1 and 3 items" },
        { status: 400 }
      );
    }

    const positions = new Set<number>();
    const projectIds = new Set<string>();

    for (const slot of slots) {
      if (![1, 2, 3].includes(slot.position)) {
        return Response.json(
          {
            error: `Invalid position: ${slot.position}. Allowed positions are 1, 2, 3.`,
          },
          { status: 400 }
        );
      }
      if (positions.has(slot.position)) {
        return Response.json(
          { error: `Duplicate position found: ${slot.position}` },
          { status: 400 }
        );
      }
      positions.add(slot.position);

      if (
        typeof slot.projectId !== "string" ||
        !mongoose.isValidObjectId(slot.projectId)
      ) {
        return Response.json(
          { error: `Invalid project ID: ${slot.projectId}` },
          { status: 400 }
        );
      }
      if (projectIds.has(slot.projectId)) {
        return Response.json(
          { error: `Duplicate project ID found: ${slot.projectId}` },
          { status: 400 }
        );
      }
      projectIds.add(slot.projectId);
    }

    await connectDB();

    const ids = Array.from(projectIds);
    const existingProjects = await Project.find({ _id: { $in: ids } });
    if (existingProjects.length !== ids.length) {
      return Response.json(
        { error: "One or more referenced projects do not exist" },
        { status: 400 }
      );
    }

    // Safe bulk update strategy:
    // 1. Clear existing Top 3 slots to avoid transient duplicate key collisions on unique index
    await Project.updateMany(
      { featuredOrder: { $ne: null } },
      { $set: { featuredOrder: null } }
    );

    // 2. Assign the new slots
    const bulkOps = slots.map((slot) => ({
      updateOne: {
        filter: { _id: slot.projectId },
        update: { $set: { featuredOrder: slot.position, featured: true } },
      },
    }));

    await Project.bulkWrite(bulkOps);

    // 3. Return updated top3 sorted by featuredOrder ASC
    const top3 = await Project.find({ featuredOrder: { $ne: null } })
      .sort({ featuredOrder: 1 })
      .limit(3);

    return Response.json({ success: true, top3 });
  } catch (error) {
    console.error("PUT /api/projects/top3 error:", error);
    return Response.json(
      { error: "Failed to update top 3 projects" },
      { status: 500 }
    );
  }
}
