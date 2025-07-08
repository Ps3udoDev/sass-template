'use client';

import React, { useState, useMemo } from 'react';
import { Container, Title, Text, Group, Button, Breadcrumbs, Anchor, Tabs, Table, Badge, ActionIcon, Tooltip, TextInput, Select, Paper } from '@mantine/core';
import { IconChevronRight, IconEdit, IconTrash, IconPlus, IconSearch, IconFilter } from '@tabler/icons-react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface ColumnDefCustom {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'badge' | 'custom';
    render?: (value: any, item: any) => React.ReactNode;
}

export interface ListTemplateProps {
    title: string;
    description: string;
    breadcrumbItems: BreadcrumbItem[];
    data: any[];
    columns: ColumnDefCustom[];
    entityName: string;
    basePath: string;
    searchPlaceholder?: string;
    onEdit?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
    onCreate?: () => void;
    activeKey?: string;
}

type SortOption = 'lastModified' | 'lastCreated' | 'nameAsc' | 'nameDesc';

const columnHelper = createColumnHelper<any>();

export default function ListTemplate({
    title,
    description,
    breadcrumbItems,
    data,
    columns,
    entityName,
    basePath,
    searchPlaceholder = "Buscar...",
    onEdit,
    onDelete,
    onCreate,
    activeKey = 'activo'
}: ListTemplateProps) {
    const [activeTab, setActiveTab] = useState<string>('todos');
    const [globalFilter, setGlobalFilter] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('lastModified');

    // Generar breadcrumbs
    const breadcrumbElements = breadcrumbItems.map((item, index) => (
        <Anchor key={index} href={item.href} size="sm">
            {item.title}
        </Anchor>
    ));

    // Filtrar datos según tab activo
    const filteredByTab = useMemo(() => {
        if (activeTab === 'activos') {
            return data.filter(item => item[activeKey] === true);
        }
        return data;
    }, [data, activeTab, activeKey]);

    // Crear columnas para TanStack Table
    const tableColumns = useMemo<ColumnDef<any, any>[]>(() => {
        const dataColumns = columns.map(col => {
            return columnHelper.accessor(col.key, {
                header: col.label,
                cell: (info) => {
                    const value = info.getValue();
                    const item = info.row.original;

                    if (col.render) {
                        return col.render(value, item);
                    }

                    switch (col.type) {
                        case 'date':
                            return value ? formatDate(value) : '-';
                        case 'badge':
                            return value ? (
                                <Badge
                                    color={value === true || value === 'Activo' ? 'green' : 'red'}
                                    variant="light"
                                >
                                    {typeof value === 'boolean' ? (value ? 'Activo' : 'Inactivo') : value}
                                </Badge>
                            ) : '-';
                        case 'number':
                            return value ? Number(value).toLocaleString() : '-';
                        default:
                            return value || '-';
                    }
                }
            });
        });

        // Agregar columna de acciones
        const actionsColumn = columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: (info) => (
                <Group gap="xs">
                    <Tooltip label="Editar">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => handleEdit(info.row.original.id)}
                            color="blue"
                        >
                            <IconEdit size={16} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar">
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(info.row.original.id)}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            )
        });

        return [...dataColumns, actionsColumn];
    }, [columns]);

    // Aplicar filtros y ordenamiento
    const processedData = useMemo(() => {
        let result = [...filteredByTab];

        // Aplicar búsqueda global
        if (globalFilter) {
            result = result.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(globalFilter.toLowerCase())
                )
            );
        }

        // Aplicar ordenamiento
        switch (sortBy) {
            case 'lastModified':
                result.sort((a, b) => new Date(b.fechaActualizacion || b.updatedAt || 0).getTime() - new Date(a.fechaActualizacion || a.updatedAt || 0).getTime());
                break;
            case 'lastCreated':
                result.sort((a, b) => new Date(b.fechaCreacion || b.createdAt || 0).getTime() - new Date(a.fechaCreacion || a.createdAt || 0).getTime());
                break;
            case 'nameAsc':
                result.sort((a, b) => (a.nombre || a.name || '').localeCompare(b.nombre || b.name || ''));
                break;
            case 'nameDesc':
                result.sort((a, b) => (b.nombre || b.name || '').localeCompare(a.nombre || a.name || ''));
                break;
        }

        return result;
    }, [filteredByTab, globalFilter, sortBy]);

    // Configurar TanStack Table
    const table = useReactTable({
        data: processedData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const handleEdit = (id: string | number) => {
        if (onEdit) {
            onEdit(id);
        } else {
            window.location.href = `${basePath}/${id}/edit`;
        }
    };

    const handleDelete = (id: string | number) => {
        if (onDelete) {
            onDelete(id);
        } else {
            if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
                console.log(`Eliminar ${entityName} con ID: ${id}`);
            }
        }
    };

    const handleCreate = () => {
        if (onCreate) {
            onCreate();
        } else {
            window.location.href = `${basePath}/new`;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Opciones de ordenamiento
    const sortOptions = [
        { value: 'lastModified', label: 'Última modificación' },
        { value: 'lastCreated', label: 'Último creado' },
        { value: 'nameAsc', label: 'Nombre ascendente' },
        { value: 'nameDesc', label: 'Nombre descendente' },
    ];

    return (
        <Container fluid p="md">
            {/* Header */}
            <Group justify="space-between" mb="lg">
                <div>
                    <Breadcrumbs
                        separator={<IconChevronRight size={12} />}
                        mb="xs"
                    >
                        {breadcrumbElements}
                    </Breadcrumbs>

                    <Title order={1} size="h2" mb="xs">
                        {title}
                    </Title>

                    <Text c="dimmed" size="sm">
                        {description}
                    </Text>
                </div>

                <Group>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={handleCreate}
                    >
                        Crear {entityName}
                    </Button>
                </Group>
            </Group>

            {/* Contenido principal */}
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'todos')}>
                <Tabs.List mb="md">
                    <Tabs.Tab value="todos">
                        Todos ({data.length})
                    </Tabs.Tab>
                    <Tabs.Tab value="activos">
                        Activos ({data.filter(item => item[activeKey] === true).length})
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="todos">
                    <Paper p="md" withBorder>
                        {/* Controles de búsqueda y filtro */}
                        <Group justify="space-between" mb="md">
                            <Group>
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    leftSection={<IconSearch size={16} />}
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    style={{ minWidth: 250 }}
                                />
                                <Select
                                    placeholder="Ordenar por"
                                    leftSection={<IconFilter size={16} />}
                                    data={sortOptions}
                                    value={sortBy}
                                    onChange={(value) => setSortBy(value as SortOption)}
                                    style={{ minWidth: 200 }}
                                />
                            </Group>

                            <Group gap="sm">
                                <Badge variant="light" size="lg">
                                    Total: {data.length}
                                </Badge>
                                <Badge variant="light" size="lg" color="green">
                                    Activos: {data.filter(item => item[activeKey] === true).length}
                                </Badge>
                            </Group>
                        </Group>

                        {/* Tabla */}
                        <Table striped highlightOnHover>
                            <Table.Thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <Table.Tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <Table.Th
                                                key={header.id}
                                                style={{
                                                    cursor: header.column.getCanSort() ? 'pointer' : 'default'
                                                }}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </Table.Th>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Thead>
                            <Table.Tbody>
                                {table.getRowModel().rows.map(row => (
                                    <Table.Tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <Table.Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>

                        {/* Paginación */}
                        <Group justify="space-between" mt="md">
                            <Group>
                                <Button
                                    variant="outline"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Anterior
                                </Button>
                            </Group>

                            <Text size="sm">
                                Página {table.getState().pagination.pageIndex + 1} de{' '}
                                {table.getPageCount()} | Total: {processedData.length} elementos
                            </Text>
                        </Group>

                        {processedData.length === 0 && (
                            <div className="text-center py-8">
                                <Text c="dimmed">No se encontraron resultados</Text>
                            </div>
                        )}
                    </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="activos">
                    <Paper p="md" withBorder>
                        {/* Mismos controles pero para items activos */}
                        <Group justify="space-between" mb="md">
                            <Group>
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    leftSection={<IconSearch size={16} />}
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    style={{ minWidth: 250 }}
                                />
                                <Select
                                    placeholder="Ordenar por"
                                    leftSection={<IconFilter size={16} />}
                                    data={sortOptions}
                                    value={sortBy}
                                    onChange={(value) => setSortBy(value as SortOption)}
                                    style={{ minWidth: 200 }}
                                />
                            </Group>

                            <Badge variant="light" size="lg" color="green">
                                Activos: {data.filter(item => item[activeKey] === true).length}
                            </Badge>
                        </Group>

                        {/* Misma tabla */}
                        <Table striped highlightOnHover>
                            <Table.Thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <Table.Tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <Table.Th
                                                key={header.id}
                                                style={{
                                                    cursor: header.column.getCanSort() ? 'pointer' : 'default'
                                                }}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </Table.Th>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Thead>
                            <Table.Tbody>
                                {table.getRowModel().rows.map(row => (
                                    <Table.Tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <Table.Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>

                        <Group justify="space-between" mt="md">
                            <Group>
                                <Button
                                    variant="outline"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Anterior
                                </Button>

                            </Group>

                            <Text size="sm">
                                Página {table.getState().pagination.pageIndex + 1} de{' '}
                                {table.getPageCount()} | Total: {processedData.length} elementos
                            </Text>
                        </Group>

                        {processedData.length === 0 && (
                            <div className="text-center py-8">
                                <Text c="dimmed">No se encontraron elementos activos</Text>
                            </div>
                        )}
                    </Paper>
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
}
