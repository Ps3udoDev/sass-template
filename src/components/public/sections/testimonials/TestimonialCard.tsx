'use client';

import { TestimonialCardProps } from "@/components/types/public";
import { useTranslations } from "next-intl";
import * as motion from 'motion/react-client';
import { Clock, MapPin, Shield, Star } from 'lucide-react';

export default function TestimonialCard({
    testimonial,
    isActive,
    isVisible,
    position,
    onCardClick,
    className
}: TestimonialCardProps) {
    const t = useTranslations();
    const { author, content, metrics } = testimonial;

    const getAvatarFallback = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    const getPositionStyles = () => {
        switch (position) {
            case 'left':
                return {
                    scale: 0.85,
                    rotateY: -15,
                    x: 50,
                    opacity: 0.7,
                    zIndex: 1
                };
            case 'right':
                return {
                    scale: 0.85,
                    rotateY: 15,
                    x: -50,
                    opacity: 0.7,
                    zIndex: 1
                };
            default:
                return {
                    scale: 1,
                    rotateY: 0,
                    x: 0,
                    opacity: 1,
                    zIndex: 10
                };
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            >
                <Star
                    size={16}
                    className={`${index < rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                        } transition-colors duration-200`}
                />
            </motion.div>
        ));
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('es-ES', {
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <motion.div
            className={`
                relative group cursor-pointer select-none
                ${className}
            `}
            initial={{ opacity: 0 }}
            animate={{
                y: isVisible ? 0 : 0,
                ...getPositionStyles()
            }}
            whileHover={{
                scale: position === 'center' ? 1.02 : 0.87,
                rotateY: position === 'center' ? 0 : position === 'left' ? 10 : -10,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
            onClick={() => onCardClick?.(testimonial)}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            {isActive && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            <div className={`
                rounded-2xl p-6 lg:p-8 shadow-xl border border-white/20 dark:border-gray-700/50
                transition-all duration-300
                ${isActive ? 'shadow-2xl border-primary/30' : 'hover:shadow-2xl'}
                ${position !== 'center' ? 'blur-[0.5px]' : ''}
            `}>
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                        <div className="relative">
                            {author.avatar ? (
                                <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-primary/20"
                                />
                            ) : (
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm lg:text-base">
                                    {getAvatarFallback(author.name)}
                                </div>
                            )}

                            {author.verified && (
                                <motion.div
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                >
                                    <Shield size={12} className="text-white" />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-foreground dark:text-foreground-dark text-sm lg:text-base truncate">
                                    {author.name}
                                </h4>
                                <p className="text-secondary dark:text-secondary-dark text-xs lg:text-sm truncate">
                                    {author.role}
                                </p>
                                <p className="text-primary font-medium text-xs lg:text-sm truncate">
                                    {author.company}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {renderStars(content.rating)}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <motion.blockquote
                        className="text-foreground dark:text-foreground-dark text-sm lg:text-base leading-relaxed relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="text-4xl text-primary/30 absolute -top-2 -left-1 font-serif leading-none">
                            "
                        </span>
                        <span className="relative z-10 italic">
                            {content.quote}
                        </span>
                        <span className="text-4xl text-primary/30 absolute -bottom-4 right-0 font-serif leading-none">
                            "
                        </span>
                    </motion.blockquote>
                </div>

                {metrics && (
                    <div className="space-y-2 mb-4">
                        {metrics.improvement && (
                            <div className="flex items-center gap-2 text-xs lg:text-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                    {metrics.improvement}
                                </span>
                            </div>
                        )}

                        {metrics.timeUsing && (
                            <div className="flex items-center gap-2 text-xs text-secondary dark:text-secondary-dark">
                                <Clock size={12} />
                                <span>{metrics.timeUsing}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between text-xs text-secondary dark:text-secondary-dark pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-1">
                        {author.location && (
                            <>
                                <MapPin size={10} />
                                <span>{author.location}</span>
                            </>
                        )}
                    </div>

                    {content.date && (
                        <time>{formatDate(content.date)}</time>
                    )}
                </div>

                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                />
            </div>
        </motion.div>
    );
}
