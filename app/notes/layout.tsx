import { DashboardShell } from "@/components/dashboardShell/DashboardShell"
import { ReactNode } from "react"

export default function LayoutNotes({ children }: { children: ReactNode }) {
    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    )
}
