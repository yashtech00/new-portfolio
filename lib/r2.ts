import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
];

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing R2 configuration. Please define R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in .env"
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function getBucketName(): string {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("Missing R2_BUCKET_NAME in .env");
  }
  return bucketName;
}

export function getPublicUrl(key: string): string {
  const baseUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    throw new Error("Missing R2_PUBLIC_URL in .env");
  }
  const cleanKey = key.replace(/^\//, "");
  return `${baseUrl}/${cleanKey}`;
}

/**
 * Extracts the R2 object key from a full URL or verifies a key string.
 * Example: 'https://pub-...r2.dev/portfolio/projects/174-abc.webp' -> 'portfolio/projects/174-abc.webp'
 */
export function extractR2Key(keyOrUrl: string): string | null {
  if (!keyOrUrl || typeof keyOrUrl !== "string") return null;

  // Cloudinary legacy compatibility - Cloudinary URLs must never be parsed as R2 keys
  if (keyOrUrl.includes("cloudinary.com")) {
    return null;
  }

  // Already a portfolio/projects key
  if (keyOrUrl.startsWith("portfolio/projects/")) {
    return keyOrUrl;
  }

  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (publicUrl && keyOrUrl.startsWith(publicUrl)) {
    const extracted = keyOrUrl.slice(publicUrl.length).replace(/^\//, "");
    if (extracted.startsWith("portfolio/projects/")) {
      return extracted;
    }
  }

  // Fallback: check if the URL contains /portfolio/projects/ on an R2 domain or relative path
  const marker = "portfolio/projects/";
  const index = keyOrUrl.indexOf(marker);
  if (index !== -1) {
    if (
      keyOrUrl.includes(".r2.dev") ||
      keyOrUrl.includes(".r2.cloudflarestorage.com") ||
      (publicUrl && keyOrUrl.includes(publicUrl)) ||
      !keyOrUrl.startsWith("http")
    ) {
      return keyOrUrl.slice(index);
    }
  }

  return null;
}

/**
 * Generates an object key following:
 * portfolio/projects/<timestamp>-<random-id>.<extension>
 */
export function generateR2Key(mimeType: string, customExt?: string): string {
  const ext =
    MIME_EXTENSION_MAP[mimeType.toLowerCase()] ||
    customExt?.replace(/^\./, "").toLowerCase() ||
    "bin";
  const timestamp = Math.floor(Date.now() / 1000);
  const randomId = crypto.randomBytes(4).toString("hex");

  return `portfolio/projects/${timestamp}-${randomId}.${ext}`;
}

export async function uploadToR2(
  buffer: Buffer,
  options: {
    mimeType: string;
    originalFilename?: string;
  }
): Promise<{ url: string; key: string }> {
  const client = getR2Client();
  const bucket = getBucketName();

  let ext: string | undefined;
  if (options.originalFilename) {
    const parts = options.originalFilename.split(".");
    if (parts.length > 1) {
      ext = parts[parts.length - 1];
    }
  }

  const key = generateR2Key(options.mimeType, ext);

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: options.mimeType,
  });

  await client.send(command);

  const url = getPublicUrl(key);
  return { url, key };
}

export async function deleteFromR2(keyOrUrl: string): Promise<boolean> {
  const key = extractR2Key(keyOrUrl);
  if (!key) {
    console.warn(`[deleteFromR2] Not a recognized R2 key or URL: ${keyOrUrl}`);
    return false;
  }

  const client = getR2Client();
  const bucket = getBucketName();

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    await client.send(command);
    return true;
  } catch (error: any) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      console.warn(`[deleteFromR2] Object already missing: ${key}`);
      return true;
    }
    throw error;
  }
}
