// src/components/common/sidebar/components/ModuleGroup.tsx

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Group, Text, ThemeIcon, UnstyledButton, Collapse, Stack, Tooltip } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { ModuleGroupProps } from '../types/sidebar.types';
import { getIconComponent, buildModulePath, shouldItemBeOpen } from '../utils/sidebarUtils';
import SubModuleItem from './SubModuleItem';

export default function ModuleGroup({
    module,
    lng,
    tenant,
    collapsed,
    isActive,
    initiallyOpened = false
}: ModuleGroupProps) {
    const [opened, setOpened] = useState(initiallyOpened);
    const pathname = usePathname();
    const t = useTranslations();

    const hasSubModules = Array.isArray(module.subModules) && module.subModules.length > 0;
    const modulePath = buildModulePath(lng, tenant, module.href);
    const IconComponent = getIconComponent(module.lucideIcon);

    useEffect(() => {
        if (hasSubModules && shouldItemBeOpen(pathname, modulePath)) {
            setOpened(true);
        }
    }, [pathname, modulePath, hasSubModules]);

    // Modo colapsado
    if (collapsed) {
        return (
            <Tooltip label={t(module.name)} position="right" withArrow>
                <UnstyledButton
                    component={Link}
                    href={modulePath}
                    className={`w-full p-3 rounded-lg transition-colors hover-surface ${isActive ? 'bg-primary/10' : ''
                        }`}
                >
                    <Group justify="center">
                        <ThemeIcon size={32} variant="light" radius="md" color={isActive ? "blue" : "gray"}>
                            <IconComponent size={20} />
                        </ThemeIcon>
                    </Group>
                </UnstyledButton>
            </Tooltip>
        );
    }

    // Modo expandido
    return (
        <Box>
            {hasSubModules ? (
                <UnstyledButton
                    onClick={() => setOpened((o) => !o)}
                    className={`w-full p-3 rounded-lg transition-colors hover-surface ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary'
                        }`}
                >
                    <Group justify="space-between" gap={0} w="100%">
                        <Group gap="sm">
                            <ThemeIcon size={36} variant="light" radius="md" color={isActive ? "blue" : "gray"}>
                                <IconComponent size={22} />
                            </ThemeIcon>
                            <div>
                                <Text fw={600} size="sm">
                                    {t(module.name)}
                                </Text>

                            </div>
                        </Group>
                        <IconChevronRight
                            size={16}
                            className="transition-transform duration-200"
                            style={{
                                transform: opened ? 'rotate(90deg)' : 'none',
                            }}
                        />
                    </Group>
                </UnstyledButton>
            ) : (
                <UnstyledButton
                    component={Link}
                    href={modulePath}
                    className={`w-full p-3 rounded-lg transition-colors hover-surface ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary'
                        }`}
                >
                    <Group gap="sm">
                        <ThemeIcon size={36} variant="light" radius="md" color={isActive ? "blue" : "gray"}>
                            <IconComponent size={22} />
                        </ThemeIcon>
                        <div>
                            <Text fw={600} size="sm">
                                {t(module.name)}
                            </Text>
                            <Text size="xs" c="dimmed">
                                Módulo principal
                            </Text>
                        </div>
                    </Group>
                </UnstyledButton>
            )}

            {hasSubModules && (
                <Collapse in={opened}>
                    <Stack gap={1} mt="sm" ml="sm">
                        {module.subModules.map((subModule) => (
                            <SubModuleItem
                                key={subModule.id}
                                subModule={subModule}
                                lng={lng}
                                tenant={tenant}
                                moduleHref={module.href}
                                level={1}
                            />
                        ))}
                    </Stack>
                </Collapse>
            )}
        </Box>
    );
}
