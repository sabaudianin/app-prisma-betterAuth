"use client"
import { useSyncExternalStore } from "react";
import { useLayoutEffect, useState } from "react"
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        setMounted(true)
    }, [])
}