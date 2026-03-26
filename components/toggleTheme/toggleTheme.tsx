"use client"

import { Sun, Moon } from "lucide-react";
import { useThemeStatus } from "@/hooks/useThemeStore/useThemeStore";


export function ThemeToggle() {
    const isDark = useThemeStatus()

    const toggleTheme = () => {
        // Bezpośrednia manipulacja DOM - React sam się dowie o zmianie bo mamy MutationObserver
        const newDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newDark ? "dark" : "light")
    }
    return (
        <button onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border bg-card hover:bg-accent tranistion-all duration-300">
            <div className="relative h-5 w-5">
                {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-500 animate-in zoom-in duration-300" />
                ) : (
                    <Moon className="h-5 w-5 text-blue-600 animate-in zoom-in duration-300" />
                )}
            </div>
        </button>
    )
}