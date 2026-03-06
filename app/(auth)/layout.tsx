import { Providers } from "@/providers/authUiProvider"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <section className="relative min-h-screen w-full overflow-hidden bg-indigo-200 flex items-center justify-start">

                <div className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-cyan-500/20 to-black/30 z-0" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary blur-[120px] rounded-full z-0" />

                <main className="relative z-10 w-full flex flex-col justify-center items-center">
                    {children}
                </main>
            </section>
        </Providers>
    );
}