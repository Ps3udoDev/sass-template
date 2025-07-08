'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@mantine/core';
import ListTemplate, { BreadcrumbItem, ColumnDefCustom } from '../../components/ListTemplate';
import submenuMockData from './data/mockdata.json';
import menuMockData from '../menus/data/mockdata.json';

interface SubmenusListProps {
    params: Promise<{ lng: string; tenant: string; species: string }>;
}

export default function SubmenusListPage({ params }: SubmenusListProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species } = resolvedParams;
    const router = useRouter();

    // Crear un mapa de menús para búsqueda rápida
    const menuMap = useMemo(() => {
        const map = new Map();
        menuMockData.forEach(menu => {
            map.set(menu.id, menu);
        });
        return map;
    }, []);

    // Enriquecer datos de submenús con información del menú padre
    const enrichedSubmenuData = useMemo(() => {
        return submenuMockData.map(submenu => {
            const parentMenu = menuMap.get(submenu.menuId);
            return {
                ...submenu,
                menuNombre: parentMenu?.nombre || 'Menú no encontrado',
                menuActivo: parentMenu?.activo || false
            };
        });
    }, [menuMap]);

    // Configurar breadcrumbs
    const breadcrumbItems: BreadcrumbItem[] = [
        { title: 'Dashboard', href: `/${lng}/${tenant}/dashboard` },
        { title: 'Livestock', href: `/${lng}/${tenant}/livestock` },
        { title: species.charAt(0).toUpperCase() + species.slice(1), href: `/${lng}/${tenant}/livestock/${species}` },
        { title: 'Submenús', href: '#' }
    ];

    // Configurar columnas de la tabla
    const columns: ColumnDefCustom[] = [
        {
            key: 'menuNombre',
            label: 'Menú Padre',
            type: 'custom',
            render: (value, item) => (
                <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{value}</span>
                    <Badge
                        size="xs"
                        color={item.menuActivo ? 'green' : 'red'}
                        variant="light"
                    >
                        {item.menuActivo ? 'Activo' : 'Inactivo'}
                    </Badge>
                </div>
            )
        },
        {
            key: 'nombre',
            label: 'Nombre Submenú',
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
        router.push(`/${lng}/${tenant}/livestock/${species}/submenus/${id}/edit`);
    };

    const handleDelete = (id: string | number) => {
        const submenu = enrichedSubmenuData.find(s => s.id === Number(id));
        const confirmMessage = submenu
            ? `¿Estás seguro de que deseas eliminar el submenú "${submenu.nombre}" del menú "${submenu.menuNombre}"?`
            : '¿Estás seguro de que deseas eliminar este submenú?';

        if (confirm(confirmMessage)) {
            console.log(`Eliminando submenú con ID: ${id}`);
            // Aquí iría la lógica de eliminación real
            alert('Submenú eliminado exitosamente');
        }
    };

    const handleCreate = () => {
        // Verificar si hay menús activos disponibles
        const activeMenus = menuMockData.filter(menu => menu.activo === true);

        if (activeMenus.length === 0) {
            if (confirm('No hay menús activos disponibles. ¿Deseas crear un menú primero?')) {
                router.push(`/${lng}/${tenant}/livestock/${species}/menus/new`);
            }
            return;
        }

        router.push(`/${lng}/${tenant}/livestock/${species}/submenus/new`);
    };

    return (
        <ListTemplate
            title="Gestión de Submenús"
            description="Administra y configura los submenús del sistema livestock"
            breadcrumbItems={breadcrumbItems}
            data={enrichedSubmenuData}
            columns={columns}
            entityName="Submenú"
            basePath={`/${lng}/${tenant}/livestock/${species}/submenus`}
            searchPlaceholder="Buscar submenús por nombre, menú padre, URL o descripción..."
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            activeKey="activo"
        />
    );
}
