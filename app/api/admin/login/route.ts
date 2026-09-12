import { cookies } from "next/headers";
import { COOKIE_NAME, createAdminToken } from "@/lib/auth/admin";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return Response.json(
        { error: "ADMIN_PASSWORD is not configured" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createAdminToken();
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
