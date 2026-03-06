import { Providers } from "@/providers/authUiProvider"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <section className="relative min-h-screen flex items-center justify-center p-2 overflow-hidden bg-slate-950">

                <div >
                    {children}
                </div>

            </section>
        </Providers>
    );
}