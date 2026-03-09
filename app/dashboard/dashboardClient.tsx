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

export const DashboardClient = () => {
    return (
        <div>DashboardClient</div>
    )
}
