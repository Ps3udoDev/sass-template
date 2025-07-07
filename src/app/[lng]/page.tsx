import Header from "@/components/public/header/Header";
import Footer from "@/components/public/Footer";
import * as motion from "motion/react-client";
import React from "react";
import { useTranslations } from "next-intl";
import HeroSection from "@/components/public/sections/hero/HeroSection";
import AboutSection from "@/components/public/sections/about/AboutSection";
import ServicesSection from "@/components/public/sections/services/ServicesSection";
import ModulesSection from "@/components/public/sections/modules/ModulesSection";
import TestimonialsSection from "@/components/public/sections/testimonials/TestimonialsSection";


interface HomeProps {
    params: Promise<{ lng: string }>;
}

export default function Home({ params }: HomeProps) {
    const resolvedParams = React.use(params);
    const { lng } = resolvedParams;
    const t = useTranslations();

    return (
        <>
            {/* Header */}
            <Header lng={lng} />

            {/* Hero Section */}
            <HeroSection
                lng={lng}
                backgroundPattern="mesh"
                showLogo={true}
                variant="default"
            />

            <div id="about">
                <AboutSection
                    lng={lng}
                    variant="centered"
                    showStats={true}
                />
            </div>

            <div id="services">
                <ServicesSection
                    lng={lng}
                    columns={3}
                    backgroundStyle="none"
                    showFeatures={true}
                />
            </div>




            <div id="testimonials">
                <TestimonialsSection
                    lng={lng}
                    variant="featured"
                    showFilters={false}
                    filterByCategory={false}
                />
            </div>
            <div id="modules">
                <ModulesSection
                    lng={lng}
                    showCTA={true}
                    backgroundStyle="none"
                />
            </div>

            <section className="py-16 lg:py-24  text-foreground dark:text-foreground-dark relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-32 -translate-y-32" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-48 translate-y-48" />
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-white">
                                {t('dashboard.landing.finalCta.badge', { default: 'Únete a SyncLiv' })}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {t('dashboard.landing.finalCta.title', {
                                default: 'Comienza a transformar tu producción hoy'
                            })}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {t('dashboard.landing.finalCta.description', {
                                default: 'Agenda una demo gratuita y descubre cómo podemos ayudarte a crecer sin complicaciones.'
                            })}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {/* Primary CTA */}
                            <motion.button
                                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 25px -5px rgb(255 255 255 / 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('dashboard.landing.finalCta.button', {
                                    default: 'Solicita tu demo'
                                })}
                            </motion.button>

                            {/* Secondary CTA */}
                            <motion.button
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/30 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('dashboard.landing.finalCta.secondary', {
                                    default: 'Hablar con ventas'
                                })}
                            </motion.button>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            className="mt-12 pt-8 border-t border-white/20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-white/80 text-sm mb-4">
                                {t('dashboard.landing.finalCta.guarantee', {
                                    default: 'Demo gratuita • Sin compromisos • Configuración en 24 horas'
                                })}
                            </p>

                            {/* Social proof */}
                            <div className="flex items-center justify-center gap-8 text-white/60">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">15+</span>
                                    <span className="text-sm">Empresas</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">2.5K+</span>
                                    <span className="text-sm">Ciclos</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">18%</span>
                                    <span className="text-sm">Ahorro</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer lng={lng} />
        </>
    );
}
