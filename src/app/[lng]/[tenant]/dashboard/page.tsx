'use client';

import { ModuleCard } from "@/components/common/ModuleCard";
import { mockModules } from "@/modules/mockModules";
import { useTranslations } from "next-intl";
import React from "react";

interface DashboardPageProps {
  params: Promise<{ lng: string; tenant: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const resolvedParams = React.use(params);
  const { lng, tenant } = resolvedParams;

  console.log(tenant, lng);

  const modules = mockModules;
  const t = useTranslations();

  return (
    <div className="flex justify-center items-start min-h-[80vh] pt-16">
      <div className="flex flex-wrap justify-center gap-4 max-w-screen-lg w-full">
        {modules.map((mod) => (
          <div key={mod.id} className="flex justify-center">
            <ModuleCard
              id={mod.id}
              name={t(mod.name)}
              description={t(mod.description)}
              icon={mod.icon}
              href={`/${lng}/${tenant}/${mod.href}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
