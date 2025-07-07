import { Box, ScrollArea, Stack } from '@mantine/core';
import { SidebarProps } from './types/sidebar.types';
import { useSidebarData, useSidebarNavigation } from './hooks/useSidebarData';
import { isActiveRoute } from './utils/sidebarUtils';
import SidebarHeader from './components/SidebarHeader';
import ModuleGroup from './components/ModuleGroup';

export default function Sidebar({ lng, tenant, onToggle }: SidebarProps) {
    const { currentModule, userModules, pathname } = useSidebarData();
    const { collapsed, handleToggle, handleBackToDashboard } = useSidebarNavigation(lng, tenant);

    const handleToggleWithCallback = () => {
        const newCollapsed = !collapsed;
        handleToggle();
        onToggle?.(newCollapsed);
    };

    if (!currentModule) {
        return null;
    }

    const modulesToShow = [currentModule];

    return (
        <Box
            className="fixed left-0 top-20 bg-surface border-r border-default transition-all duration-300 flex flex-col z-30"
            style={{
                width: collapsed ? 80 : 280,
                height: 'calc(100vh - 80px)'
            }}
        >
            <SidebarHeader
                lng={lng}
                tenant={tenant}
                collapsed={collapsed}
                currentModule={currentModule}
                onToggle={handleToggleWithCallback}
                onBackToDashboard={handleBackToDashboard}
            />

            <ScrollArea className="flex-1 p-2">
                <Stack gap="xs">
                    {modulesToShow.map((module) => (
                        <ModuleGroup
                            key={module.id}
                            module={module}
                            lng={lng}
                            tenant={tenant}
                            collapsed={collapsed}
                            isActive={isActiveRoute(pathname, lng, tenant, module.href)}
                            initiallyOpened={isActiveRoute(pathname, lng, tenant, module.href)}
                        />
                    ))}
                </Stack>
            </ScrollArea>
        </Box>
    );
}
