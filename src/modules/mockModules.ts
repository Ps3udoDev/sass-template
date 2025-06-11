export const mockModules = [
    {
        id: 'shrimp',
        name: 'dashboard.modules.shrimp.name',
        description: 'dashboard.modules.shrimp.description',
        icon: '/icons/shrimp.png',
        color: '#E0F7FA',
        href: 'aquaculture/shrimp',
    },
    {
        id: 'laying-hens',
        name: 'dashboard.modules.laying-hens.name',
        description: 'dashboard.modules.laying-hens.description',
        icon: '/icons/laying-hens.jpeg',
        color: '#E0F7FA',
        href: 'poultry/laying-hens',
    },
];

export const mockTenants = [
    {
        id: 'hacienda-01',
        name: 'Hacienda 01',
        logo: '/logos/hacienda-01.jpeg',
        primaryColor: '#000000',
        modules: ['shrimp', 'laying-hens'],
    },
    {
        id: 'ganaderia-feliz',
        name: 'Ganaderia Feliz',
        logo: '/logos/ganaderia-feliz.jpeg',
        primaryColor: '#000000',
        modules: ['shrimp'],
    }
];
