
import { ReactNode } from "react"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { NotesNavbar } from "@/components/notesNavbar/NotesNavbar";



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

        <div className="min-h-screen">
            <NotesNavbar />
            <main className="pt-24">

                {children}
            </main>
        </div>

    )
}
