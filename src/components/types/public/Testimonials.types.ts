export interface TestimonialAuthor {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    verified?: boolean;
    location?: string;
}

export interface TestimonialContent {
    quote: string;
    rating: number;
    date?: string;
    featured?: boolean;
}

export interface TestimonialMetrics {
    improvement?: string;
    timeUsing?: string;
    modulesUsed?: string[];
    industryType?: string;
}

export interface Testimonial {
    id: string;
    author: TestimonialAuthor;
    content: TestimonialContent;
    metrics?: TestimonialMetrics;
    category?: 'shrimp' | 'cattle' | 'tilapia' | 'poultry' | 'general';
}

export interface TestimonialCardProps {
    testimonial: Testimonial;
    isActive?: boolean;
    isVisible?: boolean;
    position?: 'left' | 'center' | 'right';
    onCardClick?: (testimonial: Testimonial) => void;
    className?: string;
}

export interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    enableSwipe?: boolean;
    className?: string;
}

export interface TestimonialsSectionProps {
    lng: string;
    testimonials?: Testimonial[];
    title?: string;
    subtitle?: string;
    showFilters?: boolean;
    filterByCategory?: boolean;
    maxTestimonials?: number;
    variant?: 'default' | 'compact' | 'featured';
    className?: string;
}

export interface TestimonialFilters {
    category?: 'all' | 'shrimp' | 'cattle' | 'tilapia' | 'poultry';
    rating?: number;
    verified?: boolean;
    featured?: boolean;
}

export interface CarouselControls {
    currentIndex: number;
    totalItems: number;
    isPlaying: boolean;
    canGoNext: boolean;
    canGoPrevious: boolean;
    goToNext: () => void;
    goToPrevious: () => void;
    goToSlide: (index: number) => void;
    play: () => void;
    pause: () => void;
    toggle: () => void;
}
