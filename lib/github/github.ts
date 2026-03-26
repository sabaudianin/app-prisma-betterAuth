export async function getGitHubStats(username: string) {
  if (!username) return null;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return {
      followers: data.followers,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
      bio: data.bio,
    };
  } catch (error) {
    console.error("GitHub fetch error", error);
    return null;
  }
}
