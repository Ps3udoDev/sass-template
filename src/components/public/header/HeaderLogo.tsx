'use client';

import SyncLivLogo from "@/components/icons/SyncLivLogo";
import { HeaderLogoProps } from "@/components/types/public";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HeaderLogo({
    lng,
    tenant,
    tenantData,
    isTenantMode
}: HeaderLogoProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const renderTenantLogo = () => {
        if (!tenantData) return null;

        const tenantColor = tenantData.primaryColor || 'var(--color-primary)';

        return (
            <Link
                href={`/${lng}/${tenant}/dashboard`}
                className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-all duration-200 group"
            >
                {tenantData.logo ? (
                    <Image
                        src={tenantData.logo}
                        alt={tenantData.name}
                        width={48}
                        height={48}
                        className="h-8 w-auto lg:h-10 xl:h-12 transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm lg:text-base xl:text-lg shadow-md transition-transform group-hover:scale-105"
                        style={{ backgroundColor: tenantColor }}
                    >
                        {tenantData.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <span
                    className="text-lg lg:text-xl xl:text-2xl font-bold hidden sm:block transition-colors duration-200"
                    style={{ color: tenantColor }}
                >
                    {tenantData.name}
                </span>
            </Link>
        );
    };

    const renderLandingLogo = () => {
        const getCurrentColor = () => {
            if (!mounted) return '#00747c';

            const isDark = resolvedTheme === 'dark';
            return isDark ? '#00adb5' : '#00747c';
        };

        const currentColor = getCurrentColor();

        return (
            <Link
                href={`/${lng}`}
                className="flex items-center gap-1 lg:gap-2 hover:opacity-80 transition-all duration-200 group"
            >
                <div className="transition-transform group-hover:scale-105">
                    <SyncLivLogo
                        width={90}
                        height={90}
                        color={currentColor}
                        className="drop-shadow-sm w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                    />
                </div>
                <span
                    className="text-lg lg:text-xl xl:text-3xl font-bold hidden sm:block transition-colors duration-200"
                    style={{ color: currentColor }}
                >
                    SyncLiv
                </span>
            </Link>
        );
    };

    return isTenantMode ? renderTenantLogo() : renderLandingLogo();
}
