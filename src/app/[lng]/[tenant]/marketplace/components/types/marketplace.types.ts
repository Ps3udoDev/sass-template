// src/app/[lng]/[tenant]/(feature)/aquaculture/marketplace/components/types/marketplace.types.ts

import { Industry, MarketplaceModule, AdditionalService, MarketplacePackage } from '@/modules/marketplaceConfig';

// Props para IndustryCard
export interface IndustryCardProps {
    industry: Industry;
    onSelect: (industryId: string) => void;
    className?: string;
}

// Props para ModuleCard
export interface ModuleCardProps {
    module: MarketplaceModule;
    onPurchase: (moduleId: string) => void;
    onViewDetails: (moduleId: string) => void;
    isOwned?: boolean;
    viewMode?: 'grid' | 'list';
    className?: string;
}

// Props para ServiceCard
export interface ServiceCardProps {
    service: AdditionalService;
    onPurchase: (serviceId: string, moduleId: string) => void;
    onViewDetails?: (serviceId: string) => void;
    isOwned?: boolean;
    isModuleOwned?: boolean;
    className?: string;
}

// Props para PackageCard
export interface PackageCardProps {
    package: MarketplacePackage;
    onPurchase: (packageId: string) => void;
    onViewDetails: (packageId: string) => void;
    className?: string;
}

// Props comunes para acciones
export interface MarketplaceActions {
    onPurchase: (type: 'module' | 'service' | 'package', id: string, additionalData?: any) => void;
    onViewDetails: (type: 'module' | 'service' | 'package', id: string) => void;
    onAddToCart?: (type: 'module' | 'service' | 'package', id: string) => void;
}

// Estados de compra
export type PurchaseStatus = 'available' | 'owned' | 'pending' | 'disabled';

// Modos de vista
export type ViewMode = 'grid' | 'list';

// Props para badges
export interface BadgeProps {
    type: 'popular' | 'premium' | 'new' | 'bestseller' | 'discount';
    text?: string;
    className?: string;
}

// Props para precios
export interface PriceDisplayProps {
    price: number;
    originalPrice?: number;
    currency: string;
    period?: string;
    discount?: number;
    className?: string;
}

// Props para features list
export interface FeaturesListProps {
    features: string[];
    maxVisible?: number;
    showAll?: boolean;
    className?: string;
}
