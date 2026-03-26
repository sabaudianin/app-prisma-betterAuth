'use client'
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { LogOut, Star, Search, NotebookPen, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useDevStore } from "@/store/useDevStore";
import { ThemeToggle } from "@/components/toggleTheme/toggleTheme";

type User = {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    emailVerified: boolean;
};

type Stats = {
    savedRepos: number;
    techNotes: number;
    activeSessions: number;
};

type RecentNote = {
    id: string;
    title: string;
    category: string | null;
    createdAt: Date;
};

type RecentRepo = {
    id: string;
    name: string;
    fullName: string;
    stars: number;
    language: string | null;
};

type Preferences = {
    id: string;
    userId: string;
    githubUsername: string | null;
    theme: string;
};


type DashboardClientProps = {
    user: User;
    stats: Stats;
    recentNotes: RecentNote[];
    recentRepos: RecentRepo[];
    preferences?: Preferences;
};

export function DashboardClient({
    user,
    stats,
    recentNotes,
    recentRepos,
    preferences,
}: DashboardClientProps) {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    //Logika ZUstand
    const setAuth = useDevStore((state) => state.setAuth);
    const setNotes = useDevStore((state) => state.setNotes);

    useEffect(() => {
        setAuth(user);
        const fullNotes = recentNotes.map((note) => ({
            ...note,
            content: "",
            tags: [],
            updatedAt: note.createdAt
        }))
        setNotes(fullNotes); setNotes(fullNotes);
    }, [user, recentNotes, setAuth, setNotes])

    useEffect(() => {
        if (preferences?.theme) {
            const dbTheme = preferences.theme;
            const localTheme = localStorage.getItem("theme");

            if (dbTheme !== localTheme) {
                document.documentElement.classList.toggle("dark", dbTheme === "dark");
                localStorage.setItem("theme", dbTheme)
            }
        }
    }, [preferences?.theme]);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await authClient.signOut();
            router.push("/auth/sign-in")
        } catch (error) {
            console.log("Sign out error!", error);
            setIsSigningOut(false);
        }
    }

    return (
        <section className="min-h-screen">

            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden group">

                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full after:absolute after:inset-0 after:-translate-x-full after:bg-linear-to-r after:from-transparent after:via-white/5 after:to-transparent hover:after:animate-[shine_1.5s_ease-in-out]" />

                <div className="container mx-auto flex h-16 items-center justify-between px-6 relative">


                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <h1 className="text-xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                DevInsight
                            </h1>

                            <span className="absolute -right-3 top-1 h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                        </div>
                    </div>


                    <div className="flex items-center gap-6">
                        <ThemeToggle />
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">Logged in</span>
                            <span className="text-sm font-medium text-muted-foreground">{user.email}</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="group/btn relative flex h-10 w-10 md:w-auto md:px-4 items-center justify-center gap-2 overflow-hidden rounded-xl bg-secondary/50 border border-border transition-all hover:bg-destructive/10 hover:border-destructive/20 disabled:opacity-50"
                        >

                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-destructive/5 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />

                            {isSigningOut ? (
                                <span className="text-xs animate-pulse">...</span>
                            ) : (
                                <>
                                    <LogOut className="h-4 w-4 text-muted-foreground transition-colors group-hover/btn:text-destructive duration-200" />
                                    <span className="hidden md:block text-sm font-medium group-hover/btn:text-destructive transition-colors">
                                        Sign out
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pt-24 ">

                <div className="py-4 md:py-8 lg:py-12 text-center">
                    <h2 className="text-3xl font-bold">
                        Welcome back, <span className='capitalize'>{user.name}</span> !
                    </h2>
                    <p className="mt-2 text-muted-foreground text-xs text-center">
                        Here&apos;s what&apos;s happening with your DevInsight account
                    </p>
                </div>


                <div className="my-8 grid gap-3 md:grid-cols-3 px-4">

                    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-500/50 hover:shadow-[0_0_30px_-10px_rgba(100,116,139,0.3)]">
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-500/5 blur-2xl transition-all group-hover:bg-slate-500/10" />

                        <div className="relative flex flex-col items-center gap-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-olive-600">
                                Saved Repositories
                            </h3>
                            <p className="text-2xl font-black tracking-tight">{stats.savedRepos}</p>
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                GitHub repos you&apos;ve saved for later
                            </p>
                        </div>
                    </div>


                    <div className="group relative overflow-hidden rounded-2xl border border-cyan-100 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl transition-all group-hover:bg-cyan-500/10" />

                        <div className="relative flex flex-col items-center gap-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                                Tech Notes
                            </h3>
                            <p className="text-2xl font-black tracking-tight ">{stats.techNotes}</p>
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                Your knowledge base growin&apos;
                            </p>
                        </div>
                    </div>


                    <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl transition-all group-hover:bg-indigo-500/10" />

                        <div className="relative flex flex-col items-center gap-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                                Active Sessions
                            </h3>
                            <p className="text-2xl font-black tracking-tight">{stats.activeSessions}</p>
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                Security: Devices signed in now
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 b text-center">

                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Recent Notes</h3>
                            <Link
                                href="/notes"
                                className="text-sm text-primary hover:underline inline-flex gap-2"
                            >
                                View all <ArrowRight />
                            </Link>
                        </div>

                        {recentNotes.length === 0 ? (
                            <div className="rounded-lg border bg-card p-8 text-center transition-all duration-300 hover:border-slate-500 hover:shadow-md">
                                <p className="text-muted-foreground">No notes yet</p>
                                <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                    Create your first note
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentNotes.map((note) => (
                                    <a
                                        key={note.id}
                                        href={`/notes/${note.id}`}
                                        className="block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                                    >
                                        <h4 className="font-medium">{note.title}</h4>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            {note.category && (
                                                <span className="rounded-full bg-primary/10 px-2 py-1">
                                                    {note.category}
                                                </span>
                                            )}
                                            <span>
                                                {new Date(note.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Repos */}
                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Saved Repositories</h3>
                            <Link
                                href="/repo"
                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline "
                            >
                                View all <ArrowRight />
                            </Link>
                        </div>

                        {recentRepos.length === 0 ? (
                            <div className="rounded-lg border bg-card p-8 text-center transition-all duration-300 hover:border-slate-500 hover:shadow-md">
                                <p className="text-muted-foreground">No repos saved yet</p>
                                <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                    Search GitHub repos
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentRepos.map((repo) => (
                                    <a
                                        key={repo.id}
                                        href={`https://github.com/${repo.fullName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                                    >
                                        <h4 className="font-medium">{repo.name}</h4>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {repo.fullName}
                                        </p>

                                        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span><Star />{repo.stars.toLocaleString()}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                <div className="text-center py-4">
                    <div className="p-2">
                        <h3 className="mb-4 text-xl font-bold">Quick Actions</h3>

                        <div className="grid gap-4 md:grid-cols-3 mt-6">
                            <Link href="/notes/new" className="group rounded-lg border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-indigo-500 hover:shadow-md">
                                <div className="mb-2 p-2 w-fit rounded-md bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <NotebookPen size={20} />
                                </div>
                                <h4 className="font-medium">Create Note</h4>
                                <p className="mt-1 text-sm text-muted-foreground">Start writing a new tech note</p>
                            </Link>

                            <Link href="/repo" className="group rounded-lg border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-cyan-500 hover:shadow-md">
                                <div className="mb-2 p-2 w-fit rounded-md bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                    <Search size={20} />
                                </div>
                                <h4 className="font-medium">Search Repos</h4>
                                <p className="mt-1 text-sm text-muted-foreground">Find and save GitHub repositories</p>
                            </Link>

                            <Link href="/settings" className="group rounded-lg border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-slate-500 hover:shadow-md ">
                                <div className="mb-2 p-2 w-fit rounded-md bg-slate-100 text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                                    <Settings size={20} />
                                </div>
                                <h4 className="font-medium">Settings</h4>
                                <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
