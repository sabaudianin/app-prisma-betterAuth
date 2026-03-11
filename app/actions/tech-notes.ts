"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

//CREATE
export async function createTechNote(
  formData: FormData,
): Promise<ActionResult> {
  try {
    //authCcheck
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return {
        success: false,
        error: "Unauthorised - signIN",
      };
    }

    //walidacja danych
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string | null;
    const tagsString = formData.get("tags") as string;

    if (!title || title.trim().length === 0) {
      return {
        success: false,
        error: "Title is required",
      };
    }
    if (!content || content.trim().length === 0) {
      return {
        success: false,
        error: "Content is required",
      };
    }
    if (title.length > 200) {
      return {
        success: false,
        error: "Title is too long (max 200 char)",
      };
    }

    //parse tags(coma separated string-> arr)
    const tags = tagsString
      ? tagsString
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const note = await prisma.techNote.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category && category.trim() !== "" ? category.trim() : null,
        tags,
        userId: session.user.id,
      },
    });
    //revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/notes");

    return {
      success: true,
      data: {
        id: note.id,
        title: note.title,
      },
    };
  } catch (error) {
    console.log("Create note error", error);
    return {
      success: false,
      error: "Failed to create tech Note",
    };
  }
}
