
export interface MarketplaceModule {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    price: number;
    currency: string;
    features: string[];
    isPopular?: boolean;
    isPremium?: boolean;
}

export interface MarketplaceSubModule {
    id: string;
    name: string;
    description: string;
    icon: string;
    moduleId: string;
    price: number;
    currency: string;
    features: string[];
    isPopular?: boolean;
    isPremium?: boolean;
}

export const availableModules: MarketplaceModule[] = [
    {
        id: 'cattle',
        name: 'marketplace.modules.cattle.name',
        description: 'marketplace.modules.cattle.description',
        icon: '/icons/cattle.png',
        category: 'livestock',
        price: 299,
        currency: 'USD',
        features: [
            'Gestión de ganado',
            'Control reproductivo',
            'Seguimiento sanitario',
            'Reportes de producción'
        ],
        isPopular: true
    },
    {
        id: 'pig-farming',
        name: 'marketplace.modules.pig-farming.name',
        description: 'marketplace.modules.pig-farming.description',
        icon: '/icons/pig.png',
        category: 'livestock',
        price: 249,
        currency: 'USD',
        features: [
            'Gestión de cerdos',
            'Control de alimentación',
            'Manejo sanitario',
            'Análisis de rentabilidad'
        ]
    },
    {
        id: 'agriculture',
        name: 'marketplace.modules.agriculture.name',
        description: 'marketplace.modules.agriculture.description',
        icon: '/icons/agriculture.png',
        category: 'crops',
        price: 199,
        currency: 'USD',
        features: [
            'Gestión de cultivos',
            'Control de riego',
            'Manejo de fertilizantes',
            'Programación de cosechas'
        ],
        isPremium: true
    },
    {
        id: 'fish-farming',
        name: 'marketplace.modules.fish-farming.name',
        description: 'marketplace.modules.fish-farming.description',
        icon: '/icons/fish.png',
        category: 'aquaculture',
        price: 179,
        currency: 'USD',
        features: [
            'Gestión de piscinas',
            'Control de calidad del agua',
            'Alimentación automatizada',
            'Seguimiento de crecimiento'
        ]
    }
];

// Submódulos disponibles por módulo
export const availableSubModules: MarketplaceSubModule[] = [
    // Submódulos para Shrimp (Camarones)
    {
        id: 'genetics',
        name: 'marketplace.submodules.shrimp.genetics.name',
        description: 'marketplace.submodules.shrimp.genetics.description',
        icon: '🧬',
        moduleId: 'shrimp',
        price: 89,
        currency: 'USD',
        features: [
            'Seguimiento genético',
            'Selección de reproductores',
            'Análisis de linajes',
            'Reportes de mejoramiento'
        ],
        isPopular: true
    },
    {
        id: 'laboratory',
        name: 'marketplace.submodules.shrimp.laboratory.name',
        description: 'marketplace.submodules.shrimp.laboratory.description',
        icon: '🔬',
        moduleId: 'shrimp',
        price: 129,
        currency: 'USD',
        features: [
            'Análisis de laboratorio',
            'Control de patógenos',
            'Pruebas de calidad',
            'Historial de muestras'
        ]
    },
    {
        id: 'export-management',
        name: 'marketplace.submodules.shrimp.export.name',
        description: 'marketplace.submodules.shrimp.export.description',
        icon: '📦',
        moduleId: 'shrimp',
        price: 159,
        currency: 'USD',
        features: [
            'Gestión de exportaciones',
            'Documentación internacional',
            'Seguimiento de embarques',
            'Certificaciones'
        ],
        isPremium: true
    },

    // Submódulos para Laying Hens (Gallinas Ponedoras)
    {
        id: 'breeding',
        name: 'marketplace.submodules.laying-hens.breeding.name',
        description: 'marketplace.submodules.laying-hens.breeding.description',
        icon: '🐣',
        moduleId: 'laying-hens',
        price: 79,
        currency: 'USD',
        features: [
            'Gestión reproductiva',
            'Control de incubación',
            'Seguimiento de pollitos',
            'Estadísticas de eclosión'
        ]
    },
    {
        id: 'advanced-nutrition',
        name: 'marketplace.submodules.laying-hens.nutrition.name',
        description: 'marketplace.submodules.laying-hens.nutrition.description',
        icon: '🌾',
        moduleId: 'laying-hens',
        price: 99,
        currency: 'USD',
        features: [
            'Formulación de dietas',
            'Optimización nutricional',
            'Control de costos',
            'Análisis de eficiencia'
        ],
        isPopular: true
    },
    {
        id: 'egg-quality',
        name: 'marketplace.submodules.laying-hens.quality.name',
        description: 'marketplace.submodules.laying-hens.quality.description',
        icon: '🥚',
        moduleId: 'laying-hens',
        price: 69,
        currency: 'USD',
        features: [
            'Control de calidad',
            'Clasificación automática',
            'Seguimiento de defectos',
            'Reportes de calidad'
        ]
    }
];

// Función para obtener módulos no comprados por el tenant
export const getAvailableModulesForTenant = (ownedModules: string[]): MarketplaceModule[] => {
    return availableModules.filter(module => !ownedModules.includes(module.id));
};

// Función para obtener submódulos disponibles para un módulo específico
export const getAvailableSubModulesForModule = (moduleId: string, ownedSubModules: string[]): MarketplaceSubModule[] => {
    return availableSubModules.filter(
        subModule => subModule.moduleId === moduleId && !ownedSubModules.includes(subModule.id)
    );
};

// Función para obtener submódulos por categorías
export const getSubModulesByCategory = (moduleId: string) => {
    const moduleSubModules = availableSubModules.filter(sub => sub.moduleId === moduleId);

    return {
        popular: moduleSubModules.filter(sub => sub.isPopular),
        premium: moduleSubModules.filter(sub => sub.isPremium),
        standard: moduleSubModules.filter(sub => !sub.isPopular && !sub.isPremium)
    };
};

// Función para obtener módulos por categorías
export const getModulesByCategory = () => {
    return {
        livestock: availableModules.filter(mod => mod.category === 'livestock'),
        aquaculture: availableModules.filter(mod => mod.category === 'aquaculture'),
        crops: availableModules.filter(mod => mod.category === 'crops'),
        popular: availableModules.filter(mod => mod.isPopular),
        premium: availableModules.filter(mod => mod.isPremium)
    };
};
