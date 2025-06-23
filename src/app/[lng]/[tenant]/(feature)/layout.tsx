'use client';

import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box } from '@mantine/core';
import Header from "@/components/public/header/Header";
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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const session = getSession();
        if (!session) {
            router.push(`/${lng}/auth/sign-in`);
        }
    }, [router, lng]);

    useEffect(() => {
        const handleSidebarToggle = (event: CustomEvent) => {
            setSidebarCollapsed(event.detail.collapsed);
        };

        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);

        return () => {
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    return (
        <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
            <Header lng={lng} tenant={tenant} />

            <Sidebar
                lng={lng}
                tenant={tenant}
                onToggle={(collapsed) => setSidebarCollapsed(collapsed)}
            />

            <Box
                component="main"
                style={{
                    marginLeft: sidebarCollapsed ? 80 : 280,
                    transition: 'margin-left 200ms ease',
                    minHeight: 'calc(100vh - 80px)'
                }}
            >
                <Box p="md">
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
