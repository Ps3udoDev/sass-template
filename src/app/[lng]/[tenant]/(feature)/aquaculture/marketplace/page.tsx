'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
    Star,
    Crown,
    ShoppingCart,
    Check,
    ArrowLeft,
    Zap,
    Fish
} from 'lucide-react';
import {
    getAvailableSubModulesForModule,
    MarketplaceSubModule
} from '@/modules/marketplaceConfig';
import { modulesConfig } from '@/modules/mockModules';
import Link from 'next/link';

interface AquacultureMarketplaceProps {
    params: Promise<{ lng: string; tenant: string }>;
}

export default function AquacultureMarketplace({ params }: AquacultureMarketplaceProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant } = resolvedParams;
    const t = useTranslations();
    const router = useRouter();

    const [ownedSubModules, setOwnedSubModules] = useState<string[]>([]);
    const [availableSubModules, setAvailableSubModules] = useState<MarketplaceSubModule[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedModule, setSelectedModule] = useState<string | null>(null);

    // Obtener módulos de acuicultura que el usuario tiene
    const aquacultureModules = modulesConfig.filter(module =>
        module.href.includes('aquaculture')
    );

    useEffect(() => {
        // Cargar submódulos del usuario desde localStorage
        if (typeof window !== 'undefined') {
            const session = JSON.parse(localStorage.getItem('session') || '{}');
            const userModules = session.modules || [];

            // Filtrar solo módulos de acuicultura que el usuario posee
            const ownedAquacultureModules = aquacultureModules.filter(module =>
                userModules.includes(module.id)
            );

            if (ownedAquacultureModules.length > 0) {
                // Si solo tiene un módulo, seleccionarlo automáticamente
                if (ownedAquacultureModules.length === 1) {
                    const moduleId = ownedAquacultureModules[0].id;
                    setSelectedModule(moduleId);
                    loadSubModulesForModule(moduleId);
                } else {
                    // Si tiene múltiples módulos, mostrar selector
                    setSelectedModule(ownedAquacultureModules[0].id);
                    loadSubModulesForModule(ownedAquacultureModules[0].id);
                }
            }
        }
    }, []);

    const loadSubModulesForModule = (moduleId: string) => {
        const userSubModules: string[] = []; // Aquí cargarías los submódulos comprados
        setOwnedSubModules(userSubModules);

        const available = getAvailableSubModulesForModule(moduleId, userSubModules);
        setAvailableSubModules(available);
    };

    const handleModuleChange = (moduleId: string) => {
        setSelectedModule(moduleId);
        loadSubModulesForModule(moduleId);
    };

    const handlePurchase = (subModuleId: string) => {
        alert(`Comprando submódulo: ${subModuleId} para ${selectedModule}`);
    };

    // Filtrar por categoría
    const getFilteredSubModules = () => {
        switch (selectedCategory) {
            case 'popular':
                return availableSubModules.filter(sub => sub.isPopular);
            case 'premium':
                return availableSubModules.filter(sub => sub.isPremium);
            case 'standard':
                return availableSubModules.filter(sub => !sub.isPopular && !sub.isPremium);
            default:
                return availableSubModules;
        }
    };

    // Obtener módulos de acuicultura que el usuario posee
    const getUserAquacultureModules = () => {
        if (typeof window !== 'undefined') {
            const session = JSON.parse(localStorage.getItem('session') || '{}');
            const userModules = session.modules || [];
            return aquacultureModules.filter(module => userModules.includes(module.id));
        }
        return [];
    };

    const userAquacultureModules = getUserAquacultureModules();

    if (userAquacultureModules.length === 0) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Fish size={64} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        No tienes módulos de Acuicultura
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Para comprar submódulos de acuicultura, primero necesitas tener un módulo base.
                    </p>
                    <Link
                        href={`/${lng}/${tenant}/marketplace`}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ShoppingCart size={20} />
                        Ver Módulos Disponibles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/${lng}/${tenant}/dashboard`}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Marketplace - Acuicultura</h1>
                            <p className="text-cyan-100">
                                Submódulos especializados para tus módulos de acuicultura
                            </p>
                        </div>
                    </div>
                    <Fish size={48} className="text-cyan-200" />
                </div>
            </div>

            {/* Selector de módulo */}
            {userAquacultureModules.length > 1 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Selecciona el módulo para ver submódulos disponibles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userAquacultureModules.map((module) => (
                            <button
                                key={module.id}
                                onClick={() => handleModuleChange(module.id)}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedModule === module.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <img src={module.icon} alt={t(module.name)} className="w-8 h-8" />
                                    <div className="text-left">
                                        <h4 className="font-medium text-gray-900">{t(module.name)}</h4>
                                        <p className="text-sm text-gray-600">{t(module.description)}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Información del módulo seleccionado */}
            {selectedModule && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {(() => {
                                const module = aquacultureModules.find(m => m.id === selectedModule);
                                return module ? (
                                    <>
                                        <img src={module.icon} alt={t(module.name)} className="w-12 h-12" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                Submódulos para {t(module.name)}
                                            </h3>
                                            <p className="text-gray-600">{t(module.description)}</p>
                                        </div>
                                    </>
                                ) : null;
                            })()}
                        </div>
                    </div>

                    {/* Filtros por categoría */}
                    <div className="mt-6">
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Todos ({availableSubModules.length})
                            </button>
                            <button
                                onClick={() => setSelectedCategory('popular')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${selectedCategory === 'popular'
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    }`}
                            >
                                <Star size={14} />
                                Populares
                            </button>
                            <button
                                onClick={() => setSelectedCategory('premium')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${selectedCategory === 'premium'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                    }`}
                            >
                                <Crown size={14} />
                                Premium
                            </button>
                            <button
                                onClick={() => setSelectedCategory('standard')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${selectedCategory === 'standard'
                                        ? 'bg-gray-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Zap size={14} />
                                Estándar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de submódulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredSubModules().map((subModule) => (
                    <SubModuleCard
                        key={subModule.id}
                        subModule={subModule}
                        onPurchase={handlePurchase}
                        t={t}
                    />
                ))}
            </div>

            {getFilteredSubModules().length === 0 && selectedModule && (
                <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay submódulos disponibles</h3>
                    <p className="text-gray-600">
                        {selectedCategory === 'all'
                            ? 'Ya tienes todos los submódulos disponibles para este módulo'
                            : `No hay submódulos en la categoría "${selectedCategory}"`
                        }
                    </p>
                </div>
            )}
        </div>
    );
}

// Componente para cada tarjeta de submódulo (reutilizado)
interface SubModuleCardProps {
    subModule: MarketplaceSubModule;
    onPurchase: (subModuleId: string) => void;
    t: any;
}

function SubModuleCard({ subModule, onPurchase, t }: SubModuleCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative p-6 pb-4">
                {(subModule.isPopular || subModule.isPremium) && (
                    <div className="absolute top-4 right-4 flex gap-1">
                        {subModule.isPopular && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <Star size={12} className="fill-current" />
                                Popular
                            </span>
                        )}
                        {subModule.isPremium && (
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <Crown size={12} />
                                Premium
                            </span>
                        )}
                    </div>
                )}

                <div className="text-4xl mb-4">{subModule.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(subModule.name)}</h3>
                <p className="text-gray-600 text-sm">{t(subModule.description)}</p>
            </div>

            <div className="px-6 pb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Características:</h4>
                <ul className="space-y-2">
                    {subModule.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                            <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">${subModule.price}</div>
                        <div className="text-sm text-gray-500">{subModule.currency}/mes</div>
                    </div>
                    <button
                        onClick={() => onPurchase(subModule.id)}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
                    >
                        <ShoppingCart size={16} />
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
