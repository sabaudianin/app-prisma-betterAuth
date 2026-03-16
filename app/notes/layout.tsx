import { DashboardShell } from "@/components/dashboardShell/DashboardShell"
import { ReactNode } from "react"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";



export const metadata = {
    title: "Tech Notes | DevInsight",
    description: "Your technical notes and snippets",
};

export default async function LayoutNotes({ children }: { children: ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }


    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    )
}
