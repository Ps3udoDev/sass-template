'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Eye, Check, Star, Crown, Sparkles } from 'lucide-react';
import { ModuleCardProps } from '../types/marketplace.types';

export default function ModuleCard({
    module,
    onPurchase,
    onViewDetails,
    isOwned = false,
    viewMode = 'grid',
    className = ''
}: ModuleCardProps) {
    const t = useTranslations();

    // Renderizado en modo lista
    if (viewMode === 'list') {
        return (
            <div className={`card p-6 ${className}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                            <Image
                                src={module.icon}
                                alt={t(module.name)}
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-primary">{t(module.name)}</h3>
                                {module.isPopular && <Star size={16} className="text-warning fill-current" />}
                                {module.isPremium && <Crown size={16} className="text-secondary" />}
                                {module.isNew && <Sparkles size={16} className="text-accent" />}
                            </div>
                            <p className="text-secondary mb-2">{t(module.description)}</p>
                            <p className="text-sm text-muted">{t(module.subtitle)}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${module.basePrice}</div>
                            <div className="text-sm text-muted">{module.currency}/mes</div>
                        </div>

                        {isOwned ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-success-light rounded-lg">
                                <Check size={16} className="text-success" />
                                <span className="text-success font-medium">Adquirido</span>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onViewDetails(module.id)}
                                    className="btn-secondary px-4 py-2 flex items-center gap-2"
                                >
                                    <Eye size={16} />
                                    Ver
                                </button>
                                <button
                                    onClick={() => onPurchase(module.id)}
                                    className="btn-primary px-4 py-2 flex items-center gap-2"
                                >
                                    <ShoppingCart size={16} />
                                    Comprar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Renderizado en modo grid
    return (
        <div className={`card relative overflow-hidden transition-all duration-300 hover:scale-105 hover-surface min-h-[400px] ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={module.icon}
                        alt={t(module.name)}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-500 opacity-80"
                        priority={false}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
                </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
                {module.isPopular && (
                    <span className="bg-warning/90 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} className="fill-current" />
                        Popular
                    </span>
                )}
                {module.isPremium && (
                    <span className="bg-secondary/90 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Crown size={12} />
                        Premium
                    </span>
                )}
                {module.isNew && (
                    <span className="bg-accent/90 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles size={12} />
                        Nuevo
                    </span>
                )}
            </div>

            {/* Owned Badge */}
            {isOwned && (
                <div className="absolute top-4 right-4 bg-success/90 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} />
                    Adquirido
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 p-6 pt-32 pb-20 text-center">
                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-3">
                    {t(module.name)}
                </h3>

                {/* Description */}
                <p className="text-sm text-secondary mb-3 leading-relaxed">
                    {t(module.description)}
                </p>

                {/* Subtitle */}
                <p className="text-xs text-muted opacity-75 mb-4">
                    {t(module.subtitle)}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                    {module.baseFeatures.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-secondary">
                            <Check size={12} className="text-success mr-2 flex-shrink-0" />
                            <span>{t(feature)}</span>
                        </div>
                    ))}
                    {module.baseFeatures.length > 3 && (
                        <p className="text-xs text-muted">
                            +{module.baseFeatures.length - 3} características más
                        </p>
                    )}
                </div>

                {/* Additional Services Count */}
                {module.additionalServices.length > 0 && (
                    <div className="text-xs text-primary mb-4">
                        {module.additionalServices.length} servicios adicionales disponibles
                    </div>
                )}
            </div>

            {/* Footer - positioned absolutely */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-surface border-t border-default">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-xl font-bold text-primary">${module.basePrice}</div>
                        <div className="text-xs text-muted">{module.currency}/mes</div>
                    </div>

                    {!isOwned && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onViewDetails(module.id)}
                                className="btn-secondary px-3 py-2 text-sm flex items-center gap-1"
                            >
                                <Eye size={14} />
                                Ver
                            </button>
                            <button
                                onClick={() => onPurchase(module.id)}
                                className="btn-primary px-3 py-2 text-sm flex items-center gap-1"
                            >
                                <ShoppingCart size={14} />
                                Comprar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
