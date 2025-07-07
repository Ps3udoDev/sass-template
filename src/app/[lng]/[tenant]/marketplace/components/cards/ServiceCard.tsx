'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, ShoppingCart, Check, Star, Crown, Plus } from 'lucide-react';
import { ServiceCardProps } from '../types/marketplace.types';

export default function ServiceCard({
    service,
    onPurchase,
    onViewDetails,
    isOwned = false,
    isModuleOwned = false,
    className = ''
}: ServiceCardProps) {
    const t = useTranslations();

    const handlePurchase = () => {
        if (!isOwned && isModuleOwned) {
            onPurchase(service.id, service.moduleId);
        }
    };

    const canPurchase = !isOwned && isModuleOwned;
    const needsModule = !isOwned && !isModuleOwned;

    return (
        <div className={`card relative p-6 transition-all duration-300 hover-surface ${className} ${canPurchase ? 'hover:scale-105' : ''}`}>

            {/* Badges */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                    {service.isPopular && (
                        <span className="bg-warning/10 text-warning text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            <Star size={10} className="fill-current" />
                            Popular
                        </span>
                    )}
                    {service.isPremium && (
                        <span className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            <Crown size={10} />
                            Premium
                        </span>
                    )}
                </div>

                {isOwned && (
                    <div className="bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Check size={10} />
                        Activo
                    </div>
                )}
            </div>

            {/* Icon */}
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">{service.icon}</span>
            </div>

            {/* Content */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-primary mb-2">
                    {t(service.name)}
                </h4>

                <p className="text-sm text-secondary mb-4 leading-relaxed">
                    {t(service.description)}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-secondary">
                            <Check size={12} className="text-success mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                    {service.features.length > 3 && (
                        <p className="text-xs text-muted">
                            +{service.features.length - 3} características más
                        </p>
                    )}
                </div>
            </div>

            {/* Price and Action */}
            <div className="border-t border-default pt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-bold text-primary">${service.price}</div>
                        <div className="text-xs text-muted">{service.currency}/mes</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {isOwned ? (
                            <div className="flex items-center gap-2 px-3 py-2 bg-success-light rounded-lg">
                                <Check size={14} className="text-success" />
                                <span className="text-success font-medium text-sm">Activo</span>
                            </div>
                        ) : canPurchase ? (
                            <div className="flex gap-2">
                                {onViewDetails && (
                                    <button
                                        onClick={() => onViewDetails(service.id)}
                                        className="btn-secondary px-3 py-2 text-sm"
                                    >
                                        Ver
                                    </button>
                                )}
                                <button
                                    onClick={handlePurchase}
                                    className="btn-primary px-3 py-2 text-sm flex items-center gap-1"
                                >
                                    <Plus size={14} />
                                    Agregar
                                </button>
                            </div>
                        ) : needsModule ? (
                            <div className="text-center">
                                <div className="text-xs text-muted mb-2">
                                    Requiere módulo base
                                </div>
                                <button
                                    className="btn-secondary px-3 py-2 text-sm cursor-not-allowed opacity-50"
                                    disabled
                                >
                                    No disponible
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
