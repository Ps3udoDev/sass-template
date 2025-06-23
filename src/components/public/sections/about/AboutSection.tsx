'use client';

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import { Building2, TrendingUp, Users, Award, BarChart3, Target } from 'lucide-react';
import { AboutSectionProps, AboutStat } from '@/components/types/public/AboutSection.types';

// Default stats con iconos representativos
const defaultStats: AboutStat[] = [
    {
        number: "15+",
        label: "dashboard.landing.aboutSection.stats.stat1.label",
        icon: "Building2",
        color: "from-blue-500 to-cyan-500"
    },
    {
        number: "2,500+",
        label: "dashboard.landing.aboutSection.stats.stat2.label",
        icon: "BarChart3",
        color: "from-green-500 to-emerald-500"
    },
    {
        number: "18%",
        label: "dashboard.landing.aboutSection.stats.stat3.label",
        icon: "TrendingUp",
        color: "from-primary to-blue-600"
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
    backgroundStyle = 'subtle-gradient',
    className = ''
}: AboutSectionProps) {
    const t = useTranslations();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const getBackgroundClasses = () => {
        switch (backgroundStyle) {
            case 'subtle-gradient':
                return 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800';
            case 'clean':
                return 'bg-white dark:bg-gray-900';
            default:
                return '';
        }
    };

    const renderStat = (stat: AboutStat, index: number) => {
        const IconComponent = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : Target;

        return (
            <motion.div
                key={index}
                className="text-center group"
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {/* Icon with gradient background */}
                <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-2xl
                    bg-gradient-to-r ${stat.color}
                    flex items-center justify-center
                    shadow-lg group-hover:shadow-xl
                    transition-all duration-300
                    group-hover:rotate-3
                `}>
                    <IconComponent size={28} className="text-white" />
                </div>

                {/* Number */}
                <motion.div
                    className="text-3xl lg:text-4xl font-bold text-primary mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                    {stat.number}
                </motion.div>

                {/* Label */}
                <div className="text-sm lg:text-base text-secondary dark:text-secondary-dark font-medium leading-tight">
                    {t(stat.label)}
                </div>
            </motion.div>
        );
    };

    return (
        <section
            id="about"
            className={`py-16 lg:py-24 relative overflow-hidden ${getBackgroundClasses()} ${className}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className={`
                        grid gap-12 lg:gap-16 items-center
                        ${variant === 'centered' ? 'text-center' : 'lg:grid-cols-2'}
                    `}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Content Section */}
                    <motion.div
                        className={`${variant === 'centered' ? 'max-w-4xl mx-auto' : ''}`}
                        variants={itemVariants}
                    >
                        {/* Badge/Pill */}
                        <motion.div
                            className={`inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 mb-6 ${variant === 'centered' ? 'mx-auto' : ''
                                }`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">
                                {t('dashboard.landing.aboutSection.badge', { default: 'Nuestra Misión' })}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className={`
                                text-3xl lg:text-4xl xl:text-5xl font-bold
                                text-foreground dark:text-foreground-dark
                                mb-6 leading-tight
                                ${variant === 'centered' ? 'text-center' : 'text-left lg:text-left'}
                            `}
                            variants={itemVariants}
                        >
                            {title || t('dashboard.landing.aboutSection.title')}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className={`
                                text-lg lg:text-xl text-secondary dark:text-secondary-dark
                                leading-relaxed
                                ${variant === 'centered' ? 'text-center max-w-3xl mx-auto' : 'text-left lg:text-left'}
                            `}
                            variants={itemVariants}
                        >
                            {description || t('dashboard.landing.aboutSection.description')}
                        </motion.p>

                        {/* Additional content for non-centered variants */}
                        {variant !== 'centered' && (
                            <motion.div
                                className="mt-8 space-y-4"
                                variants={itemVariants}
                            >
                                {/* Key points */}
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-secondary dark:text-secondary-dark">
                                        {t('dashboard.landing.aboutSection.point1', {
                                            default: 'Tecnología adaptable desde pequeñas granjas hasta operaciones industriales'
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-secondary dark:text-secondary-dark">
                                        {t('dashboard.landing.aboutSection.point2', {
                                            default: 'Facilita monitoreo, toma de decisiones y colaboración en equipo'
                                        })}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Stats Section */}
                    {showStats && (
                        <motion.div
                            className={`
                                ${variant === 'centered' ? 'mt-12' : ''}
                            `}
                            variants={itemVariants}
                        >
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
                            <motion.p
                                className="text-center text-sm text-secondary dark:text-secondary-dark mt-8 opacity-75"
                                variants={itemVariants}
                            >
                                {t('dashboard.landing.aboutSection.statsNote', {
                                    default: 'Datos actualizados al último trimestre'
                                })}
                            </motion.p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
        </section>
    );
}
