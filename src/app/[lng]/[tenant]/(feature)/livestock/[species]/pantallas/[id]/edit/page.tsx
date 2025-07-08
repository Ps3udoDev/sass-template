'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Anchor, Breadcrumbs, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import pantallaMockData from '../../data/mockdata.json';
import submenuMockData from '../../../submenus/data/mockdata.json';
import menuMockData from '../../../menus/data/mockdata.json';

interface EditPantallaProps {
    params: Promise<{ lng: string; tenant: string; species: string; id: string }>;
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

export default function EditPantallaPage({ params }: EditPantallaProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, species, id } = resolvedParams;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [pantallaNotFound, setPantallaNotFound] = useState(false);
    const [activeMenus, setActiveMenus] = useState<MenuOption[]>([]);
    const [availableSubmenus, setAvailableSubmenus] = useState<SubmenuOption[]>([]);
    const [filteredSubmenus, setFilteredSubmenus] = useState<SubmenuOption[]>([]);
    const [originalPantalla, setOriginalPantalla] = useState<any>(null);

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

    // Cargar datos de la pantalla por ID
    useEffect(() => {
        const loadPantallaData = async () => {
            setIsLoadingData(true);

            try {
                // Simular carga de datos
                await new Promise(resolve => setTimeout(resolve, 800));

                // Buscar pantalla por ID
                const pantalla = pantallaMockData.find(p => p.id === parseInt(id));

                if (pantalla) {
                    setOriginalPantalla(pantalla);
                    setValue('menuId', pantalla.menuId.toString());
                    setValue('submenuId', pantalla.submenuId.toString());
                    setValue('nombre', pantalla.nombre);
                    setValue('url', pantalla.url);
                    setValue('descripcion', pantalla.descripcion);
                    setValue('activo', pantalla.activo);
                    setPantallaNotFound(false);
                } else {
                    setPantallaNotFound(true);
                }
            } catch (error) {
                console.error('Error al cargar pantalla:', error);
                setPantallaNotFound(true);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (id) {
            loadPantallaData();
        }
    }, [id, setValue]);

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
            // Simular actualización
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Obtener nombres para logging
            const selectedMenu = activeMenus.find(menu => menu.id === data.menuId);
            const selectedSubmenu = availableSubmenus.find(submenu => submenu.id === data.submenuId);
            const originalMenu = menuMockData.find(menu => menu.id === originalPantalla?.menuId);
            const originalSubmenu = submenuMockData.find(submenu => submenu.id === originalPantalla?.submenuId);

            console.log('Datos actualizados de la pantalla:', {
                id,
                ...data,
                menuNombre: selectedMenu?.nombre,
                submenuNombre: selectedSubmenu?.nombre,
                cambioDeJerarquia: originalPantalla?.menuId.toString() !== data.menuId || originalPantalla?.submenuId.toString() !== data.submenuId,
                jerarquiaOriginal: `${originalMenu?.nombre} → ${originalSubmenu?.nombre}`,
                nuevaJerarquia: `${selectedMenu?.nombre} → ${selectedSubmenu?.nombre}`
            });

            // Mostrar toast de éxito
            setShowToast(true);

            // Ocultar toast después de 3 segundos y redirigir
            setTimeout(() => {
                setShowToast(false);
                router.push(`/${lng}/${tenant}/livestock/${species}/pantallas`);
            }, 3000);

        } catch (error) {
            console.error('Error al actualizar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        router.push(`/${lng}/${tenant}/livestock/${species}/pantallas`);
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
        { title: 'Editar Pantalla', href: '#' }
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
                            Editar Pantalla
                        </Title>

                        <Text c="dimmed" size="sm">
                            Cargando datos de la pantalla...
                        </Text>
                    </div>
                </Group>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <Text c="dimmed">Cargando datos de la pantalla...</Text>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    // Pantalla no encontrada
    if (pantallaNotFound) {
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
                            Pantalla no encontrada
                        </Title>

                        <Text c="dimmed" size="sm">
                            La pantalla que buscas no existe o ha sido eliminada
                        </Text>
                    </div>

                    <Group>
                        <Button
                            variant="outline"
                            leftSection={<ArrowLeft size={16} />}
                            onClick={() => router.push(`/${lng}/${tenant}/livestock/${species}/pantallas`)}
                        >
                            Volver al listado
                        </Button>
                    </Group>
                </Group>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">❌</div>
                        <Title order={3} mb="md">Pantalla no encontrada</Title>
                        <Text c="dimmed" mb="md">
                            La pantalla con ID "{id}" no existe en el sistema.
                        </Text>
                        <Button
                            onClick={() => router.push(`/${lng}/${tenant}/livestock/${species}/pantallas`)}
                        >
                            Volver al listado de pantallas
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    // Obtener información para comparaciones
    const originalMenu = menuMockData.find(menu => menu.id === originalPantalla?.menuId);
    const originalSubmenu = submenuMockData.find(submenu => submenu.id === originalPantalla?.submenuId);
    const selectedMenu = activeMenus.find(menu => menu.id === selectedMenuId);
    const selectedSubmenu = filteredSubmenus.find(submenu => submenu.id === selectedSubmenuId);

    const hasHierarchyChanged = originalPantalla?.menuId.toString() !== selectedMenuId ||
        originalPantalla?.submenuId.toString() !== selectedSubmenuId;

    return (
        <Container fluid p="md">
            {/* Toast de éxito */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="font-medium">Pantalla actualizada exitosamente</span>
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
                        Editar Pantalla
                    </Title>

                    <Text c="dimmed" size="sm">
                        Modificar los datos de la pantalla en el sistema
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
                    {/* ID de la pantalla (solo lectura) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ID de la Pantalla
                        </label>
                        <input
                            type="text"
                            value={id}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-sm text-gray-500">Este campo no se puede modificar</p>
                    </div>

                    {/* Seleccionar Menú */}
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
                    </div>

                    {/* Seleccionar Submenú */}
                    <div>
                        <label htmlFor="submenuId" className="block text-sm font-medium text-gray-700 mb-2">
                            Submenú Padre *
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
                            Estado
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

                    {/* Información de cambio de jerarquía */}
                    {hasHierarchyChanged && selectedMenu && selectedSubmenu && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-amber-900 mb-2">⚠️ Cambio de jerarquía detectado</h4>
                            <div className="text-sm text-amber-800 space-y-1">
                                <div><span className="font-medium">Jerarquía original:</span> {originalMenu?.nombre} → {originalSubmenu?.nombre}</div>
                                <div><span className="font-medium">Nueva jerarquía:</span> {selectedMenu.nombre} → {selectedSubmenu.nombre}</div>
                                <div className="mt-2 text-amber-700">
                                    Esta pantalla será movida a la nueva jerarquía seleccionada.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Información de la jerarquía actual */}
                    {selectedMenu && selectedSubmenu && !hasHierarchyChanged && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Jerarquía actual</h4>
                            <div className="text-sm text-blue-800 space-y-1">
                                <div className="flex items-center">
                                    <span className="font-medium w-20">Menú:</span>
                                    <span>{selectedMenu.nombre}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-20">Submenú:</span>
                                    <span>{selectedSubmenu.nombre}</span>
                                </div>
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
                                {originalPantalla?.fechaCreacion
                                    ? new Date(originalPantalla.fechaCreacion).toLocaleString('es-ES')
                                    : 'No disponible'
                                }
                            </div>
                            <div>
                                <span className="font-medium">Última actualización:</span>
                                <br />
                                {originalPantalla?.fechaActualizacion
                                    ? new Date(originalPantalla.fechaActualizacion).toLocaleString('es-ES')
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
                            disabled={isLoading || activeMenus.length === 0 || !selectedSubmenuId}
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
