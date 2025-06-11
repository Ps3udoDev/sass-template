'use client';

import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation"
import React, { useEffect } from "react";

interface TenantLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lng: string; }>;
}

export default function TenantLayout({ children, params }: TenantLayoutProps) {
    const router = useRouter();
    const { lng } = React.use(params);

    useEffect(() => {
        const session = getSession();
        if (!session) {
            router.push(`/${lng}/auth/sign-in`);
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    )
}
