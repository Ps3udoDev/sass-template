export interface Module {
    id: string;
    title: string;
    description: string;
    image: string;
    features?: string[];
    color?: string;
    comingSoon?: boolean;
    demoLink?: string;
}

export interface ModuleCardProps {
    module: Module;
    index: number;
    imagePosition: 'left' | 'right';
    className?: string;
}

export interface ModulesSectionProps {
    lng: string;
    title?: string;
    subtitle?: string;
    description?: string;
    modules?: Module[];
    showCTA?: boolean;
    ctaText?: string;
    backgroundStyle?: 'clean' | 'subtle' | 'none';
    className?: string;
}

export interface ModulesContent {
    title: string;
    description: string;
    modules: {
        shrimp: Module;
        cattle: Module;
        tilapia: Module;
        poultry: Module;
    };
    cta: string;
}
