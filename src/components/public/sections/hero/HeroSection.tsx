'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { HeroSectionProps } from '@/components/types/public/HeroSection.types';
import Image from 'next/image';

export default function HeroSection({
    lng,
    title,
    subtitle,
    description,
    ctaText,
    ctaLink = `/${lng}/auth/sign-in`,
    showLogo = true,
    className = ''
}: HeroSectionProps) {
    const t = useTranslations();

    const features = [
        { key: 'automation', icon: CheckCircle },
        { key: 'monitoring', icon: CheckCircle },
        { key: 'optimization', icon: CheckCircle }
    ];

    return (
        <section
            id="home"
            className={`relative min-h-screen flex items-center justify-center bg-surface ${className}`}
        >
            <div className="absolute inset-0 opacity-30">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 0%, transparent 50%),
                                         radial-gradient(circle at 75% 75%, var(--color-accent) 0%, transparent 50%)`,
                        filter: 'blur(100px)'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {showLogo && (
                        <div className="flex justify-center lg:justify-start order-1 lg:order-1">
                            <div className="relative">
                                <div className="logo-glow">
                                    <Image
                                        alt="Quanta Innovation Lab"
                                        src='/logos/Quanta.png'
                                        width={320}
                                        height={320}
                                        className='rounded-full object-cover transition-transform hover:scale-105 duration-300'
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center lg:text-left order-2 lg:order-2">


                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-6 leading-tight">
                            <span className="gradient-text">
                                {title || t('dashboard.landing.heroSection.title')}
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-secondary mb-6 leading-relaxed">
                            {subtitle || t('dashboard.landing.heroSection.subtitle')}
                        </p>

                        <p className="text-lg text-muted mb-8 max-w-2xl mx-auto lg:mx-0">
                            {description || t('dashboard.landing.heroSection.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.key}
                                    className="flex items-center gap-2 bg-surface-secondary backdrop-blur-sm rounded-lg px-3 py-2 border border-default transition-colors hover-surface"
                                >
                                    <CheckCircle size={16} className="text-success" />
                                    <span className="text-sm font-medium text-secondary">
                                        {t(`dashboard.landing.heroSection.features.${feature.key}`)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                            <a
                                href={ctaLink}
                                className="btn-primary inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base sm:text-lg w-[90%] sm:w-auto max-w-sm sm:max-w-none group"
                            >
                                <span>{ctaText || t('dashboard.landing.heroSection.cta')}</span>
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform duration-200"
                                />
                            </a>

                            <button
                                className="btn-secondary inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base sm:text-lg w-[90%] sm:w-auto max-w-sm sm:max-w-none group"
                            >
                                <Play size={20} className="text-primary" />
                                <span>{t('dashboard.landing.heroSection.watchDemo', { default: 'Ver Demo' })}</span>
                            </button>
                        </div>

                        <div className="pt-8 border-t border-default">
                            <p className="text-sm text-muted mb-6 text-center lg:text-left">
                                {t('dashboard.landing.heroSection.trustedBy', { default: 'Confiado por' })}
                            </p>

                            <div className="flex flex-col sm:hidden gap-4 opacity-70">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">50+</span>
                                    <span className="text-sm text-secondary">Empresas Conectadas</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">15K+</span>
                                    <span className="text-sm text-secondary">Ciclos Gestionados</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">25%</span>
                                    <span className="text-sm text-secondary">Ahorro Promedio</span>
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center justify-center lg:justify-start gap-6 lg:gap-8 opacity-70">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">50+</div>
                                    <div className="text-xs lg:text-sm text-muted">Empresas</div>
                                </div>
                                <div className="w-px h-8 bg-border" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">15K+</div>
                                    <div className="text-xs lg:text-sm text-muted">Ciclos</div>
                                </div>
                                <div className="w-px h-8 bg-border" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">25%</div>
                                    <div className="text-xs lg:text-sm text-muted">Ahorro</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
