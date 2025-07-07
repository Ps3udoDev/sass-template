'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
    Search,
    Filter,
    Grid,
    List,
    ShoppingCart,
    Sparkles,
    TrendingUp,
    Star,
    ArrowLeft,
    Package,
    Zap
} from 'lucide-react';

// Imports de componentes y configuraciones
import {
    IndustryCard,
    ModuleCard,
    ServiceCard,
    PackageCard,
    type ViewMode,
    type MarketplaceActions
} from './components';

import {
    industries,
    marketplacePackages,
    getAvailableModulesForTenant,
    getModulesByCategory,
    getPopularModules,
    type Industry,
    type MarketplaceModule,
    type AdditionalService,
    type MarketplacePackage
} from '@/modules/marketplaceConfig';
import { useUserStore } from '@/app/store/userStore';

interface MarketplacePageProps {
    params: Promise<{ lng: string; tenant: string }>;
}

type CategoryType = 'all' | 'industries' | 'modules' | 'services' | 'packages' | 'aquaculture' | 'livestock' | 'poultry' | 'popular';

export default function MarketplacePage({ params }: MarketplacePageProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant } = resolvedParams;
    const t = useTranslations();
    const router = useRouter();

    // Estados principales
    const [currentView, setCurrentView] = useState<'industries' | 'category' | 'module-details'>('industries');
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isLoading, setIsLoading] = useState(false);



    const [filteredModules, setFilteredModules] = useState<MarketplaceModule[]>([]);
    const [filteredServices, setFilteredServices] = useState<AdditionalService[]>([]);

    const { user } = useUserStore();
    const userModules = user?.ownedModules || [];
    const userServices = user?.ownedServices || [];
    const userPackages = user?.ownedPackages || [];

    // Filtrar contenido basado en categoría y búsqueda
    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            let modules: MarketplaceModule[] = [];
            let services: AdditionalService[] = [];

            // Obtener módulos según la categoría
            if (selectedCategory === 'all') {
                modules = getAvailableModulesForTenant(userModules);
            } else if (selectedCategory === 'popular') {
                modules = getPopularModules().filter(mod => !userModules.includes(mod.id));
            } else if (selectedCategory === 'industries') {
                modules = getAvailableModulesForTenant(userModules);
            } else if (['aquaculture', 'livestock', 'poultry'].includes(selectedCategory)) {
                const categoryModules = getModulesByCategory();
                modules = (categoryModules[selectedCategory as keyof typeof categoryModules] || [])
                    .filter(mod => !userModules.includes(mod.id));
            }

            // Obtener servicios de los módulos filtrados
            modules.forEach(module => {
                services.push(...module.additionalServices.filter(service => !userServices.includes(service.id)));
            });

            // Aplicar filtro de búsqueda
            if (searchTerm) {
                modules = modules.filter(module =>
                    t(module.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t(module.description).toLowerCase().includes(searchTerm.toLowerCase())
                );

                services = services.filter(service =>
                    t(service.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t(service.description).toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredModules(modules);
            setFilteredServices(services);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedCategory, searchTerm, userModules, userServices, t]);

    // Acciones del marketplace
    const marketplaceActions: MarketplaceActions = {
        onPurchase: (type, id, additionalData) => {
            console.log(`Comprando ${type}:`, id, additionalData);
            // Aquí integrarías con tu sistema de pagos
            alert(`Iniciando compra de ${type}: ${id}`);
        },
        onViewDetails: (type, id) => {
            console.log(`Ver detalles de ${type}:`, id);
            // Navegar a página de detalles
            if (type === 'module') {
                router.push(`/${lng}/${tenant}/marketplace/module/${id}`);
            }
        },
        onAddToCart: (type, id) => {
            console.log(`Agregar al carrito ${type}:`, id);
            // Implementar carrito
        }
    };

    // Handlers
    const handleIndustrySelect = (industryId: string) => {
        const industry = industries.find(ind => ind.id === industryId);
        setSelectedIndustry(industry || null);
        setSelectedCategory(industryId as CategoryType);
        setCurrentView('category');
    };

    const handleBackToIndustries = () => {
        setCurrentView('industries');
        setSelectedCategory('all');
        setSelectedIndustry(null);
    };

    const handleCategoryChange = (category: CategoryType) => {
        setSelectedCategory(category);
        if (category === 'industries') {
            setCurrentView('industries');
        } else {
            setCurrentView('category');
        }
    };

    // Categorías disponibles
    const categories = [
        { id: 'all' as CategoryType, name: t('marketplace.categories.all'), count: getAvailableModulesForTenant(userModules).length },
        { id: 'industries' as CategoryType, name: t('marketplace.categories.industries'), count: industries.length },
        { id: 'popular' as CategoryType, name: 'Populares', count: getPopularModules().filter(m => !userModules.includes(m.id)).length },
        { id: 'aquaculture' as CategoryType, name: t('marketplace.industries.aquaculture.name'), count: getModulesByCategory().aquaculture.filter(m => !userModules.includes(m.id)).length },
        { id: 'livestock' as CategoryType, name: t('marketplace.industries.livestock.name'), count: getModulesByCategory().livestock.filter(m => !userModules.includes(m.id)).length },
        { id: 'poultry' as CategoryType, name: t('marketplace.industries.poultry.name'), count: getModulesByCategory().poultry.filter(m => !userModules.includes(m.id)).length },
    ];

    return (
        <div className="min-h-screen bg-surface">
            {/* Header */}
            <div className="bg-gradient-primary text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div className=''>
                            <div className="flex items-center gap-3 mb-4">
                                {currentView !== 'industries' && (
                                    <button
                                        onClick={handleBackToIndustries}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <ShoppingCart size={24} />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold mb-2 text-primary">
                                {currentView === 'industries'
                                    ? t('marketplace.title')
                                    : selectedIndustry
                                        ? t(selectedIndustry.name)
                                        : t('marketplace.categories.modules')
                                }
                            </h1>
                            <p className="text-blue-100 text-lg text-secondary">
                                {currentView === 'industries'
                                    ? t('marketplace.subtitle')
                                    : selectedIndustry
                                        ? t(selectedIndustry.description)
                                        : 'Explora módulos y servicios especializados'
                                }
                            </p>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{getAvailableModulesForTenant(userModules).length}</div>
                                <div className="text-sm text-blue-200">Módulos disponibles</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{marketplacePackages.length}</div>
                                <div className="text-sm text-blue-200">Paquetes especiales</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navegación y Filtros */}
            <div className="bg-surface-secondary border-b border-default">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                        {/* Búsqueda */}
                        <div className="relative flex-1 max-w-md">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder={t('marketplace.search.placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-default rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            />
                        </div>

                        {/* Controles de vista */}
                        {currentView !== 'industries' && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted hover:text-primary'}`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted hover:text-primary'}`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Categorías */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-secondary hover:bg-hover'
                                    }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Vista de Industrias */}
                {currentView === 'industries' && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Selecciona tu industria
                            </h2>
                            <p className="text-secondary">
                                Cada industria tiene módulos especializados diseñados para tus necesidades específicas
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {industries.map((industry) => (
                                <IndustryCard
                                    key={industry.id}
                                    industry={industry}
                                    onSelect={handleIndustrySelect}
                                />
                            ))}
                        </div>

                        {/* Paquetes Destacados */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <Package size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">Paquetes Especiales</h2>
                                    <p className="text-secondary">Combos con descuentos exclusivos</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {marketplacePackages.map((pkg) => (
                                <PackageCard
                                    key={pkg.id}
                                    package={pkg}
                                    onPurchase={(packageId) => marketplaceActions.onPurchase('package', packageId)}
                                    onViewDetails={(packageId) => marketplaceActions.onViewDetails('package', packageId)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Vista de Categoría/Módulos */}
                {currentView === 'category' && (
                    <div>
                        {/* Módulos */}
                        {filteredModules.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Zap size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-primary">
                                            Módulos {selectedIndustry ? `de ${t(selectedIndustry.name)}` : 'Disponibles'}
                                        </h2>
                                        <p className="text-secondary">
                                            {filteredModules.length} módulos encontrados
                                        </p>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="card p-6 animate-pulse">
                                                <div className="w-full h-32 bg-surface-secondary rounded-lg mb-4" />
                                                <div className="h-4 bg-surface-secondary rounded mb-2" />
                                                <div className="h-3 bg-surface-secondary rounded w-3/4" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={`grid gap-6 ${viewMode === 'grid'
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                        : 'grid-cols-1'
                                        }`}>
                                        {filteredModules.map((module) => (
                                            <ModuleCard
                                                key={module.id}
                                                module={module}
                                                onPurchase={(moduleId) => marketplaceActions.onPurchase('module', moduleId)}
                                                onViewDetails={(moduleId) => marketplaceActions.onViewDetails('module', moduleId)}
                                                isOwned={userModules.includes(module.id)}
                                                viewMode={viewMode}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Servicios Adicionales */}
                        {filteredServices.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                        <Sparkles size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-primary">Servicios Adicionales</h2>
                                        <p className="text-secondary">
                                            Potencia tus módulos con funcionalidades especializadas
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredServices.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            onPurchase={(serviceId, moduleId) =>
                                                marketplaceActions.onPurchase('service', serviceId, { moduleId })
                                            }
                                            isOwned={userServices.includes(service.id)}
                                            isModuleOwned={userModules.includes(service.moduleId)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Estado vacío */}
                        {!isLoading && filteredModules.length === 0 && filteredServices.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={32} className="text-muted" />
                                </div>
                                <h3 className="text-xl font-semibold text-secondary mb-2">
                                    {searchTerm ? t('marketplace.search.noResults') : 'No hay contenido disponible'}
                                </h3>
                                <p className="text-muted mb-6 max-w-md mx-auto">
                                    {searchTerm
                                        ? t('marketplace.search.noResultsDescription')
                                        : 'Todos los módulos de esta categoría ya están en tu cuenta'
                                    }
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="btn-secondary px-6 py-3"
                                    >
                                        Limpiar búsqueda
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
