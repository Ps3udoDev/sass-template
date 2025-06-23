'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import { TestimonialsSectionProps, Testimonial, TestimonialFilters } from '@/components/types/public/Testimonials.types';
import TestimonialsCarousel from './TestimonialsCarousel';
import { Filter } from 'lucide-react';
import { defaultTestimonials } from '@/data/testimonials.mock';

const categoryOptions = [
    { key: 'all', label: 'testimonials.filters.all' },
    { key: 'shrimp', label: 'testimonials.filters.shrimp' },
    { key: 'cattle', label: 'testimonials.filters.cattle' },
    { key: 'tilapia', label: 'testimonials.filters.tilapia' },
    { key: 'poultry', label: 'testimonials.filters.poultry' },
    { key: 'general', label: 'testimonials.filters.general' }
];

export default function TestimonialsSection({
    lng,
    testimonials = defaultTestimonials,
    title,
    subtitle,
    showFilters = false,
    filterByCategory = false,
    maxTestimonials,
    variant = 'default',
    className = ''
}: TestimonialsSectionProps) {
    const t = useTranslations();
    const [filters, setFilters] = useState<TestimonialFilters>({ category: 'all' });
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const filteredTestimonials = useMemo(() => {
        let filtered = [...testimonials];

        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(testimonial => testimonial.category === filters.category);
        }

        if (filters.rating) {
            filtered = filtered.filter(testimonial => testimonial.content.rating >= filters.rating!);
        }

        if (filters.verified) {
            filtered = filtered.filter(testimonial => testimonial.author.verified);
        }

        if (filters.featured) {
            filtered = filtered.filter(testimonial => testimonial.content.featured);
        }

        if (maxTestimonials && maxTestimonials > 0) {
            filtered = filtered.slice(0, maxTestimonials);
        }

        return filtered;
    }, [testimonials, filters, maxTestimonials]);

    const handleCategoryFilter = (category: string) => {
        setFilters(prev => ({ ...prev, category: category as any }));
        setShowFilterMenu(false);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className={`py-16 lg:py-24 relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

            <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-12 lg:mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-foreground-dark mb-4 lg:mb-6"
                        variants={itemVariants}
                    >
                        {title || t('testimonials.title')}
                    </motion.h2>

                    {(subtitle || t('testimonials.subtitle')) && (
                        <motion.p
                            className="text-lg lg:text-xl text-secondary dark:text-secondary-dark max-w-3xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            {subtitle || t('testimonials.subtitle')}
                        </motion.p>
                    )}

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-8 mt-8 lg:mt-12"
                        variants={itemVariants}
                    >
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary">
                                {testimonials.length}+
                            </div>
                            <div className="text-sm text-secondary dark:text-secondary-dark">
                                {t('testimonials.stats.total')}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary">
                                {(testimonials.reduce((acc, t) => acc + t.content.rating, 0) / testimonials.length).toFixed(1)}
                            </div>
                            <div className="text-sm text-secondary dark:text-secondary-dark">
                                {t('testimonials.stats.avgRating')}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary">
                                {testimonials.filter(t => t.author.verified).length}
                            </div>
                            <div className="text-sm text-secondary dark:text-secondary-dark">
                                {t('testimonials.stats.verified')}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>


                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {filteredTestimonials.length > 0 ? (
                        <TestimonialsCarousel
                            testimonials={filteredTestimonials}
                            autoPlay={variant !== 'compact'}
                            autoPlayInterval={5000}
                            showDots={true}
                            showArrows={true}
                            enableSwipe={true}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-2">
                                {t('testimonials.noResults.title')}
                            </h3>
                            <p className="text-secondary dark:text-secondary-dark">
                                {t('testimonials.noResults.description')}
                            </p>
                            <motion.button
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                onClick={() => setFilters({ category: 'all' })}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t('testimonials.noResults.reset')}
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                {variant === 'default' && (
                    <motion.div
                        className="text-center mt-12 lg:mt-16"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.div
                            className="inline-block  backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 dark:border-gray-700/50"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-lg lg:text-xl font-semibold text-foreground dark:text-foreground-dark mb-3">
                                {t('testimonials.cta.title')}
                            </h3>
                            <p className="text-secondary dark:text-secondary-dark mb-4">
                                {t('testimonials.cta.description')}
                            </p>
                            <motion.button
                                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('testimonials.cta.button')}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {showFilterMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowFilterMenu(false)}
                />
            )}
        </section>
    );
}
