import Link from "next/link";
import { getTechNoteById } from "@/app/actions/tech-notes";
import { redirect, notFound } from "next/navigation";
import { NotesNavbar } from "@/components/notesNavbar/NotesNavbar";
import { DeleteButton } from "@/components/deleteButton/deleteButton";



type Props = {
    params: Promise<{ id: string }>
}

export default async function NoteDetailPage({ params }: Props) {
    const { id } = await params;
    const result = await getTechNoteById(id);

    if (!result.success || !result.data) {
        if (result.error === "Note not found") {
            notFound();
        }
        redirect("/notes");
    }

    const note = result.data;

    return (
        <section className="min-h-screen">

            <NotesNavbar actions={<div className="flex gap-2">
                <Link href={`/notes/${id}/edit`} className="group relative overflow-hidden inline-flex h-10 items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 text-sm font-semibold hover:bg-green-500 hover:text-white active:scale-95 disabled:opacity-50 transition-all duration-300">Edit</Link>
                <DeleteButton noteId={id} />
            </div>} />

            <div className="container mx-auto pt-24 px-2 md:px-4 max-w-5xl">
                <article className="space-y-4 bg-card p-4 rounded">
                    <h1 className="text-4xl font-bold">{note.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>
                            Created{new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        {new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime() && (
                            <span>
                                Updated {new Date(note.updatedAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {note.category && (<span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                            {note.category}
                        </span>
                        )}
                        {note.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-muted px-3 py-2 text-sm font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <hr className="border-t" />
                    <div className="prose prose-slate max-w-none dark:prose-invert">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                            {note.content}
                        </pre>
                    </div>

                </article>
            </div>
        </section>
    )
}