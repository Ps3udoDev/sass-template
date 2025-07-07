// src/components/common/sidebar/types/sidebar.types.ts

import { Module, SubModule } from '@/modules/mockModules';

export interface SidebarProps {
    lng: string;
    tenant: string;
    onToggle?: (collapsed: boolean) => void;
}

export interface SidebarHeaderProps {
    lng: string;
    tenant: string;
    collapsed: boolean;
    currentModule: Module | null;
    onToggle: () => void;
    onBackToDashboard: () => void;
}

export interface SidebarFooterProps {
    collapsed: boolean;
    currentModule: Module | null;
}

export interface ModuleGroupProps {
    module: Module;
    lng: string;
    tenant: string;
    collapsed: boolean;
    isActive: boolean;
    initiallyOpened?: boolean;
}

export interface SubModuleItemProps {
    subModule: SubModule;
    lng: string;
    tenant: string;
    moduleHref: string;
    level?: number;
}

export interface NestedSubModuleProps {
    subModule: SubModule;
    lng: string;
    tenant: string;
    moduleHref: string;
    parentPath: string;
    level?: number;
}

export interface SidebarNavigationState {
    currentModule: Module | null;
    userModules: Module[];
    pathname: string;
}

export interface IconMapType {
    [key: string]: React.ComponentType<any>;
}

export interface SidebarItemState {
    opened: boolean;
    isActive: boolean;
}
