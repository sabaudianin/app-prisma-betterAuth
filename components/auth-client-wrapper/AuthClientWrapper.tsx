"use client";

import dynamic from "next/dynamic";

// Dynamicznie importujemy AuthView tylko po stronie klienta
const AuthViewClient = dynamic(
    () => import("@daveyplate/better-auth-ui").then((mod) => mod.AuthView),
    { ssr: false }
);

export function AuthClientWrapper({ path, redirectTo }: { path: string; redirectTo: string }) {
    return <AuthViewClient path={path} redirectTo={redirectTo} />;
}