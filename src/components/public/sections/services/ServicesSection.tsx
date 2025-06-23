'use client';

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import ServiceCard from './ServiceCard';
import { Service, ServicesSectionProps } from '@/components/types/public';

// Default services con iconos y colores
const defaultServices: Service[] = [
    {
        id: 'inventory',
        title: 'dashboard.landing.servicesSection.services.inventory.title',
        description: 'dashboard.landing.servicesSection.services.inventory.description',
        icon: 'Package',
        color: 'from-blue-500 to-cyan-500',
        features: [
            'Control en tiempo real',
            'Alertas automáticas',
            'Gestión de proveedores'
        ]
    },
    {
        id: 'cycles',
        title: 'dashboard.landing.servicesSection.services.cycles.title',
        description: 'dashboard.landing.servicesSection.services.cycles.description',
        icon: 'RefreshCw',
        color: 'from-green-500 to-emerald-500',
        features: [
            'Automatización completa',
            'Planificación inteligente',
            'Monitoreo continuo'
        ]
    },
    {
        id: 'forecasting',
        title: 'dashboard.landing.servicesSection.services.forecasting.title',
        description: 'dashboard.landing.servicesSection.services.forecasting.description',
        icon: 'TrendingUp',
        color: 'from-purple-500 to-pink-500',
        features: [
            'Predicciones precisas',
            'Análisis de tendencias',
            'Identificación de riesgos'
        ]
    },
    {
        id: 'users',
        title: 'dashboard.landing.servicesSection.services.users.title',
        description: 'dashboard.landing.servicesSection.services.users.description',
        icon: 'Users',
        color: 'from-orange-500 to-red-500',
        features: [
            'Roles personalizados',
            'Permisos granulares',
            'Gestión de equipos'
        ]
    },
    {
        id: 'reports',
        title: 'dashboard.landing.servicesSection.services.reports.title',
        description: 'dashboard.landing.servicesSection.services.reports.description',
        icon: 'FileText',
        color: 'from-indigo-500 to-blue-500',
        features: [
            'Exportación múltiple',
            'Reportes automáticos',
            'Dashboards personalizados'
        ]
    },
    {
        id: 'notifications',
        title: 'dashboard.landing.servicesSection.services.notifications.title',
        description: 'dashboard.landing.servicesSection.services.notifications.description',
        icon: 'Bell',
        color: 'from-yellow-500 to-orange-500',
        features: [
            'Alertas inteligentes',
            'Múltiples canales',
            'Personalización total'
        ]
    }
];

export default function ServicesSection({
    lng,
    title,
    subtitle,
    services = defaultServices,
    variant = 'default',
    columns = 3,
    showFeatures = true,
    backgroundStyle = 'clean',
    className = ''
}: ServicesSectionProps) {
    const t = useTranslations();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
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
                return 'bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800';
            case 'clean':
                return 'bg-white dark:bg-gray-900';
            default:
                return '';
        }
    };

    const getGridColumns = () => {
        switch (columns) {
            case 2:
                return 'grid-cols-1 lg:grid-cols-2';
            case 4:
                return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
            default: // 3
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        }
    };

    // Translate services data
    const translatedServices = services.map(service => ({
        ...service,
        title: t(service.title),
        description: t(service.description)
    }));

    return (
        <section
            id="services"
            className={`py-16 lg:py-24 relative ${getBackgroundClasses()} ${className}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">
                                {t('dashboard.landing.servicesSection.badge', { default: 'Nuestros Servicios' })}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-foreground-dark mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            {title || t('dashboard.landing.servicesSection.title')}
                        </motion.h2>

                        {/* Subtitle */}
                        {(subtitle || t('dashboard.landing.servicesSection.subtitle')) && (
                            <motion.p
                                className="text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-relaxed"
                                variants={itemVariants}
                            >
                                {subtitle || t('dashboard.landing.servicesSection.subtitle', {
                                    default: 'Herramientas potentes y flexibles que se adaptan a cada etapa de tu proceso productivo'
                                })}
                            </motion.p>
                        )}
                    </div>

                    {/* Services Grid */}
                    <motion.div
                        className={`grid ${getGridColumns()} gap-6 lg:gap-8`}
                        variants={itemVariants}
                    >
                        {translatedServices.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                variant={variant}
                            />
                        ))}
                    </motion.div>

                    {/* Bottom CTA */}
                    <motion.div
                        className="text-center mt-16 lg:mt-20"
                        variants={itemVariants}
                    >
                        <div className="inline-block bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl lg:text-2xl font-bold text-white dark:text-foreground-dark mb-4">
                                {t('dashboard.landing.servicesSection.cta.title', {
                                    default: '¿Necesitas una solución personalizada?'
                                })}
                            </h3>
                            <p className="text-secondary dark:text-secondary-dark mb-6 max-w-2xl mx-auto">
                                {t('dashboard.landing.servicesSection.cta.description', {
                                    default: 'Nuestro equipo puede adaptar cualquier funcionalidad a tus necesidades específicas'
                                })}
                            </p>
                            <motion.button
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('dashboard.landing.servicesSection.cta.button', {
                                    default: 'Hablar con un experto'
                                })}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
