// src/components/common/sidebar/components/SidebarHeader.tsx

import { useTranslations } from 'next-intl';
import { Box, Group, Text, ThemeIcon, ActionIcon, Tooltip } from '@mantine/core';
import { IconMenu2, IconArrowLeft } from '@tabler/icons-react';
import { SidebarHeaderProps } from '../types/sidebar.types';
import { renderIcon } from '../utils/sidebarUtils';

export default function SidebarHeader({
    lng,
    tenant,
    collapsed,
    currentModule,
    onToggle,
    onBackToDashboard
}: SidebarHeaderProps) {
    const t = useTranslations();

    if (!currentModule) return null;

    return (
        <Box className="border-b border-gray-200 dark:border-gray-700 p-4">


            <Group gap="xs" justify='space-between'>
                <Tooltip
                    label="Volver al Dashboard"
                    position={collapsed ? "right" : "bottom"}
                    withArrow
                >
                    <ActionIcon
                        variant="subtle"
                        onClick={onBackToDashboard}
                        size="lg"
                        color="blue"
                        className="hover-surface"
                    >
                        <IconArrowLeft size={18} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip
                    label={collapsed ? "Expandir menú" : "Contraer menú"}
                    position={collapsed ? "right" : "bottom"}
                    withArrow
                >
                    <ActionIcon
                        variant="subtle"
                        onClick={onToggle}
                        size="lg"
                        className="hover-surface"
                    >
                        <IconMenu2 size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Box>
    );
}
