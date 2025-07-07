// marketplaceConfig.ts - Configuración completa del marketplace

export interface Industry {
    id: string;
    name: string;
    description: string;
    subtitle: string;
    icon: string;
    color: string;
    modules: MarketplaceModule[];
}

export interface MarketplaceModule {
    id: string;
    industryId: string;
    name: string;
    description: string;
    subtitle: string;
    icon: string;
    basePrice: number;
    currency: string;
    baseFeatures: string[];
    additionalServices: AdditionalService[];
    isPopular?: boolean;
    isPremium?: boolean;
    isNew?: boolean;
}

export interface AdditionalService {
    id: string;
    moduleId: string;
    name: string;
    description: string;
    icon: string;
    price: number;
    currency: string;
    features: string[];
    isPopular?: boolean;
    isPremium?: boolean;
}

export interface MarketplacePackage {
    id: string;
    name: string;
    description: string;
    modules: string[];
    services: string[];
    originalPrice: number;
    discountedPrice: number;
    currency: string;
    discount: number;
    isPopular?: boolean;
    features: string[];
}

export interface BaseService {
    id: string;
    name: string;
    description: string;
    isIncluded: boolean;
}

// Servicios base incluidos en todos los módulos
export const baseServices: BaseService[] = [
    {
        id: 'inventory',
        name: 'marketplace.services.base.inventory.name',
        description: 'marketplace.services.base.inventory.description',
        isIncluded: true
    },
    {
        id: 'cycles',
        name: 'marketplace.services.base.cycles.name',
        description: 'marketplace.services.base.cycles.description',
        isIncluded: true
    },
    {
        id: 'reports',
        name: 'marketplace.services.base.reports.name',
        description: 'marketplace.services.base.reports.description',
        isIncluded: true
    },
    {
        id: 'notifications',
        name: 'marketplace.services.base.notifications.name',
        description: 'marketplace.services.base.notifications.description',
        isIncluded: true
    }
];

