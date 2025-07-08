'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import {
    DollarSign,
    AlertTriangle,
    TrendingUp,
    Package
} from 'lucide-react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface CattleDashboardProps {
    params: Promise<{ lng: string; tenant: string; category: string; module: string }>;
}

export default function CattleDashboard({ params }: CattleDashboardProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, category, module } = resolvedParams;
    const t = useTranslations();
    const pathname = usePathname();

    const usersChartRef = useRef<HTMLCanvasElement>(null);
    const growthChartRef = useRef<HTMLCanvasElement>(null);
    const usersChartInstance = useRef<Chart | null>(null);
    const growthChartInstance = useRef<Chart | null>(null);

    const stats = [
        {
            title: 'Consumos diarios',
            value: '$24,000',
            change: '+4%',
            changeType: 'positive' as const,
            icon: <DollarSign className="w-6 h-6 text-green-600" />
        },
        {
            title: 'Material Perdido',
            value: '12',
            change: '-10%',
            changeType: 'negative' as const,
            icon: <Package className="w-6 h-6 text-red-600" />
        },
        {
            title: 'Crecimiento Pasto',
            value: '97%',
            change: '+2%',
            changeType: 'positive' as const,
            icon: <TrendingUp className="w-6 h-6 text-green-600" />
        },
        {
            title: 'ROI por Item',
            value: '$25.50',
            change: '+1.5%',
            changeType: 'positive' as const,
            icon: <DollarSign className="w-6 h-6 text-blue-600" />
        }
    ];

    // Función para generar datos aleatorios para usuarios activos
    const generateUserData = () => {
        const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        return labels.map(() => Math.floor(Math.random() * (120 - 90 + 1)) + 90);
    };

    // Inicializar gráfico de usuarios activos
    useEffect(() => {
        if (usersChartRef.current) {
            // Destruir gráfico anterior si existe
            if (usersChartInstance.current) {
                usersChartInstance.current.destroy();
            }

            const ctx = usersChartRef.current.getContext('2d');
            if (ctx) {
                let delayed = false;

                usersChartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{
                            label: 'Usuarios Activos',
                            data: generateUserData(),
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)',
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(139, 92, 246, 0.8)',
                                'rgba(236, 72, 153, 0.8)',
                                'rgba(6, 182, 212, 0.8)'
                            ],
                            borderColor: [
                                'rgb(59, 130, 246)',
                                'rgb(16, 185, 129)',
                                'rgb(245, 158, 11)',
                                'rgb(239, 68, 68)',
                                'rgb(139, 92, 246)',
                                'rgb(236, 72, 153)',
                                'rgb(6, 182, 212)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            onComplete: () => {
                                delayed = true;
                            },
                            delay: (context) => {
                                let delay = 0;
                                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                                }
                                return delay;
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 130,
                                min: 80
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });

                // Actualizar datos cada 3 segundos
                const interval = setInterval(() => {
                    if (usersChartInstance.current) {
                        usersChartInstance.current.data.datasets[0].data = generateUserData();
                        usersChartInstance.current.update('none');
                    }
                }, 3000);

                return () => clearInterval(interval);
            }
        }
    }, []);

    // Inicializar gráfico de crecimiento
    useEffect(() => {
        if (growthChartRef.current) {
            // Destruir gráfico anterior si existe
            if (growthChartInstance.current) {
                growthChartInstance.current.destroy();
            }

            const ctx = growthChartRef.current.getContext('2d');
            if (ctx) {
                growthChartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        datasets: [{
                            label: 'Crecimiento (%)',
                            data: [65, 72, 80, 88, 95, 102, 110, 118, 125, 130, 128, 135],
                            borderColor: 'rgb(34, 197, 94)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointBackgroundColor: 'rgb(34, 197, 94)',
                            pointBorderColor: 'rgb(34, 197, 94)',
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 150
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        }
    }, []);

    // Cleanup al desmontar
    useEffect(() => {
        return () => {
            if (usersChartInstance.current) {
                usersChartInstance.current.destroy();
            }
            if (growthChartInstance.current) {
                growthChartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="space-y-6">
            <Breadcrumb lng={lng} tenant={tenant} />

            {/* Header Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <img src="/icons/cattle.png" alt="Cattle" className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Pasturas Pro
                            </h1>
                            <p className="text-gray-600">
                                Plataforma profesional para control de inventario en siembra de cultivos potente sistema de administración de suelos, y seguimiento de crecimiento de fácil uso, manejo de varias unidades productivas con control de eventos sencilla plataforma para integrar.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <div className="flex items-center mt-2">
                                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' :
                                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                                        }`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-1">desde ayer</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Usuarios Activos Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Usuarios Activos</h3>
                    <div className="h-64">
                        <canvas ref={usersChartRef}></canvas>
                    </div>
                </div>

                {/* Curva de Crecimiento Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Curva de Crecimiento</h3>
                    <div className="h-64">
                        <canvas ref={growthChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
