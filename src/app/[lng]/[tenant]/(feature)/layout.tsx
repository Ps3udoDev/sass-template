'use client';

import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Sidebar from "@/components/common/Sidebar";

interface ModulesLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lng: string; tenant: string }>;
}

export default function ModulesLayout({ children, params }: ModulesLayoutProps) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { lng, tenant } = resolvedParams;
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    useEffect(() => {
        const session = getSession();
        if (!session) {
            router.push(`/${lng}/auth/sign-in`);
        }
    }, [router, lng]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header lng={lng} tenant={tenant} />
            <Sidebar lng={lng} tenant={tenant} />

            <main className={`transition-all duration-300 pt-20 ${sidebarExpanded ? 'ml-80' : 'ml-16'
                }`}>
                <div className="p-6">
                    {children}
                </div>
            </main>

            <div className={`transition-all duration-300 ${sidebarExpanded ? 'ml-80' : 'ml-16'
                }`}>
                <Footer lng={lng} />
            </div>
        </div>
    );
}
