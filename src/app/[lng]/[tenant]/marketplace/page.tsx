'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    Star,
    Crown,
    ShoppingCart,
    Check,
    Filter,
    Search,
    Grid,
    List
} from 'lucide-react';
import {
    getAvailableModulesForTenant,
    getModulesByCategory,
    MarketplaceModule
} from '@/modules/marketplaceConfig';

interface GlobalMarketplaceProps {
    params: Promise<{ lng: string; tenant: string }>;
}

export default function GlobalMarketplace({ params }: GlobalMarketplaceProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant } = resolvedParams;
    const t = useTranslations();

    const [ownedModules, setOwnedModules] = useState<string[]>([]);
    const [availableModules, setAvailableModules] = useState<MarketplaceModule[]>([]);
    const [filteredModules, setFilteredModules] = useState<MarketplaceModule[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        // Cargar módulos del usuario desde localStorage
        if (typeof window !== 'undefined') {
            const session = JSON.parse(localStorage.getItem('session') || '{}');
            const userModules = session.modules || [];
            setOwnedModules(userModules);

            // Obtener módulos disponibles para comprar
            const available = getAvailableModulesForTenant(userModules);
            setAvailableModules(available);
            setFilteredModules(available);
        }
    }, []);

    // Filtrar módulos
    useEffect(() => {
        let filtered = availableModules;

        // Filtrar por categoría
        if (selectedCategory !== 'all') {
            const categories = getModulesByCategory();
            filtered = categories[selectedCategory as keyof typeof categories] || [];
            // Mantener solo los que no están comprados
            filtered = filtered.filter(mod => !ownedModules.includes(mod.id));
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(module =>
                t(module.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                t(module.description).toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredModules(filtered);
    }, [selectedCategory, searchTerm, availableModules, ownedModules, t]);

    const handlePurchase = (moduleId: string) => {
        // Simular compra
        alert(`Comprando módulo: ${moduleId}`);
        // Aquí integrarías con tu sistema de pagos
    };

    const categories = [
        { id: 'all', name: 'Todos', count: availableModules.length },
        { id: 'livestock', name: 'Ganadería', count: getModulesByCategory().livestock.filter(m => !ownedModules.includes(m.id)).length },
        { id: 'aquaculture', name: 'Acuicultura', count: getModulesByCategory().aquaculture.filter(m => !ownedModules.includes(m.id)).length },
        { id: 'crops', name: 'Agricultura', count: getModulesByCategory().crops.filter(m => !ownedModules.includes(m.id)).length },
        { id: 'popular', name: 'Populares', count: getModulesByCategory().popular.filter(m => !ownedModules.includes(m.id)).length },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Marketplace de Módulos</h1>
                <p className="text-blue-100">
                    Expande las capacidades de tu empresa con nuevos módulos especializados
                </p>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Búsqueda */}
                    <div className="relative flex-1 max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar módulos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Vista */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name} ({category.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de módulos */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredModules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        module={module}
                        onPurchase={handlePurchase}
                        viewMode={viewMode}
                        t={t}
                    />
                ))}
            </div>

            {filteredModules.length === 0 && (
                <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay módulos disponibles</h3>
                    <p className="text-gray-600">
                        {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Ya tienes todos los módulos disponibles'}
                    </p>
                </div>
            )}
        </div>
    );
}

// Componente para cada tarjeta de módulo
interface ModuleCardProps {
    module: MarketplaceModule;
    onPurchase: (moduleId: string) => void;
    viewMode: 'grid' | 'list';
    t: any;
}

function ModuleCard({ module, onPurchase, viewMode, t }: ModuleCardProps) {
    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={module.icon} alt={t(module.name)} className="w-12 h-12 object-contain" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-gray-900">{t(module.name)}</h3>
                                {module.isPopular && <Star size={16} className="text-yellow-500 fill-current" />}
                                {module.isPremium && <Crown size={16} className="text-purple-500" />}
                            </div>
                            <p className="text-gray-600 text-sm">{t(module.description)}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">${module.price}</div>
                            <div className="text-sm text-gray-500">{module.currency}/mes</div>
                        </div>
                        <button
                            onClick={() => onPurchase(module.id)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <ShoppingCart size={16} />
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header con badges */}
            <div className="relative p-6 pb-4">
                {(module.isPopular || module.isPremium) && (
                    <div className="absolute top-4 right-4 flex gap-1">
                        {module.isPopular && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <Star size={12} className="fill-current" />
                                Popular
                            </span>
                        )}
                        {module.isPremium && (
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <Crown size={12} />
                                Premium
                            </span>
                        )}
                    </div>
                )}

                <img src={module.icon} alt={t(module.name)} className="w-16 h-16 object-contain mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(module.name)}</h3>
                <p className="text-gray-600 text-sm">{t(module.description)}</p>
            </div>

            {/* Features */}
            <div className="px-6 pb-4">
                <ul className="space-y-2">
                    {module.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                            <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                    {module.features.length > 3 && (
                        <li className="text-sm text-gray-500">
                            +{module.features.length - 3} características más
                        </li>
                    )}
                </ul>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">${module.price}</div>
                        <div className="text-sm text-gray-500">{module.currency}/mes</div>
                    </div>
                    <button
                        onClick={() => onPurchase(module.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <ShoppingCart size={16} />
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
