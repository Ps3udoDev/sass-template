"use client"

import { useTranslations } from "next-intl";
import { ModuleCardProps } from "../types";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "../ui/feedback/Toolpit";

export const ModuleCard = ({ id, name, description, icon, href, color }: ModuleCardProps) => {
    const t = useTranslations();

    return (
        <Tooltip message={name} position="bottom">
            <Link href={href}>
                <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition"
                    style={{ backgroundColor: color }}
                >
                    <Image src={icon} alt={name} width={80} height={80} priority={true} />
                </div>
            </Link>
        </Tooltip>
    )
}
