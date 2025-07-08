'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Anchor, Breadcrumbs, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import menuMockData from '../../menus/data/mockdata.json';
import submenuMockData from '../../submenus/data/mockdata.json';

interface NewPantallaProps {
    params: Promise<{ lng: string; tenant: string; species: string }>;
}

interface PantallaFormData {
    menuId: string;
    submenuId: string;
    nombre: string;
    url: string;
    descripcion: string;
    activo: boolean;
}

interface MenuOption {
    id: string;
    nombre: string;
}

interface SubmenuOption {
    id: string;
    nombre: string;
    menuId: string;
}

export default function NewPantallaPage({ params }: NewPantallaProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species } = resolvedParams;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [activeMenus, setActiveMenus] = useState<MenuOption[]>([]);
    const [availableSubmenus, setAvailableSubmenus] = useState<SubmenuOption[]>([]);
    const [filteredSubmenus, setFilteredSubmenus] = useState<SubmenuOption[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<PantallaFormData>({
        defaultValues: {
            menuId: '',
            submenuId: '',
            nombre: '',
            url: '',
            descripcion: '',
            activo: true
        }
    });

    const activoValue = watch('activo');
    const selectedMenuId = watch('menuId');
    const selectedSubmenuId = watch('submenuId');

    // Cargar menús activos al montar el componente
    useEffect(() => {
        const loadActiveMenus = () => {
            const activeMenusList = menuMockData
                .filter(menu => menu.activo === true)
                .map(menu => ({
                    id: menu.id.toString(),
                    nombre: menu.nombre
                }));

            setActiveMenus(activeMenusList);
        };

        loadActiveMenus();
    }, []);

    // Cargar submenús activos al montar el componente
    useEffect(() => {
        const loadActiveSubmenus = () => {
            const activeSubmenusList = submenuMockData
                .filter(submenu => submenu.activo === true)
                .map(submenu => ({
                    id: submenu.id.toString(),
                    nombre: submenu.nombre,
                    menuId: submenu.menuId.toString()
                }));

            setAvailableSubmenus(activeSubmenusList);
        };

        loadActiveSubmenus();
    }, []);

    // Filtrar submenús cuando cambia el menú seleccionado
    useEffect(() => {
        if (selectedMenuId) {
            const filtered = availableSubmenus.filter(submenu => submenu.menuId === selectedMenuId);
            setFilteredSubmenus(filtered);

            // Si el submenú seleccionado no pertenece al nuevo menú, resetear selección
            if (selectedSubmenuId) {
                const submenuBelongsToMenu = filtered.some(submenu => submenu.id === selectedSubmenuId);
                if (!submenuBelongsToMenu) {
                    setValue('submenuId', '');
                }
            }
        } else {
            setFilteredSubmenus([]);
            setValue('submenuId', '');
        }
    }, [selectedMenuId, availableSubmenus, selectedSubmenuId, setValue]);

    const onSubmit = async (data: PantallaFormData) => {
        setIsLoading(true);

        try {
            // Simular guardado
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Obtener nombres para logging
            const selectedMenu = activeMenus.find(menu => menu.id === data.menuId);
            const selectedSubmenu = availableSubmenus.find(submenu => submenu.id === data.submenuId);

            console.log('Datos de la pantalla:', {
                ...data,
                menuNombre: selectedMenu?.nombre,
                submenuNombre: selectedSubmenu?.nombre
            });

            // Mostrar toast de éxito
            setShowToast(true);

            // Ocultar toast después de 3 segundos
            setTimeout(() => {
                setShowToast(false);
                // Redirigir al listado después del toast
                router.push(`/${lng}/${tenant}/livestock/${species}/pantallas`);
            }, 3000);

        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
    };

    const handleBack = () => {
        router.back();
    };

    const toggleActivo = () => {
        setValue('activo', !activoValue);
    };

    const breadcrumbItems = [
        { title: 'Dashboard', href: `/${lng}/${tenant}/dashboard` },
        { title: 'Livestock', href: `/${lng}/${tenant}/livestock` },
        { title: species.charAt(0).toUpperCase() + species.slice(1), href: `/${lng}/${tenant}/livestock/${species}` },
        { title: 'Pantallas', href: `/${lng}/${tenant}/livestock/${species}/pantallas` },
        { title: 'Nueva Pantalla', href: '#' }
    ].map((item, index) => (
        <Anchor key={index} href={item.href} size="sm">
            {item.title}
        </Anchor>
    ));

    // Obtener información de selecciones para mostrar
    const selectedMenu = activeMenus.find(menu => menu.id === selectedMenuId);
    const selectedSubmenu = filteredSubmenus.find(submenu => submenu.id === selectedSubmenuId);

    return (
        <Container fluid p="md">
            {/* Toast de éxito */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="font-medium">Pantalla guardada exitosamente</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <Group justify="space-between" mb="lg">
                <div>
                    <Breadcrumbs
                        separator={<IconChevronRight size={12} />}
                        mb="xs"
                    >
                        {breadcrumbItems}
                    </Breadcrumbs>

                    <Title order={1} size="h2" mb="xs">
                        Nueva Pantalla
                    </Title>

                    <Text c="dimmed" size="sm">
                        Crear una nueva pantalla en el sistema
                    </Text>
                </div>

                <Group>
                    <Button
                        variant="outline"
                        leftSection={<ArrowLeft size={16} />}
                        onClick={handleBack}
                    >
                        Volver
                    </Button>
                </Group>
            </Group>

            {/* Contenido principal */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Seleccionar Menú */}
                    <div>
                        <label htmlFor="menuId" className="block text-sm font-medium text-gray-700 mb-2">
                            Seleccione el Menú *
                        </label>
                        <select
                            {...register('menuId', {
                                required: 'Debe seleccionar un menú'
                            })}
                            id="menuId"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${errors.menuId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">-- Seleccione un menú --</option>
                            {activeMenus.map((menu) => (
                                <option key={menu.id} value={menu.id}>
                                    {menu.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.menuId && (
                            <p className="mt-1 text-sm text-red-600">{errors.menuId.message}</p>
                        )}
                        {activeMenus.length === 0 && (
                            <p className="mt-1 text-sm text-amber-600">
                                ⚠️ No hay menús activos disponibles.
                                <a
                                    href={`/${lng}/${tenant}/livestock/${species}/menus/new`}
                                    className="underline hover:text-amber-800 ml-1"
                                >
                                    Crear un menú primero
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Seleccionar Submenú */}
                    <div>
                        <label htmlFor="submenuId" className="block text-sm font-medium text-gray-700 mb-2">
                            Seleccione el Submenú *
                        </label>
                        <select
                            {...register('submenuId', {
                                required: 'Debe seleccionar un submenú'
                            })}
                            id="submenuId"
                            disabled={!selectedMenuId || filteredSubmenus.length === 0}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.submenuId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">
                                {!selectedMenuId
                                    ? "-- Primero seleccione un menú --"
                                    : filteredSubmenus.length === 0
                                        ? "-- No hay submenús disponibles --"
                                        : "-- Seleccione un submenú --"
                                }
                            </option>
                            {filteredSubmenus.map((submenu) => (
                                <option key={submenu.id} value={submenu.id}>
                                    {submenu.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.submenuId && (
                            <p className="mt-1 text-sm text-red-600">{errors.submenuId.message}</p>
                        )}
                        {selectedMenuId && filteredSubmenus.length === 0 && (
                            <p className="mt-1 text-sm text-amber-600">
                                ⚠️ El menú seleccionado no tiene submenús activos.
                                <a
                                    href={`/${lng}/${tenant}/livestock/${species}/submenus/new`}
                                    className="underline hover:text-amber-800 ml-1"
                                >
                                    Crear un submenú primero
                                </a>
                            </p>
                        )}
                        {selectedMenuId && filteredSubmenus.length > 0 && (
                            <p className="mt-1 text-sm text-green-600">
                                ✅ {filteredSubmenus.length} submenú(s) disponible(s) para "{selectedMenu?.nombre}"
                            </p>
                        )}
                    </div>

                    {/* Nombre de la pantalla */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la Pantalla *
                        </label>
                        <input
                            {...register('nombre', {
                                required: 'El nombre de la pantalla es obligatorio',
                                minLength: {
                                    value: 3,
                                    message: 'El nombre debe tener al menos 3 caracteres'
                                }
                            })}
                            type="text"
                            id="nombre"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ingrese el nombre de la pantalla"
                        />
                        {errors.nombre && (
                            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                        )}
                    </div>

                    {/* URL de la pantalla */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                            URL de la Pantalla *
                        </label>
                        <input
                            {...register('url', {
                                required: 'La URL de la pantalla es obligatoria',
                                pattern: {
                                    value: /^[a-zA-Z0-9-_/]+$/,
                                    message: 'La URL solo puede contener letras, números, guiones y barras'
                                }
                            })}
                            type="text"
                            id="url"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.url ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="/ruta/de/la/pantalla"
                        />
                        {errors.url && (
                            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción de la Pantalla *
                        </label>
                        <textarea
                            {...register('descripcion', {
                                required: 'La descripción es obligatoria',
                                minLength: {
                                    value: 10,
                                    message: 'La descripción debe tener al menos 10 caracteres'
                                }
                            })}
                            id="descripcion"
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.descripcion ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ingrese una descripción detallada de la pantalla"
                        />
                        {errors.descripcion && (
                            <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
                        )}
                    </div>

                    {/* Switch Activar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Activar
                        </label>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Activar el uso de esta pantalla</span>
                            <button
                                type="button"
                                onClick={toggleActivo}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${activoValue ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activoValue ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className={`text-sm font-medium ${activoValue ? 'text-blue-600' : 'text-gray-400'}`}>
                                {activoValue ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>
                    </div>

                    {/* Información de la jerarquía seleccionada */}
                    {selectedMenu && selectedSubmenu && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Jerarquía seleccionada</h4>
                            <div className="text-sm text-blue-800 space-y-1">
                                <div className="flex items-center">
                                    <span className="font-medium w-20">Menú:</span>
                                    <span>{selectedMenu.nombre}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-20">Submenú:</span>
                                    <span>{selectedSubmenu.nombre}</span>
                                </div>
                                <div className="text-blue-700 mt-2 text-xs">
                                    📱 Esta pantalla será asociada a: {selectedMenu.nombre} → {selectedSubmenu.nombre}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading || activeMenus.length === 0 || !selectedSubmenuId}
                            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
}
