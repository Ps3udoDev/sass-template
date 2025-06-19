'use client';

import { useState, useMemo } from 'react';
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
import {
    Table,
    Button,
    TextInput,
    Select,
    Badge,
    Group,
    Stack,
    Paper,
    ActionIcon,
    Tooltip
} from '@mantine/core';
import {
    IconPlus,
    IconEdit,
    IconTrash,
    IconSearch,
    IconFilter,
    IconPdf,
    IconFileSpreadsheet
} from '@tabler/icons-react';
import { SpeciesConfig } from '@/config/species';
import { createExcelExporter, createPDFExporter } from '@/utils/exports/exportUtils';
import { PoolFormData } from '@/schemas/poolSchema';
import PoolFormModal from './PoolFormModal';

interface Pool {
    id: string;
    code: string;
    area: number;
    depth: number;
    status: string;
    currentCycle?: string;
    temperature?: number;
    oxygen?: number;
    ph?: number;
    salinity?: number;
    density?: number;
    biomass?: number;
    lastFeeding?: Date;
    notes?: string;
    [key: string]: any;
}

interface PoolsTableProps {
    species: string;
    config: SpeciesConfig;
    lng: string;
    tenant: string;
}

const columnHelper = createColumnHelper<Pool>();

export default function PoolsTable({ species, config, lng, tenant }: PoolsTableProps) {
    const [modalOpened, setModalOpened] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [data, setData] = useState<Pool[]>([
        {
            id: '1',
            code: 'P-001',
            area: 2.5,
            depth: 1.8,
            status: 'Producción',
            currentCycle: 'C-2024-01',
            temperature: 28.5,
            oxygen: 6.2,
            ph: 8.1,
            salinity: 32,
            density: 45,
            biomass: 850,
            lastFeeding: new Date('2024-06-19'),
            notes: 'Excelente crecimiento'
        },
        {
            id: '2',
            code: 'P-002',
            area: 3.0,
            depth: 2.0,
            status: 'Preparación',
            temperature: 27.8,
            oxygen: 7.1,
            ph: 7.9,
            notes: 'Preparando para próxima siembra'
        }
    ]);

    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    const columns = useMemo<ColumnDef<Pool, any>[]>(() => {
        const baseColumns = config.pools.columns.map(col => {
            return columnHelper.accessor(col.id, {
                header: col.header,
                cell: (info) => {
                    const value = info.getValue();

                    switch (col.type) {
                        case 'number':
                            return value ? `${value}${col.unit ? ` ${col.unit}` : ''}` : '-';
                        case 'date':
                            return value ? new Date(value).toLocaleDateString() : '-';
                        case 'select':
                            return value ? (
                                <Badge
                                    color={getStatusColor(value)}
                                    variant="light"
                                >
                                    {value}
                                </Badge>
                            ) : '-';
                        default:
                            return value || '-';
                    }
                }
            });
        });

        const actionsColumn = columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: (info) => (
                <Group gap="xs">
                    <Tooltip label="Editar">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => handleEdit(info.row.original.id)}
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

        return [...baseColumns, actionsColumn];
    }, [config.pools.columns]);

    const filteredData = useMemo(() => {
        return data.filter(pool => {
            const matchesGlobal = !globalFilter ||
                Object.values(pool).some(value =>
                    String(value).toLowerCase().includes(globalFilter.toLowerCase())
                );

            const matchesStatus = !statusFilter || pool.status === statusFilter;

            return matchesGlobal && matchesStatus;
        });
    }, [data, globalFilter, statusFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
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

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            'Vacía': 'gray',
            'Preparación': 'yellow',
            'Siembra': 'blue',
            'Producción': 'green',
            'Cosecha': 'orange'
        };
        return statusColors[status] || 'gray';
    };

    const handleEdit = (id: string) => {
        console.log('Editar piscina:', id);
    };

    const handleDelete = (id: string) => {
        console.log('Eliminar piscina:', id);
    };

    const handleAddNew = () => {
        setModalOpened(true);
    };

    const handleCreatePool = async (formData: PoolFormData) => {
        setIsCreating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newPool: Pool = {
                id: (data.length + 1).toString(),
                code: formData.nombre,
                area: formData.area,
                depth: formData.volumen && formData.area
                    ? formData.volumen / (formData.area * 10000)
                    : 1.5,
                status: 'Vacía',
                notes: formData.descripcion || undefined,
                temperature: undefined,
                oxygen: undefined,
                ph: undefined,
                salinity: undefined,
                density: undefined,
                biomass: undefined,
                lastFeeding: undefined
            };

            setData(prevData => [...prevData, newPool]);

            console.log('Piscina creada exitosamente:', newPool);

        } catch (error) {
            console.error('Error al crear piscina:', error);
            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    const handleExportPDF = () => {
        console.log('Exportando a PDF...');

        const pdfExporter = createPDFExporter(config, {
            title: `Reporte de Piscinas - ${config.displayName}`,
            subtitle: `Total de registros: ${filteredData.length}`,
            company: 'Mi Empresa Acuícola',
            filename: `piscinas_${species}_${new Date().toISOString().split('T')[0]}.pdf`,
            orientation: 'landscape'
        });

        pdfExporter.exportTable(filteredData);
    };

    const handleExportExcel = () => {
        console.log('Exportando a Excel...');

        const excelExporter = createExcelExporter(config, {
            title: `Reporte de Piscinas - ${config.displayName}`,
            filename: `piscinas_${species}_${new Date().toISOString().split('T')[0]}.xlsx`,
            sheetName: `Piscinas ${config.displayName}`,
            autoFitColumns: true,
            includeFilters: true,
            freezeHeader: true
        });

        excelExporter.exportTable(filteredData);
    };

    const statusOptions = useMemo(() => {
        const statuses = [...new Set(data.map(pool => pool.status))];
        return statuses.map(status => ({ value: status, label: status }));
    }, [data]);

    return (
        <Stack gap="md">
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Group>
                        <TextInput
                            placeholder="Buscar piscinas..."
                            leftSection={<IconSearch size={16} />}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            style={{ minWidth: 250 }}
                        />
                        <Select
                            placeholder="Filtrar por estado"
                            leftSection={<IconFilter size={16} />}
                            data={statusOptions}
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value || '')}
                            clearable
                        />
                    </Group>

                    <Group gap="sm">
                        <Tooltip label="Exportar a PDF">
                            <ActionIcon
                                variant="outline"
                                size="lg"
                                onClick={handleExportPDF}
                                color="red"
                            >
                                <IconPdf size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Exportar a Excel">
                            <ActionIcon
                                variant="outline"
                                size="lg"
                                onClick={handleExportExcel}
                                color="green"
                            >
                                <IconFileSpreadsheet size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Button
                            leftSection={<IconPlus size={16} />}
                            onClick={handleAddNew}
                        >
                            Nueva Piscina
                        </Button>
                    </Group>
                </Group>

                <Group>
                    <Badge variant="light" size="lg">
                        Total: {data.length} piscinas
                    </Badge>
                    <Badge variant="light" size="lg" color="green">
                        Activas: {data.filter(p => p.status === 'Producción').length}
                    </Badge>
                    <Badge variant="light" size="lg" color="yellow">
                        En preparación: {data.filter(p => p.status === 'Preparación').length}
                    </Badge>
                </Group>
            </Paper>

            <Paper withBorder>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Table.Th
                                        key={header.id}
                                        style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
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

                <Group justify="space-between" p="md">
                    <Group>
                        <Button
                            variant="outline"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Siguiente
                        </Button>
                    </Group>

                    <span>
                        Página {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </span>
                </Group>
            </Paper>
            <PoolFormModal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleCreatePool}
                loading={isCreating}
            />
        </Stack>
    );
}
