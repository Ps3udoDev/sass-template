'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight, Home } from 'lucide-react';
import { getModuleById, getSubModuleById } from '@/modules/mockModules';

interface BreadcrumbProps {
    lng: string;
    tenant: string;
}

export default function Breadcrumb({ lng, tenant }: BreadcrumbProps) {
    const pathname = usePathname();
    const t = useTranslations();

    // Parsear la ruta para extraer información
    const pathSegments = pathname.split('/').filter(Boolean);
    const isModulePage = pathSegments.length > 3; // [lng, tenant, module, ...]

    if (!isModulePage) return null;

    // Extraer información de la ruta
    const moduleCategory = pathSegments[3]; // aquaculture, poultry, etc.
    const moduleType = pathSegments[4]; // shrimp, laying-hens, etc.
    const subModulePath = pathSegments[5]; // ponds, cycles, etc.

    // Encontrar el módulo
    const module = getModuleById(moduleType);
    if (!module) return null;

    // Construir breadcrumbs
    const breadcrumbs = [
        {
            name: 'Dashboard Principal',
            href: `/${lng}/${tenant}/dashboard`,
            icon: <Home size={16} />
        },
        {
            name: t(module.name),
            href: `/${lng}/${tenant}/${module.href}`,
            icon: <img src={module.icon} alt={t(module.name)} className="w-4 h-4" />
        }
    ];

    // Agregar submódulo si existe
    if (subModulePath) {
        const subModule = getSubModuleById(moduleType, subModulePath);
        if (subModule) {
            breadcrumbs.push({
                name: t(subModule.name),
                href: `/${lng}/${tenant}/${module.href}/${subModule.href}`,
                icon: <span className="text-sm">{subModule.icon}</span>
            });
        }
    }

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && <ChevronRight size={14} className="mx-2 text-gray-400" />}

                    {index === breadcrumbs.length - 1 ? (
                        // Último elemento (activo)
                        <div className="flex items-center space-x-2 text-gray-900 font-medium">
                            {breadcrumb.icon}
                            <span>{breadcrumb.name}</span>
                        </div>
                    ) : (
                        // Elementos navegables
                        <Link
                            href={breadcrumb.href}
                            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                        >
                            {breadcrumb.icon}
                            <span>{breadcrumb.name}</span>
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
