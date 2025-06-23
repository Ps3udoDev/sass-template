'use client';

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import { ModulesSectionProps, Module } from '@/components/types/public/ModulesSection.types';
import ModuleCard from './ModuleCard';
import { defaultModules } from '@/data/modules.mock';

// Default modules - Solo 2 por ahora


export default function ModulesSection({
    lng,
    title,
    subtitle,
    description,
    modules = defaultModules,
    showCTA = true,
    ctaText,
    backgroundStyle = 'clean',
    className = ''
}: ModulesSectionProps) {
    const t = useTranslations();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.3
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

    const getBackgroundClasses = () => {
        switch (backgroundStyle) {
            case 'subtle':
                return 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800';
            case 'clean':
                return 'bg-white dark:bg-gray-900';
            default:
                return '';
        }
    };

    // Translate modules data
    const translatedModules = modules.map(module => ({
        ...module,
        title: t(module.title),
        description: t(module.description)
    }));

    return (
        <section
            id="modules"
            className={`py-16 lg:py-24 relative overflow-hidden ${getBackgroundClasses()} ${className}`}
        >
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 mb-6"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-primary">
                            {t('dashboard.landing.modulesSection.badge', { default: 'Módulos Especializados' })}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-foreground-dark mb-6 leading-tight"
                        variants={itemVariants}
                    >
                        {title || t('dashboard.landing.modulesSection.title')}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-relaxed"
                        variants={itemVariants}
                    >
                        {description || t('dashboard.landing.modulesSection.description')}
                    </motion.p>
                </motion.div>
            </div>

            {/* Modules Cards - Alternating Layout */}
            <div className="space-y-0">
                {translatedModules.map((module, index) => (
                    <ModuleCard
                        key={module.id}
                        module={module}
                        index={index}
                        imagePosition={index % 2 === 0 ? 'right' : 'left'}
                        className={`
                            ${index !== translatedModules.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}
                            ${index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-gray-800/30'}
                        `}
                    />
                ))}
            </div>

            {/* Bottom CTA Section */}
            {showCTA && (
                <motion.div
                    className="max-w-7xl mx-auto px-6 mt-16 lg:mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="text-center ">
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground dark:text-foreground-dark mb-4">
                            {t('dashboard.landing.modulesSection.cta.title', {
                                default: '¿No encuentras el módulo que necesitas?'
                            })}
                        </h3>
                        <p className="text-lg text-secondary dark:text-secondary-dark mb-8 max-w-2xl mx-auto">
                            {t('dashboard.landing.modulesSection.cta.description', {
                                default: 'Trabajamos contigo para desarrollar módulos personalizados que se adapten perfectamente a tu operación específica'
                            })}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {ctaText || t('dashboard.landing.modulesSection.cta.button', {
                                    default: 'Solicitar módulo personalizado'
                                })}
                            </motion.button>
                            <motion.button
                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-white dark:text-foreground-dark px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('dashboard.landing.modulesSection.cta.demo', {
                                    default: 'Ver todos los módulos'
                                })}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-32" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-48" />
        </section>
    );
}
