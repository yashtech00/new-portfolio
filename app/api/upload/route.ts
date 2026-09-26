import { isAdminAuthenticated } from "@/lib/auth/admin";
import {
  uploadToR2,
  deleteFromR2,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_VIDEO_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
  extractR2Key,
} from "@/lib/r2";

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const requestedType = (formData.get("type") as string) || "image";

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const mimeType = file.type?.toLowerCase();
    const isImage = requestedType === "image";
    const isVideo = requestedType === "video";

    if (!isImage && !isVideo) {
      return Response.json(
        { error: "Invalid resource type. Must be 'image' or 'video'." },
        { status: 400 }
      );
    }

    // MIME type validation
    if (isImage) {
      if (!mimeType || !ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
        return Response.json(
          {
            error: `Unsupported image MIME type: ${mimeType || "unknown"}. Allowed: ${ALLOWED_IMAGE_MIME_TYPES.join(", ")}`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return Response.json(
          {
            error: `Image file exceeds maximum allowed size of 10 MB (current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
          },
          { status: 400 }
        );
      }
    } else {
      if (!mimeType || !ALLOWED_VIDEO_MIME_TYPES.includes(mimeType)) {
        return Response.json(
          {
            error: `Unsupported video MIME type: ${mimeType || "unknown"}. Allowed: ${ALLOWED_VIDEO_MIME_TYPES.join(", ")}`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        return Response.json(
          {
            error: `Video file exceeds maximum allowed size of 50 MB (current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
          },
          { status: 400 }
        );
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToR2(buffer, {
      mimeType,
      originalFilename: file.name,
    });

    return Response.json({
      url: result.url,
      key: result.key,
      type: isVideo ? "video" : "image",
    });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const keyOrUrl = body.key || body.url;

    if (!keyOrUrl || typeof keyOrUrl !== "string") {
      return Response.json(
        { error: "Missing 'key' or 'url' in request body" },
        { status: 400 }
      );
    }

    const key = extractR2Key(keyOrUrl);
    if (!key) {
      return Response.json(
        { error: `Invalid or unrecognized R2 key/URL: ${keyOrUrl}` },
        { status: 400 }
      );
    }

    await deleteFromR2(key);

    return Response.json({ success: true, key });
  } catch (error) {
    console.error("Delete error:", error);
    const message = error instanceof Error ? error.message : "Delete failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
