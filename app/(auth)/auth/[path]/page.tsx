import { AuthClientWrapper } from "@/components/auth-client-wrapper/AuthClientWrapper";
import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";
import { Terminal } from "lucide-react";
export const dynamicParams = false;

export function generateStaticParams() {
    return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
    params,
}: {
    params: Promise<{ path: string }>;
}) {
    const { path } = await params;

    console.log("AuthPage", path)

    return (
        <div className="w-full max-w-110 p-4">
            <div className="flex flex-col items-center mb-8 space-y-2">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                    <Terminal className="h-6 w-6 animate-pulse font-bold" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white font-mono">
                    Dev<span className="text-secondary">Insight</span>_
                </h1>
                <p className="font-semibold text-xs md:text-sm">
                    Connect your stack. Sync your notes. Build your legacy.
                </p>
            </div>
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-mauve-700 to-taupe-600 rounded-4xl blur group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl">
                    <AuthClientWrapper
                        path={path}
                        redirectTo="/dashboard"
                    />
                    <div className="mt-6 flex flex-col space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="px-2 text-white">Developer Access Only</span></div>
                        </div>
                        <p className="text-center text-xs text-white italic">
                            By signing in, you agree to  <span className="underline cursor-pointer">Terms of Service</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
