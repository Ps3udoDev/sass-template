'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';
import { IndustryCardProps } from '../types/marketplace.types';

export default function IndustryCard({
    industry,
    onSelect,
    className = ''
}: IndustryCardProps) {
    const t = useTranslations();

    return (
        <div
            onClick={() => onSelect(industry.id)}
            className={`
                card relative overflow-hidden cursor-pointer group
                transition-all duration-300 hover:scale-105 hover-surface
                min-h-[320px] ${className}
            `}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={industry.icon}
                        alt={t(industry.name)}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-500 opacity-90"
                        priority={false}
                    />
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"
                        style={{
                            background: `linear-gradient(to bottom,
                                ${industry.color}20 0%,
                                ${industry.color}40 30%,
                                var(--color-surface) 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Hover indicator */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ArrowRight size={20} className="text-white" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 pt-32 text-center h-full flex flex-col">
                <div className="flex-grow">
                    {/* Industry Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Building2 size={32} className="text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-hover transition-colors">
                        {t(industry.name)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-secondary mb-2 leading-relaxed">
                        {t(industry.description)}
                    </p>

                    {/* Subtitle */}
                    <p className="text-xs text-muted opacity-75">
                        {t(industry.subtitle)}
                    </p>

                    {/* Modules count */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-primary">
                            {industry.modules.length} {industry.modules.length === 1 ? 'módulo' : 'módulos'}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-default">
                    <div className="flex items-center justify-center text-xs text-muted group-hover:text-primary transition-colors">
                        <span>Explorar módulos</span>
                        <ArrowRight size={12} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}
