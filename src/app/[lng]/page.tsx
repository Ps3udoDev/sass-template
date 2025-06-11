import Header from "@/components/public/Header";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import React from "react";
import Footer from "@/components/public/Footer";
import { useTranslations } from "next-intl";

interface HomeProps {
    params: Promise<{ lng: string }>;
}

export default function Home({ params }: HomeProps) {
    const resolvedParams = React.use(params);
    const { lng } = resolvedParams;
    const t = useTranslations();
    return (
        <>
            <Header lng={lng} />

            <section id="home" className="min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('home.title')}
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {t('home.description')}
                    </motion.p>

                    <motion.button
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('home.cta')}
                    </motion.button>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-16"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={titleVariants}
                    >
                        {t('home.benefits')}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <BenefitCard
                                key={index}
                                benefit={benefit}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        className="text-center"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.6 }}
                        variants={sectionVariants}
                    >
                        <h2 className="text-4xl font-bold mb-8">{t('home.about')}</h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                            {t('home.aboutDescription')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <StatCard key={index} stat={stat} index={index} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="products" className="py-20 bg-blue-50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-16"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={titleVariants}
                    >
                        {t('home.products')}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={ctaVariants}
                    >
                        <h2 className="text-4xl font-bold mb-8">{t('home.ctaTitle')}</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            {t('home.ctaDescription')}
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            {t('home.ctaButton')}
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer lng={lng} />
        </>
    );
}

interface BenefitCardProps {
    benefit: { title: string; description: string; icon: string };
    index: number;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
    const t = useTranslations();
    return (
        <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -5 }}
        >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{t(benefit.title)}</h3>
            <p className="text-gray-600">{t(benefit.description)}</p>
        </motion.div>
    );
}

interface StatCardProps {
    stat: { number: string; label: string };
    index: number;
}

function StatCard({ stat, index }: StatCardProps) {
    const t = useTranslations();
    return (
        <motion.div
            className="text-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={statVariants}
            transition={{ delay: index * 0.2 }}
        >
            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{t(stat.label)}</div>
        </motion.div>
    );
}

interface ProductCardProps {
    product: { name: string; description: string; price: string };
    index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
    const t = useTranslations();
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={productVariants}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <h3 className="text-xl font-semibold mb-4">{t(product.name)}</h3>
            <p className="text-gray-600 mb-4">{t(product.description)}</p>
            <div className="text-2xl font-bold text-blue-600 mb-4">{t(product.price)}</div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('home.moreInfo')}
            </button>
        </motion.div>
    );
}

const titleVariants: Variants = {
    offscreen: {
        y: 50,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const cardVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const sectionVariants: Variants = {
    offscreen: {
        y: 50,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
        },
    },
};

const statVariants: Variants = {
    offscreen: {
        scale: 0.8,
        opacity: 0,
    },
    onscreen: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.6,
            duration: 0.8,
        },
    },
};

const productVariants: Variants = {
    offscreen: {
        y: 80,
        opacity: 0,
        rotate: -10,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const ctaVariants: Variants = {
    offscreen: {
        scale: 0.8,
        opacity: 0,
    },
    onscreen: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const benefits = [
    {
        title: 'home.benefit1.title',
        description: 'home.benefit1.description',
        icon: "🚀",
    },
    {
        title: 'home.benefit2.title',
        description: 'home.benefit2.description',
        icon: "🔒",
    },
    {
        title: 'home.benefit3.title',
        description: 'home.benefit3.description',
        icon: "📈",
    },
    {
        title: 'home.benefit4.title',
        description: 'home.benefit4.description',
        icon: "🛠️",
    },
];

const stats = [
    { number: 'home.stat1.number', label: 'home.stat1.label' },
    { number: 'home.stat2.number', label: 'home.stat2.label' },
    { number: 'home.stat3.number', label: 'home.stat3.label' },
];

const products = [
    {
        name: 'home.product1.name',
        description: 'home.product1.description',
        price: 'home.product1.price',
    },
    {
        name: 'home.product2.name',
        description: 'home.product2.description',
        price: 'home.product2.price',
    },
    {
        name: 'home.product3.name',
        description: 'home.product3.description',
        price: 'home.product3.price',
    },
];
