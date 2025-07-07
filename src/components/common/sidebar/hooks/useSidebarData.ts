// src/components/common/sidebar/hooks/useSidebarData.ts

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAvailableModules, Module } from '@/modules/mockModules';
import { getCurrentModuleFromURL } from '../utils/sidebarUtils';
import { SidebarNavigationState } from '../types/sidebar.types';
import { useUserStore } from '@/app/store/userStore';

export const useSidebarData = (): SidebarNavigationState => {
    const [userModules, setUserModules] = useState<Module[]>([]);
    const [currentModule, setCurrentModule] = useState<Module | null>(null);
    const pathname = usePathname();

    // ✅ Usar Zustand en lugar de localStorage
    const { user } = useUserStore();

    useEffect(() => {
        if (user?.ownedModules) {
            const availableModules = getAvailableModules(user.ownedModules);
            setUserModules(availableModules);

            // Obtener el módulo actual basado en la URL
            const currentModuleHref = getCurrentModuleFromURL(pathname);

            if (currentModuleHref) {
                const foundModule = availableModules.find(module => module.href === currentModuleHref);
                setCurrentModule(foundModule || null);
            } else {
                setCurrentModule(null);
            }
        } else {
            // Si no hay usuario, limpiar estados
            setUserModules([]);
            setCurrentModule(null);
        }
    }, [pathname, user?.ownedModules]); // ✅ Agregar user.ownedModules como dependencia

    console.log('current module', currentModule);
    console.log('user modules', user?.ownedModules);

    return {
        currentModule,
        userModules,
        pathname
    };
};

// Hook para el estado de navegación del sidebar
export const useSidebarNavigation = (lng: string, tenant: string) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(prev => !prev);
    };

    const handleBackToDashboard = () => {
        window.location.href = `/${lng}/${tenant}/dashboard`;
    };

    const navigateToModule = (moduleHref: string) => {
        window.location.href = `/${lng}/${tenant}/${moduleHref}`;
    };

    return {
        collapsed,
        handleToggle,
        handleBackToDashboard,
        navigateToModule
    };
};
