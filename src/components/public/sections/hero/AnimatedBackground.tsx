'use client';

import * as motion from "motion/react-client";
import { AnimatedBackgroundProps } from '@/components/types/public/HeroSection.types';

export default function AnimatedBackground({
    variant,
    intensity = 'medium'
}: AnimatedBackgroundProps) {

    const getMeshGradient = () => {
        const baseOpacity = intensity === 'subtle' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7;

        return (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-50 to-cyan-50 dark:from-primary/5 dark:via-gray-900 dark:to-gray-800" />

                <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(0, 116, 124, ${baseOpacity}) 0%, transparent 70%)`,
                        filter: 'blur(40px)'
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute top-20 -right-20 w-96 h-96 rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(0, 173, 181, ${baseOpacity * 0.8}) 0%, transparent 70%)`,
                        filter: 'blur(50px)'
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        scale: [1, 0.8, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(77, 134, 156, ${baseOpacity * 0.6}) 0%, transparent 70%)`,
                        filter: 'blur(35px)'
                    }}
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        );
    };

    const getWavePattern = () => (
        <div className="absolute inset-0 overflow-hidden">
            <svg
                className="absolute bottom-0 w-full h-32"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                    fill="url(#waveGradient)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 116, 124, 0.2)" />
                        <stop offset="100%" stopColor="rgba(0, 173, 181, 0.1)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );

    const getDotsPattern = () => (
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0, 116, 124, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    backgroundPosition: '0 0, 25px 25px'
                }}
            >
                <motion.div
                    className="w-full h-full"
                    animate={{
                        backgroundPosition: ['0 0', '50px 50px', '0 0']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </div>
    );

    const renderBackground = () => {
        switch (variant) {
            case 'mesh':
                return getMeshGradient();
            case 'waves':
                return getWavePattern();
            case 'dots':
                return getDotsPattern();
            default:
                return null;
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none">
            {renderBackground()}

            <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20" />
        </div>
    );
}
