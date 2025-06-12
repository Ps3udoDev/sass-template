'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { Menu, X, User, LogOut, Settings, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockTenants } from '@/modules/mockModules';

interface HeaderProps {
    lng: string;
    tenant?: string; // Opcional: si existe, estamos en modo tenant
}

interface TenantData {
    id: string;
    name: string;
    logo?: string;
    primaryColor?: string;
    modules: string[];
}

interface SessionData {
    email: string;
    password: string;
    tenant: string;
    modules: string[];
}

export default function Header({ lng, tenant }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    const [session, setSession] = useState<SessionData | null>(null);
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Verificar si estamos en modo tenant
    const isTenantMode = !!tenant;

    useEffect(() => {
        // Cargar sesión desde localStorage
        if (typeof window !== 'undefined') {
            const sessionData = localStorage.getItem('session');
            if (sessionData) {
                const parsedSession = JSON.parse(sessionData);
                setSession(parsedSession);

                // Buscar datos del tenant si estamos en modo tenant
                if (isTenantMode && parsedSession.tenant) {
                    const currentTenant = mockTenants.find(t => t.id === parsedSession.tenant);
                    setTenantData(currentTenant || null);
                }
            }
        }
    }, [isTenantMode]);

    // Función para hacer scroll suave (solo para landing page)
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('session');
        router.push(`/${lng}/auth/sign-in`);
    };

    // Función para obtener el link del marketplace dinámicamente
    const getMarketplaceLink = () => {
        const pathSegments = pathname.split('/').filter(Boolean);
        // [lng, tenant, ?, ?, ...]

        if (pathSegments.length === 3 && pathSegments[2] === 'dashboard') {
            // Estamos en dashboard principal → Marketplace de módulos
            return `/${lng}/${tenant}/marketplace`;
        } else if (pathSegments.length >= 4) {
            // Estamos en un módulo → Marketplace de submódulos
            const category = pathSegments[2]; // aquaculture, poultry, etc.
            return `/${lng}/${tenant}/${category}/marketplace`;
        } else {
            // Fallback al marketplace de módulos
            return `/${lng}/${tenant}/marketplace`;
        }
    };

    // Función para obtener el texto del marketplace
    const getMarketplaceText = () => {
        const pathSegments = pathname.split('/').filter(Boolean);

        if (pathSegments.length === 3 && pathSegments[2] === 'dashboard') {
            return 'Marketplace';
        } else if (pathSegments.length >= 4) {
            return 'Marketplace';
        } else {
            return 'Marketplace';
        }
    };

    // Verificar si el marketplace está activo
    const isMarketplaceActive = () => {
        return pathname.includes('/marketplace');
    };

    // Navegación para landing page
    const renderLandingNavigation = () => (
        <nav className="hidden md:flex items-center space-x-6">
            <button
                onClick={() => scrollToSection('home')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
            >
                {t('header.home')}
            </button>
            <button
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
            >
                {t('header.about')}
            </button>
            <button
                onClick={() => scrollToSection('products')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
            >
                {t('header.products')}
            </button>
            <LanguageSelector currentLang={lng} />
            <Link
                href={`/${lng}/auth/sign-in`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                {t('header.login')}
            </Link>
        </nav>
    );

    // Navegación para tenant dashboard
    const renderTenantNavigation = () => (
        <nav className="hidden md:flex items-center space-x-6">
            <Link
                href={`/${lng}/${tenant}/dashboard`}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${pathname.includes('/dashboard') ? 'text-blue-600 font-medium' : ''
                    }`}
            >
                Dashboard
            </Link>
            <Link
                href={getMarketplaceLink()}
                className={`flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors ${isMarketplaceActive() ? 'text-blue-600 font-medium' : ''
                    }`}
            >
                <ShoppingCart size={16} />
                <span>{getMarketplaceText()}</span>
            </Link>
            <Link
                href={`/${lng}/${tenant}/reports`}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${pathname.includes('/reports') ? 'text-blue-600 font-medium' : ''
                    }`}
            >
                Reportes
            </Link>
            <Link
                href={`/${lng}/${tenant}/settings`}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${pathname.includes('/settings') ? 'text-blue-600 font-medium' : ''
                    }`}
            >
                Configuración
            </Link>
            <LanguageSelector currentLang={lng} />

            {/* User Menu */}
            <div className="relative">
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <User size={20} />
                    <span className="hidden lg:inline">{session?.email}</span>
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="font-medium text-gray-900">{session?.email}</p>
                                <p className="text-sm text-gray-500">{tenantData?.name}</p>
                            </div>
                            <Link
                                href={`/${lng}/${tenant}/profile`}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                <User size={16} />
                                Perfil
                            </Link>
                            <Link
                                href={`/${lng}/${tenant}/settings`}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                <Settings size={16} />
                                Configuración
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );

    // Logo dinámico
    const renderLogo = () => {
        if (isTenantMode && tenantData) {
            return (
                <Link
                    href={`/${lng}/${tenant}/dashboard`}
                    className="flex items-center gap-2"
                >
                    {tenantData.logo ? (
                        <img
                            src={tenantData.logo}
                            alt={tenantData.name}
                            className="h-8 w-auto"
                        />
                    ) : (
                        <div
                            className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: tenantData.primaryColor || '#2563eb' }}
                        >
                            {tenantData.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span
                        className="text-xl font-bold"
                        style={{ color: tenantData.primaryColor || '#2563eb' }}
                    >
                        {tenantData.name}
                    </span>
                </Link>
            );
        }

        // Logo por defecto para landing page
        return (
            <Link href={`/${lng}`} className="text-xl font-bold text-blue-700">
                MiSaaS
            </Link>
        );
    };

    return (
        <header className='fixed top-0 w-full px-6 py-4 shadow bg-white/95 backdrop-blur-sm z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {renderLogo()}

                {/* Desktop Navigation */}
                {isTenantMode ? renderTenantNavigation() : renderLandingNavigation()}

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                    <div className="px-6 py-4 space-y-4">
                        {isTenantMode ? (
                            <>
                                <Link
                                    href={`/${lng}/${tenant}/dashboard`}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={getMarketplaceLink()}
                                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                                >
                                    <ShoppingCart size={16} />
                                    <span>{getMarketplaceText()}</span>
                                </Link>
                                <Link
                                    href={`/${lng}/${tenant}/reports`}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    Reportes
                                </Link>
                                <Link
                                    href={`/${lng}/${tenant}/settings`}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    Configuración
                                </Link>
                                <div className="border-t pt-4">
                                    <p className="font-medium text-gray-900">{session?.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-red-800 mt-2"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    About Us
                                </button>
                                <button
                                    onClick={() => scrollToSection('products')}
                                    className="block text-gray-600 hover:text-blue-600"
                                >
                                    Products
                                </button>
                                <Link
                                    href={`/${lng}/auth/sign-in`}
                                    className="block bg-blue-600 text-white px-4 py-2 rounded text-center"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                        <div className="pt-4 border-t">
                            <LanguageSelector currentLang={lng} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
