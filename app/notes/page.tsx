import { redirect } from "next/navigation";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { getUserTechNotes } from "@/app/actions/tech-notes";
import { NoteCard } from "@/components/noteCard/noteCard";

export default async function NotesPage() {
    const result = await getUserTechNotes();
    if (!result.success) redirect("/auth/sign-in");
    const notes = result.data || [];
    return (
        <section className="min-h-screen px-2">
            <div className="container mx-auto p-4 pt-24 max-w-5xl">
                {notes.length === 0 ? (

                    <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 text-6xl"><NotebookPen /></div>
                        <h2 className="mb-2 text-2xl font-bold">No notes yet</h2>
                        <p className="mb-6 text-muted-foreground">
                            Create your first technical note to get started
                        </p>
                        <Link
                            href="/notes/new"
                            className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Create your first note
                        </Link>
                    </div>
                ) : (
                    // Notes grid NOTECARD 
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </section>)
}