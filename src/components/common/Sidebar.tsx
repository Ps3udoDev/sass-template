'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    Box,
    Group,
    ScrollArea,
    UnstyledButton,
    Tooltip,
    Collapse,
    Text,
    ThemeIcon,
    ActionIcon,
    Divider,
    Badge,
    Stack
} from '@mantine/core';
import {
    IconMenu2,
    IconHome,
    IconFish,
    IconFeather,
    IconRefresh,
    IconChartBar,
    IconRipple,
    IconChevronRight,
    IconArrowLeft
} from '@tabler/icons-react';
import { getAvailableModules, Module, SubModule } from '@/modules/mockModules';
import classes from './Sidebar.module.css';

interface SidebarProps {
    lng: string;
    tenant: string;
    onToggle?: (collapsed: boolean) => void;
}

const IconMap = {
    Fish: IconFish,
    Bird: IconFeather,
    RefreshCw: IconRefresh,
    BarChart3: IconChartBar,
    Waves: IconRipple,
    Home: IconHome,
};

const getIconComponent = (iconName?: string) => {
    return IconMap[iconName as keyof typeof IconMap] || IconHome;
};

const renderIcon = (iconName?: string, size: number = 20) => {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent size={size} />;
};

interface NestedSubModuleProps {
    subModule: SubModule;
    lng: string;
    tenant: string;
    moduleHref: string;
    parentSubModuleHref: string;
}

function NestedSubModule({ subModule, lng, tenant, moduleHref, parentSubModuleHref }: NestedSubModuleProps) {
    const pathname = usePathname();
    const t = useTranslations();
    const [opened, setOpened] = useState(false);

    const hasNestedSubModules = Array.isArray(subModule.subModules) && subModule.subModules.length > 0;

    useEffect(() => {
        if (hasNestedSubModules && pathname.includes(`/${lng}/${tenant}/${moduleHref}/${subModule.href}`)) {
            setOpened(true);
        }
    }, [pathname, lng, tenant, moduleHref, subModule.href, hasNestedSubModules]);

    const isActive = subModule.href.includes('/')
        ? pathname.includes(`/${lng}/${tenant}/${moduleHref}/${subModule.href}`)
        : pathname.includes(`/${lng}/${tenant}/${moduleHref}/${subModule.href}`);

    if (hasNestedSubModules) {
        return (
            <Box>
                <UnstyledButton
                    onClick={() => setOpened((o) => !o)}
                    className={classes.subLink}
                    data-active={isActive || undefined}
                    w="100%"
                >
                    <Group justify="space-between" gap={0} w="100%">
                        <Group gap="sm">
                            <ThemeIcon size={24} variant="light" radius="sm">
                                {renderIcon(subModule.lucideIcon, 14)}
                            </ThemeIcon>
                            <Text size="sm" fw={isActive ? 600 : 400}>
                                {t(subModule.name)}
                            </Text>
                        </Group>
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            size={12}
                            style={{
                                transform: opened ? 'rotate(90deg)' : 'none',
                                transition: 'transform 150ms ease'
                            }}
                        />
                    </Group>
                </UnstyledButton>

                <Collapse in={opened}>
                    <Stack gap={2} ml="lg" mt="xs">
                        {subModule.subModules!.map((nestedSubModule) => {
                            const isNestedActive = pathname.includes(`/${lng}/${tenant}/${moduleHref}/${nestedSubModule.href}`);
                            const nestedHref = `/${lng}/${tenant}/${moduleHref}/${nestedSubModule.href}`;

                            return (
                                <UnstyledButton
                                    key={nestedSubModule.id}
                                    component={Link}
                                    href={nestedHref}
                                    className={classes.nestedLink}
                                    data-active={isNestedActive || undefined}
                                    w="100%"
                                >
                                    <Group gap="xs" ml="md">
                                        {renderIcon(nestedSubModule.lucideIcon, 18)}
                                        <Text size="xs" fw={isNestedActive ? 600 : 400}>
                                            {t(nestedSubModule.name)}
                                        </Text>
                                    </Group>
                                </UnstyledButton>
                            );
                        })}
                    </Stack>
                </Collapse>
            </Box>
        );
    } else {
        const subModuleHref = `/${lng}/${tenant}/${moduleHref}/${subModule.href}`;
        return (
            <UnstyledButton
                component={Link}
                href={subModuleHref}
                className={classes.subLink}
                data-active={isActive || undefined}
                w="100%"
            >
                <Group gap="sm">
                    <ThemeIcon size={24} variant="light" radius="sm">
                        {renderIcon(subModule.lucideIcon, 14)}
                    </ThemeIcon>
                    <Text size="sm" fw={isActive ? 600 : 400}>
                        {t(subModule.name)}
                    </Text>
                </Group>
            </UnstyledButton>
        );
    }
}

