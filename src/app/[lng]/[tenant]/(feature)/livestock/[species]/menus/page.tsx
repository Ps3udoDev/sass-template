'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ListTemplate, { BreadcrumbItem, ColumnDefCustom } from '../../components/ListTemplate';
import mockData from './data/mockdata.json';

interface MenusListProps {
    params: Promise<{ lng: string; tenant: string; species: string }>;
}

export default function MenusListPage({ params }: MenusListProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species } = resolvedParams;
    const router = useRouter();

    // Configurar breadcrumbs
    const breadcrumbItems: BreadcrumbItem[] = [
        { title: 'Dashboard', href: `/${lng}/${tenant}/dashboard` },
        { title: 'Livestock', href: `/${lng}/${tenant}/livestock` },
        { title: species.charAt(0).toUpperCase() + species.slice(1), href: `/${lng}/${tenant}/livestock/${species}` },
        { title: 'Menús', href: '#' }
    ];

    // Configurar columnas de la tabla
    const columns: ColumnDefCustom[] = [
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        },
        {
            key: 'url',
            label: 'URL',
            type: 'custom',
            render: (value) => (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {value}
                </code>
            )
        },
        {
            key: 'descripcion',
            label: 'Descripción',
            type: 'custom',
            render: (value) => (
                <span className="max-w-xs truncate block" title={value}>
                    {value}
                </span>
            )
        },
        {
            key: 'activo',
            label: 'Estado',
            type: 'badge'
        },
        {
            key: 'fechaCreacion',
            label: 'Fecha Creación',
            type: 'date'
        },
        {
            key: 'fechaActualizacion',
            label: 'Última Actualización',
            type: 'date'
        }
    ];

    // Handlers personalizados
    const handleEdit = (id: string | number) => {
        router.push(`/${lng}/${tenant}/livestock/${species}/menus/${id}/edit`);
    };

    const handleDelete = (id: string | number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este menú?')) {
            console.log(`Eliminando menú con ID: ${id}`);
            // Aquí iría la lógica de eliminación real
            alert('Menú eliminado exitosamente');
        }
    };

    const handleCreate = () => {
        router.push(`/${lng}/${tenant}/livestock/${species}/menus/new`);
    };

    return (
        <ListTemplate
            title="Gestión de Menús"
            description="Administra y configura los menús del sistema livestock"
            breadcrumbItems={breadcrumbItems}
            data={mockData}
            columns={columns}
            entityName="Menú"
            basePath={`/${lng}/${tenant}/livestock/${species}/menus`}
            searchPlaceholder="Buscar menús por nombre, URL o descripción..."
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            activeKey="activo"
        />
    );
}
