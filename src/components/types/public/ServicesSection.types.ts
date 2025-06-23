export interface Service {
    id: string;
    title: string;
    description: string;
    icon?: string;
    color?: string;
    features?: string[];
    comingSoon?: boolean;
}

export interface ServiceCardProps {
    service: Service;
    index: number;
    variant?: 'default' | 'compact' | 'detailed';
    className?: string;
}

export interface ServicesSectionProps {
    lng: string;
    title?: string;
    subtitle?: string;
    services?: Service[];
    variant?: 'default' | 'compact' | 'detailed';
    columns?: 2 | 3 | 4;
    showFeatures?: boolean;
    backgroundStyle?: 'clean' | 'subtle' | 'none';
    className?: string;
}

export interface ServicesContent {
    title: string;
    subtitle?: string;
    services: {
        inventory: Service;
        cycles: Service;
        forecasting: Service;
        users: Service;
        reports: Service;
        notifications: Service;
    };
}
