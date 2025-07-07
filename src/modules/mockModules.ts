// mockModules.ts - Configuración de módulos para el dashboard (módulos que ya posee el usuario)

export interface SubModule {
    id: string;
    name: string;
    href: string;
    icon?: string;
    lucideIcon?: string;
    description?: string;
    subModules?: SubModule[];
}

export interface Module {
    id: string;
    name: string;
    description: string;
    subtitle: string;
    icon: string;
    lucideIcon?: string;
    color: string;
    href: string;
    subModules: SubModule[];
}

// Módulos disponibles en el dashboard (módulos que el usuario ya posee)
export const modulesConfig: Module[] = [
    {
        id: 'shrimp',
        name: 'modules.shrimp.dashboard.card.name',
        description: 'modules.shrimp.dashboard.card.description',
        subtitle: 'modules.shrimp.dashboard.card.subtitle',
        icon: '/modules/shrimp.png',
        lucideIcon: 'Fish',
        color: '#1E3A8A',
        href: 'aquaculture/shrimp',
        subModules: [
            {
                id: 'cycles',
                name: 'modules.shrimp.cycles.title',
                href: '',
                icon: '🔄',
                lucideIcon: 'RefreshCw',
                description: 'modules.shrimp.cycles.description',
                subModules: [
                    {
                        id: 'resume',
                        name: 'modules.shrimp.cycles.resume.title',
                        href: 'visualize',
                        icon: '📊',
                        lucideIcon: 'BarChart3',
                        description: 'modules.shrimp.cycles.resume.description'
                    },
                    {
                        id: 'create',
                        name: 'modules.shrimp.cycles.create.title',
                        href: 'create',
                        icon: '➕',
                        lucideIcon: 'Plus',
                        description: 'modules.shrimp.cycles.create.description'
                    },
                    {
                        id: 'active',
                        name: 'modules.shrimp.cycles.active.title',
                        href: 'active',
                        icon: '🟢',
                        lucideIcon: 'Play',
                        description: 'modules.shrimp.cycles.active.description'
                    }
                ]
            },
            {
                id: 'pools',
                name: 'modules.shrimp.pools.title',
                href: '',
                icon: '🏊',
                lucideIcon: 'Waves',
                description: 'modules.shrimp.pools.description',
                subModules: [
                    {
                        id: 'pools',
                        name: 'modules.shrimp.pools.pools.title',
                        href: 'pools',
                        icon: '🏊',
                        lucideIcon: 'Waves',
                        description: 'modules.shrimp.pools.pools.description'
                    },
                    {
                        id: 'monitoring',
                        name: 'modules.shrimp.pools.monitoring.title',
                        href: 'monitoring',
                        icon: '📊',
                        lucideIcon: 'Activity',
                        description: 'modules.shrimp.pools.monitoring.description'
                    }
                ]
            },
            {
                id: 'inventory',
                name: 'modules.shrimp.inventory.title',
                href: '',
                icon: '📦',
                lucideIcon: 'Package',
                description: 'modules.shrimp.inventory.description',
                subModules: [
                    {
                        id: 'feed',
                        name: 'modules.shrimp.inventory.feed.title',
                        href: 'feed',
                        icon: '🌾',
                        lucideIcon: 'Wheat',
                        description: 'modules.shrimp.inventory.feed.description'
                    },
                    {
                        id: 'supplies',
                        name: 'modules.shrimp.inventory.supplies.title',
                        href: 'supplies',
                        icon: '🧪',
                        lucideIcon: 'TestTube',
                        description: 'modules.shrimp.inventory.supplies.description'
                    }
                ]
            }
        ]
    },
    {
        id: 'laying-hens',
        name: 'modules.laying-hens.dashboard.card.name',
        description: 'modules.laying-hens.dashboard.card.description',
        subtitle: 'modules.laying-hens.dashboard.card.subtitle',
        icon: '/modules/laying-hens.png',
        lucideIcon: 'Bird',
        color: '#3730A3',
        href: 'poultry/laying-hens',
        subModules: [
            {
                id: 'cycles',
                name: 'modules.laying-hens.cycles.title',
                href: 'cycles',
                icon: '🔄',
                lucideIcon: 'RefreshCw',
                description: 'modules.laying-hens.cycles.description',
                subModules: [
                    {
                        id: 'resume',
                        name: 'modules.laying-hens.cycles.resume.title',
                        href: 'visualize',
                        icon: '📊',
                        lucideIcon: 'BarChart3',
                        description: 'modules.laying-hens.cycles.resume.description'
                    },
                    {
                        id: 'production',
                        name: 'modules.laying-hens.cycles.production.title',
                        href: 'production',
                        icon: '🥚',
                        lucideIcon: 'Egg',
                        description: 'modules.laying-hens.cycles.production.description'
                    }
                ]
            },
            {
                id: 'birds',
                name: 'modules.laying-hens.birds.title',
                href: '',
                icon: '🐔',
                lucideIcon: 'Bird',
                description: 'modules.laying-hens.birds.description',
                subModules: [
                    {
                        id: 'flocks',
                        name: 'modules.laying-hens.birds.flocks.title',
                        href: 'flocks',
                        icon: '🐓',
                        lucideIcon: 'Users',
                        description: 'modules.laying-hens.birds.flocks.description'
                    },
                    {
                        id: 'health',
                        name: 'modules.laying-hens.birds.health.title',
                        href: 'health',
                        icon: '🏥',
                        lucideIcon: 'Heart',
                        description: 'modules.laying-hens.birds.health.description'
                    }
                ]
            }
        ]
    },
    {
        id: 'cattle',
        name: 'modules.cattle.dashboard.card.name',
        description: 'modules.cattle.dashboard.card.description',
        subtitle: 'modules.cattle.dashboard.card.subtitle',
        icon: '/modules/cattle.png',
        lucideIcon: 'Cow',
        color: '#2563EB',
        href: 'livestock/cattle',
        subModules: [
            {
                id: 'herd',
                name: 'modules.cattle.herd.title',
                href: '',
                icon: '🐄',
                lucideIcon: 'Users',
                description: 'modules.cattle.herd.description',
                subModules: [
                    {
                        id: 'animals',
                        name: 'modules.cattle.herd.animals.title',
                        href: 'animals',
                        icon: '🐮',
                        lucideIcon: 'User',
                        description: 'modules.cattle.herd.animals.description'
                    },
                    {
                        id: 'breeding',
                        name: 'modules.cattle.herd.breeding.title',
                        href: 'breeding',
                        icon: '💝',
                        lucideIcon: 'Heart',
                        description: 'modules.cattle.herd.breeding.description'
                    }
                ]
            },
            {
                id: 'pastures',
                name: 'modules.cattle.pastures.title',
                href: '',
                icon: '🌱',
                lucideIcon: 'Leaf',
                description: 'modules.cattle.pastures.description',
                subModules: [
                    {
                        id: 'fields',
                        name: 'modules.cattle.pastures.fields.title',
                        href: 'fields',
                        icon: '🏞️',
                        lucideIcon: 'Map',
                        description: 'modules.cattle.pastures.fields.description'
                    },
                    {
                        id: 'rotation',
                        name: 'modules.cattle.pastures.rotation.title',
                        href: 'rotation',
                        icon: '🔄',
                        lucideIcon: 'RotateCcw',
                        description: 'modules.cattle.pastures.rotation.description'
                    }
                ]
            },
            {
                id: 'production',
                name: 'modules.cattle.production.title',
                href: '',
                icon: '🥛',
                lucideIcon: 'Milk',
                description: 'modules.cattle.production.description',
                subModules: [
                    {
                        id: 'milking',
                        name: 'modules.cattle.production.milking.title',
                        href: 'milking',
                        icon: '🪣',
                        lucideIcon: 'Container',
                        description: 'modules.cattle.production.milking.description'
                    },
                    {
                        id: 'quality',
                        name: 'modules.cattle.production.quality.title',
                        href: 'quality',
                        icon: '🔬',
                        lucideIcon: 'TestTube',
                        description: 'modules.cattle.production.quality.description'
                    }
                ]
            }
        ]
    },
    {
        id: 'tilapia',
        name: 'modules.tilapia.dashboard.card.name',
        description: 'modules.tilapia.dashboard.card.description',
        subtitle: 'modules.tilapia.dashboard.card.subtitle',
        icon: '/modules/tilapia.png',
        lucideIcon: 'Fish',
        color: '#059669',
        href: 'aquaculture/tilapia',
        subModules: [
            {
                id: 'cages',
                name: 'modules.tilapia.cages.title',
                href: '',
                icon: '🗃️',
                lucideIcon: 'Box',
                description: 'modules.tilapia.cages.description',
                subModules: [
                    {
                        id: 'management',
                        name: 'modules.tilapia.cages.management.title',
                        href: 'management',
                        icon: '📋',
                        lucideIcon: 'Clipboard',
                        description: 'modules.tilapia.cages.management.description'
                    },
                    {
                        id: 'monitoring',
                        name: 'modules.tilapia.cages.monitoring.title',
                        href: 'monitoring',
                        icon: '📊',
                        lucideIcon: 'Activity',
                        description: 'modules.tilapia.cages.monitoring.description'
                    }
                ]
            },
            {
                id: 'harvest',
                name: 'modules.tilapia.harvest.title',
                href: '',
                icon: '🎣',
                lucideIcon: 'Target',
                description: 'modules.tilapia.harvest.description',
                subModules: [
                    {
                        id: 'planning',
                        name: 'modules.tilapia.harvest.planning.title',
                        href: 'planning',
                        icon: '📅',
                        lucideIcon: 'Calendar',
                        description: 'modules.tilapia.harvest.planning.description'
                    },
                    {
                        id: 'execution',
                        name: 'modules.tilapia.harvest.execution.title',
                        href: 'execution',
                        icon: '✅',
                        lucideIcon: 'CheckCircle',
                        description: 'modules.tilapia.harvest.execution.description'
                    }
                ]
            }
        ]
    },
    {
        id: 'swine',
        name: 'modules.swine.dashboard.card.name',
        description: 'modules.swine.dashboard.card.description',
        subtitle: 'modules.swine.dashboard.card.subtitle',
        icon: '/modules/swine.png',
        lucideIcon: 'Pig',
        color: '#DC2626',
        href: 'livestock/swine',
        subModules: [
            {
                id: 'breeding',
                name: 'modules.swine.breeding.title',
                href: '',
                icon: '🐷',
                lucideIcon: 'Heart',
                description: 'modules.swine.breeding.description',
                subModules: [
                    {
                        id: 'sows',
                        name: 'modules.swine.breeding.sows.title',
                        href: 'sows',
                        icon: '🐖',
                        lucideIcon: 'Female',
                        description: 'modules.swine.breeding.sows.description'
                    },
                    {
                        id: 'boars',
                        name: 'modules.swine.breeding.boars.title',
                        href: 'boars',
                        icon: '🐗',
                        lucideIcon: 'Male',
                        description: 'modules.swine.breeding.boars.description'
                    }
                ]
            },
            {
                id: 'fattening',
                name: 'modules.swine.fattening.title',
                href: '',
                icon: '📈',
                lucideIcon: 'TrendingUp',
                description: 'modules.swine.fattening.description',
                subModules: [
                    {
                        id: 'piglets',
                        name: 'modules.swine.fattening.piglets.title',
                        href: 'piglets',
                        icon: '🐽',
                        lucideIcon: 'Baby',
                        description: 'modules.swine.fattening.piglets.description'
                    },
                    {
                        id: 'growth',
                        name: 'modules.swine.fattening.growth.title',
                        href: 'growth',
                        icon: '📊',
                        lucideIcon: 'BarChart',
                        description: 'modules.swine.fattening.growth.description'
                    }
                ]
            }
        ]
    },
    {
        id: 'broilers',
        name: 'modules.broilers.dashboard.card.name',
        description: 'modules.broilers.dashboard.card.description',
        subtitle: 'modules.broilers.dashboard.card.subtitle',
        icon: '/modules/broilers.png',
        lucideIcon: 'Bird',
        color: '#F59E0B',
        href: 'poultry/broilers',
        subModules: [
            {
                id: 'batches',
                name: 'modules.broilers.batches.title',
                href: '',
                icon: '🐔',
                lucideIcon: 'Users',
                description: 'modules.broilers.batches.description',
                subModules: [
                    {
                        id: 'management',
                        name: 'modules.broilers.batches.management.title',
                        href: 'management',
                        icon: '📋',
                        lucideIcon: 'Clipboard',
                        description: 'modules.broilers.batches.management.description'
                    },
                    {
                        id: 'weight',
                        name: 'modules.broilers.batches.weight.title',
                        href: 'weight',
                        icon: '⚖️',
                        lucideIcon: 'Scale',
                        description: 'modules.broilers.batches.weight.description'
                    }
                ]
            },
            {
                id: 'processing',
                name: 'modules.broilers.processing.title',
                href: '',
                icon: '🏭',
                lucideIcon: 'Factory',
                description: 'modules.broilers.processing.description',
                subModules: [
                    {
                        id: 'schedule',
                        name: 'modules.broilers.processing.schedule.title',
                        href: 'schedule',
                        icon: '📅',
                        lucideIcon: 'Calendar',
                        description: 'modules.broilers.processing.schedule.description'
                    },
                    {
                        id: 'quality',
                        name: 'modules.broilers.processing.quality.title',
                        href: 'quality',
                        icon: '🔍',
                        lucideIcon: 'Search',
                        description: 'modules.broilers.processing.quality.description'
                    }
                ]
            }
        ]
    }
];

