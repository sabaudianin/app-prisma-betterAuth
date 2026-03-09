import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";



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
        <section className="min-h-screen bg-background">
            <div className="border-b bg-card">
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
                            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
                        >
                            {isSigningOut ? "Signing out..." : "Sign Out"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
