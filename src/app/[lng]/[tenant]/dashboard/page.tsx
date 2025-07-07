'use client';

import { ModuleCard } from "@/components/common/ModuleCard";
import { getAvailableModules } from "@/modules/mockModules";
import { useTranslations } from "next-intl";
import React from "react";
import { Sparkles, Zap } from "lucide-react";

interface DashboardPageProps {
  params: Promise<{ lng: string; tenant: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const resolvedParams = React.use(params);
  const { lng, tenant } = resolvedParams;
  const t = useTranslations();

  const session = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('session') || '{}') : {};
  const userModules = session.modules || [];

  const availableModules = getAvailableModules(userModules);

  return (
    <div className="min-h-screen bg-surface p-6">
      <div className="max-w-7xl mx-auto">



        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Módulos Activos</p>
                <p className="text-2xl font-bold text-primary">{availableModules.length}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Estado</p>
                <p className="text-2xl font-bold text-success">Online</p>
              </div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Última Actividad</p>
                <p className="text-sm text-secondary">Hace 2 minutos</p>
              </div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mb-6">
          <div className="flex items-center justify-end mb-6">

            <span className="text-sm text-muted">
              {availableModules.length} {availableModules.length === 1 ? 'módulo' : 'módulos'}
            </span>
          </div>
        </div>

        {/* Modules Grid */}
        {availableModules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableModules.map((mod) => (
              <ModuleCard
                key={mod.id}
                id={mod.id}
                name={t(mod.name)}
                description={t(mod.description)}
                subtitle={t(mod.subtitle)}
                icon={mod.icon}
                href={`/${lng}/${tenant}/${mod.href}`}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-secondary mb-2">
              {t('dashboard.empty.title', { default: 'No hay módulos disponibles' })}
            </h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              {t('dashboard.empty.description', { default: 'Contacta con tu administrador para activar módulos adicionales' })}
            </p>
            <button className="btn-secondary px-6 py-2">
              {t('dashboard.empty.action', { default: 'Contactar Soporte' })}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
