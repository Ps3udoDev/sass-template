import React from 'react';
import {
    IconHome,
    IconFish,
    IconFeather,
    IconRefresh,
    IconChartBar,
    IconRipple,
    IconPackage,
    IconWheat,
    IconFlask,
    IconUsers,
    IconHeart,
    IconClipboard,
    IconActivity,
    IconTarget,
    IconCalendar,
    IconCircleCheck,
    IconLeaf,
    IconRotate,
    IconMilk,
    IconContainer,
    IconBox,
    IconUser,
    IconChartAreaLine,
    IconBuilding,
    IconSearch,
    IconScale,
    IconHorse,
    IconPig
} from '@tabler/icons-react';
import { IconMapType } from '../types/sidebar.types';

export const IconMap: IconMapType = {
    // Iconos principales de módulos
    Fish: IconFish,
    Bird: IconFeather,
    Cow: IconHorse,
    Pig: IconPig,

    // Iconos de submódulos
    RefreshCw: IconRefresh,
    BarChart3: IconChartBar,
    Waves: IconRipple,
    Package: IconPackage,
    Wheat: IconWheat,
    TestTube: IconFlask,
    Users: IconUsers,
    Heart: IconHeart,
    Clipboard: IconClipboard,
    Activity: IconActivity,
    Target: IconTarget,
    Calendar: IconCalendar,
    CheckCircle: IconCircleCheck,
    Leaf: IconLeaf,
    RotateCcw: IconRotate,
    Milk: IconMilk,
    Container: IconContainer,
    Box: IconBox,
    Baby: IconUser,
    BarChart: IconChartAreaLine,
    Factory: IconBuilding,
    Search: IconSearch,
    Scale: IconScale,

    // Fallback
    Home: IconHome,
};

export const getIconComponent = (iconName?: string) => {
    return IconMap[iconName as keyof typeof IconMap] || IconHome;
};

export const renderIcon = (iconName?: string, size: number = 20): React.ReactElement => {
    const IconComponent = getIconComponent(iconName);
    return React.createElement(IconComponent, { size });
};

export const getCurrentModuleFromURL = (pathname: string): string | null => {
    // URLs como: /es/shrimp-wave/aquaculture/shrimp
    // Necesitamos obtener "aquaculture/shrimp"
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length >= 4) {
        const moduleHref = `${pathSegments[2]}/${pathSegments[3]}`;
        return moduleHref;
    }

    return null;
};

export const isActiveRoute = (pathname: string, lng: string, tenant: string, href: string): boolean => {
    const fullPath = `/${lng}/${tenant}/${href}`;
    return pathname === fullPath || pathname.startsWith(fullPath + '/');
};

export const buildModulePath = (lng: string, tenant: string, moduleHref: string): string => {
    return `/${lng}/${tenant}/${moduleHref}`;
};

export const buildSubModulePath = (lng: string, tenant: string, moduleHref: string, subModuleHref: string): string => {
    return `/${lng}/${tenant}/${moduleHref}/${subModuleHref}`;
};

export const shouldItemBeOpen = (pathname: string, itemPath: string): boolean => {
    return pathname.includes(itemPath);
};
