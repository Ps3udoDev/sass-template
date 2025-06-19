import { Task } from '@wamra/gantt-task-react';

export type AquaculturePhase =
    | 'vacia'
    | 'en_uso'
    | 'inicio'
    | 'siembra'
    | 'transferencia'
    | 'raleo'
    | 'transf_ciclos'
    | 'ing_transf_cic'
    | 'pesca';

export type CycleType = 'monofasico' | 'bifasico' | 'trifasico';

export interface AquacultureTask extends Omit<Task, 'styles' | 'dependencies'> {
    phase: AquaculturePhase;
    poolId: string;
    poolName: string;
    cycleId: string;
    cycleName: string;
    cycleType: CycleType;
    biomass?: number;
    density?: number;
    transferTo?: string;
    notes?: string;
    styles?: {
        barBackgroundColor: string;
        barBackgroundSelectedColor: string;
        barProgressColor: string;
        barProgressSelectedColor: string;
        barCornerRadius: number;
        barBorderRadius: number;
    };
    dependencies?: string[];
    waterConditions?: {
        temperature?: number;
        oxygen?: number;
        ph?: number;
        salinity?: number;
    };
}

export interface CycleData {
    id: string;
    name: string;
    type: CycleType;
    species: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    tasks: AquacultureTask[];
}

export const PHASE_COLORS: Record<AquaculturePhase, string> = {
    vacia: '#ffffff',
    en_uso: '#d9d9d9',
    inicio: '#fae599',
    siembra: '#ea9999',
    transferencia: '#f7cb9c',
    raleo: '#9fc5e8',
    transf_ciclos: '#c9c3fc',
    ing_transf_cic: '#eec3fc',
    pesca: '#b6d7a8'
};

export const getTaskStyle = (phase: AquaculturePhase) => ({
    barBackgroundColor: PHASE_COLORS[phase],
    barBackgroundSelectedColor: darkenColor(PHASE_COLORS[phase], 0.1),
    barProgressColor: '#4a90e2',
    barProgressSelectedColor: '#2171b5',
    barCornerRadius: 4,
    barBorderRadius: 4
});

function darkenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * amount));
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * amount));
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
