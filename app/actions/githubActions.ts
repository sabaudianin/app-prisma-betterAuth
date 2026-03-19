"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { githubClient } from "@/lib/github-client";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { GitHubRepo } from "@/types/github";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

//find Repo

export async function searchGitHubRepo(query: string): Promise<ActionResult> {
  if (!query || query.length < 2) return { success: true, data: [] };
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const repos = await githubClient.searchRepos(query);
    return { success: true, data: repos };
  } catch (error) {
    console.error("Search error", error);
    return { success: false, error: "Failed to search GH" };
  }
}

//save Repo
export async function saveRepo(repoData: GitHubRepo): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const savedRepos = await prisma.savedRepository.upsert({
      where: {
        userId_githubId: {
          userId: session.user.id,
          githubId: repoData.id,
        },
      },
      update: {
        stars: repoData.stargazers_count,
        description: repoData.description,
      },
      create: {
        userId: session.user.id,
        githubId: repoData.id,
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        language: repoData.language,
        topics: repoData.topics || [],
      },
    });
    revalidatePath("/repositories");
    return { success: true, data: savedRepos };
  } catch (error) {
    console.error("Save repo error", error);
    return { success: false, error: "Couldn't save repo" };
  }
}

//get Stats

export async function getGitHubStats(): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    if (!preferences?.githubUsername) {
      return { success: false, error: "GitHub username not set" };
    }

    const profile = await githubClient.getProfile(preferences.githubUsername);
    return { success: true, data: profile };
  } catch (error) {
    console.error("Get stats error", error);
    return {
      success: false,
      error: "Failed to fetch stats",
    };
  }
}
