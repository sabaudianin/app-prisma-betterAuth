
import { getTechNoteById } from "@/app/actions/tech-notes";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
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
        <section className="min-h-screen bg-background">

            <div className="border-b bg-card shadow-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link
                        href="/notes"
                        className="text-sm text-muted-foreground hover:text-foreground">Back to Notes
                    </Link>
                    <div className="flex gap-2">
                        <Link href={`/notes/${id}/edit`}
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                            Edit
                        </Link>
                        <DeleteButton noteId={id} />
                    </div>
                </div>
            </div>


            <div className="container mx-auto max-w-4xl">
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