// Información de tenants con módulos expandida
export const mockTenants = [
    {
        id: 'shrimp-wave',
        name: 'Shrimp Wave',
        logo: '/logos/shrimp-wave.png',
        primaryColor: '#1E3A8A',
        modules: ['shrimp', 'laying-hens', 'tilapia'],
        industry: 'aquaculture',
        subscription: {
            plan: 'professional',
            modules: ['shrimp', 'laying-hens', 'tilapia'],
            services: ['genetics', 'laboratory', 'breeding'],
            nextBilling: '2024-02-15',
            amount: 649,
            currency: 'USD'
        }
    },
    {
        id: 'ganaderia-feliz',
        name: 'Ganaderia Feliz',
        logo: '/logos/ganaderia-feliz.jpeg',
        primaryColor: '#3730A3',
        modules: ['cattle', 'swine'],
        industry: 'livestock',
        subscription: {
            plan: 'starter',
            modules: ['cattle'],
            services: ['pasture-management'],
            nextBilling: '2024-02-10',
            amount: 349,
            currency: 'USD'
        }
    },
    {
        id: 'avicola-premium',
        name: 'Avícola Premium',
        logo: '/logos/avicola-premium.png',
        primaryColor: '#2563EB',
        modules: ['laying-hens', 'broilers'],
        industry: 'poultry',
        subscription: {
            plan: 'enterprise',
            modules: ['laying-hens', 'broilers'],
            services: ['breeding', 'nutrition', 'quality', 'growth-optimization'],
            nextBilling: '2024-02-20',
            amount: 549,
            currency: 'USD'
        }
    }
];

