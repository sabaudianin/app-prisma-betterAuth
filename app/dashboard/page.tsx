import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { DashboardClient } from "./dashboardClient";
import { DashboardShell } from "@/components/dashboardShell/DashboardShell";



export const metadata = {
    title: "Dashboard | DevInsight",
    description: "Your personal developer dashboard"
}

export default async function DashboardPage() {

    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) redirect('/sign-in');
    const { user } = session;

    const userData = await prisma.user.findUnique({
        where: { id: user.id, },
        include: {
            // Include powiązane dane
            preferences: true,

            // Zlicza powiązane rekordy
            _count: {
                select: {
                    savedRepos: true,
                    techNotes: true,
                    sessions: true,
                }
            },
            // Pobierz zapisane repo i notatki
            savedRepos: {
                take: 5,
                orderBy: {
                    savedAt: 'desc'
                },
                select: {
                    id: true,
                    name: true,
                    fullName: true,
                    stars: true,
                    language: true,
                }
            },
            techNotes: {
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    title: true,
                    category: true,
                    createdAt: true,
                }
            },

        }
    })

    if (!userData) {
        redirect('/sign-in')
    }
    return (
        <DashboardShell>

            <DashboardClient
                user={{
                    id: user.id,
                    email: user.email,
                    name: user.name || "User",
                    image: user.image,
                    emailVerified: user.emailVerified,
                }}
                stats={{
                    savedRepos: userData._count.savedRepos,
                    techNotes: userData._count.techNotes,
                    activeSessions: userData._count.sessions,
                }}
                recentNotes={userData.techNotes}
                recentRepos={userData.savedRepos}
                preferences={userData.preferences || undefined}
            />
        </DashboardShell>
    );
}
