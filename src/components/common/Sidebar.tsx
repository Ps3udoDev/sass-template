'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Grid3X3,
    Home
} from 'lucide-react';
import { getAvailableModules, Module, SubModule } from '@/modules/mockModules';

interface SidebarProps {
    lng: string;
    tenant: string;
}

export default function Sidebar({ lng, tenant }: SidebarProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const [userModules, setUserModules] = useState<Module[]>([]);
    const pathname = usePathname();
    const t = useTranslations();

    // Cargar módulos del usuario
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = JSON.parse(localStorage.getItem('session') || '{}');
            const availableModules = getAvailableModules(session.modules || []);
            setUserModules(availableModules);

            // Auto-expandir el módulo activo
            const currentModule = availableModules.find(module =>
                pathname.includes(module.href.split('/')[0])
            );
            if (currentModule && !expandedModules.includes(currentModule.id)) {
                setExpandedModules([currentModule.id]);
            }
        }
    }, [pathname]);

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const isActiveRoute = (href: string) => {
        const fullPath = `/${lng}/${tenant}/${href}`;
        return pathname === fullPath || pathname.startsWith(fullPath + '/');
    };

    const isActiveSubModule = (moduleHref: string, subModuleHref: string) => {
        if (subModuleHref === '') {
            // Dashboard del módulo
            return pathname === `/${lng}/${tenant}/${moduleHref}`;
        }
        return pathname.includes(`/${lng}/${tenant}/${moduleHref}/${subModuleHref}`);
    };

    return (
        <div
            className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40 ${isExpanded ? 'w-80' : 'w-16'
                }`}
        >
            {/* Header del Sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {isExpanded && (
                    <div className="flex items-center gap-2">
                        <Grid3X3 size={20} className="text-blue-600" />
                        <h2 className="font-semibold text-gray-900">Módulos</h2>
                    </div>
                )}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Enlace al Dashboard Principal */}
            <div className="p-2">
                <Link
                    href={`/${lng}/${tenant}/dashboard`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${pathname === `/${lng}/${tenant}/dashboard`
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <Home size={20} />
                    {isExpanded && <span className="font-medium">Dashboard Principal</span>}
                </Link>
            </div>

            {/* Lista de Módulos */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {userModules.map((module) => {
                        const isModuleExpanded = expandedModules.includes(module.id);
                        const isModuleActive = isActiveRoute(module.href);

                        return (
                            <div key={module.id} className="space-y-1">
                                {/* Módulo Principal */}
                                <div className="flex items-center">
                                    <Link
                                        href={`/${lng}/${tenant}/${module.href}`}
                                        className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isModuleActive
                                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <img
                                                src={module.icon}
                                                alt={t(module.name)}
                                                className="w-5 h-5 object-contain"
                                            />
                                            {isExpanded && (
                                                <span className="font-medium truncate">
                                                    {t(module.name)}
                                                </span>
                                            )}
                                        </div>
                                    </Link>

                                    {isExpanded && (
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="p-1 rounded hover:bg-gray-200 transition-colors"
                                        >
                                            {isModuleExpanded ? (
                                                <ChevronUp size={16} />
                                            ) : (
                                                <ChevronDown size={16} />
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Submódulos */}
                                {isExpanded && isModuleExpanded && (
                                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                                        {module.subModules.map((subModule) => {
                                            const isSubActive = isActiveSubModule(module.href, subModule.href);
                                            const subModuleLink = subModule.href
                                                ? `/${lng}/${tenant}/${module.href}/${subModule.href}`
                                                : `/${lng}/${tenant}/${module.href}`;

                                            return (
                                                <Link
                                                    key={subModule.id}
                                                    href={subModuleLink}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${isSubActive
                                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <span className="text-base">{subModule.icon}</span>
                                                    <span className="truncate">{t(subModule.name)}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer del Sidebar */}
            {isExpanded && (
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                        <p>{userModules.length} módulos disponibles</p>
                    </div>
                </div>
            )}
        </div>
    );
}
