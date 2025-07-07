'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-lg bg-surface-secondary animate-pulse" />
        );
    }

    const isDark = resolvedTheme === 'dark';

    const handleToggle = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={handleToggle}
            className="
                h-9 w-9 rounded-lg
                flex items-center justify-center
                text-secondary hover:text-primary
                hover-surface
                transition-all duration-200 ease-in-out
                focus:outline-none focus-ring
                flex-shrink-0
            "
            title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
            aria-label={`Cambiar tema. Actual: modo ${isDark ? 'oscuro' : 'claro'}`}
        >
            {isDark ? (
                <Moon size={18} className="transition-all duration-300" />
            ) : (
                <Sun size={18} className="transition-all duration-300" />
            )}
        </button>
    );
}
