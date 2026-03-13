import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { NotebookPen, ArrowLeft } from "lucide-react";
import { getUserTechNotes } from "@/app/actions/tech-notes";
import { NoteCard } from "@/components/noteCard/noteCard";


export const metadata = {
    title: "Tech Notes | DevInsight",
    description: "Your technical notes and snippets",
};



export default async function NotesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }

    const result = await getUserTechNotes();
    if (!result.success) redirect("/auth/sign-in");
    const notes = result.data || [];

    return (<section className="min-h-screen bg-background">

        <div className="border-b bg-card">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-xl font-bold">Tech Notes</h1>
                </div>

                <Link
                    href="/notes/new"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    + New Note
                </Link>
            </div>
        </div>


        <div className="container mx-auto p-4">
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