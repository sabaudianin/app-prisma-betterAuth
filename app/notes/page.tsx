
import { redirect } from "next/navigation";
;
import Link from "next/link";
import { NotebookPen, ArrowLeft, Plus } from "lucide-react";
import { getUserTechNotes } from "@/app/actions/tech-notes";
import { NoteCard } from "@/components/noteCard/noteCard";





export default async function NotesPage() {


    const result = await getUserTechNotes();
    if (!result.success) redirect("/auth/sign-in");
    const notes = result.data || [];

    return (

        <section className="min-h-screen px-2">

            <nav className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
                <div className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/70 px-6 py-2 shadow-lg backdrop-blur-md dark:bg-black/70">


                    <Link href="/dashboard" className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>


                    <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-1.5 border border-border">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                        <h1 className="text-sm font-semibold tracking-tight">Tech Notes</h1>
                    </div>


                    <Link
                        href="/notes/new"
                        className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform active:scale-95 hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New</span>
                    </Link>
                </div>
            </nav>

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