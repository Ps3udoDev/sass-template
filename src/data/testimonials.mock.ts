import { Testimonial } from "@/components/types/public";

export const defaultTestimonials: Testimonial[] = [
    {
        id: '1',
        author: {
            name: 'Carlos Morales',
            role: 'General Manager',
            company: 'Camarón Feliz',
            verified: true,
            location: 'Ecuador'
        },
        content: {
            quote: 'Thanks to the shrimp module automation, we reduced waste and improved feed efficiency by 30%.',
            rating: 5,
            date: '2024-02-15',
            featured: true
        },
        metrics: {
            improvement: '30% efficiency increase',
            timeUsing: '2 years using SyncLiv',
            modulesUsed: ['shrimp'],
            industryType: 'aquaculture'
        },
        category: 'shrimp'
    },
    {
        id: '2',
        author: {
            name: 'Lucía Fernández',
            role: 'Poultry Producer',
            company: 'Granjas El Sol',
            verified: true,
            location: 'Colombia'
        },
        content: {
            quote: 'Batch traceability and real-time monitoring have transformed how we operate. Decision-making has never been this simple.',
            rating: 5,
            date: '2024-01-20'
        },
        metrics: {
            improvement: '40% faster decisions',
            timeUsing: '18 months using SyncLiv',
            modulesUsed: ['poultry'],
            industryType: 'livestock'
        },
        category: 'poultry'
    },
    {
        id: '3',
        author: {
            name: 'Gabriel Mena',
            role: 'Production Director',
            company: 'Tilapias Andinas',
            verified: true,
            location: 'Peru'
        },
        content: {
            quote: 'We love how easy it is to add modules. We started with shrimp, and now we manage tilapia operations entirely.',
            rating: 5,
            date: '2024-03-10'
        },
        metrics: {
            improvement: '25% cost reduction',
            timeUsing: '3 years using SyncLiv',
            modulesUsed: ['shrimp', 'tilapia'],
            industryType: 'aquaculture'
        },
        category: 'tilapia'
    },
    {
        id: '4',
        author: {
            name: 'María Vega',
            role: 'Farm Administrator',
            company: 'AgroVega',
            verified: true,
            location: 'México'
        },
        content: {
            quote: 'With role-based dashboards, every worker sees exactly what they need. It saved us hours in training.',
            rating: 4,
            date: '2024-01-05'
        },
        metrics: {
            improvement: '60% less training time',
            timeUsing: '1 year using SyncLiv',
            modulesUsed: ['cattle'],
            industryType: 'livestock'
        },
        category: 'cattle'
    },
    {
        id: '5',
        author: {
            name: 'Eduardo Jiménez',
            role: 'Independent Consultant',
            company: 'AgroConsult Pro',
            verified: true,
            location: 'Argentina'
        },
        content: {
            quote: 'What my clients value the most is the system\'s flexibility. It adapts to any type of agricultural or aquacultural production.',
            rating: 5,
            date: '2024-02-28'
        },
        metrics: {
            improvement: '100% client satisfaction',
            timeUsing: '2.5 years using SyncLiv',
            modulesUsed: ['shrimp', 'cattle', 'tilapia', 'poultry'],
            industryType: 'consulting'
        },
        category: 'general'
    }
];
