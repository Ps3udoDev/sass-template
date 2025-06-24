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
    icon: string;
    lucideIcon?: string;
    color: string;
    href: string;
    subModules: SubModule[];
}

export const modulesConfig: Module[] = [
    {
        id: 'shrimp',
        name: 'modules.shrimp.name',
        description: 'dashboard.modules.shrimp.description',
        icon: '/icons/shrimp.png',
        lucideIcon: 'Fish',
        color: '#0891b2',
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
                    }
                ]
            }
        ]
    },
    {
        id: 'laying-hens',
        name: 'modules.laying-hens.name',
        description: 'dashboard.modules.laying-hens.description',
        icon: '/icons/laying-hens.jpeg',
        lucideIcon: 'Bird',
        color: '#dc2626',
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
                    }
                ]
            }
        ]
    }
];

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

export const mockTenants = [
    {
        id: 'shrimp-wave',
        name: 'Shrimp Wave',
        logo: '/logos/shrimp-wave.png',
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