interface LinksGroupProps {
    icon: React.ComponentType<any>;
    label: string;
    href: string;
    active: boolean;
    collapsed: boolean;
    subModules?: SubModule[];
    lng: string;
    tenant: string;
    moduleHref: string;
    initiallyOpened?: boolean;
}

function LinksGroup({
    icon: Icon,
    label,
    href,
    active,
    collapsed,
    subModules,
    lng,
    tenant,
    moduleHref,
    initiallyOpened
}: LinksGroupProps) {
    const [opened, setOpened] = useState(initiallyOpened || false);
    const pathname = usePathname();
    const t = useTranslations();
    const hasSubModules = Array.isArray(subModules) && subModules.length > 0;

    useEffect(() => {
        if (hasSubModules && pathname.includes(moduleHref)) {
            setOpened(true);
        }
    }, [pathname, moduleHref, hasSubModules]);

    if (collapsed) {
        return (
            <Tooltip label={label} position="right" withArrow>
                <UnstyledButton
                    component={Link}
                    href={href}
                    className={classes.mainLinkCollapsed}
                    data-active={active || undefined}
                >
                    <Icon size={22} stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        );
    }

    return (
        <Box>
            {hasSubModules ? (
                <UnstyledButton
                    onClick={() => setOpened((o) => !o)}
                    className={classes.mainLink}
                    data-active={active || undefined}
                    w="100%"
                >
                    <Group justify="space-between" gap={0} w="100%">
                        <Group gap="sm">
                            <ThemeIcon size={30} variant="light" radius="md">
                                <Icon size={18} />
                            </ThemeIcon>
                            <Text fw={500}>{label}</Text>
                        </Group>
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            size={16}
                            style={{
                                transform: opened ? 'rotate(90deg)' : 'none',
                                transition: 'transform 150ms ease'
                            }}
                        />
                    </Group>
                </UnstyledButton>
            ) : (
                <UnstyledButton
                    component={Link}
                    href={href}
                    className={classes.mainLink}
                    data-active={active || undefined}
                    w="100%"
                >
                    <Group gap="sm">
                        <ThemeIcon size={30} variant="light" radius="md">
                            <Icon size={18} />
                        </ThemeIcon>
                        <Text fw={500}>{label}</Text>
                    </Group>
                </UnstyledButton>
            )}

            {hasSubModules && (
                <Collapse in={opened}>
                    <Stack gap={2} mt="xs" ml="sm">
                        {subModules.map((subModule) => (
                            <NestedSubModule
                                key={subModule.id}
                                subModule={subModule}
                                lng={lng}
                                tenant={tenant}
                                moduleHref={moduleHref}
                                parentSubModuleHref={subModule.href}
                            />
                        ))}
                    </Stack>
                </Collapse>
            )}
        </Box>
    );
}

