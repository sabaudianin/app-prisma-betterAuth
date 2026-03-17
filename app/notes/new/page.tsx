"use client";
import Link from "next/link";

import { Plus, ArrowLeft } from "lucide-react";
import { NoteForm } from "@/components/noteForm/noteForm";

export default function NewNote() {
    return (
        <section className="min-h-screen">
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

            <NoteForm />
        </section>
    );
}