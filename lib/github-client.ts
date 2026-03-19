import { GitHubRepo, GitHubUser } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

async function fetchGitHub<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
    //kesz danych ale pozwalamy na odswiezenie
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Github API error, ${response.statusText}`);
  }

  return response.json();
}

export const githubClient = {
  //Statsy pobierz usera
  getProfile: (username: string) =>
    fetchGitHub<GitHubUser>(`/users/${username}`),
  //Search repo po nazwie
  searchRepos: async (query: string): Promise<GitHubRepo[]> => {
    const params = new URLSearchParams({
      q: query,
      sort: "stars",
      order: "desc",
      per_page: "10",
    });
    const data = await fetchGitHub<{ items: GitHubRepo[] }>(
      `/search/repositories?${params}`,
    );
    return data.items;
  },
  //favorites repo po ID
  getRepoDetail: (fullName: string) =>
    fetchGitHub<GitHubRepo>(`/repos/${fullName}`),
};