// Industrias y sus módulos
export const industries: Industry[] = [
    {
        id: 'aquaculture',
        name: 'marketplace.industries.aquaculture.name',
        description: 'marketplace.industries.aquaculture.description',
        subtitle: 'marketplace.industries.aquaculture.subtitle',
        icon: '/industries/aquaculture.png',
        color: '#1E3A8A',
        modules: [
            {
                id: 'shrimp',
                industryId: 'aquaculture',
                name: 'modules.shrimp.marketplace.card.name',
                description: 'modules.shrimp.marketplace.card.description',
                subtitle: 'modules.shrimp.marketplace.card.subtitle',
                icon: '/modules/shrimp.png',
                basePrice: 299,
                currency: 'USD',
                baseFeatures: [
                    'modules.shrimp.marketplace.card.features.0',
                    'modules.shrimp.marketplace.card.features.1',
                    'modules.shrimp.marketplace.card.features.2',
                    'modules.shrimp.marketplace.card.features.3'
                ],
                isPopular: true,
                additionalServices: [
                    {
                        id: 'genetics',
                        moduleId: 'shrimp',
                        name: 'modules.shrimp.marketplace.services.genetics.name',
                        description: 'modules.shrimp.marketplace.services.genetics.description',
                        icon: '🧬',
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
                        moduleId: 'shrimp',
                        name: 'modules.shrimp.marketplace.services.laboratory.name',
                        description: 'modules.shrimp.marketplace.services.laboratory.description',
                        icon: '🔬',
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
                        id: 'export',
                        moduleId: 'shrimp',
                        name: 'modules.shrimp.marketplace.services.export.name',
                        description: 'modules.shrimp.marketplace.services.export.description',
                        icon: '📦',
                        price: 159,
                        currency: 'USD',
                        features: [
                            'Gestión de exportaciones',
                            'Documentación internacional',
                            'Seguimiento de embarques',
                            'Certificaciones'
                        ],
                        isPremium: true
                    }
                ]
            },
            {
                id: 'tilapia',
                industryId: 'aquaculture',
                name: 'modules.tilapia.marketplace.card.name',
                description: 'modules.tilapia.marketplace.card.description',
                subtitle: 'modules.tilapia.marketplace.card.subtitle',
                icon: '/modules/tilapia.png',
                basePrice: 249,
                currency: 'USD',
                baseFeatures: [
                    'modules.tilapia.marketplace.card.features.0',
                    'modules.tilapia.marketplace.card.features.1',
                    'modules.tilapia.marketplace.card.features.2',
                    'modules.tilapia.marketplace.card.features.3'
                ],
                additionalServices: [
                    {
                        id: 'water-quality',
                        moduleId: 'tilapia',
                        name: 'Control de Calidad del Agua',
                        description: 'Monitoreo avanzado de parámetros del agua',
                        icon: '💧',
                        price: 99,
                        currency: 'USD',
                        features: [
                            'Sensores automáticos',
                            'Alertas en tiempo real',
                            'Histórico de parámetros',
                            'Reportes de calidad'
                        ]
                    },
                    {
                        id: 'feeding-automation',
                        moduleId: 'tilapia',
                        name: 'Alimentación Automatizada',
                        description: 'Sistema inteligente de alimentación',
                        icon: '🤖',
                        price: 179,
                        currency: 'USD',
                        features: [
                            'Alimentadores automáticos',
                            'Programación inteligente',
                            'Control de costos',
                            'Optimización nutricional'
                        ],
                        isPremium: true
                    }
                ]
            }
        ]
    },
    {
        id: 'livestock',
        name: 'marketplace.industries.livestock.name',
        description: 'marketplace.industries.livestock.description',
        subtitle: 'marketplace.industries.livestock.subtitle',
        icon: '/industries/livestock.png',
        color: '#3730A3',
        modules: [
            {
                id: 'cattle',
                industryId: 'livestock',
                name: 'modules.cattle.marketplace.card.name',
                description: 'modules.cattle.marketplace.card.description',
                subtitle: 'modules.cattle.marketplace.card.subtitle',
                icon: '/modules/cattle.png',
                basePrice: 349,
                currency: 'USD',
                baseFeatures: [
                    'modules.cattle.marketplace.card.features.0',
                    'modules.cattle.marketplace.card.features.1',
                    'modules.cattle.marketplace.card.features.2',
                    'modules.cattle.marketplace.card.features.3'
                ],
                isPopular: true,
                additionalServices: [
                    {
                        id: 'pasture-management',
                        moduleId: 'cattle',
                        name: 'Gestión de Potreros',
                        description: 'Control avanzado de pastoreo rotacional',
                        icon: '🌱',
                        price: 149,
                        currency: 'USD',
                        features: [
                            'Rotación de potreros',
                            'Análisis de forraje',
                            'Planificación de pastoreo',
                            'Mapeo de terrenos'
                        ],
                        isPopular: true
                    },
                    {
                        id: 'reproductive-control',
                        moduleId: 'cattle',
                        name: 'Control Reproductivo',
                        description: 'Gestión completa del ciclo reproductivo',
                        icon: '🐄',
                        price: 129,
                        currency: 'USD',
                        features: [
                            'Calendario reproductivo',
                            'Inseminación artificial',
                            'Seguimiento de preñez',
                            'Genealogía'
                        ]
                    },
                    {
                        id: 'milking-management',
                        moduleId: 'cattle',
                        name: 'Manejo de Ordeño',
                        description: 'Optimización del proceso de ordeño',
                        icon: '🥛',
                        price: 199,
                        currency: 'USD',
                        features: [
                            'Control de producción',
                            'Calidad de leche',
                            'Horarios optimizados',
                            'Análisis de rendimiento'
                        ],
                        isPremium: true
                    }
                ]
            },
            {
                id: 'swine',
                industryId: 'livestock',
                name: 'modules.swine.marketplace.card.name',
                description: 'modules.swine.marketplace.card.description',
                subtitle: 'modules.swine.marketplace.card.subtitle',
                icon: '/modules/swine.png',
                basePrice: 279,
                currency: 'USD',
                baseFeatures: [
                    'modules.swine.marketplace.card.features.0',
                    'modules.swine.marketplace.card.features.1',
                    'modules.swine.marketplace.card.features.2',
                    'modules.swine.marketplace.card.features.3'
                ],
                additionalServices: [
                    {
                        id: 'feed-optimization',
                        moduleId: 'swine',
                        name: 'Optimización de Alimentación',
                        description: 'Formulación inteligente de dietas',
                        icon: '🌾',
                        price: 119,
                        currency: 'USD',
                        features: [
                            'Formulación automática',
                            'Control de costos',
                            'Análisis nutricional',
                            'Eficiencia alimentaria'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'poultry',
        name: 'marketplace.industries.poultry.name',
        description: 'marketplace.industries.poultry.description',
        subtitle: 'marketplace.industries.poultry.subtitle',
        icon: '/industries/poultry.png',
        color: '#2563EB',
        modules: [
            {
                id: 'laying-hens',
                industryId: 'poultry',
                name: 'modules.laying-hens.marketplace.card.name',
                description: 'modules.laying-hens.marketplace.card.description',
                subtitle: 'modules.laying-hens.marketplace.card.subtitle',
                icon: '/modules/laying-hens.png',
                basePrice: 229,
                currency: 'USD',
                baseFeatures: [
                    'modules.laying-hens.marketplace.card.features.0',
                    'modules.laying-hens.marketplace.card.features.1',
                    'modules.laying-hens.marketplace.card.features.2',
                    'modules.laying-hens.marketplace.card.features.3'
                ],
                additionalServices: [
                    {
                        id: 'breeding',
                        moduleId: 'laying-hens',
                        name: 'modules.laying-hens.marketplace.services.breeding.name',
                        description: 'modules.laying-hens.marketplace.services.breeding.description',
                        icon: '🐣',
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
                        id: 'nutrition',
                        moduleId: 'laying-hens',
                        name: 'modules.laying-hens.marketplace.services.nutrition.name',
                        description: 'modules.laying-hens.marketplace.services.nutrition.description',
                        icon: '🌾',
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
                        id: 'quality',
                        moduleId: 'laying-hens',
                        name: 'modules.laying-hens.marketplace.services.quality.name',
                        description: 'modules.laying-hens.marketplace.services.quality.description',
                        icon: '🥚',
                        price: 69,
                        currency: 'USD',
                        features: [
                            'Control de calidad',
                            'Clasificación automática',
                            'Seguimiento de defectos',
                            'Reportes de calidad'
                        ]
                    }
                ]
            },
            {
                id: 'broilers',
                industryId: 'poultry',
                name: 'modules.broilers.marketplace.card.name',
                description: 'modules.broilers.marketplace.card.description',
                subtitle: 'modules.broilers.marketplace.card.subtitle',
                icon: '/modules/broilers.png',
                basePrice: 259,
                currency: 'USD',
                baseFeatures: [
                    'modules.broilers.marketplace.card.features.0',
                    'modules.broilers.marketplace.card.features.1',
                    'modules.broilers.marketplace.card.features.2',
                    'modules.broilers.marketplace.card.features.3'
                ],
                isNew: true,
                additionalServices: [
                    {
                        id: 'growth-optimization',
                        moduleId: 'broilers',
                        name: 'Optimización de Crecimiento',
                        description: 'Maximización del rendimiento en engorde',
                        icon: '📈',
                        price: 109,
                        currency: 'USD',
                        features: [
                            'Seguimiento de peso',
                            'Curvas de crecimiento',
                            'Proyecciones',
                            'Alertas de rendimiento'
                        ]
                    }
                ]
            }
        ]
    }
];

// Paquetes pre-configurados con descuentos
export const marketplacePackages: MarketplacePackage[] = [
    {
        id: 'aquaculture-starter',
        name: 'Paquete Acuicultura Starter',
        description: 'Ideal para emprendimientos acuícolas',
        modules: ['shrimp'],
        services: ['genetics'],
        originalPrice: 388,
        discountedPrice: 299,
        currency: 'USD',
        discount: 23,
        features: [
            'Módulo de Camaronicultura completo',
            'Análisis Genético incluido',
            'Servicios base incluidos',
            'Soporte técnico'
        ]
    },
    {
        id: 'aquaculture-professional',
        name: 'Paquete Acuicultura Professional',
        description: 'Solución completa para operaciones medianas',
        modules: ['shrimp', 'tilapia'],
        services: ['genetics', 'laboratory', 'water-quality'],
        originalPrice: 865,
        discountedPrice: 649,
        currency: 'USD',
        discount: 25,
        isPopular: true,
        features: [
            'Módulos de Camarones y Tilapia',
            '3 servicios adicionales',
            'Todos los servicios base',
            'Soporte prioritario',
            'Capacitación incluida'
        ]
    },
    {
        id: 'livestock-complete',
        name: 'Paquete Ganadería Completo',
        description: 'Todo lo necesario para ganadería moderna',
        modules: ['cattle', 'swine'],
        services: ['pasture-management', 'reproductive-control', 'feed-optimization'],
        originalPrice: 1025,
        discountedPrice: 799,
        currency: 'USD',
        discount: 22,
        features: [
            'Módulos Bovino y Porcino',
            'Gestión avanzada de potreros',
            'Control reproductivo completo',
            'Optimización alimentaria',
            'Consultoría especializada'
        ]
    },
    {
        id: 'poultry-premium',
        name: 'Paquete Avicultura Premium',
        description: 'Solución integral para avicultores',
        modules: ['laying-hens', 'broilers'],
        services: ['breeding', 'nutrition', 'quality', 'growth-optimization'],
        originalPrice: 724,
        discountedPrice: 549,
        currency: 'USD',
        discount: 24,
        features: [
            'Módulos de Ponedoras y Engorde',
            '4 servicios especializados',
            'Control de calidad avanzado',
            'Optimización de producción',
            'Análisis de rentabilidad'
        ]
    }
];

// Funciones de utilidad
export const getIndustryById = (industryId: string): Industry | undefined => {
    return industries.find(industry => industry.id === industryId);
};

export const getModuleById = (moduleId: string): MarketplaceModule | undefined => {
    for (const industry of industries) {
        const module = industry.modules.find(mod => mod.id === moduleId);
        if (module) return module;
    }
    return undefined;
};

export const getServiceById = (serviceId: string): AdditionalService | undefined => {
    for (const industry of industries) {
        for (const module of industry.modules) {
            const service = module.additionalServices.find(service => service.id === serviceId);
            if (service) return service;
        }
    }
    return undefined;
};

export const getAvailableModulesForTenant = (ownedModules: string[]): MarketplaceModule[] => {
    const allModules: MarketplaceModule[] = [];

    industries.forEach(industry => {
        industry.modules.forEach(module => {
            if (!ownedModules.includes(module.id)) {
                allModules.push(module);
            }
        });
    });

    return allModules;
};

export const getAvailableServicesForModule = (moduleId: string, ownedServices: string[]): AdditionalService[] => {
    const module = getModuleById(moduleId);
    if (!module) return [];

    return module.additionalServices.filter(service => !ownedServices.includes(service.id));
};

export const getPackageById = (packageId: string): MarketplacePackage | undefined => {
    return marketplacePackages.find(pkg => pkg.id === packageId);
};

export const getPopularModules = (): MarketplaceModule[] => {
    const allModules: MarketplaceModule[] = [];

    industries.forEach(industry => {
        industry.modules.forEach(module => {
            if (module.isPopular) {
                allModules.push(module);
            }
        });
    });

    return allModules;
};

export const getModulesByCategory = () => {
    return {
        aquaculture: industries.find(i => i.id === 'aquaculture')?.modules || [],
        livestock: industries.find(i => i.id === 'livestock')?.modules || [],
        poultry: industries.find(i => i.id === 'poultry')?.modules || [],
        popular: getPopularModules(),
        premium: industries.flatMap(i => i.modules.filter(m => m.isPremium)),
        new: industries.flatMap(i => i.modules.filter(m => m.isNew))
    };
};
