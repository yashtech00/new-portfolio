export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/yashtech00", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // optional
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    return Response.json({
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    });
  } catch (err) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}