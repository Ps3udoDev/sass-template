export interface SubModule {
    id: string;
    name: string;
    href: string;
    icon?: string;
    description?: string;
}

export interface Module {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    href: string;
    subModules: SubModule[];
}

export const modulesConfig: Module[] = [
    {
        id: 'shrimp',
        name: 'dashboard.modules.shrimp.name',
        description: 'dashboard.modules.shrimp.description',
        icon: '/icons/shrimp.png',
        color: '#0891b2', // cyan-600
        href: 'aquaculture/shrimp',
        subModules: [
            {
                id: 'dashboard',
                name: 'modules.shrimp.dashboard',
                href: '',
                icon: '📊'
            },
            {
                id: 'ponds',
                name: 'modules.shrimp.ponds',
                href: 'ponds',
                icon: '🏊',
                description: 'Gestión de estanques'
            },
            {
                id: 'cycles',
                name: 'modules.shrimp.cycles',
                href: 'cycles',
                icon: '🔄',
                description: 'Ciclos de producción'
            },
            {
                id: 'feeding',
                name: 'modules.shrimp.feeding',
                href: 'feeding',
                icon: '🍤',
                description: 'Control de alimentación'
            },
            {
                id: 'health',
                name: 'modules.shrimp.health',
                href: 'health',
                icon: '🏥',
                description: 'Salud y tratamientos'
            },
            {
                id: 'harvest',
                name: 'modules.shrimp.harvest',
                href: 'harvest',
                icon: '📦',
                description: 'Cosecha y ventas'
            },
            {
                id: 'reports',
                name: 'modules.shrimp.reports',
                href: 'reports',
                icon: '📈',
                description: 'Reportes y análisis'
            }
        ]
    },
    {
        id: 'laying-hens',
        name: 'dashboard.modules.laying-hens.name',
        description: 'dashboard.modules.laying-hens.description',
        icon: '/icons/laying-hens.jpeg',
        color: '#dc2626', // red-600
        href: 'poultry/laying-hens',
        subModules: [
            {
                id: 'dashboard',
                name: 'modules.laying-hens.dashboard',
                href: '',
                icon: '📊'
            },
            {
                id: 'flocks',
                name: 'modules.laying-hens.flocks',
                href: 'flocks',
                icon: '🐔',
                description: 'Gestión de parvadas'
            },
            {
                id: 'production',
                name: 'modules.laying-hens.production',
                href: 'production',
                icon: '🥚',
                description: 'Producción de huevos'
            },
            {
                id: 'feeding',
                name: 'modules.laying-hens.feeding',
                href: 'feeding',
                icon: '🌾',
                description: 'Alimentación'
            },
            {
                id: 'health',
                name: 'modules.laying-hens.health',
                href: 'health',
                icon: '💊',
                description: 'Salud y vacunación'
            },
            {
                id: 'inventory',
                name: 'modules.laying-hens.inventory',
                href: 'inventory',
                icon: '📦',
                description: 'Inventario de huevos'
            },
            {
                id: 'sales',
                name: 'modules.laying-hens.sales',
                href: 'sales',
                icon: '💰',
                description: 'Ventas'
            },
            {
                id: 'reports',
                name: 'modules.laying-hens.reports',
                href: 'reports',
                icon: '📊',
                description: 'Reportes'
            }
        ]
    }
];

// Función para obtener módulos disponibles para un usuario
export const getAvailableModules = (userModules: string[]): Module[] => {
    return modulesConfig.filter(module => userModules.includes(module.id));
};

// Función para obtener un módulo específico
export const getModuleById = (moduleId: string): Module | undefined => {
    return modulesConfig.find(module => module.id === moduleId);
};

// Función para obtener submódulo específico
export const getSubModuleById = (moduleId: string, subModuleId: string): SubModule | undefined => {
    const module = getModuleById(moduleId);
    return module?.subModules.find(sub => sub.id === subModuleId);
};

export const mockTenants = [
    {
        id: 'hacienda-01',
        name: 'Hacienda 01',
        logo: '/logos/hacienda-01.jpeg',
        primaryColor: '#000000',
        modules: ['shrimp', 'laying-hens'],
    },
    {
        id: 'ganaderia-feliz',
        name: 'Ganaderia Feliz',
        logo: '/logos/ganaderia-feliz.jpeg',
        primaryColor: '#000000',
        modules: ['shrimp'],
    }
];
