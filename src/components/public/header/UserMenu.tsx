'use client';

import { UserMenuProps } from "@/components/types/public";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function UserMenu({
    session,
    tenantData,
    lng,
    tenant,
    onLogout,
    isOpen,
    onToggle
}: UserMenuProps) {
    const t = useTranslations();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                if (isOpen) onToggle();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onToggle]);

    if (!session) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={onToggle}
                className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover-surface"
            >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {session.email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline font-medium">
                    {session.email.split('@')[0]}
                </span>
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 card rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-default bg-surface-secondary">
                        <p className="font-semibold text-foreground dark:text-foreground-dark truncate">
                            {session.email}
                        </p>
                        <p className="text-sm text-secondary dark:text-secondary-dark truncate">
                            {tenantData?.name || 'SyncLiv'}
                        </p>
                    </div>

                    <div className="py-2">
                        <Link
                            href={`/${lng}/${tenant}/profile`}
                            className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover-surface transition-colors duration-200"
                            onClick={onToggle}
                        >
                            <User size={18} />
                            <span className="font-medium">{t('header.tenant.profile')}</span>
                        </Link>

                        <Link
                            href={`/${lng}/${tenant}/settings`}
                            className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover-surface transition-colors duration-200"
                            onClick={onToggle}
                        >
                            <Settings size={18} />
                            <span className="font-medium">{t('header.tenant.settings')}</span>
                        </Link>

                        <hr className="my-2 border-default" />

                        <button
                            onClick={() => {
                                onToggle();
                                onLogout();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                            <LogOut size={18} />
                            <span className="font-medium">{t('header.tenant.logout')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
