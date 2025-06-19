'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import PoolsTable from '@/components/aquaculture/PoolsTable';
import { getSpeciesConfig } from '@/config/species';

interface PoolsPageProps {
    params: Promise<{
        lng: string;
        tenant: string;
        species: string;
    }>;
}

export default function PoolsPage({ params }: PoolsPageProps) {
    const resolvedParams = use(params);
    const { lng, tenant, species } = resolvedParams;

    const speciesConfig = getSpeciesConfig(species);

    if (!speciesConfig) {
        notFound();
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Piscinas - {speciesConfig.displayName}
                </h1>
                <p className="text-gray-600 mt-2">
                    Gestión de piscinas para {speciesConfig.displayName.toLowerCase()}
                </p>
            </div>

            <PoolsTable
                species={species}
                config={speciesConfig}
                lng={lng}
                tenant={tenant}
            />
        </div>
    );
}
