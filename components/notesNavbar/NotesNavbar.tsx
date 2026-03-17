'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Plus, NotebookPen } from "lucide-react";

export const NotesNavbar = () => {
    const path = usePathname()


    const isList = path === "/notes";
    const isNewNote = path === "/notes/new";
    const isEditNote = path.includes("/edit");

    return (
        <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
            <div className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-2 py-2 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                    <Link
                        href={isList ? "/dashboard" : "/notes"}
                        className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="hidden sm:inline">{isList ? "Dashboard" : "Back to Notes"}</span>
                    </Link>

                    {/* Pionowa linia  */}
                    <div className="h-4 w-px bg-border mx-1" />

                    <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-1.5 border border-border">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                        <h1 className="text-sm font-semibold tracking-tight">
                            {isNewNote ? "New Note" : isEditNote ? "Editing Note" : "Tech Notes"}
                        </h1>
                    </div>
                </div>

                {/* action buttons */}
                <div className="flex items-center gap-2">
                    {isList ? (
                        <Link
                            href="/notes/new"
                            className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform active:scale-95 hover:opacity-90"
                        >
                            <Plus className="h-4 w-4" />
                            <span>New</span>
                        </Link>
                    ) : (
                        <div className="w-17" />
                    )}
                </div>
            </div>
        </nav>
    )
}