import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settingsForm/settingsForm";
import { DashboardShell } from "@/components/dashboardShell/DashboardShell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect('/sign-in');

    const prefs = await prisma.userPreferences.findUnique({
        where: { userId: session.user.id }
    });

    return (
        <DashboardShell>
            <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
                <div className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-2 py-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-2">
                        <Link
                            href="/dashboard"
                            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span className="">Dashboard</span>
                        </Link>
                        <div className="h-4 w-px bg-border mx-1" />
                    </div>


                    <h1 className="text-xl font-bold tracking-tight text-right">
                        GitHub Connect
                    </h1>



                </div>
            </nav>
            <div className="container mx-auto max-w-2xl pt-24 px-6">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
                <SettingsForm preferences={prefs || undefined} />
            </div>
        </DashboardShell>
    );
}