export default function Sidebar({ lng, tenant, onToggle }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [userModules, setUserModules] = useState<Module[]>([]);
    const [currentModule, setCurrentModule] = useState<Module | null>(null);
    const pathname = usePathname();
    const t = useTranslations();

    const handleToggle = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        onToggle?.(newCollapsed);
    };

    const handleBackToDashboard = () => {
        window.location.href = `/${lng}/${tenant}/dashboard`;
    };

    // Función para obtener el módulo actual basado en la URL
    const getCurrentModuleFromURL = () => {
        // URLs como: /es/shrimp-wave/aquaculture/shrimp
        // Necesitamos obtener "aquaculture/shrimp"
        const pathSegments = pathname.split('/');

        if (pathSegments.length >= 5) {
            const moduleHref = `${pathSegments[3]}/${pathSegments[4]}`;
            return moduleHref;
        }

        return null;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = JSON.parse(localStorage.getItem('session') || '{}');
            const availableModules = getAvailableModules(session.modules || []);
            setUserModules(availableModules);

            // Filtrar el módulo actual basado en la URL
            const currentModuleHref = getCurrentModuleFromURL();

            if (currentModuleHref) {
                const foundModule = availableModules.find(module => module.href === currentModuleHref);
                setCurrentModule(foundModule || null);
            } else {
                setCurrentModule(null);
            }
        }
    }, [pathname]);

    const isActiveRoute = (href: string) => {
        const fullPath = `/${lng}/${tenant}/${href}`;
        return pathname === fullPath || pathname.startsWith(fullPath + '/');
    };

    // Solo mostrar el módulo actual, no todos los módulos
    const modulesToShow = currentModule ? [currentModule] : [];

    // No mostrar sidebar si estamos en dashboard
    if (!currentModule) {
        return null;
    }

    return (
        <Box
            className={classes.navbar}
            style={{
                width: collapsed ? 80 : 280,
                transition: 'width 200ms ease'
            }}
        >
            <Box className={classes.header}>
                <Group justify="space-between">
                    {!collapsed ? (
                        <Group gap="xs">
                            <ThemeIcon size={24} variant="light" radius="sm">
                                {renderIcon(currentModule.lucideIcon, 16)}
                            </ThemeIcon>
                            <Text fw={600} c="dark">{t(currentModule.name)}</Text>
                        </Group>
                    ) : (
                        <ThemeIcon size={24} variant="light" radius="sm">
                            {renderIcon(currentModule.lucideIcon, 16)}
                        </ThemeIcon>
                    )}

                    <Group gap="xs">
                        <Tooltip
                            label="Volver al Dashboard"
                            position="right"
                            disabled={!collapsed}
                        >
                            <ActionIcon
                                variant="subtle"
                                onClick={handleBackToDashboard}
                                size="lg"
                                color="blue"
                            >
                                <IconArrowLeft size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip
                            label={collapsed ? "Expandir menú" : "Contraer menú"}
                            position="right"
                            disabled={!collapsed}
                        >
                            <ActionIcon
                                variant="subtle"
                                onClick={handleToggle}
                                size="lg"
                            >
                                <IconMenu2 size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </Box>

            <Divider />

            <ScrollArea className={classes.links}>
                <Box className={classes.linksInner}>
                    <Stack gap="xs">
                        {modulesToShow.map((module) => (
                            <LinksGroup
                                key={module.id}
                                icon={getIconComponent(module.lucideIcon)}
                                label={t(module.name)}
                                href={`/${lng}/${tenant}/${module.href}`}
                                active={isActiveRoute(module.href)}
                                collapsed={collapsed}
                                subModules={module.subModules}
                                lng={lng}
                                tenant={tenant}
                                moduleHref={module.href}
                                initiallyOpened={isActiveRoute(module.href)}
                            />
                        ))}
                    </Stack>
                </Box>
            </ScrollArea>

            {!collapsed && currentModule.subModules && (
                <Box className={classes.footer}>
                    <Divider mb="sm" />
                    <Group justify="center">
                        <Badge variant="light" size="sm">
                            {currentModule.subModules.length} submódulos
                        </Badge>
                    </Group>
                </Box>
            )}
        </Box>
    );
}
