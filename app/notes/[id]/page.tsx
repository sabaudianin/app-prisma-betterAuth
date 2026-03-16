
import { getTechNoteById } from "@/app/actions/tech-notes";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { DeleteButton } from "@/components/deleteButton/deleteButton";
import { ArrowLeft, Edit2 } from "lucide-react";


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

            <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
                <div className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-2 py-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/notes"
                            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span className="hidden sm:inline">Back to Notes</span>
                        </Link>

                        {/* Pionowa linia  */}
                        <div className="h-4 w-px bg-border mx-1" />

                        <span className="text-xs font-medium text-muted-foreground/60 px-2 hidden md:block">
                            Viewing Note
                        </span>
                    </div>

                    {/* action buttons */}
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/notes/${id}/edit`}
                            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background/50 px-4 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
                        >
                            <Edit2 className="mr-2 h-3.5 w-3.5 opacity-70" />
                            Edit
                        </Link>
                        <div className="transition-transform active:scale-95">
                            <DeleteButton noteId={id} />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto pt-24 px-4 max-w-5xl">
                <article className="space-y-4">
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
                        <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-foreground/90">
                            {note.content}
                        </pre>
                    </div>

                </article>
            </div>
        </section>
    )
}