'use client';

import Footer from "@/components/public/Footer";
import Header from "@/components/public/header/Header";
import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation"
import React, { useEffect } from "react";

interface TenantLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lng: string; tenant: string }>;
}

export default function TenantLayout({ children, params }: TenantLayoutProps) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { lng, tenant } = resolvedParams;

    useEffect(() => {
        const session = getSession();
        if (!session) {
            router.push(`/${lng}/auth/sign-in`);
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header lng={lng} tenant={tenant} />
            <main className="pt-20">
                {children}
            </main>

            <Footer lng={lng} />
        </div>
    )
}
