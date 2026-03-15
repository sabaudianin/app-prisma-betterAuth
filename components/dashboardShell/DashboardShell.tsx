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
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );
    }