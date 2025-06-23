import { Module } from "@/components/types/public";

export const defaultModules: Module[] = [
    {
        id: 'shrimp',
        title: 'dashboard.landing.modulesSection.modules.shrimp.title',
        description: 'dashboard.landing.modulesSection.modules.shrimp.description',
        image: '/modules/shrimp.png',
        features: [
            'Gestión de piscinas y estanques',
            'Control de alimentación automatizado',
            'Seguimiento sanitario completo',
            'Monitoreo de calidad del agua'
        ],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'cattle',
        title: 'dashboard.landing.modulesSection.modules.cattle.title',
        description: 'dashboard.landing.modulesSection.modules.cattle.description',
        image: '/modules/rancher.png',
        features: [
            'Seguimiento de ganado individual',
            'Control de reproducción y cría',
            'Historial de peso y crecimiento',
            'Gestión de pastoreo y alimentación'
        ],
        color: 'from-green-500 to-emerald-500'
    }
    // Tilapia y Poultry pueden agregarse después
    // {
    //     id: 'tilapia',
    //     title: 'dashboard.landing.modulesSection.modules.tilapia.title',
    //     description: 'dashboard.landing.modulesSection.modules.tilapia.description',
    //     image: '/modules/tilapia.png',
    //     comingSoon: true,
    //     features: [...],
    //     color: 'from-purple-500 to-pink-500'
    // }
];
