'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FooterProps {
    lng: string;
}

export default function Footer({ lng }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const t = useTranslations();
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">MiSaaS</h3>
                        <p className="text-gray-300 mb-4 max-w-md">
                            {t('footer.description')}
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink href="#" icon="📧" label="Email" />
                            <SocialLink href="#" icon="📱" label="Twitter" />
                            <SocialLink href="#" icon="💼" label="LinkedIn" />
                            <SocialLink href="#" icon="📺" label="YouTube" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2">
                            <FooterLink href={`/${lng}`} text="Inicio" />
                            <FooterLink href={`/${lng}/pricing`} text="Precios" />
                            <FooterLink href={`/${lng}/features`} text="Características" />
                            <FooterLink href={`/${lng}/contact`} text="Contacto" />
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
                        <ul className="space-y-2">
                            <FooterLink href={`/${lng}/privacy`} text="Privacidad" />
                            <FooterLink href={`/${lng}/terms`} text="Términos" />
                            <FooterLink href={`/${lng}/cookies`} text="Cookies" />
                            <FooterLink href={`/${lng}/support`} text="Soporte" />
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} MiSaaS. {t('footer.copyright')}
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className="text-gray-400 text-sm">{t('footer.madeWithLove')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

interface FooterLinkProps {
    href: string;
    text: string;
}

function FooterLink({ href, text }: FooterLinkProps) {
    return (
        <li>
            <Link
                href={href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
            >
                {text}
            </Link>
        </li>
    );
}

interface SocialLinkProps {
    href: string;
    icon: string;
    label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
    return (
        <a
            href={href}
            className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            aria-label={label}
        >
            <span className="text-lg">{icon}</span>
        </a>
    );
}
