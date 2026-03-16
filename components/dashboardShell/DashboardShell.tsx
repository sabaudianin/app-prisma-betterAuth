export const DashboardShell =
    ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="relative min-h-screen w-full overflow-hidden bg-background">

                <div
                    className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.2) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(79, 70, 229, 0.2) 1px, transparent 1px)`,
                        backgroundSize: '45px 45px'
                    }}
                />


                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 blur-[120px] rounded-full" />
                <div className="absolute top-90 left-20 w-96 h-96 bg-red-200/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/20 blur-[120px] rounded-full" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );
    }