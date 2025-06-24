'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import {
    TrendingUp,
    AlertTriangle,
    Users,
    Activity,
    Calendar,
    BarChart3,
    Droplets,
    Thermometer
} from 'lucide-react';

interface ModuleDashboardProps {
    params: Promise<{ lng: string; tenant: string; category: string; module: string }>;
}

export default function ModuleDashboard({ params }: ModuleDashboardProps) {
    const resolvedParams = React.use(params);
    const { lng, tenant, category, module } = resolvedParams;
    const t = useTranslations();
    const pathname = usePathname();

    const stats = [
        {
            title: 'Estanques Activos',
            value: '12',
            change: '+2',
            changeType: 'positive' as const,
            icon: <Droplets className="w-6 h-6 text-blue-600" />
        },
        {
            title: 'Ciclos en Curso',
            value: '8',
            change: '+1',
            changeType: 'positive' as const,
            icon: <Activity className="w-6 h-6 text-green-600" />
        },
        {
            title: 'Temperatura Promedio',
            value: '28°C',
            change: '+1.2°',
            changeType: 'neutral' as const,
            icon: <Thermometer className="w-6 h-6 text-orange-600" />
        },
        {
            title: 'Alertas Activas',
            value: '3',
            change: '-2',
            changeType: 'negative' as const,
            icon: <AlertTriangle className="w-6 h-6 text-red-600" />
        }
    ];

    const recentActivities = [
        { id: 1, action: 'Alimentación registrada', pond: 'Estanque A-01', time: 'Hace 2 horas' },
        { id: 2, action: 'Parámetros de agua medidos', pond: 'Estanque B-03', time: 'Hace 4 horas' },
        { id: 3, action: 'Nuevo ciclo iniciado', pond: 'Estanque C-02', time: 'Hace 6 horas' },
        { id: 4, action: 'Tratamiento aplicado', pond: 'Estanque A-05', time: 'Hace 8 horas' },
    ];

    const quickActions = [
        { title: 'Registrar Alimentación', href: `${pathname}/feeding`, icon: '🍤', color: 'bg-blue-500' },
        { title: 'Medir Parámetros', href: `${pathname}/health`, icon: '🔬', color: 'bg-green-500' },
        { title: 'Ver Estanques', href: `${pathname}/ponds`, icon: '🏊', color: 'bg-cyan-500' },
        { title: 'Generar Reporte', href: `${pathname}/reports`, icon: '📊', color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb lng={lng} tenant={tenant} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <img src="/icons/shrimp.png" alt="Shrimp" className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('modules.shrimp.name')}
                            </h1>
                            <p className="text-gray-600">
                                {t('modules.shrimp.description')}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Nuevo Ciclo
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Exportar Datos
                        </button>
                    </div>
                </div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                    <div className="space-y-3">
                        {quickActions.map((action, index) => (
                            <a
                                key={index}
                                href={action.href}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                                    {action.icon}
                                </div>
                                <span className="text-gray-700 font-medium">{action.title}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
                        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Ver todo
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.pond}</p>
                                </div>
                                <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Producción Semanal</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <BarChart3 size={48} className="mx-auto mb-2" />
                            <p>Gráfico de producción</p>
                            <p className="text-sm">Integrar con Chart.js o Recharts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parámetros de Agua</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <TrendingUp size={48} className="mx-auto mb-2" />
                            <p>Tendencias de calidad</p>
                            <p className="text-sm">pH, Oxígeno, Temperatura</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
