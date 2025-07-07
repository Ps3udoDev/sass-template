'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderProps, SessionData, TenantData } from '../../types/public/Header.types';
import { navigationConfig, filterNavigationByTenant } from './navigation.map';
import { mockTenants } from '@/modules/mockModules';
import HeaderLogo from './HeaderLogo';
import HeaderLanding from './HeaderLanding';
import HeaderTenant from './HeaderTenant';
import MobileMenu from './MobileMenu';
import { useTheme } from 'next-themes';
import { useUserStore } from '@/app/store/userStore';

export default function Header({ lng, tenant }: HeaderProps) {
    const router = useRouter();
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { theme, resolvedTheme } = useTheme();
    const { user, isAuthenticated, logout, isHydrated } = useUserStore();

    useEffect(() => {
        console.log('🎨 Tema actual:', {
            theme,
            resolvedTheme,
            systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        });
    }, [theme, resolvedTheme]);

    const isTenantMode = !!tenant;



    useEffect(() => {
        if (isHydrated && isTenantMode && user?.tenant) {
            const currentTenant = mockTenants.find(t => t.id === user.tenant);
            setTenantData(currentTenant || null);
        }
    }, [isTenantMode, user, isHydrated]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        router.push(`/${lng}/auth/sign-in`);
    };

    const getNavigationConfig = () => {
        const tenantPermissions = tenantData?.modules || user?.ownedModules || [];
        return filterNavigationByTenant(navigationConfig, tenantPermissions);
    };

    const navConfig = getNavigationConfig();
    const currentNavItems = isTenantMode ? navConfig.tenant : navConfig.landing;

    const preparedNavItems = currentNavItems.map(item => {
        if (!isTenantMode && !item.href) {
            return {
                ...item,
                onClick: () => scrollToSection(item.key)
            };
        }
        return item;
    });

    return (
        <header className="fixed top-0 w-full px-4 sm:px-6 py-3 sm:py-4 shadow-sm bg-header z-50 border-b border-default transition-theme">

            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex-shrink-0">
                    <HeaderLogo
                        lng={lng}
                        tenant={tenant}
                        tenantData={tenantData}
                        isTenantMode={isTenantMode}
                    />
                </div>

                <div className="hidden xl:flex">
                    {isTenantMode ? (
                        <HeaderTenant
                            lng={lng}
                            tenant={tenant!}
                            navigationItems={preparedNavItems}
                            session={user}
                            tenantData={tenantData}
                            onLogout={handleLogout}
                        />
                    ) : (
                        <HeaderLanding
                            lng={lng}
                            navigationItems={preparedNavItems}
                            onScrollToSection={scrollToSection}
                        />
                    )}
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="xl:hidden p-2 text-secondary hover:text-primary rounded-lg hover-surface transition-colors duration-200"
                    aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                isTenantMode={isTenantMode}
                lng={lng}
                tenant={tenant}
                navigationItems={preparedNavItems}
                session={user}
                onScrollToSection={scrollToSection}
                onLogout={handleLogout}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
        </header>
    );
}
