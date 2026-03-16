'use client';
import { useActionState } from "react";
import { updateTechNote } from "@/app/actions/tech-notes";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import type { TechNoteSummary } from "@/app/actions/tech-notes";


type EditNoteFormProps = {
    note: TechNoteSummary
};




export const NoteForm = ({ note }: EditNoteFormProps) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(updateTechNote, null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Note updated successfully");
            router.push(`/notes/${note.id}`);
            router.refresh();
        }
    }, [state?.success, router, note.id]);

    const tagsString = note.tags.join(", ");

    return (
        <section className="min-h-screen">
            <div className="border-b bg-card shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="w-full flex items-center justify-between ">
                        <Link
                            href={`/notes/${note.id}`}
                            className="inline-flex gap-2 items-center text-sm text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="text-sm" /> Back to Note
                        </Link>
                        <h1 className="text-xl font-bold">Edit Note</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-2xl p-4 pt-8">
                <form action={formAction} className="space-y-6">
                    <input type="hidden" name="noteId" value={note.id} />

                    {/* Global Error*/}
                    {state?.error && !state?.errors && (
                        <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                            {state.error}
                        </div>
                    )}


                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            disabled={isPending}
                            defaultValue={note.title}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {state?.errors?.title && (
                            <p className="mt-1 text-sm text-destructive">{state.errors.title[0]}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="category" className="mb-2 block text-sm font-medium">Category (optional)</label>
                        <select
                            id="category"
                            name="category"
                            disabled={isPending}
                            defaultValue={note.category || ""}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Select category...</option>
                            <option value="tutorial">Tutorial</option>
                            <option value="snippet">Code Snippet</option>
                            <option value="idea">Idea</option>
                            <option value="bug-fix">Bug Fix</option>
                            <option value="learning">Learning Note</option>
                        </select>
                        {state?.errors?.category && (
                            <p className="mt-1 text-sm text-destructive">{state.errors.category[0]}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="tags" className="mb-2 block text-sm font-medium">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            disabled={isPending}
                            defaultValue={tagsString}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="react, typescript, nextjs"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Separate tags with commas</p>
                        {state?.errors?.tags && (
                            <p className="mt-1 text-sm text-destructive">{state.errors.tags[0]}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="content" className="mb-2 block text-sm font-medium">Content</label>
                        <textarea
                            name="content"
                            id="content"
                            disabled={isPending}
                            defaultValue={note.content}
                            rows={12}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {state?.errors?.content && (
                            <p className="mt-1 text-sm text-destructive">{state.errors.content[0]}</p>
                        )}
                    </div>


                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "Updating..." : "Update Note"}
                        </button>
                        <Link
                            href={`/notes/${note.id}`}
                            className="rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};