export default function NotesLoading() {
    return (
        <section className="min-h-screen bg-background">
            <div className="border bg-card">
                <div className="container mx-auto flex h-16 items-center justify-center">
                    <div className="flex items-center gap-4">
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-10 w-28 animate-pulse rounded bg-muted" />
                </div>
            </div>
            <div className="container mx-auto p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border bg-card p-6 space-y-3"
                    >
                        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                        </div>
                        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    </div>
                ))}

            </div>
        </section>
    )
}