import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Group, Text, ThemeIcon, UnstyledButton, Collapse, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { SubModuleItemProps } from '../types/sidebar.types';
import { renderIcon, buildSubModulePath, shouldItemBeOpen } from '../utils/sidebarUtils';
import NestedSubModule from './NestedSubModule';

export default function SubModuleItem({
    subModule,
    lng,
    tenant,
    moduleHref,
    level = 1
}: SubModuleItemProps) {
    const [opened, setOpened] = useState(false);
    const pathname = usePathname();
    const t = useTranslations();

    const hasNestedSubModules = Array.isArray(subModule.subModules) && subModule.subModules.length > 0;
    const subModulePath = buildSubModulePath(lng, tenant, moduleHref, subModule.href);
    const isActive = shouldItemBeOpen(pathname, subModulePath);

    useEffect(() => {
        if (hasNestedSubModules && shouldItemBeOpen(pathname, subModulePath)) {
            setOpened(true);
        }
    }, [pathname, subModulePath, hasNestedSubModules]);

    const baseClasses = "w-full transition-colors hover-surface rounded-lg";
    const activeClasses = isActive ? "bg-primary/10 text-primary" : "text-secondary";
    const paddingClass = level === 1 ? "p-3" : "p-2";

    if (hasNestedSubModules) {
        return (
            <Box className='p-2'>
                <UnstyledButton
                    onClick={() => setOpened((o) => !o)}
                    className={`${baseClasses} ${activeClasses} ${paddingClass}`}
                >
                    <Group justify="space-between" gap={0} w="100%">
                        <Group gap="sm">
                            <ThemeIcon size={28} variant="light" radius="sm" color={isActive ? "blue" : "gray"}>
                                {renderIcon(subModule.lucideIcon, 24)}
                            </ThemeIcon>
                            <Text size="sm" fw={isActive ? 600 : 500}>
                                {t(subModule.name)}
                            </Text>
                        </Group>
                        <IconChevronRight
                            size={14}
                            className="transition-transform duration-200"
                            style={{
                                transform: opened ? 'rotate(90deg)' : 'none',
                            }}
                        />
                    </Group>
                </UnstyledButton>

                <Collapse in={opened}>
                    <Stack gap={1} ml="md" mt="xs">
                        {subModule.subModules!.map((nestedSubModule) => (
                            <NestedSubModule
                                key={nestedSubModule.id}
                                subModule={nestedSubModule}
                                lng={lng}
                                tenant={tenant}
                                moduleHref={moduleHref}
                                parentPath={subModulePath}
                                level={level + 1}
                            />
                        ))}
                    </Stack>
                </Collapse>
            </Box>
        );
    }

    if (subModule.href) {
        return (
            <UnstyledButton
                component={Link}
                href={subModulePath}
                className={`${baseClasses} ${activeClasses} ${paddingClass}`}
            >
                <Group gap="sm">
                    <ThemeIcon size={28} variant="light" radius="sm" color={isActive ? "blue" : "gray"}>
                        {renderIcon(subModule.lucideIcon, 16)}
                    </ThemeIcon>
                    <Text size="sm" fw={isActive ? 600 : 500}>
                        {t(subModule.name)}
                    </Text>
                </Group>
            </UnstyledButton>
        );
    }

    return (
        <Box className={`${paddingClass} opacity-75`}>
            <Group gap="sm">
                <ThemeIcon size={28} variant="light" radius="sm" color="gray">
                    {renderIcon(subModule.lucideIcon, 16)}
                </ThemeIcon>
                <Text size="sm" c="dimmed">
                    {t(subModule.name)}
                </Text>
            </Group>
        </Box>
    );
}
