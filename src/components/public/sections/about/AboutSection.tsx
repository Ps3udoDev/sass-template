'use client';

import { useTranslations } from 'next-intl';
import { Building2, TrendingUp, Users, Award, BarChart3, Target } from 'lucide-react';
import { AboutSectionProps, AboutStat } from '@/components/types/public/AboutSection.types';

// Default stats con iconos representativos
const defaultStats: AboutStat[] = [
    {
        number: "15+",
        label: "dashboard.landing.aboutSection.stats.stat1.label",
        icon: "Building2",
        color: "gradient-primary"
    },
    {
        number: "2,500+",
        label: "dashboard.landing.aboutSection.stats.stat2.label",
        icon: "BarChart3",
        color: "gradient-primary"
    },
    {
        number: "18%",
        label: "dashboard.landing.aboutSection.stats.stat3.label",
        icon: "TrendingUp",
        color: "gradient-primary"
    }
];

const iconMap = {
    Building2,
    TrendingUp,
    Users,
    Award,
    BarChart3,
    Target
};

export default function AboutSection({
    lng,
    title,
    description,
    stats = defaultStats,
    showStats = true,
    variant = 'default',
    backgroundStyle = 'clean',
    className = ''
}: AboutSectionProps) {
    const t = useTranslations();

    const getBackgroundClasses = () => {
        switch (backgroundStyle) {
            case 'surface':
                return 'bg-surface-secondary';
            case 'clean':
            default:
                return 'bg-surface';
        }
    };

    const renderStat = (stat: AboutStat, index: number) => {
        const IconComponent = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : Target;

        return (
            <div
                key={index}
                className="text-center group transition-transform hover:scale-105 duration-300"
            >
                {/* Icon with gradient background */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <IconComponent size={28} className="text-white" />
                </div>

                {/* Number */}
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                </div>

                {/* Label */}
                <div className="text-sm lg:text-base text-secondary font-medium leading-tight">
                    {t(stat.label)}
                </div>
            </div>
        );
    };

    return (
        <section
            id="about"
            className={`py-16 lg:py-24 relative ${getBackgroundClasses()} ${className}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className={`
                    grid gap-12 lg:gap-16 items-center
                    ${variant === 'centered' ? 'text-center' : 'lg:grid-cols-2'}
                `}>

                    {/* Content Section */}
                    <div className={`${variant === 'centered' ? 'max-w-4xl mx-auto' : ''}`}>

                        {/* Badge/Pill */}
                        <div className={`
                            inline-flex items-center gap-2
                            bg-primary/10 rounded-full px-4 py-2 mb-6
                            border border-primary/20
                            ${variant === 'centered' ? 'mx-auto' : ''}
                        `}>
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">
                                {t('dashboard.landing.aboutSection.badge', { default: 'Nuestra Misión' })}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className={`
                            text-3xl lg:text-4xl xl:text-5xl font-bold
                            text-primary mb-6 leading-tight
                            ${variant === 'centered' ? 'text-center' : 'text-left lg:text-left'}
                        `}>
                            <span className="gradient-text">
                                {title || t('dashboard.landing.aboutSection.title')}
                            </span>
                        </h2>

                        {/* Description */}
                        <p className={`
                            text-lg lg:text-xl text-secondary leading-relaxed
                            ${variant === 'centered' ? 'text-center max-w-3xl mx-auto' : 'text-left lg:text-left'}
                        `}>
                            {description || t('dashboard.landing.aboutSection.description')}
                        </p>

                        {/* Additional content for non-centered variants */}
                        {variant !== 'centered' && (
                            <div className="mt-8 space-y-4">
                                {/* Key points */}
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/20">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-secondary">
                                        {t('dashboard.landing.aboutSection.point1', {
                                            default: 'Tecnología adaptable desde pequeñas granjas hasta operaciones industriales'
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/20">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-secondary">
                                        {t('dashboard.landing.aboutSection.point2', {
                                            default: 'Facilita monitoreo, toma de decisiones y colaboración en equipo'
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/20">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-secondary">
                                        {t('dashboard.landing.aboutSection.point3', {
                                            default: 'Soluciones escalables con soporte técnico especializado'
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    {showStats && (
                        <div className={`${variant === 'centered' ? 'mt-12' : ''}`}>

                            {/* Stats Grid */}
                            <div className={`
                                grid gap-8 lg:gap-12
                                ${variant === 'centered'
                                    ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto'
                                    : 'grid-cols-1 sm:grid-cols-3'
                                }
                            `}>
                                {stats.map((stat, index) => renderStat(stat, index))}
                            </div>

                            {/* Bottom text for stats */}
                            <p className="text-center text-sm text-muted mt-8 opacity-75">
                                {t('dashboard.landing.aboutSection.statsNote', {
                                    default: 'Datos actualizados al último trimestre'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
