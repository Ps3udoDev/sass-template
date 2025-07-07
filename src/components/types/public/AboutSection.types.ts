export interface AboutStat {
    number: string;
    label: string;
    icon?: string;
    color?: string;
}

export interface AboutSectionProps {
    lng: string;
    title?: string;
    description?: string;
    stats?: AboutStat[];
    showStats?: boolean;
    variant?: 'default' | 'centered' | 'minimal';
    backgroundStyle?: 'clean' | 'surface';
    className?: string;
}

export interface AboutContent {
    title: string;
    description: string;
    stats: {
        stat1: AboutStat;
        stat2: AboutStat;
        stat3: AboutStat;
    };
}
