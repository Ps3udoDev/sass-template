export interface SpeciesConfig {
    id: string;
    displayName: string;
    category: 'aquaculture' | 'poultry' | 'livestock';

    pools: {
        columns: PoolColumn[];
        validations: PoolValidation[];
        metrics: string[];
        cycleConfig: CycleConfig;
    };
}

export interface PoolColumn {
    id: string;
    header: string;
    type: 'text' | 'number' | 'date' | 'select' | 'boolean';
    required?: boolean;
    unit?: string;
    options?: string[];
}

export interface PoolValidation {
    field: string;
    rule: 'min' | 'max' | 'range' | 'required';
    value: any;
    message: string;
}

export interface CycleConfig {
    averageDuration: number;
    phases: string[];
    requiredParameters: string[];
}

const speciesConfigs: Record<string, SpeciesConfig> = {
    shrimp: {
        id: 'shrimp',
        displayName: 'Camarones',
        category: 'aquaculture',
        pools: {
            columns: [
                { id: 'code', header: 'Código', type: 'text', required: true },
                { id: 'area', header: 'Área', type: 'number', required: true, unit: 'ha' },
                { id: 'depth', header: 'Profundidad', type: 'number', required: true, unit: 'm' },
                {
                    id: 'status', header: 'Estado', type: 'select', required: true,
                    options: ['Vacía', 'Preparación', 'Siembra', 'Producción', 'Cosecha']
                },
                { id: 'currentCycle', header: 'Ciclo Actual', type: 'text' },
                { id: 'temperature', header: 'Temperatura', type: 'number', unit: '°C' },
                { id: 'oxygen', header: 'Oxígeno', type: 'number', unit: 'mg/L' },
                { id: 'ph', header: 'pH', type: 'number' },
                { id: 'salinity', header: 'Salinidad', type: 'number', unit: 'ppt' },
                { id: 'density', header: 'Densidad', type: 'number', unit: 'camarones/m²' },
                { id: 'biomass', header: 'Biomasa', type: 'number', unit: 'kg' },
                { id: 'lastFeeding', header: 'Última Alimentación', type: 'date' },
                { id: 'notes', header: 'Observaciones', type: 'text' }
            ],
            validations: [
                { field: 'area', rule: 'min', value: 0.1, message: 'Área mínima 0.1 ha' },
                { field: 'area', rule: 'max', value: 50, message: 'Área máxima 50 ha' },
                { field: 'depth', rule: 'range', value: [0.8, 3.0], message: 'Profundidad entre 0.8-3.0 m' },
                { field: 'temperature', rule: 'range', value: [26, 32], message: 'Temperatura óptima 26-32°C' },
                { field: 'oxygen', rule: 'min', value: 4, message: 'Oxígeno mínimo 4 mg/L' },
                { field: 'ph', rule: 'range', value: [7.5, 8.5], message: 'pH óptimo 7.5-8.5' }
            ],
            metrics: ['density', 'biomass', 'survivalRate', 'avgWeight', 'fcr'],
            cycleConfig: {
                averageDuration: 90,
                phases: ['Preparación', 'Siembra', 'Precría', 'Engorde', 'Cosecha'],
                requiredParameters: ['temperature', 'oxygen', 'ph', 'salinity']
            }
        }
    },

    tilapia: {
        id: 'tilapia',
        displayName: 'Tilapias',
        category: 'aquaculture',
        pools: {
            columns: [
                { id: 'code', header: 'Código', type: 'text', required: true },
                { id: 'area', header: 'Área', type: 'number', required: true, unit: 'ha' },
                { id: 'depth', header: 'Profundidad', type: 'number', required: true, unit: 'm' },
                {
                    id: 'status', header: 'Estado', type: 'select', required: true,
                    options: ['Vacía', 'Preparación', 'Siembra', 'Producción', 'Cosecha']
                },
                { id: 'currentCycle', header: 'Ciclo Actual', type: 'text' },
                { id: 'temperature', header: 'Temperatura', type: 'number', unit: '°C' },
                { id: 'oxygen', header: 'Oxígeno', type: 'number', unit: 'mg/L' },
                { id: 'ph', header: 'pH', type: 'number' },
                { id: 'ammonia', header: 'Amoniaco', type: 'number', unit: 'mg/L' },
                { id: 'nitrites', header: 'Nitritos', type: 'number', unit: 'mg/L' },
                { id: 'density', header: 'Densidad', type: 'number', unit: 'peces/m³' },
                { id: 'biomass', header: 'Biomasa', type: 'number', unit: 'kg' },
                { id: 'lastFeeding', header: 'Última Alimentación', type: 'date' },
                { id: 'notes', header: 'Observaciones', type: 'text' }
            ],
            validations: [
                { field: 'temperature', rule: 'range', value: [24, 30], message: 'Temperatura óptima 24-30°C' },
                { field: 'oxygen', rule: 'min', value: 3, message: 'Oxígeno mínimo 3 mg/L' },
                { field: 'ph', rule: 'range', value: [6.5, 8.0], message: 'pH óptimo 6.5-8.0' }
            ],
            metrics: ['density', 'biomass', 'survivalRate', 'avgWeight', 'fcr'],
            cycleConfig: {
                averageDuration: 120,
                phases: ['Preparación', 'Siembra', 'Alevinaje', 'Engorde', 'Cosecha'],
                requiredParameters: ['temperature', 'oxygen', 'ph', 'ammonia']
            }
        }
    }
};

export function getSpeciesConfig(speciesId: string): SpeciesConfig | null {
    return speciesConfigs[speciesId] || null;
}

export function getAllSpecies(): SpeciesConfig[] {
    return Object.values(speciesConfigs);
}

export function getSpeciesByCategory(category: string): SpeciesConfig[] {
    return Object.values(speciesConfigs).filter(config => config.category === category);
}
