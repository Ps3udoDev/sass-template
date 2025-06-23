'use client';

import { HeaderTenantProps } from "@/components/types/public";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSelector from "../LanguageSelector";
import UserMenu from "./UserMenu";
import { LayoutDashboard, Settings, ShoppingCart } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const iconMap = {
    LayoutDashboard,
    ShoppingCart,
    Settings,
};

export default function HeaderTenant({
    lng,
    tenant,
    navigationItems,
    session,
    tenantData,
    onLogout
}: HeaderTenantProps) {
    const t = useTranslations();
    const pathname = usePathname();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const isActiveRoute = (href: string) => {
        return pathname.includes(href);
    };

    const getFullHref = (href: string) => {
        if (href === '/marketplace') {
            const pathSegments = pathname.split('/').filter(Boolean);
            if (pathSegments.length === 3 && pathSegments[2] === 'dashboard') {
                return `/${lng}/${tenant}/marketplace`;
            } else if (pathSegments.length >= 4) {
                const category = pathSegments[2];
                return `/${lng}/${tenant}/${category}/marketplace`;
            }
        }
        return `/${lng}/${tenant}${href}`;
    };

    return (
        <nav className="flex items-center space-x-1 lg:space-x-3 xl:space-x-6">
            {navigationItems
                .filter(item => item.enabled && item.href)
                .map((item) => {
                    const IconComponent = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;
                    const fullHref = getFullHref(item.href!);
                    const isActive = isActiveRoute(item.href!);

                    return (
                        <Link
                            key={item.key}
                            href={fullHref}
                            className={`
                                flex items-center gap-1 lg:gap-2 transition-colors duration-200 font-medium
                                text-sm lg:text-base whitespace-nowrap
                                ${isActive
                                    ? 'text-primary font-semibold'
                                    : 'text-secondary hover:text-primary'
                                }
                            `}
                        >
                            {IconComponent && <IconComponent size={16} className="flex-shrink-0" />}
                            <span className="hidden lg:inline">{t(item.label)}</span>
                        </Link>
                    );
                })
            }

            <div className="flex items-center gap-1 lg:gap-2 xl:gap-3 ml-2 lg:ml-4 xl:ml-6 pl-2 lg:pl-4 xl:pl-6 border-l border-gray-200 dark:border-gray-700">
                <div className="hidden lg:block">
                    <LanguageSelector currentLang={lng} variant="header" />
                </div>
                <ThemeToggle />

                <UserMenu
                    session={session}
                    tenantData={tenantData}
                    lng={lng}
                    tenant={tenant}
                    onLogout={onLogout}
                    isOpen={isUserMenuOpen}
                    onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
            </div>
        </nav>
    );
}
