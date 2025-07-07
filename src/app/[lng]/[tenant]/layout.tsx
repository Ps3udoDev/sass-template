'use client';

import { useUserStore } from "@/app/store/userStore";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/header/Header";
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

    const { isAuthenticated, isHydrated } = useUserStore();

    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            router.push(`/${lng}/auth/sign-in`);
        }
    }, [router, lng, isAuthenticated, isHydrated]);
    if (!isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

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
