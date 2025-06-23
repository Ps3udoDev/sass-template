export interface HeroSectionProps {
    lng: string;
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    showLogo?: boolean;
    variant?: 'default' | 'minimal' | 'centered';
    backgroundPattern?: 'mesh' | 'dots' | 'waves' | 'none';
    className?: string;
}

export interface HeroStats {
    companies: string;
    cycles: string;
    savings: string;
}

export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    stats?: HeroStats;
}

export interface AnimatedBackgroundProps {
    variant: 'mesh' | 'dots' | 'waves' | 'none';
    intensity?: 'subtle' | 'medium' | 'strong';
}
