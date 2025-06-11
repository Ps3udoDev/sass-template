'use client'

import { TooltipProps } from "@/components/types/ui/feedback"
import { useState } from "react";

export function Tooltip({ children, message, position = "top" }: TooltipProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    }

    return (
        <div
            className="relative inline-flex w-fit"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <div
                    className={`absolute z-10 px-2 py-1 text-xs text-black rounded transition-opacity duration-200 ${positionClasses[position]}`}
                >
                    {message}
                </div>
            )}
        </div>
    )
}
