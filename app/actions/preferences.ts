"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updatePreferences(theme: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }
    await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      update: { theme },
      create: {
        userId: session.user.id,
        theme,
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.warn("Error saved themer", error);
    return { success: false, error: "Failed to save Theme" };
  }
}
