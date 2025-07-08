'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Anchor, Breadcrumbs, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import submenuMockData from '../../data/mockdata.json';
import menuMockData from '../../../menus/data/mockdata.json';

interface EditSubmenuProps {
    params: Promise<{ lng: string; tenant: string; species: string; id: string }>;
}

interface SubmenuFormData {
    menuId: string;
    nombre: string;
    url: string;
    descripcion: string;
    activo: boolean;
}

interface MenuOption {
    id: string;
    nombre: string;
}

export default function EditSubmenuPage({ params }: EditSubmenuProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species, id } = resolvedParams;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [submenuNotFound, setSubmenuNotFound] = useState(false);
    const [activeMenus, setActiveMenus] = useState<MenuOption[]>([]);
    const [originalSubmenu, setOriginalSubmenu] = useState<any>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<SubmenuFormData>({
        defaultValues: {
            menuId: '',
            nombre: '',
            url: '',
            descripcion: '',
            activo: true
        }
    });

    const activoValue = watch('activo');
    const selectedMenuId = watch('menuId');

    // Cargar menús activos al montar el componente
    useEffect(() => {
        const loadActiveMenus = () => {
            // Filtrar solo menús activos
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

    // Cargar datos del submenú por ID
    useEffect(() => {
        const loadSubmenuData = async () => {
            setIsLoadingData(true);

            try {
                // Simular carga de datos
                await new Promise(resolve => setTimeout(resolve, 800));

                // Buscar submenú por ID
                const submenu = submenuMockData.find(s => s.id === parseInt(id));

                if (submenu) {
                    setOriginalSubmenu(submenu);
                    setValue('menuId', submenu.menuId.toString());
                    setValue('nombre', submenu.nombre);
                    setValue('url', submenu.url);
                    setValue('descripcion', submenu.descripcion);
                    setValue('activo', submenu.activo);
                    setSubmenuNotFound(false);
                } else {
                    setSubmenuNotFound(true);
                }
            } catch (error) {
                console.error('Error al cargar submenú:', error);
                setSubmenuNotFound(true);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (id) {
            loadSubmenuData();
        }
    }, [id, setValue]);

    const onSubmit = async (data: SubmenuFormData) => {
        setIsLoading(true);

        try {
            // Simular actualización
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Obtener nombres para logging
            const selectedMenu = activeMenus.find(menu => menu.id === data.menuId);
            const originalMenu = menuMockData.find(menu => menu.id === originalSubmenu?.menuId);

            console.log('Datos actualizados del submenú:', {
                id,
                ...data,
                menuNombre: selectedMenu?.nombre,
                cambioDeMenu: originalSubmenu?.menuId.toString() !== data.menuId,
                menuOriginal: originalMenu?.nombre
            });

            // Mostrar toast de éxito
            setShowToast(true);

            // Ocultar toast después de 3 segundos y redirigir
            setTimeout(() => {
                setShowToast(false);
                router.push(`/${lng}/${tenant}/livestock/${species}/submenus`);
            }, 3000);

        } catch (error) {
            console.error('Error al actualizar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        router.push(`/${lng}/${tenant}/livestock/${species}/submenus`);
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
        { title: 'Submenús', href: `/${lng}/${tenant}/livestock/${species}/submenus` },
        { title: 'Editar Submenú', href: '#' }
    ].map((item, index) => (
        <Anchor key={index} href={item.href} size="sm">
            {item.title}
        </Anchor>
    ));

    // Estado de carga inicial
    if (isLoadingData) {
        return (
            <Container fluid p="md">
                <Group justify="space-between" mb="lg">
                    <div>
                        <Breadcrumbs
                            separator={<IconChevronRight size={12} />}
                            mb="xs"
                        >
                            {breadcrumbItems}
                        </Breadcrumbs>

                        <Title order={1} size="h2" mb="xs">
                            Editar Submenú
                        </Title>

                        <Text c="dimmed" size="sm">
                            Cargando datos del submenú...
                        </Text>
                    </div>
                </Group>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <Text c="dimmed">Cargando datos del submenú...</Text>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    // Submenú no encontrado
    if (submenuNotFound) {
        return (
            <Container fluid p="md">
                <Group justify="space-between" mb="lg">
                    <div>
                        <Breadcrumbs
                            separator={<IconChevronRight size={12} />}
                            mb="xs"
                        >
                            {breadcrumbItems}
                        </Breadcrumbs>

                        <Title order={1} size="h2" mb="xs">
                            Submenú no encontrado
                        </Title>

                        <Text c="dimmed" size="sm">
                            El submenú que buscas no existe o ha sido eliminado
                        </Text>
                    </div>

                    <Group>
                        <Button
                            variant="outline"
                            leftSection={<ArrowLeft size={16} />}
                            onClick={() => router.push(`/${lng}/${tenant}/livestock/${species}/submenus`)}
                        >
                            Volver al listado
                        </Button>
                    </Group>
                </Group>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">❌</div>
                        <Title order={3} mb="md">Submenú no encontrado</Title>
                        <Text c="dimmed" mb="md">
                            El submenú con ID "{id}" no existe en el sistema.
                        </Text>
                        <Button
                            onClick={() => router.push(`/${lng}/${tenant}/livestock/${species}/submenus`)}
                        >
                            Volver al listado de submenús
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    // Obtener información del menú original y actual
    const originalMenu = menuMockData.find(menu => menu.id === originalSubmenu?.menuId);
    const selectedMenu = activeMenus.find(menu => menu.id === selectedMenuId);
    const hasMenuChanged = originalSubmenu?.menuId.toString() !== selectedMenuId;

    return (
        <Container fluid p="md">
            {/* Toast de éxito */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="font-medium">Submenú actualizado exitosamente</span>
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
                        Editar Submenú
                    </Title>

                    <Text c="dimmed" size="sm">
                        Modificar los datos del submenú en el sistema
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
                    {/* ID del submenú (solo lectura) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ID del Submenú
                        </label>
                        <input
                            type="text"
                            value={id}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-sm text-gray-500">Este campo no se puede modificar</p>
                    </div>

                    {/* Seleccionar Menú Padre */}
                    <div>
                        <label htmlFor="menuId" className="block text-sm font-medium text-gray-700 mb-2">
                            Menú Padre *
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
                                ⚠️ No hay menús activos disponibles
                            </p>
                        )}
                    </div>

                    {/* Nombre del submenú */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre del Submenú *
                        </label>
                        <input
                            {...register('nombre', {
                                required: 'El nombre del submenú es obligatorio',
                                minLength: {
                                    value: 3,
                                    message: 'El nombre debe tener al menos 3 caracteres'
                                }
                            })}
                            type="text"
                            id="nombre"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ingrese el nombre del submenú"
                        />
                        {errors.nombre && (
                            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                        )}
                    </div>

                    {/* URL del submenú */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                            URL del Submenú *
                        </label>
                        <input
                            {...register('url', {
                                required: 'La URL del submenú es obligatoria',
                                pattern: {
                                    value: /^[a-zA-Z0-9-_/]+$/,
                                    message: 'La URL solo puede contener letras, números, guiones y barras'
                                }
                            })}
                            type="text"
                            id="url"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.url ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="/ruta/del/submenu"
                        />
                        {errors.url && (
                            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción del Submenú *
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
                            placeholder="Ingrese una descripción detallada del submenú"
                        />
                        {errors.descripcion && (
                            <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
                        )}
                    </div>

                    {/* Switch Activar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Estado
                        </label>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Activar el uso de este submenú</span>
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

                    {/* Información de cambio de menú */}
                    {hasMenuChanged && selectedMenu && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-amber-900 mb-2">⚠️ Cambio de menú padre detectado</h4>
                            <div className="text-sm text-amber-800">
                                <div><span className="font-medium">Menú original:</span> {originalMenu?.nombre}</div>
                                <div><span className="font-medium">Nuevo menú:</span> {selectedMenu.nombre}</div>
                                <div className="mt-2 text-amber-700">
                                    Este submenú será movido al nuevo menú seleccionado.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Información del menú seleccionado */}
                    {selectedMenuId && !hasMenuChanged && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Menú padre actual</h4>
                            <div className="text-sm text-blue-800">
                                <span className="font-medium">Nombre:</span> {selectedMenu?.nombre}
                            </div>
                        </div>
                    )}

                    {/* Información de fechas */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Información del registro</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Fecha de creación:</span>
                                <br />
                                {originalSubmenu?.fechaCreacion
                                    ? new Date(originalSubmenu.fechaCreacion).toLocaleString('es-ES')
                                    : 'No disponible'
                                }
                            </div>
                            <div>
                                <span className="font-medium">Última actualización:</span>
                                <br />
                                {originalSubmenu?.fechaActualizacion
                                    ? new Date(originalSubmenu.fechaActualizacion).toLocaleString('es-ES')
                                    : 'No disponible'
                                }
                            </div>
                        </div>
                    </div>

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
                            disabled={isLoading || activeMenus.length === 0}
                            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Actualizar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
}
