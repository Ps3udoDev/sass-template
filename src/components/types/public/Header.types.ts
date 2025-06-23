export interface HeaderProps {
    lng: string;
    tenant?: string;
}

export interface SessionData {
    email: string;
    password: string;
    tenant: string;
    modules: string[];
}

export interface TenantData {
    id: string;
    name: string;
    logo?: string;
    primaryColor?: string;
    modules: string[];
}

export interface NavigationItem {
    key: string;
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: string;
    enabled: boolean;
    showInMobile: boolean;
    requiresAuth?: boolean;
}

export interface NavigationConfig {
    landing: NavigationItem[];
    tenant: NavigationItem[];
}

export interface HeaderLandingProps {
    lng: string;
    navigationItems: NavigationItem[];
    onScrollToSection: (sectionId: string) => void;
}

export interface HeaderTenantProps {
    lng: string;
    tenant: string;
    navigationItems: NavigationItem[];
    session: SessionData | null;
    tenantData: TenantData | null;
    onLogout: () => void;
}

export interface HeaderLogoProps {
    lng: string;
    tenant?: string;
    tenantData?: TenantData | null;
    isTenantMode: boolean;
}

export interface UserMenuProps {
    session: SessionData | null;
    tenantData: TenantData | null;
    lng: string;
    tenant: string;
    onLogout: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

export interface MobileMenuProps {
    isOpen: boolean;
    isTenantMode: boolean;
    lng: string;
    tenant?: string;
    navigationItems: NavigationItem[];
    session: SessionData | null;
    onScrollToSection?: (sectionId: string) => void;
    onLogout?: () => void;
    onToggle: () => void;
}
