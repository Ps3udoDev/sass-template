'use client';

import * as motion from "motion/react-client";
import {
    Package,
    RefreshCw,
    TrendingUp,
    Users,
    FileText,
    Bell,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { ServiceCardProps } from '@/components/types/public/ServicesSection.types';
import { useTranslations } from 'next-intl';

const iconMap = {
    Package,     // inventory
    RefreshCw,   // cycles
    TrendingUp,  // forecasting
    Users,       // users
    FileText,    // reports
    Bell,        // notifications
    Sparkles
};

const colorMap = {
    inventory: 'from-blue-500 to-cyan-500',
    cycles: 'from-green-500 to-emerald-500',
    forecasting: 'from-purple-500 to-pink-500',
    users: 'from-orange-500 to-red-500',
    reports: 'from-indigo-500 to-blue-500',
    notifications: 'from-yellow-500 to-orange-500'
};

export default function ServiceCard({
    service,
    index,
    variant = 'default',
    className = ''
}: ServiceCardProps) {
    const t = useTranslations();

    const IconComponent = service.icon ? iconMap[service.icon as keyof typeof iconMap] : Sparkles;
    const gradientColor = service.color || colorMap[service.id as keyof typeof colorMap] || 'from-primary to-blue-600';

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        rest: { rotate: 0, scale: 1 },
        hover: {
            rotate: 5,
            scale: 1.1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className={`group cursor-pointer ${className}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">

                {/* Background gradient on hover */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    initial={false}
                />

                {/* Coming Soon Badge */}
                {service.comingSoon && (
                    <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full">
                        Próximamente
                    </div>
                )}

                {/* Icon */}
                <motion.div
                    className={`
                        w-14 h-14 lg:w-16 lg:h-16 rounded-xl mb-6
                        bg-gradient-to-r ${gradientColor}
                        flex items-center justify-center
                        shadow-lg group-hover:shadow-xl
                        transition-shadow duration-300
                    `}
                    variants={iconVariants}
                    initial="rest"
                    whileHover="hover"
                >
                    <IconComponent size={28} className="text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white dark:text-foreground-dark group-hover:text-primary transition-colors duration-300">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary dark:text-secondary-dark leading-relaxed">
                        {service.description}
                    </p>

                    {/* Features List (if provided) */}
                    {service.features && service.features.length > 0 && (
                        <div className="space-y-2">
                            {service.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-secondary dark:text-secondary-dark">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Learn More Link */}
                <motion.div
                    className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-primary font-medium group-hover:text-primary/80 transition-colors duration-300"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                >
                    <span className="text-sm">Saber más</span>
                    <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 dark:from-gray-700/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />

                {/* Number indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>
        </motion.div>
    );
}
