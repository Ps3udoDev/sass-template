'use client';

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { HeroSectionProps } from '@/components/types/public/HeroSection.types';
import SyncLivLogo from '@/components/icons/SyncLivLogo';
import AnimatedBackground from './AnimatedBackground';

export default function HeroSection({
    lng,
    title,
    subtitle,
    description,
    ctaText,
    ctaLink = `/${lng}/auth/sign-in`,
    showLogo = true,
    variant = 'default',
    backgroundPattern = 'mesh',
    className = ''
}: HeroSectionProps) {
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

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const features = [
        { key: 'automation', icon: CheckCircle },
        { key: 'monitoring', icon: CheckCircle },
        { key: 'optimization', icon: CheckCircle }
    ];

    return (
        <section
            id="home"
            className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
        >
            {/* Animated Background */}
            <AnimatedBackground variant={backgroundPattern} intensity="medium" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Logo Section - Desktop Left, Mobile Top */}
                    {showLogo && (
                        <motion.div
                            className="flex justify-center lg:justify-start order-1 lg:order-1"
                            variants={logoVariants}
                        >
                            <div className="relative">
                                {/* Logo with glow effect */}
                                <motion.div
                                    className="relative"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150 animate-pulse" />
                                    <SyncLivLogo
                                        width={280}
                                        height={280}
                                        color="var(--color-primary)"
                                        className="relative z-10 drop-shadow-2xl"
                                    />
                                </motion.div>

                                {/* Floating elements around logo */}
                                <motion.div
                                    className="absolute -top-4 -right-4 w-6 h-6 bg-primary/30 rounded-full"
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [0.3, 0.8, 0.3]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute -bottom-6 -left-6 w-4 h-4 bg-blue-400/40 rounded-full"
                                    animate={{
                                        y: [0, 8, 0],
                                        opacity: [0.4, 0.9, 0.4]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Content Section */}
                    <motion.div
                        className="text-center lg:text-left order-2 lg:order-2"
                        variants={itemVariants}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-white">
                                {t('dashboard.landing.heroSection.badge', { default: 'Plataforma SaaS Líder' })}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground dark:text-foreground-dark mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                                {title || t('dashboard.landing.heroSection.title')}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-xl lg:text-2xl text-secondary dark:text-secondary-dark mb-6 leading-relaxed"
                            variants={itemVariants}
                        >
                            {subtitle || t('dashboard.landing.heroSection.subtitle')}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-secondary dark:text-secondary-dark mb-8 max-w-2xl mx-auto lg:mx-0"
                            variants={itemVariants}
                        >
                            {description || t('dashboard.landing.heroSection.description')}
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8"
                            variants={itemVariants}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.key}
                                    className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/50 dark:border-gray-700/50"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-gray-800 dark:text-foreground-dark">
                                        {t(`dashboard.landing.heroSection.features.${feature.key}`)}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                            variants={itemVariants}
                        >
                            {/* Primary CTA */}
                            <motion.a
                                href={ctaLink}
                                className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-[90%] sm:w-auto max-w-sm sm:max-w-none"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 20px 25px -5px rgb(0 116 124 / 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>{ctaText || t('dashboard.landing.heroSection.cta')}</span>
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </motion.a>

                            {/* Secondary CTA */}
                            <motion.button
                                className="group inline-flex items-center justify-center gap-3 bg-white/95 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-foreground-dark hover:text-primary dark:hover:text-primary px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border border-gray-300 dark:border-gray-700 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl w-[90%] sm:w-auto max-w-sm sm:max-w-none"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Play size={20} className="text-primary" />
                                <span>{t('dashboard.landing.heroSection.watchDemo', { default: 'Ver Demo' })}</span>
                            </motion.button>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
                            variants={itemVariants}
                        >
                            <p className="text-sm text-secondary dark:text-secondary-dark mb-6 text-center lg:text-left">
                                {t('dashboard.landing.heroSection.trustedBy', { default: 'Confiado por' })}
                            </p>
                            <div className="flex flex-col sm:hidden gap-4 opacity-60">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">50+</span>
                                    <span className="text-sm text-secondary dark:text-secondary-dark">Empresas Conectadas</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">15K+</span>
                                    <span className="text-sm text-secondary dark:text-secondary-dark">Ciclos Gestionados</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">25%</span>
                                    <span className="text-sm text-secondary dark:text-secondary-dark">Ahorro Promedio</span>
                                </div>
                            </div>

                            {/* Desktop: Horizontal */}
                            <div className="hidden sm:flex items-center justify-center lg:justify-start gap-6 lg:gap-8 opacity-60">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">50+</div>
                                    <div className="text-xs lg:text-sm text-secondary dark:text-secondary-dark">Empresas</div>
                                </div>
                                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">15K+</div>
                                    <div className="text-xs lg:text-sm text-secondary dark:text-secondary-dark">Ciclos</div>
                                </div>
                                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">25%</div>
                                    <div className="text-xs lg:text-sm text-secondary dark:text-secondary-dark">Ahorro</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-3 bg-primary rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
