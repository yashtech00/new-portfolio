import { isAdminAuthenticated } from "@/lib/auth/admin";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "image";

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resourceType = type === "video" ? "video" : "image";

    const result = await uploadToCloudinary(buffer, {
      folder: "portfolio/projects",
      resourceType,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
