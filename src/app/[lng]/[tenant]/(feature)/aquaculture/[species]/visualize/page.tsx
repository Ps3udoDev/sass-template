'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import {
    Container,
    Title,
    Text,
    Group,
    Button,
    ActionIcon,
    Tooltip,
    Breadcrumbs,
    Anchor
} from '@mantine/core';
import {
    IconCalendarEvent,
    IconDownload,
    IconSettings,
    IconRefresh,
    IconChevronRight
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import AquacultureGanttChart from '@/components/aquaculture/AquacultureGanttChart';
import { generateShrimpCycleMockData, generatePoultryMockData } from '@/data/aquaculture-gantt-mock';
import { AquacultureTask } from '@/types/aquaculture-gantt';

interface VisualizePageProps {
    params: Promise<{
        lng: string;
        tenant: string;
        species: string;
    }>;
}

export default function VisualizePage({ params }: VisualizePageProps) {
    const resolvedParams = use(params);
    const { lng, tenant, species } = resolvedParams;
    const [loading, setLoading] = useState(false);

    // Validar especie
    const validSpecies = ['shrimp', 'laying-hens', 'tilapia'];
    if (!validSpecies.includes(species)) {
        notFound();
    }

    // Obtener datos mock según la especie
    const getMockData = () => {
        switch (species) {
            case 'shrimp':
                return generateShrimpCycleMockData();
            case 'laying-hens':
                return generatePoultryMockData();
            case 'tilapia':
                return []; // Implementar en el futuro
            default:
                return [];
        }
    };

    const data = getMockData();

    const getSpeciesDisplayName = (species: string) => {
        const names = {
            shrimp: 'Camarones',
            'laying-hens': 'Gallinas Ponedoras',
            tilapia: 'Tilapias'
        };
        return names[species as keyof typeof names] || species;
    };

    const handleTaskClick = (task: AquacultureTask) => {
        console.log('Tarea seleccionada:', task);

        notifications.show({
            title: `${task.poolName} - ${task.phase}`,
            message: `Progreso: ${task.progress}% | ${task.notes || 'Sin observaciones'}`,
            color: 'blue'
        });
    };

    const handleTaskUpdate = (task: AquacultureTask) => {
        console.log('Tarea actualizada:', task);

        notifications.show({
            title: 'Tarea actualizada',
            message: `Se actualizó la tarea ${task.name}`,
            color: 'green'
        });
    };

    const handleExportPDF = async () => {
        setLoading(true);
        try {
            // Simular exportación
            await new Promise(resolve => setTimeout(resolve, 2000));

            notifications.show({
                title: 'Exportación exitosa',
                message: 'El cronograma se ha exportado a PDF',
                color: 'green'
            });
        } catch (error) {
            notifications.show({
                title: 'Error en la exportación',
                message: 'No se pudo exportar el cronograma',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshData = async () => {
        setLoading(true);
        try {
            // Simular actualización de datos
            await new Promise(resolve => setTimeout(resolve, 1500));

            notifications.show({
                title: 'Datos actualizados',
                message: 'Se han actualizado los datos del cronograma',
                color: 'blue'
            });
        } finally {
            setLoading(false);
        }
    };

    // Breadcrumbs
    const breadcrumbItems = [
        { title: 'Dashboard', href: `/${lng}/${tenant}/dashboard` },
        { title: 'Acuicultura', href: `/${lng}/${tenant}/aquaculture` },
        { title: getSpeciesDisplayName(species), href: `/${lng}/${tenant}/aquaculture/${species}` },
        { title: 'Ciclos', href: `/${lng}/${tenant}/aquaculture/${species}/cycles` },
        { title: 'Visualización', href: '#' }
    ].map((item, index) => (
        <Anchor key={index} href={item.href} size="sm">
            {item.title}
        </Anchor>
    ));

    return (
        <Container fluid p="md">
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
                        Cronograma de Producción
                    </Title>

                    <Text c="dimmed" size="sm">
                        Visualización temporal de ciclos de producción de {getSpeciesDisplayName(species).toLowerCase()}
                    </Text>
                </div>

                <Group>
                    <Tooltip label="Actualizar datos">
                        <ActionIcon
                            variant="outline"
                            size="lg"
                            loading={loading}
                            onClick={handleRefreshData}
                        >
                            <IconRefresh size={18} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Configuración">
                        <ActionIcon variant="outline" size="lg">
                            <IconSettings size={18} />
                        </ActionIcon>
                    </Tooltip>

                    <Button
                        leftSection={<IconDownload size={16} />}
                        variant="outline"
                        loading={loading}
                        onClick={handleExportPDF}
                    >
                        Exportar PDF
                    </Button>

                    <Button
                        leftSection={<IconCalendarEvent size={16} />}
                        onClick={() => {
                            notifications.show({
                                title: 'Función próximamente',
                                message: 'La planificación de nuevos ciclos estará disponible pronto',
                                color: 'blue'
                            });
                        }}
                    >
                        Nuevo Ciclo
                    </Button>
                </Group>
            </Group>

            {/* Contenido principal */}
            {data.length > 0 ? (
                <AquacultureGanttChart
                    data={data}
                    species={species}
                    onTaskClick={handleTaskClick}
                    onTaskUpdate={handleTaskUpdate}
                />
            ) : (
                <Group justify="center" py="xl">
                    <div style={{ textAlign: 'center' }}>
                        <IconCalendarEvent size={48} color="var(--mantine-color-gray-5)" />
                        <Title order={3} mt="md" c="dimmed">
                            No hay ciclos disponibles
                        </Title>
                        <Text c="dimmed" mt="xs">
                            Crea tu primer ciclo de producción para {getSpeciesDisplayName(species).toLowerCase()}
                        </Text>
                        <Button mt="md" leftSection={<IconCalendarEvent size={16} />}>
                            Crear Primer Ciclo
                        </Button>
                    </div>
                </Group>
            )}
        </Container>
    );
}
