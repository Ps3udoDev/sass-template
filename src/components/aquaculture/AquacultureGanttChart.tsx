// src/components/aquaculture/AquacultureGanttChart.tsx

'use client';

import { useState, useMemo } from 'react';
import { Gantt, Task, ViewMode } from '@wamra/gantt-task-react';
import "@wamra/gantt-task-react/dist/style.css";
import {
    Box,
    Paper,
    Group,
    Select,
    Switch,
    Badge,
    Text,
    Stack,
    Divider,
    ActionIcon,
    Tooltip,
    Grid
} from '@mantine/core';
import {
    IconCalendar,
    IconRefresh,
    IconSettings,
    IconEye,
    IconEyeOff
} from '@tabler/icons-react';
import { CycleData, AquacultureTask, PHASE_COLORS, AquaculturePhase } from '@/types/aquaculture-gantt';

interface AquacultureGanttChartProps {
    data: CycleData[];
    species: string;
    onTaskClick?: (task: AquacultureTask) => void;
    onTaskUpdate?: (task: AquacultureTask) => void;
}

export default function AquacultureGanttChart({
    data,
    species,
    onTaskClick,
    onTaskUpdate
}: AquacultureGanttChartProps) {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);
    const [selectedCycle, setSelectedCycle] = useState<string>('all');
    const [showWeekends, setShowWeekends] = useState(false);
    const [hiddenPhases, setHiddenPhases] = useState<Set<AquaculturePhase>>(new Set());

    // Filtrar datos por ciclo seleccionado
    const filteredData = useMemo(() => {
        return selectedCycle === 'all'
            ? data
            : data.filter(cycle => cycle.id === selectedCycle);
    }, [data, selectedCycle]);

    // Convertir a formato de tareas para el Gantt
    const ganttTasks = useMemo(() => {
        const tasks: Task[] = [];

        filteredData.forEach(cycle => {
            // Agregar grupo del ciclo
            tasks.push({
                id: cycle.id,
                name: cycle.name,
                start: cycle.startDate,
                end: cycle.endDate,
                progress: 0,
                type: 'project',
                hideChildren: false,
                styles: {
                    barBackgroundColor: '#f8f9fa',
                    barProgressColor: '#495057',
                    barProgressSelectedColor: '#343a40'
                }
            });

            // Agregar tareas filtradas por fases visibles
            cycle.tasks
                .filter(task => !hiddenPhases.has(task.phase))
                .forEach(task => {
                    tasks.push({
                        id: task.id,
                        name: task.name,
                        start: task.start,
                        end: task.end,
                        progress: task.progress,
                        type: 'task',
                        dependencies: task.dependencies?.map(depId => ({
                            sourceId: depId,
                            sourceTarget: 'endOfTask',
                            ownTarget: 'startOfTask'
                        })) || [], // ✅ Convertir string[] a Dependency[]
                        styles: task.styles
                    });
                });
        });

        return tasks;
    }, [filteredData, hiddenPhases]);

    const handleTaskChange = (task: Task) => {
        if (onTaskUpdate && task.type === 'task') {
            const originalTask = data
                .flatMap(cycle => cycle.tasks)
                .find(t => t.id === task.id) as AquacultureTask;

            if (originalTask) {
                const updatedTask = {
                    ...originalTask,
                    start: task.start,
                    end: task.end,
                    progress: task.progress
                };
                onTaskUpdate(updatedTask);
            }
        }
    };

    const handleTaskClick = (task: Task) => {
        if (onTaskClick && task.type === 'task') {
            const originalTask = data
                .flatMap(cycle => cycle.tasks)
                .find(t => t.id === task.id) as AquacultureTask;

            if (originalTask) {
                onTaskClick(originalTask);
            }
        }
    };

    const togglePhaseVisibility = (phase: AquaculturePhase) => {
        const newHiddenPhases = new Set(hiddenPhases);
        if (newHiddenPhases.has(phase)) {
            newHiddenPhases.delete(phase);
        } else {
            newHiddenPhases.add(phase);
        }
        setHiddenPhases(newHiddenPhases);
    };

    const cycleOptions = [
        { value: 'all', label: 'Todos los ciclos' },
        ...data.map(cycle => ({
            value: cycle.id,
            label: cycle.name
        }))
    ];

    const getSpeciesDisplayName = (species: string) => {
        const names = {
            shrimp: 'Camarones',
            'laying-hens': 'Gallinas Ponedoras',
            tilapia: 'Tilapias'
        };
        return names[species as keyof typeof names] || species;
    };

    const getTotalActivePools = () => {
        return new Set(
            filteredData
                .flatMap(cycle => cycle.tasks)
                .filter(task => !hiddenPhases.has(task.phase))
                .map(task => task.poolId)
        ).size;
    };

    return (
        <Stack gap="md">
            {/* Controles superiores */}
            <Paper p="md" withBorder>
                <Grid>
                    <Grid.Col span={12}>
                        <Group justify="space-between" mb="md">
                            <Group>
                                <Text size="lg" fw={600}>
                                    Planificación de Ciclos - {getSpeciesDisplayName(species)}
                                </Text>
                                <Badge variant="light" color="blue">
                                    {getTotalActivePools()} piscinas activas
                                </Badge>
                            </Group>

                            <Group>
                                <Tooltip label="Actualizar vista">
                                    <ActionIcon variant="outline">
                                        <IconRefresh size={16} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Configuración">
                                    <ActionIcon variant="outline">
                                        <IconSettings size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Select
                            label="Ciclo"
                            value={selectedCycle}
                            onChange={(value) => setSelectedCycle(value || 'all')}
                            data={cycleOptions}
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Select
                            label="Vista temporal"
                            value={viewMode}
                            onChange={(value) => setViewMode(value as ViewMode)}
                            data={[
                                { value: ViewMode.Day, label: 'Día' },
                                { value: ViewMode.Week, label: 'Semana' },
                                { value: ViewMode.Month, label: 'Mes' }
                            ]}
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Box pt={24}>
                            <Switch
                                label="Mostrar fines de semana"
                                checked={showWeekends}
                                onChange={(event) => setShowWeekends(event.currentTarget.checked)}
                            />
                        </Box>
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Leyenda de fases */}
            <Paper p="md" withBorder>
                <Text size="sm" fw={600} mb="xs">Leyenda de Fases:</Text>
                <Group gap="xs">
                    {Object.entries(PHASE_COLORS).map(([phase, color]) => {
                        const isHidden = hiddenPhases.has(phase as AquaculturePhase);
                        const phaseLabels = {
                            vacia: 'Piscina vacía',
                            en_uso: 'Piscina en uso',
                            inicio: 'Inicio',
                            siembra: 'Días de siembra',
                            transferencia: 'Transferencia',
                            raleo: 'Raleo',
                            transf_ciclos: 'Transf. ciclos',
                            ing_transf_cic: 'Ing. Transf. cic',
                            pesca: 'Días de pesca'
                        };

                        return (
                            <Group
                                key={phase}
                                gap={4}
                                style={{
                                    cursor: 'pointer',
                                    opacity: isHidden ? 0.5 : 1,
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    border: isHidden ? '1px dashed #ccc' : '1px solid transparent'
                                }}
                                onClick={() => togglePhaseVisibility(phase as AquaculturePhase)}
                            >
                                <Box
                                    w={16}
                                    h={16}
                                    style={{
                                        backgroundColor: color,
                                        borderRadius: 4,
                                        border: '1px solid #ccc'
                                    }}
                                />
                                <Text size="xs" tt="capitalize">
                                    {phaseLabels[phase as keyof typeof phaseLabels]}
                                </Text>
                                {isHidden ? <IconEyeOff size={12} /> : <IconEye size={12} />}
                            </Group>
                        );
                    })}
                </Group>
            </Paper>

            {/* Gantt Chart */}
            <Paper p="md" withBorder style={{ overflow: 'auto' }}>
                <Box style={{ minHeight: '500px', width: '100%' }}>
                    {ganttTasks.length > 0 ? (
                        <Gantt
                            tasks={ganttTasks}
                            viewMode={viewMode}
                            onDateChange={(task, children) => {
                                // Solo manejar si la tarea no es EmptyTask
                                if ('start' in task && 'end' in task && 'progress' in task) {
                                    handleTaskChange(task);
                                }
                            }}
                            onDoubleClick={(task) => {
                                // Cambiar onSelect por onDoubleClick
                                if ('start' in task && 'end' in task && 'progress' in task) {
                                    handleTaskClick(task);
                                }
                            }}
                            rtl={false}
                            fontFamily="Inter, system-ui, sans-serif"
                            fontSize="14px"
                            TooltipContent={({ task, fontSize, fontFamily }) => {
                                const aquaTask = data
                                    .flatMap(cycle => cycle.tasks)
                                    .find(t => t.id === task.id) as AquacultureTask;

                                if (!aquaTask) return null;

                                return (
                                    <div style={{
                                        fontSize: fontSize,
                                        fontFamily: fontFamily,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        maxWidth: '300px'
                                    }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                            {aquaTask.name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                            <div><strong>Piscina:</strong> {aquaTask.poolName}</div>
                                            <div><strong>Fase:</strong> {aquaTask.phase}</div>
                                            <div><strong>Progreso:</strong> {aquaTask.progress}%</div>
                                            <div><strong>Duración:</strong> {Math.ceil((aquaTask.end.getTime() - aquaTask.start.getTime()) / (1000 * 60 * 60 * 24))} días</div>
                                            {aquaTask.biomass && (
                                                <div><strong>Biomasa:</strong> {aquaTask.biomass.toLocaleString()} kg</div>
                                            )}
                                            {aquaTask.density && (
                                                <div><strong>Densidad:</strong> {aquaTask.density} /m²</div>
                                            )}
                                            {aquaTask.waterConditions && (
                                                <div style={{ marginTop: '8px' }}>
                                                    <div style={{ fontWeight: 'bold' }}>Condiciones del agua:</div>
                                                    {aquaTask.waterConditions.temperature && (
                                                        <div>Temp: {aquaTask.waterConditions.temperature}°C</div>
                                                    )}
                                                    {aquaTask.waterConditions.oxygen && (
                                                        <div>O₂: {aquaTask.waterConditions.oxygen} mg/L</div>
                                                    )}
                                                    {aquaTask.waterConditions.ph && (
                                                        <div>pH: {aquaTask.waterConditions.ph}</div>
                                                    )}
                                                    {aquaTask.waterConditions.salinity && (
                                                        <div>Salinidad: {aquaTask.waterConditions.salinity} ppt</div>
                                                    )}
                                                </div>
                                            )}
                                            {aquaTask.notes && (
                                                <div style={{ marginTop: '8px', fontStyle: 'italic' }}>
                                                    {aquaTask.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    ) : (
                        <Box ta="center" py="xl">
                            <Text c="dimmed">No hay datos para mostrar</Text>
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Resumen de ciclos */}
            <Paper p="md" withBorder>
                <Text size="sm" fw={600} mb="xs">Resumen de Ciclos</Text>
                <Grid>
                    {filteredData.map(cycle => {
                        const activeTasks = cycle.tasks.filter(task =>
                            !hiddenPhases.has(task.phase) && task.progress < 100
                        ).length;
                        const completedTasks = cycle.tasks.filter(task =>
                            !hiddenPhases.has(task.phase) && task.progress === 100
                        ).length;
                        const totalBiomass = cycle.tasks
                            .filter(task => task.biomass)
                            .reduce((sum, task) => sum + (task.biomass || 0), 0);

                        return (
                            <Grid.Col key={cycle.id} span={6}>
                                <Paper p="sm" withBorder radius="md">
                                    <Group justify="space-between" mb="xs">
                                        <Text fw={600} size="sm">{cycle.name}</Text>
                                        <Badge
                                            variant="light"
                                            color={cycle.type === 'monofasico' ? 'blue' : 'green'}
                                        >
                                            {cycle.type}
                                        </Badge>
                                    </Group>
                                    <Stack gap={4}>
                                        <Group justify="space-between">
                                            <Text size="xs" c="dimmed">Duración total:</Text>
                                            <Text size="xs">{cycle.totalDays} días</Text>
                                        </Group>
                                        <Group justify="space-between">
                                            <Text size="xs" c="dimmed">Tareas activas:</Text>
                                            <Text size="xs">{activeTasks}</Text>
                                        </Group>
                                        <Group justify="space-between">
                                            <Text size="xs" c="dimmed">Tareas completadas:</Text>
                                            <Text size="xs">{completedTasks}</Text>
                                        </Group>
                                        {totalBiomass > 0 && (
                                            <Group justify="space-between">
                                                <Text size="xs" c="dimmed">Biomasa estimada:</Text>
                                                <Text size="xs">{totalBiomass.toLocaleString()} kg</Text>
                                            </Group>
                                        )}
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Paper>
        </Stack>
    );
}
