"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { preferencesSchema } from "@/lib/schemas/preferences";
import { revalidatePath } from "next/cache";

export async function updateAllPreferences(data: unknown) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }
    const validatedData = preferencesSchema.parse(data);

    await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      update: {
        githubUsername: validatedData.githubUsername || null,
        emailNews: validatedData.emailNews,
        emailDigest: validatedData.emailDigest,
      },
      create: {
        userId: session.user.id,
        githubUsername: validatedData.githubUsername || null,
        emailNews: validatedData.emailNews,
        emailDigest: validatedData.emailDigest,
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.warn("Error updating preferneces", error);
    return {
      success: false,
      error: "Error validation or db",
    };
  }
}
