import { isAdminAuthenticated } from "@/lib/auth/admin";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return Response.json({ authenticated });
}
