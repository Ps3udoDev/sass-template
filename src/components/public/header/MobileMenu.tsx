'use client';

import { MobileMenuProps } from "@/components/types/public";
import { LayoutDashboard, LogOut, Settings, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSelector from "../LanguageSelector";
import ThemeToggle from "../ThemeToggle";

const iconMap = {
    LayoutDashboard,
    ShoppingCart,
    Settings,
};

export default function MobileMenu({
    isOpen,
    isTenantMode,
    lng,
    tenant,
    navigationItems,
    session,
    onScrollToSection,
    onLogout,
    onToggle
}: MobileMenuProps) {
    const t = useTranslations();

    if (!isOpen) return null;

    const getFullHref = (href: string) => {
        return `/${lng}/${tenant}${href}`;
    };

    return (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-surface border-t border-default shadow-lg z-40">

            <div className="px-6 py-4 space-y-4">
                {isTenantMode ? (
                    <>
                        {navigationItems
                            .filter(item => item.enabled && item.showInMobile && item.href)
                            .map((item) => {
                                const IconComponent = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;

                                return (
                                    <Link
                                        key={item.key}
                                        href={getFullHref(item.href!)}
                                        className="flex items-center gap-3 text-secondary hover:text-primary py-2 transition-colors duration-200 rounded-lg hover-surface px-2"
                                        onClick={onToggle}
                                    >
                                        {IconComponent && <IconComponent size={18} className="text-primary" />}
                                        <span className="font-medium">{t(item.label)}</span>
                                    </Link>
                                );
                            })
                        }

                        {session && (
                            <div className="border-t border-default pt-4 mt-4">
                                <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-surface-secondary">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {session.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground dark:text-foreground-dark truncate">
                                            {session.email.split('@')[0]}
                                        </p>
                                        <p className="text-sm text-secondary dark:text-secondary-dark truncate">
                                            {session.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        onToggle();
                                        onLogout?.();
                                    }}
                                    className="flex items-center gap-2 w-full text-red-600 hover:text-red-700 font-medium py-2 px-2 transition-colors duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <LogOut size={16} />
                                    {t('header.tenant.logout')}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {navigationItems
                            .filter(item => item.enabled && item.showInMobile)
                            .map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        onScrollToSection?.(item.key);
                                        onToggle();
                                    }}
                                    className="block w-full text-left text-secondary hover:text-primary py-3 px-2 font-medium transition-colors duration-200 rounded-lg hover-surface"
                                >
                                    {t(item.label)}
                                </button>
                            ))
                        }

                        <Link
                            href={`/${lng}/auth/sign-in`}
                            className="btn-primary block w-full px-4 py-3 text-center text-xs lg:text-sm xl:text-base"
                            onClick={onToggle}
                        >
                            {t('header.landing.login')}
                        </Link>
                    </>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-default">
                    <div className="flex items-center gap-4">
                        <LanguageSelector currentLang={lng} variant="mobile-menu" />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
