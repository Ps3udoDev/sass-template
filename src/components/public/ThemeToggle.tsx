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
            <div className="h-8 w-14 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        );
    }

    const isDark = resolvedTheme === 'dark';

    const handleToggle = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={handleToggle}
            className={`
                relative h-6 w-11 lg:h-7 lg:w-12 xl:h-8 xl:w-14 rounded-full
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                shadow-inner hover:shadow-md flex-shrink-0
                ${isDark
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    : 'bg-gradient-to-r from-yellow-200 to-orange-200'
                }
            `}
            title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
            aria-label={`Cambiar tema. Actual: modo ${isDark ? 'oscuro' : 'claro'}`}
        >
            <span
                className={`
                    absolute top-0.5 left-0.5
                    h-5 w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6
                    rounded-full bg-white shadow-md
                    transition-all duration-300 ease-in-out
                    flex items-center justify-center
                    ${isDark ? 'translate-x-5 lg:translate-x-5 xl:translate-x-6' : 'translate-x-0'}
                `}
            >
                {isDark ? (
                    <Moon size={12} className="lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-indigo-600 transition-colors duration-300" />
                ) : (
                    <Sun size={12} className="lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-orange-600 transition-colors duration-300" />
                )}
            </span>

            <div className="absolute inset-0 flex items-center justify-between px-1 lg:px-1.5 xl:px-2">
                <Sun
                    size={10}
                    className={`lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 text-white transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'
                        }`}
                />
                <Moon
                    size={10}
                    className={`lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 text-white transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'
                        }`}
                />
            </div>
        </button>
    );
}
