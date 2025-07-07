'use client';

import { HeaderLandingProps } from "@/components/types/public";
import { useTranslations } from "next-intl";
import LanguageSelector from "../LanguageSelector";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export default function HeaderLanding({
    lng,
    navigationItems,
    onScrollToSection
}: HeaderLandingProps) {
    const t = useTranslations();

    return (
        <nav className="flex items-center space-x-2 lg:space-x-4 xl:space-x-6 ">
            {navigationItems
                .filter(item => item.enabled)
                .map((item) => (
                    <button
                        key={item.key}
                        onClick={() => onScrollToSection(item.key)}
                        className="text-secondary hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap hover:cursor-pointer"
                    >
                        {t(item.label)}
                    </button>
                ))
            }

            <div className="flex items-center gap-1 lg:gap-2 xl:gap-3 ml-2 lg:ml-4 xl:ml-6 pl-2 lg:pl-4 xl:pl-6 border-l border-default">
                <div className="hidden lg:block">
                    <LanguageSelector currentLang={lng} variant="header" />
                </div>
                <ThemeToggle />

                <Link
                    href={`/${lng}/auth/sign-in`}
                    className="btn-primary px-3 py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 text-xs lg:text-sm xl:text-base whitespace-nowrap"
                >
                    {t('header.landing.login')}
                </Link>
            </div>
        </nav>
    );
}
