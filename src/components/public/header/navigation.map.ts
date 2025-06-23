import { NavigationConfig } from "@/components/types/public";

export const navigationConfig: NavigationConfig = {
    landing: [
        {
            key: 'about',
            label: 'header.landing.about',
            onClick: () => { },
            enabled: true,
            showInMobile: true
        },
        {
            key: 'services',
            label: 'header.landing.services',
            onClick: () => { },
            enabled: true,
            showInMobile: true,
        },
        {
            key: 'testimonials',
            label: 'header.landing.testimonials',
            onClick: () => { },
            enabled: true,
            showInMobile: true,
        },
        {
            key: 'modules',
            label: 'header.landing.modules',
            onClick: () => { },
            enabled: true,
            showInMobile: true,
        },
    ],
    tenant: [
        {
            key: 'dashboard',
            label: 'header.tenant.dashboard',
            href: '/dashboard',
            icon: 'LayoutDashboard',
            enabled: true,
            showInMobile: true,
            requiresAuth: true,
        },
        {
            key: 'marketplace',
            label: 'header.tenant.marketplace',
            href: '/marketplace',
            icon: 'ShoppingCart',
            enabled: true,
            showInMobile: true,
            requiresAuth: true,
        },
        {
            key: 'settings',
            label: 'header.tenant.settings',
            href: '/settings',
            icon: 'Settings',
            enabled: true,
            showInMobile: true,
            requiresAuth: true,
        },
    ],
}

export const filterNavigationByTenant = (
    navigation: NavigationConfig,
    tenantPermissions?: string[]
): NavigationConfig => {
    if (!tenantPermissions) return navigation

    return {
        landing: navigation.landing.filter(item =>
            !tenantPermissions.includes(`disable_${item.key}`)
        ),
        tenant: navigation.tenant.filter(item =>
            !tenantPermissions.includes(`disable_${item.key}`)
        ),
    };
}

export const customizeNavigationForTenant = (
    navigation: NavigationConfig,
    tenantData?: any
): NavigationConfig => {
    return navigation;
};
