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

export default function Header({ lng, tenant }: HeaderProps) {
    const router = useRouter();

    const [session, setSession] = useState<SessionData | null>(null);
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isTenantMode = !!tenant;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionData = localStorage.getItem('session');
            if (sessionData) {
                const parsedSession = JSON.parse(sessionData);
                setSession(parsedSession);

                if (isTenantMode && parsedSession.tenant) {
                    const currentTenant = mockTenants.find(t => t.id === parsedSession.tenant);
                    setTenantData(currentTenant || null);
                }
            }
        }
    }, [isTenantMode]);

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
        localStorage.removeItem('session');
        router.push(`/${lng}/auth/sign-in`);
    };

    const getNavigationConfig = () => {
        const tenantPermissions = tenantData?.modules || [];
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
        <header className="fixed top-0 w-full px-4 sm:px-6 py-3 sm:py-4 shadow-sm bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
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
                            session={session}
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
                    className="xl:hidden p-2 text-secondary dark:text-secondary-dark hover:text-primary rounded-lg hover:bg-soft dark:hover:bg-soft-dark transition-colors duration-200"
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
                session={session}
                onScrollToSection={scrollToSection}
                onLogout={handleLogout}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
        </header>
    );
}
