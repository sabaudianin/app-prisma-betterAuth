import { getTechNoteById } from "@/app/actions/tech-notes";
import { redirect, notFound } from "next/navigation";
import { NoteForm } from "@/components/noteForm/noteForm";

type Props = { params: Promise<{ id: string }> }

export default async function EditNotePage({ params }: Props) {
    const { id } = await params;

    const result = await getTechNoteById(id);

    if (!result.success || !result.data) {
        if (result.error === "Note not found") {
            notFound();
        }
        redirect("/notes")
    }

    const note = result.data;

    return <NoteForm note={note} />
}