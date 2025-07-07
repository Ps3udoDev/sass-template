// src/components/common/sidebar/components/NestedSubModule.tsx

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Group, Text, UnstyledButton } from '@mantine/core';
import { NestedSubModuleProps } from '../types/sidebar.types';
import { renderIcon, buildSubModulePath, shouldItemBeOpen } from '../utils/sidebarUtils';

export default function NestedSubModule({
    subModule,
    lng,
    tenant,
    moduleHref,
    parentPath,
    level = 2
}: NestedSubModuleProps) {
    const pathname = usePathname();
    const t = useTranslations();

    const nestedPath = buildSubModulePath(lng, tenant, moduleHref, subModule.href);
    const isActive = shouldItemBeOpen(pathname, nestedPath);

    const baseClasses = "w-full transition-colors hover-surface rounded-md";
    const activeClasses = isActive ? "bg-primary/10 text-primary" : "text-muted";
    const indentClass = level > 2 ? "ml-4" : "";

    if (subModule.href) {
        return (
            <div className='p-2'>
                <UnstyledButton
                    component={Link}
                    href={nestedPath}
                    className={`${baseClasses} ${activeClasses} p-2 ${indentClass}`}
                >
                    <Group gap="xs">
                        <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                        {renderIcon(subModule.lucideIcon, 16)}
                        <Text size="xs" fw={isActive ? 600 : 500}>
                            {t(subModule.name)}
                        </Text>
                    </Group>
                </UnstyledButton>
            </div>
        );
    }

    return (
        <div className={`p-2 opacity-50 ${indentClass}`}>
            <Group gap="xs">
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                {renderIcon(subModule.lucideIcon, 14)}
                <Text size="xs" c="dimmed">
                    {t(subModule.name)}
                </Text>
            </Group>
        </div>
    );
}
