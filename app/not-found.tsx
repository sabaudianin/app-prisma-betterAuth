import Link from "next/link";
import { FileQuestion, MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">

            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />


            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full z-0" />

            <div className="relative z-10 flex flex-col items-center px-4 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted border border-border shadow-xl">
                    <FileQuestion className="h-10 w-10 text-muted-foreground" />
                </div>

                <h1 className="mb-2 text-6xl font-bold tracking-tighter text-foreground">
                    404
                </h1>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    Terminal Error: Note Not Found
                </h2>
                <p className="mb-8 max-w-md text-muted-foreground">
                    The requested technical route does not exist in our database.
                </p>

                <Link
                    href="/notes"
                    className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                    <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Notes
                </Link>
            </div>
        </div>
    );
}