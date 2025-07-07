'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Eye, Check, Star, Gift, ArrowRight } from 'lucide-react';
import { PackageCardProps } from '../types/marketplace.types';

export default function PackageCard({
    package: pkg,
    onPurchase,
    onViewDetails,
    className = ''
}: PackageCardProps) {
    const t = useTranslations();

    return (
        <div className={`card relative overflow-hidden transition-all duration-300 hover:scale-105 hover-surface ${className} ${pkg.isPopular ? 'ring-2 ring-primary' : ''}`}>

            {/* Popular Badge */}
            {pkg.isPopular && (
                <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    <Star size={12} className="inline mr-1 fill-current" />
                    MÁS POPULAR
                </div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-error text-white text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-1">
                <Gift size={14} />
                -{pkg.discount}%
            </div>

            <div className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                        {pkg.name}
                    </h3>
                    <p className="text-sm text-secondary mb-4">
                        {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-lg text-muted line-through">
                                ${pkg.originalPrice}
                            </span>
                            <ArrowRight size={16} className="text-muted" />
                            <span className="text-3xl font-bold text-primary">
                                ${pkg.discountedPrice}
                            </span>
                        </div>
                        <div className="text-sm text-muted">
                            {pkg.currency}/mes
                        </div>
                        <div className="text-sm font-medium text-success">
                            Ahorras ${pkg.originalPrice - pkg.discountedPrice}/mes
                        </div>
                    </div>
                </div>

                {/* What's included */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-3">
                        ✨ Lo que incluye:
                    </h4>
                    <div className="space-y-2">
                        {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-start text-sm text-secondary">
                                <Check size={14} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modules and Services Count */}
                <div className="mb-6 p-3 bg-surface-secondary rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold text-primary">{pkg.modules.length}</div>
                            <div className="text-xs text-muted">Módulos</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-primary">{pkg.services.length}</div>
                            <div className="text-xs text-muted">Servicios</div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onViewDetails(pkg.id)}
                        className="btn-secondary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                    >
                        <Eye size={16} />
                        Ver detalles
                    </button>
                    <button
                        onClick={() => onPurchase(pkg.id)}
                        className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 font-semibold"
                    >
                        <ShoppingCart size={16} />
                        Comprar ahora
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-4 pt-4 border-t border-default text-center">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted">
                        <div className="flex items-center gap-1">
                            <Check size={12} className="text-success" />
                            Activación inmediata
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={12} className="text-success" />
                            Soporte incluido
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
