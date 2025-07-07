"use client"

import { useTranslations } from "next-intl";
import { ModuleCardProps } from "../types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const ModuleCard = ({ id, name, description, icon, href, subtitle }: ModuleCardProps) => {
    const t = useTranslations();

    return (
        <Link href={href} className="group block">
            <div className="card relative overflow-hidden  min-h-[280px]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="relative h-32 overflow-hidden">
                        <Image
                            src={icon}
                            alt={name}
                            fill
                            className="object-cover"
                            priority={true}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
                    </div>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <ArrowRight size={16} className="text-white" />
                </div>

                <div className="relative z-10 p-6 pt-24 pb-16 text-center">
                    <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-primary-hover transition-colors">
                        {name}
                    </h3>

                    <p className="text-sm text-secondary mb-3 line-clamp-2 leading-relaxed">
                        {description}
                    </p>

                    {subtitle && (
                        <p className="text-xs text-muted opacity-75">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 border-t border-default bg-surface">
                    <div className="flex items-center justify-center text-xs text-muted group-hover:text-primary transition-colors">
                        <span>Acceder</span>
                        <ArrowRight size={12} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
