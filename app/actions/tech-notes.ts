"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { noteSchema } from "@/lib/schemas/noteSchema";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>; // Tutaj Zod wrzuci błędy dla każdego pola
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
  _prevState: ActionResult | null,
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

    //wyciągam dane z formularza i wrzucam do zoda
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = noteSchema.safeParse(rawData);

    //jak zod znjadzie błedy od rzu je zwróci

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors, // np.title: ["Too short"]
        error: "Validation failed",
      };
    }

    const { title, content, category, tags: rawTags } = validatedFields.data;

    //parse tags(coma separated string-> arr)
    const tags = rawTags
      ? rawTags
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
    console.error("Create note error", error);
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

//UPDATE WAZNE <input type="hidden" name="noteId" value={note.id} /> bo trzeba wycignac ID
export async function updateTechNote(
  _prevState: ActionResult | null,
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
    //wyciagamy dane
    const rawData = Object.fromEntries(formData.entries());

    //wyciagma noteId z formData
    const noteId = formData.get("noteId") as string;
    if (!noteId) {
      return {
        success: false,
        error: "Note ID not found",
      };
    }
    //walidacja zOD
    const validateFields = noteSchema.safeParse(rawData);

    if (!validateFields.success) {
      return {
        success: false,
        errors: validateFields.error.flatten().fieldErrors,
        error: "Validation failed",
      };
    }
    const { title, content, category, tags: tagsString } = validateFields.data;

    const tags = tagsString
      ? tagsString
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    // Update

    const result = await prisma.techNote.updateMany({
      where: {
        id: noteId,
        userId: session.user.id,
      },
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category && category.trim() !== "" ? category.trim() : null,
        tags,
      },
    });
    if (result.count === 0) {
      return { success: false, error: "Note not found or Unauthorized" };
    }
    //refresh cachy
    revalidatePath("/dashboard");
    revalidatePath("/notes");
    revalidatePath(`/notes/${noteId}`);

    return {
      success: true,
      data: { id: noteId },
    };
  } catch (error) {
    console.log("Failed to update note", error);
    return {
      success: false,
      error: "Failed to update note",
    };
  }
}

//DELETE tez dodac w cliencie <input type="hidden" name="noteId" value={note.id} />
export async function deleteTechNote(
  _prevState: ActionResult | null,
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
    // Wyciagamy ID z formData
    const noteId = formData.get("noteId") as string;
    if (!noteId) return { success: false, error: "Missing Note ID" };

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
