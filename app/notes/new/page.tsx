"use client";

import { useActionState, useEffect } from "react";
import { createTechNote } from "@/app/actions/tech-notes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";

export default function NewNote() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(createTechNote, null);

    useEffect(() => {
        if (state?.success) {
            router.push("/notes");
            router.refresh();
        }
    }, [state?.success, router]);

    return (
        <section className="min-h-screen bg-background ">
            <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
                <div className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-2 py-2 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20">


                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className=" sm:inline font-medium">Dashboard</span>
                    </Link>


                    <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/50">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                        <h1 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Tech Notes</h1>
                    </div>

                    <Link
                        href="/notes/new"
                        className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] active:scale-95"
                    >

                        <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                        <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                        <span>New Note</span>
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto max-w-5xl p-4 pt-24">
                <form action={formAction} className="space-y-6">

                    {/* Główny błąd np błąd bazy danych...) */}
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
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="My techNote...."
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
                            className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
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
                        <label htmlFor="tags" className="mb-2 block text-sm font-medium">Tags (comma-separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            disabled={isPending}
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
                            id="content"
                            name="content"
                            rows={12}
                            disabled={isPending}
                            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Write your note here..."
                        />
                        {state?.errors?.content && (
                            <p className="mt-1 text-sm text-destructive">{state.errors.content[0]}</p>
                        )}
                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
                            {isPending ? "Creating..." : "Create Note"}
                        </button>
                        <Link
                            href="/notes"
                            className="rounded-md border bg-card px-4 py-2 font-medium hover:bg-accent transition-colors">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}