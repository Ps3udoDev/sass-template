'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Modal,
    TextInput,
    Textarea,
    NumberInput,
    Select,
    Button,
    Group,
    Stack,
    Text,
    Alert,
    Grid,
    Divider
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import {
    poolSchema,
    PoolFormData,
    defaultPoolValues,
    POOL_CATEGORIES,
    validatePoolData,
    calculateVolume
} from '@/schemas/poolSchema';

interface PoolFormModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (data: PoolFormData) => Promise<void>;
    loading?: boolean;
}

export default function PoolFormModal({ opened, onClose, onSubmit, loading = false }: PoolFormModalProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        clearErrors
    } = useForm<PoolFormData>({
        resolver: zodResolver(poolSchema),
        defaultValues: defaultPoolValues,
        mode: 'onChange'
    });

    const watchedArea = watch('area');
    const watchedVolumen = watch('volumen');

    const handleCalculateVolume = () => {
        if (watchedArea && watchedArea > 0) {
            const calculatedVolume = calculateVolume(watchedArea);
            setValue('volumen', calculatedVolume);
            clearErrors('volumen');

            notifications.show({
                title: 'Volumen calculado',
                message: `Volumen calculado automáticamente: ${calculatedVolume.toLocaleString()} m³`,
                color: 'blue',
                icon: <IconCheck size={16} />
            });
        }
    };

    const handleFormSubmit = async (data: PoolFormData) => {
        try {
            const validationErrors = validatePoolData(data);

            if (validationErrors.length > 0) {
                notifications.show({
                    title: 'Advertencias de validación',
                    message: validationErrors.join('. '),
                    color: 'orange',
                    icon: <IconAlertCircle size={16} />
                });
            }

            console.log('Datos del formulario:', data);

            await new Promise(resolve => setTimeout(resolve, 1500));

            await onSubmit(data);

            notifications.show({
                title: 'Piscina creada',
                message: `La piscina "${data.nombre}" ha sido creada exitosamente`,
                color: 'green',
                icon: <IconCheck size={16} />
            });

            reset();
            onClose();

        } catch (error) {
            console.error('Error al crear piscina:', error);

            notifications.show({
                title: 'Error',
                message: 'No se pudo crear la piscina. Intente nuevamente.',
                color: 'red',
                icon: <IconAlertCircle size={16} />
            });
        }
    };

    const handleModalClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleModalClose}
            title="Crear Nueva Piscina"
            size="xl"
            centered
            closeOnClickOutside={false}
            closeOnEscape={!isSubmitting}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <div>
                        <Text size="sm" fw={600} mb="xs" c="dimmed">
                            INFORMACIÓN BÁSICA
                        </Text>

                        <Grid>
                            <Grid.Col span={12}>
                                <Controller
                                    name="nombre"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput
                                            {...field}
                                            label="Nombre de la Piscina"
                                            placeholder="Ej: P-001, Piscina Norte, etc."
                                            required
                                            error={errors.nombre?.message}
                                            disabled={isSubmitting}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={12}>
                                <Controller
                                    name="descripcion"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Descripción"
                                            placeholder="Descripción opcional de la piscina..."
                                            rows={3}
                                            error={errors.descripcion?.message}
                                            disabled={isSubmitting}
                                        />
                                    )}
                                />
                            </Grid.Col>
                        </Grid>
                    </div>

                    <Divider />

                    <div>
                        <Text size="sm" fw={600} mb="xs" c="dimmed">
                            CARACTERÍSTICAS TÉCNICAS
                        </Text>

                        <Grid>
                            <Grid.Col span={6}>
                                <Controller
                                    name="area"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <NumberInput
                                            {...field}
                                            value={value}
                                            onChange={onChange}
                                            label="Área"
                                            placeholder="0.00"
                                            required
                                            suffix=" ha"
                                            min={0.01}
                                            max={100}
                                            step={0.01}
                                            decimalScale={2}
                                            error={errors.area?.message}
                                            disabled={isSubmitting}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Controller
                                    name="categoria"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Categoría"
                                            placeholder="Seleccione una categoría"
                                            required
                                            data={POOL_CATEGORIES}
                                            error={errors.categoria?.message}
                                            disabled={isSubmitting}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={8}>
                                <Controller
                                    name="volumen"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <NumberInput
                                            {...field}
                                            value={value}
                                            onChange={onChange}
                                            label="Volumen"
                                            placeholder="0.0"
                                            suffix=" m³"
                                            min={0}
                                            max={1000000}
                                            step={0.1}
                                            decimalScale={1}
                                            error={errors.volumen?.message}
                                            disabled={isSubmitting}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={4}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCalculateVolume}
                                    disabled={!watchedArea || watchedArea <= 0 || isSubmitting}
                                    mt={24}
                                    fullWidth
                                >
                                    Calcular
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </div>

                    {watchedArea && watchedArea > 0 && (
                        <Alert color="blue" variant="light">
                            <Text size="sm">
                                <strong>Referencia:</strong> Para {watchedArea} ha, el volumen típico está entre{' '}
                                {(watchedArea * 10000 * 0.8).toLocaleString()} m³ y{' '}
                                {(watchedArea * 10000 * 3.0).toLocaleString()} m³
                                {watchedVolumen && (
                                    <span> (profundidad: {(watchedVolumen / (watchedArea * 10000)).toFixed(2)} m)</span>
                                )}
                            </Text>
                        </Alert>
                    )}

                    <Group justify="flex-end" mt="xl">
                        <Button
                            variant="outline"
                            onClick={handleModalClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={isSubmitting || loading}
                            disabled={isSubmitting}
                        >
                            Crear Piscina
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
