'use client'
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LogOut, MoveRight, Star, Search, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";


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
    defaultView: string;
    emailNews: boolean;
    emailDigest: boolean;
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
            <div className="border-b bg-card shadow-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">DevInsight</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            {user.email}
                        </span>
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="rounded-md bg-indigo-300 px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-indigo-400/90 disabled:opacity-50 transition-all duration-300"
                        >
                            {isSigningOut ? "Signing out..." : <LogOut className="text-input text-xs" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-2 ">

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold">
                        Welcome back, <span className='capitalize'>{user.name}</span> !
                    </h2>
                    <p className="mt-2 text-muted-foreground text-xs text-center">
                        Here&apos;s what&apos;s happening with your DevInsight account
                    </p>
                </div>


                <div className="mb-8 grid gap-4 md:grid-cols-3 text-center">
                    <div className="rounded-lg border bg-card p-2 md:p-6">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Saved Repositories
                        </h3>
                        <p className="mt-2 text-3xl font-bold ">{stats.savedRepos}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            GitHub repos you&apos;ve saved
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card p-2 md:p-6text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Tech Notes
                        </h3>
                        <p className="mt-2 text-3xl font-bold">{stats.techNotes}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Your technical notes
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card p-2 md:p-6 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Active Sessions
                        </h3>
                        <p className="mt-2 text-3xl font-bold">{stats.activeSessions}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Devices you&apos;re signed in on
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 b text-center">

                <div className="p-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold">Recent Notes</h3>
                        <Link
                            href="/notes"
                            className="text-sm text-primary hover:underline"
                        >
                            View all <MoveRight />
                        </Link>
                    </div>

                    {recentNotes.length === 0 ? (
                        <div className="rounded-lg border bg-card p-8 text-center">
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
                <div className="p-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold">Saved Repositories</h3>
                        <a
                            href="/saved"
                            className="text-sm text-primary hover:underline"
                        >
                            View all <MoveRight />
                        </a>
                    </div>

                    {recentRepos.length === 0 ? (
                        <div className="rounded-lg border bg-card p-8 text-center">
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
                                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
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


            <div className="text-center">
                <div className="p-2">
                    <h3 className="mb-4 text-xl font-bold">Quick Actions</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <button className="rounded-lg border bg-card p-6 text-left transition-colors hover:bg-accent">
                            <div className="mb-2 text-2xl"><NotebookPen /></div>
                            <h4 className="font-medium">Create Note</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Start writing a new tech note
                            </p>
                        </button>

                        <button className="rounded-lg border bg-card p-6 text-left transition-colors hover:bg-accent">
                            <div className="mb-2 text-2xl"><Search /></div>
                            <h4 className="font-medium">Search Repos</h4>
                            <p className="mt-1 text-sm text-mut<Search />ed-foreground">
                                Find and save GitHub repositories
                            </p>
                        </button>

                        <button className="rounded-lg border bg-card p-6 text-left transition-colors hover:bg-accent">
                            <div className="mb-2 text-2xl"><Settings /></div>
                            <h4 className="font-medium">Settings</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage your account preferences
                            </p>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}
