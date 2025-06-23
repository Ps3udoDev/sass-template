'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Globe, X } from 'lucide-react';
import {
    useFloating,
    autoUpdate,
    offset,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    size,
} from '@floating-ui/react';

interface LanguageSelectorProps {
    currentLang: string;
    variant?: 'header' | 'mobile-menu' | 'compact';
}

const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸', shortName: 'ES' },
    { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' },
];

export default function LanguageSelector({
    currentLang,
    variant = 'header'
}: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [hasCalculated, setHasCalculated] = useState(false);
    const initialCalculationDone = useRef(false);
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    useEffect(() => {
        setIsMounted(true);
        initialCalculationDone.current = false;
        setHasCalculated(false);
    }, [currentLang]);

    const getPlacement = () => {
        switch (variant) {
            case 'mobile-menu':
                return 'bottom-start' as const;
            case 'compact':
                return 'bottom-end' as const;
            default:
                return 'bottom-end' as const;
        }
    };

    const getMiddleware = () => {
        const baseMiddleware = [
            offset(variant === 'mobile-menu' ? 12 : 8),
            shift({
                padding: 16,
                crossAxis: false,
                mainAxis: false,
            }),
        ];

        if (variant === 'mobile-menu') {
            baseMiddleware.push(
                size({
                    apply({ elements }) {
                        Object.assign(elements.floating.style, {
                            width: '280px',
                        });
                    },
                })
            );
        }

        return baseMiddleware;
    };

    const { refs, floatingStyles, context, isPositioned } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: getMiddleware(),
        placement: getPlacement(),
        strategy: 'absolute',
        whileElementsMounted: (reference, floating, update) => {
            const cleanup = autoUpdate(reference, floating, update, {
                ancestorScroll: false,
                ancestorResize: false,
                elementResize: true,
                layoutShift: false,
            });
            return cleanup;
        },
    });

    useEffect(() => {
        if (isOpen && isPositioned && !hasCalculated) {
            const timer = setTimeout(() => {
                setHasCalculated(true);
                initialCalculationDone.current = true;
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isPositioned, hasCalculated]);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    const handleLanguageChange = (langCode: string) => {
        const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
        router.push(`/${langCode}${currentPath}`);
        setIsOpen(false);
        setHasCalculated(false);
        initialCalculationDone.current = false;
    };

    if (!isMounted) {
        return (
            <div className={`
                ${variant === 'mobile-menu' ? 'w-full px-3 py-2' : 'px-2 lg:px-3 py-2'}
                animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg
            `}>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
        );
    }

    const renderButton = () => {
        const baseClasses = `
            flex items-center gap-2 transition-all duration-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `;

        switch (variant) {
            case 'mobile-menu':
                return (
                    <button
                        ref={refs.setReference}
                        {...getReferenceProps()}
                        className={`${baseClasses}
                            px-3 py-2 w-full justify-between
                            text-secondary dark:text-secondary-dark
                            hover:text-primary hover:bg-soft dark:hover:bg-soft-dark
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Globe size={18} className="text-primary" />
                            <span className="font-medium">{currentLanguage.name}</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>
                );

            case 'compact':
                return (
                    <button
                        ref={refs.setReference}
                        {...getReferenceProps()}
                        className={`${baseClasses}
                            px-2 py-1.5
                            text-secondary dark:text-secondary-dark
                            hover:text-primary hover:bg-soft dark:hover:bg-soft-dark
                        `}
                        title={currentLanguage.name}
                    >
                        <span className="text-sm font-mono font-bold">
                            {currentLanguage.shortName}
                        </span>
                    </button>
                );

            default:
                return (
                    <button
                        ref={refs.setReference}
                        {...getReferenceProps()}
                        className={`${baseClasses}
                            px-2 lg:px-3 py-2
                            text-secondary dark:text-secondary-dark
                            hover:text-primary hover:bg-soft dark:hover:bg-soft-dark
                        `}
                        aria-label={`Cambiar idioma. Actual: ${currentLanguage.name}`}
                    >
                        <Globe size={18} className="text-primary" />
                        <span className="hidden lg:inline font-medium">
                            {currentLanguage.shortName}
                        </span>
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>
                );
        }
    };

    const renderDropdown = () => {
        const isMobileVariant = variant === 'mobile-menu';

        const shouldShow = hasCalculated || initialCalculationDone.current;

        return (
            <div
                ref={refs.setFloating}
                style={{
                    ...floatingStyles,
                    visibility: shouldShow ? 'visible' : 'hidden',
                    opacity: shouldShow ? 1 : 0,
                    ...(variant === 'mobile-menu' ? {
                        transformOrigin: 'top left',
                    } : {
                        transformOrigin: 'top right',
                    })
                }}
                {...getFloatingProps()}
                className={`
                    bg-white dark:bg-gray-800 rounded-lg shadow-lg
                    border border-gray-200 dark:border-gray-700
                    z-50 overflow-hidden
                    transition-opacity duration-150 ease-out
                    ${isMobileVariant ? 'w-[280px]' : 'w-[200px]'}
                `}
            >
                {isMobileVariant && (
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-foreground dark:text-foreground-dark">
                            Seleccionar idioma
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className="py-2">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 text-left
                                transition-colors duration-200
                                hover:bg-soft dark:hover:bg-soft-dark
                                ${language.code === currentLang
                                    ? 'bg-primary/10 text-primary border-r-2 border-primary'
                                    : 'text-secondary dark:text-secondary-dark'
                                }
                            `}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <div className="flex-1">
                                <span className="font-medium block">{language.name}</span>
                                {isMobileVariant && (
                                    <span className="text-xs opacity-60">{language.shortName}</span>
                                )}
                            </div>
                            {language.code === currentLang && (
                                <span className="text-primary font-bold">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {renderButton()}
            <FloatingPortal>
                {isOpen && renderDropdown()}
            </FloatingPortal>
        </>
    );
}
