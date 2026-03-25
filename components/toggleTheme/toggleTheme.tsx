"use client"

import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const isDark =
        typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark")

    const toggleTheme = () => {
        const next = !isDark
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem("theme", next ? "dark" : "light")
    }

    return (
        <button suppressHydrationWarning onClick={toggleTheme}>
            {isDark ? <Sun /> : <Moon />}
        </button>
    )
}