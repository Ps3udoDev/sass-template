'use client';

import * as motion from "motion/react-client";
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { ModuleCardProps } from '@/components/types/public/ModulesSection.types';

export default function ModuleCard({
    module,
    index,
    imagePosition,
    className = ''
}: ModuleCardProps) {

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: imagePosition === 'left' ? -50 : 50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            x: imagePosition === 'left' ? -30 : 30
        },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: (index * 0.2) + 0.3,
                ease: "easeOut"
            }
        }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: (index * 0.2) + 0.1,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={`relative py-12 lg:py-16 ${className}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className={`
                    grid lg:grid-cols-2 gap-8 lg:gap-16 items-center
                    ${imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''}
                `}>

                    {/* Content Section */}
                    <motion.div
                        className={`
                            space-y-6 lg:space-y-8
                            ${imagePosition === 'left' ? 'lg:col-start-2' : 'lg:col-start-1'}
                        `}
                        variants={contentVariants}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">
                                Módulo Especializado
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-foreground-dark leading-tight">
                            {module.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-relaxed">
                            {module.description}
                        </p>

                        {/* Features List */}
                        {module.features && module.features.length > 0 && (
                            <div className="space-y-3">
                                {module.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.2) + 0.5 + (idx * 0.1) }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        <span className="text-secondary dark:text-secondary-dark">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <motion.button
                                className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Ver demo</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                className="group inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-foreground dark:text-foreground-dark px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Play size={18} className="text-primary" />
                                <span>Video explicativo</span>
                            </motion.button>
                        </div>

                        {/* Coming Soon Badge */}
                        {module.comingSoon && (
                            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                                🚀 Próximamente
                            </div>
                        )}
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        className={`
                            relative
                            ${imagePosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'}
                        `}
                        variants={imageVariants}
                    >
                        {/* Fade Effect Container */}
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={module.image}
                                    alt={module.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                    priority={index === 0}
                                />

                                {/* Overlay gradient for better text contrast if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>



                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm" />
                            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-500/20 rounded-full blur-md" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Separator line for non-last items */}
            {/* You can add a separator here if needed */}
        </motion.div>
    );
}
