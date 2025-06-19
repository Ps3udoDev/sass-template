import { z } from 'zod';

export const POOL_CATEGORIES = [
    { value: 'engorde', label: 'Engorde' },
    { value: 'precria', label: 'Precría' },
    { value: 'fase2', label: 'Fase 2' },
    { value: 'reservorio', label: 'Reservorio/Canal' }
] as const;

export const poolSchema = z.object({
    nombre: z
        .string()
        .min(1, 'El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-Z0-9\s\-_]+$/, 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos'),

    descripcion: z
        .string()
        .max(200, 'La descripción no puede exceder 200 caracteres')
        .optional()
        .or(z.literal('')),

    area: z
        .number({
            required_error: 'El área es requerida',
            invalid_type_error: 'El área debe ser un número válido'
        })
        .min(0.01, 'El área debe ser mayor a 0')
        .max(100, 'El área no puede exceder 100 hectáreas')
        .multipleOf(0.01, 'El área debe tener máximo 2 decimales'),

    categoria: z
        .enum(['engorde', 'precria', 'fase2', 'reservorio'], {
            required_error: 'La categoría es requerida',
            invalid_type_error: 'Seleccione una categoría válida'
        }),

    volumen: z
        .number({
            invalid_type_error: 'El volumen debe ser un número válido'
        })
        .min(0, 'El volumen debe ser mayor o igual a 0')
        .max(1000000, 'El volumen no puede exceder 1,000,000 m³')
        .multipleOf(0.1, 'El volumen debe tener máximo 1 decimal')
        .optional()
        .or(z.nan())
});

export type PoolFormData = z.infer<typeof poolSchema>;

export const defaultPoolValues: Partial<PoolFormData> = {
    nombre: '',
    descripcion: '',
    area: undefined,
    categoria: undefined,
    volumen: undefined
};

export const calculateVolume = (area: number, depth: number = 1.5): number => {
    return Number((area * depth * 10000).toFixed(1));
};

export const validatePoolData = (data: PoolFormData) => {
    const errors: string[] = [];

    if (data.categoria === 'precria' && data.area > 5) {
        errors.push('Las piscinas de precría generalmente no exceden 5 hectáreas');
    }

    if (data.categoria === 'engorde' && data.area < 0.5) {
        errors.push('Las piscinas de engorde generalmente son mayores a 0.5 hectáreas');
    }

    if (data.volumen && data.area) {
        const expectedMinVolume = data.area * 10000 * 0.8;
        const expectedMaxVolume = data.area * 10000 * 3.0;

        if (data.volumen < expectedMinVolume || data.volumen > expectedMaxVolume) {
            errors.push(`El volumen debe estar entre ${expectedMinVolume.toLocaleString()} y ${expectedMaxVolume.toLocaleString()} m³ para esta área`);
        }
    }

    return errors;
};
