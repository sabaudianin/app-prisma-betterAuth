"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type TechNoteSummary = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

//CREATE
export async function createTechNote(
  formData: FormData,
): Promise<ActionResult> {
  try {
    //authCheck
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized - signIn",
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

    //save to db
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

//READ

export async function getUserTechNotes(): Promise<
  ActionResult<TechNoteSummary[]>
> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const notes = await prisma.techNote.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      data: notes,
    };
  } catch (error) {
    console.log("getNotes error", error);
    return {
      success: false,
      error: "Failed to Fetch Notes",
    };
  }
}

//GET ONE

export async function getTechNoteById(noteId: string): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const note = await prisma.techNote.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      return {
        success: false,
        error: "Note not found",
      };
    }
    if (note.userId !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized - note doesn't belog to user",
      };
    }
    return {
      success: true,
      data: note,
    };
  } catch (error) {
    console.log("Failed to get note by id", error);
    return {
      success: false,
      error: "Failed to Fetch single Note",
    };
  }
}

//UPDATE
export async function updateTechNote(
  noteId: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    //check is note is user note and is exist
    const existingNote = await prisma.techNote.findUnique({
      where: { id: noteId },
    });

    if (!existingNote) {
      return {
        success: false,
        error: "Note not found",
      };
    }
    if (existingNote.userId !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    // Walidtion
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

    const tags = tagsString
      ? tagsString
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    // Update

    const updateNote = await prisma.techNote.update({
      where: { id: noteId },
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category && category.trim() !== "" ? category.trim() : null,
        tags,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/notes");
    revalidatePath(`/notes/${noteId}`);

    return {
      success: true,
      data: updateNote,
    };
  } catch (error) {
    console.log("Failed to update note", error);
    return {
      success: false,
      error: "Failed to update note",
    };
  }
}

//DELETE
export async function deleteTechNote(noteId: string): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const result = await prisma.techNote.deleteMany({
      where: { id: noteId, userId: session.user.id },
    });

    if (result.count === 0) {
      return { success: false, error: "Not Found or unauthorized" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/notes");

    return {
      success: true,
      data: { id: noteId },
    };
  } catch (error) {
    console.log("Delete note error", error);
    return {
      success: false,
      error: "Failed to delete note",
    };
  }
}