// Funciones de utilidad para el dashboard
export const getAvailableModules = (userModules: string[]): Module[] => {
    return modulesConfig.filter(module => userModules.includes(module.id));
};

export const getModuleById = (moduleId: string): Module | undefined => {
    return modulesConfig.find(module => module.id === moduleId);
};

export const getSubModuleById = (moduleId: string, subModuleId: string): SubModule | undefined => {
    const module = getModuleById(moduleId);
    return module?.subModules.find(sub => sub.id === subModuleId);
};

export const getNestedSubModuleById = (
    moduleId: string,
    subModuleId: string,
    nestedSubModuleId: string
): SubModule | undefined => {
    const module = getModuleById(moduleId);
    const subModule = module?.subModules.find(sub => sub.id === subModuleId);
    return subModule?.subModules?.find(nested => nested.id === nestedSubModuleId);
};

export const getTenantById = (tenantId: string) => {
    return mockTenants.find(tenant => tenant.id === tenantId);
};

export const getModulesByIndustry = (industry: string): Module[] => {
    const tenant = mockTenants.find(t => t.industry === industry);
    if (!tenant) return [];

    return getAvailableModules(tenant.modules);
};

export const getTenantSubscription = (tenantId: string) => {
    const tenant = getTenantById(tenantId);
    return tenant?.subscription;
};
