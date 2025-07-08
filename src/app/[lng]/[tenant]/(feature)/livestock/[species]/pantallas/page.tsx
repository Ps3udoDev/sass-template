'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@mantine/core';
import ListTemplate, { BreadcrumbItem, ColumnDefCustom } from '../../components/ListTemplate';
import pantallaMockData from './data/mockdata.json';
import submenuMockData from '../submenus/data/mockdata.json';
import menuMockData from '../menus/data/mockdata.json';

interface PantallasListProps {
    params: Promise<{ lng: string; tenant: string; species: string }>;
}

export default function PantallasListPage({ params }: PantallasListProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species } = resolvedParams;
    const router = useRouter();

    // Crear mapas para búsqueda rápida
    const menuMap = useMemo(() => {
        const map = new Map();
        menuMockData.forEach(menu => {
            map.set(menu.id, menu);
        });
        return map;
    }, []);

    const submenuMap = useMemo(() => {
        const map = new Map();
        submenuMockData.forEach(submenu => {
            map.set(submenu.id, submenu);
        });
        return map;
    }, []);

    // Enriquecer datos de pantallas con información jerárquica
    const enrichedPantallaData = useMemo(() => {
        return pantallaMockData.map(pantalla => {
            const parentSubmenu = submenuMap.get(pantalla.submenuId);
            const parentMenu = menuMap.get(pantalla.menuId);

            return {
                ...pantalla,
                // Información del menú
                menuNombre: parentMenu?.nombre || 'Menú no encontrado',
                menuActivo: parentMenu?.activo || false,
                // Información del submenú
                submenuNombre: parentSubmenu?.nombre || 'Submenú no encontrado',
                submenuActivo: parentSubmenu?.activo || false,
                // Jerarquía completa
                jerarquia: `${parentMenu?.nombre || 'N/A'} → ${parentSubmenu?.nombre || 'N/A'}`,
                // Estado general (todos los niveles deben estar activos)
                estadoGeneral: pantalla.activo && (parentSubmenu?.activo || false) && (parentMenu?.activo || false)
            };
        });
    }, [menuMap, submenuMap]);

    // Configurar breadcrumbs
    const breadcrumbItems: BreadcrumbItem[] = [
        { title: 'Dashboard', href: `/${lng}/${tenant}/dashboard` },
        { title: 'Livestock', href: `/${lng}/${tenant}/livestock` },
        { title: species.charAt(0).toUpperCase() + species.slice(1), href: `/${lng}/${tenant}/livestock/${species}` },
        { title: 'Pantallas', href: '#' }
    ];

    // Configurar columnas de la tabla
    const columns: ColumnDefCustom[] = [
        {
            key: 'jerarquia',
            label: 'Jerarquía (Menú → Submenú)',
            type: 'custom',
            render: (value, item) => (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">{value}</div>
                    <div className="flex items-center space-x-2">
                        <Badge
                            size="xs"
                            color={item.menuActivo ? 'green' : 'red'}
                            variant="light"
                        >
                            Menú: {item.menuActivo ? 'Activo' : 'Inactivo'}
                        </Badge>
                        <Badge
                            size="xs"
                            color={item.submenuActivo ? 'green' : 'red'}
                            variant="light"
                        >
                            Submenú: {item.submenuActivo ? 'Activo' : 'Inactivo'}
                        </Badge>
                    </div>
                </div>
            )
        },
        {
            key: 'nombre',
            label: 'Nombre Pantalla',
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
            key: 'estadoGeneral',
            label: 'Estado General',
            type: 'custom',
            render: (value, item) => (
                <div className="space-y-1">
                    <Badge
                        color={value ? 'green' : 'red'}
                        variant="light"
                    >
                        {value ? 'Completamente Activo' : 'Inactivo'}
                    </Badge>
                    <div className="text-xs text-gray-500">
                        Pantalla: {item.activo ? '✅' : '❌'}
                    </div>
                </div>
            )
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
        router.push(`/${lng}/${tenant}/livestock/${species}/pantallas/${id}/edit`);
    };

    const handleDelete = (id: string | number) => {
        const pantalla = enrichedPantallaData.find(p => p.id === Number(id));
        let confirmMessage = '¿Estás seguro de que deseas eliminar esta pantalla?';

        if (pantalla) {
            confirmMessage = `¿Estás seguro de que deseas eliminar la pantalla "${pantalla.nombre}" de "${pantalla.jerarquia}"?`;
        }

        if (confirm(confirmMessage)) {
            console.log(`Eliminando pantalla con ID: ${id}`);
            // Aquí iría la lógica de eliminación real
            alert('Pantalla eliminada exitosamente');
        }
    };

    const handleCreate = () => {
        // Verificar jerarquía disponible
        const activeMenus = menuMockData.filter(menu => menu.activo === true);
        const activeSubmenus = submenuMockData.filter(submenu => submenu.activo === true);

        if (activeMenus.length === 0) {
            if (confirm('No hay menús activos disponibles. ¿Deseas crear un menú primero?')) {
                router.push(`/${lng}/${tenant}/livestock/${species}/menus/new`);
            }
            return;
        }

        if (activeSubmenus.length === 0) {
            if (confirm('No hay submenús activos disponibles. ¿Deseas crear un submenú primero?')) {
                router.push(`/${lng}/${tenant}/livestock/${species}/submenus/new`);
            }
            return;
        }

        router.push(`/${lng}/${tenant}/livestock/${species}/pantallas/new`);
    };

    // Calcular estadísticas para el dashboard
    const stats = useMemo(() => {
        const total = enrichedPantallaData.length;
        const activas = enrichedPantallaData.filter(p => p.activo).length;
        const completamenteActivas = enrichedPantallaData.filter(p => p.estadoGeneral).length;
        const conProblemas = enrichedPantallaData.filter(p => p.activo && !p.estadoGeneral).length;

        return { total, activas, completamenteActivas, conProblemas };
    }, [enrichedPantallaData]);

    return (
        <div>
            {/* Estadísticas rápidas */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Total Pantallas</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Pantallas Activas</div>
                    <div className="text-2xl font-bold text-blue-600">{stats.activas}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Completamente Activas</div>
                    <div className="text-2xl font-bold text-green-600">{stats.completamenteActivas}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Con Problemas</div>
                    <div className="text-2xl font-bold text-amber-600">{stats.conProblemas}</div>
                </div>
            </div>

            <ListTemplate
                title="Gestión de Pantallas"
                description="Administra y configura las pantallas del sistema livestock organizadas por menú y submenú"
                breadcrumbItems={breadcrumbItems}
                data={enrichedPantallaData}
                columns={columns}
                entityName="Pantalla"
                basePath={`/${lng}/${tenant}/livestock/${species}/pantallas`}
                searchPlaceholder="Buscar pantallas por nombre, jerarquía, URL o descripción..."
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                activeKey="activo"
            />
        </div>
    );
}
