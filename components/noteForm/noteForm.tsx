import { useActionState } from "react";
import { updateTechNote } from "@/app/actions/tech-notes";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditNoteFormProps = {
    note: {
        id: string;
        title: string;
        content: string;
        category: string | null;
        tags: string[];
    };
};


export const NoteFrom = ({ note }: EditNoteFormProps) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(updateTechNote, null)

    useEffect(() => {
        if (state?.success) {
            toast("Note added");
            router.push(`/notes/${note.id}`);
            router.refresh();
        }
    }, [state?.success, router, note.id]);

    const tagsString = note.tags.join(", ");

    return (
        <section className="min-h-screen bg-background">
            <div className="border-b bg-card shadow-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/notes/${note.id}`}
                            className="text-sm text-muted-foreground hover:text-foreground">
                            Back to Note
                        </Link>
                        <h1 className="text-xl font-bold">Edit Note</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-2xl p-4">
                <form action={formAction}
                    className="space-y-4">
                    <input type="hidden" name="noteId" value={note.id} />

                    {state?.error && !state?.errors && (
                        <div className="rounded-lg border border-destructive bg-destructive px-4 text-sm text-destructive">{state.error}</div>
                    )}

                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-medium">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={note.title} className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            {state?.errors?.title && (
                                <p className="mt-1 text-sm text-destructive">{state.errors.title[0]}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-medium"
                        >
                            Category (optional)
                        </label>
                        <select
                            id="category"
                            name="category"
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
                            <p className="mt-1 text-sm text-destructive">
                                {state.errors.category[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                            Tags
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            defaultValue={tagsString}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="react, typescript, nextjs" />
                        <p className="mt-1 text-xs text-muted-foreground">
                            Separate tags with commas
                        </p>
                        {state?.errors?.tags && (
                            <p className="mt-1 text-sm text-destructive">
                                {state.errors.tags[0]}
                            </p>
                        )}

                    </div>

                    <div>
                        <label htmlFor="content" className="mb-2 block text-sm font-medium">
                            Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            defaultValue={note.content}
                            rows={12}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        {state?.errors?.content && (
                            <p className="mt-1 text-sm text-destructive">
                                {state.errors.content[0]}
                            </p>
                        )}

                    </div>

                    <div>
                        <button type="submit"
                            disabled={isPending}
                            className="flex-1 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                            {isPending ? "Updating..." : "Update"}
                        </button>
                        <Link href={`/notes/${note.id}`} className="rounded-md border px-4 py-2 font-medium hover:bg-accent">
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>
        </section>
    )
}