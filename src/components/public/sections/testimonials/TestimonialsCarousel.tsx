'use client';

import { Testimonial, TestimonialsCarouselProps } from "@/components/types/public";
import { useCallback, useState } from "react";
import * as motion from 'motion/react-client';
import TestimonialCard from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsCarousel({
    testimonials,
    showDots = true,
    showArrows = true,
    enableSwipe = true,
    className = ''
}: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrevious = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    const goToSlide = useCallback((index: number) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    const getVisibleTestimonials = () => {

        const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

        if (testimonials.length === 0) return [];

        if (width < 768) {
            return [{ testimonial: testimonials[currentIndex], position: 'center' as const, index: currentIndex }];
        } else if (width < 1200) {
            const next = (currentIndex + 1) % testimonials.length;
            return [
                { testimonial: testimonials[currentIndex], position: 'center' as const, index: currentIndex },
                { testimonial: testimonials[next], position: 'right' as const, index: next }
            ];
        } else {
            const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
            const next = (currentIndex + 1) % testimonials.length;
            return [
                { testimonial: testimonials[prev], position: 'left' as const, index: prev },
                { testimonial: testimonials[currentIndex], position: 'center' as const, index: currentIndex },
                { testimonial: testimonials[next], position: 'right' as const, index: next }
            ];
        }
    };

    const visibleTestimonials = getVisibleTestimonials();

    const handleCardClick = (testimonial: Testimonial) => {
        const clickedIndex = testimonials.findIndex(t => t.id === testimonial.id);
        if (clickedIndex !== currentIndex) {
            goToSlide(clickedIndex);
        }
    };

    const swipeHandlers = enableSwipe ? {
        onPanEnd: (event: any, info: any) => {
            const threshold = 50;
            if (info.offset.x > threshold) {
                handlePrevious();
            } else if (info.offset.x < -threshold) {
                handleNext();
            }
        }
    } : {};

    const getCardStyles = (position: 'left' | 'center' | 'right') => {
        const baseTransition = {
            type: "spring" as const,
            stiffness: 260,
            damping: 20,
            mass: 0.8,
            duration: 0.7
        };

        switch (position) {
            case 'left':
                return {
                    scale: 0.85,
                    x: '-10%',
                    rotateY: -8,
                    opacity: 0.75,
                    filter: 'blur(1px)',
                    zIndex: 1,
                    transition: baseTransition
                };
            case 'right':
                return {
                    scale: 0.85,
                    x: '10%',
                    rotateY: 8,
                    opacity: 0.75,
                    filter: 'blur(1px)',
                    zIndex: 1,
                    transition: baseTransition
                };
            case 'center':
            default:
                return {
                    scale: 1.1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    zIndex: 10,
                    transition: baseTransition
                };
        }
    };

    const getEnterAnimation = (position: 'left' | 'center' | 'right') => {
        if (direction > 0) {
            return {
                x: '100%',
                scale: 0.5,
                opacity: 0,
                rotateY: -30
            };
        } else {
            return {
                x: '-100%',
                scale: 0.5,
                opacity: 0,
                rotateY: 30
            };
        }
    };

    const getExitAnimation = (position: 'left' | 'center' | 'right') => {
        if (direction > 0) {
            return {
                x: '-100%',
                scale: 0.5,
                opacity: 0,
                rotateY: 30
            };
        } else {
            return {
                x: '100%',
                scale: 0.5,
                opacity: 0,
                rotateY: -30
            };
        }
    };

    if (testimonials.length === 0) {
        return (
            <div className="text-center text-secondary dark:text-secondary-dark py-12">
                No testimonials available
            </div>
        );
    }

    return (
        <div className={`relative w-full ${className}`}>
            <motion.div
                className="relative h-auto overflow-hidden"
                {...swipeHandlers}
            >
                <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 items-start min-h-[420px] lg:min-h-[480px] mx-auto max-w-6xl px-4 py-8">
                    {visibleTestimonials.map((item) => {
                        const testimonial = 'testimonial' in item ? item.testimonial : item;
                        const position = 'position' in item ? item.position : 'center';
                        const cardStyles = getCardStyles(position);

                        return (
                            <motion.div
                                key={`${testimonial.id}-${position}-${currentIndex}`}
                                className={`
                                    w-full max-w-sm mx-auto
                                    ${position === 'left' ? 'justify-self-end' : ''}
                                    ${position === 'center' ? 'justify-self-center' : ''}
                                    ${position === 'right' ? 'justify-self-start' : ''}
                                `}
                                style={{
                                    perspective: '1000px',
                                    transformStyle: 'preserve-3d',
                                }}
                                initial={getEnterAnimation(position)}
                                animate={cardStyles}
                                exit={getExitAnimation(position)}
                                whileHover={{
                                    scale: position === 'center' ? 1.12 : 0.88,
                                    y: position === 'center' ? -10 : 10,
                                    rotateY: position === 'left' ? 4 : position === 'right' ? -4 : 0,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }
                                }}
                                layout={false}
                            >
                                <TestimonialCard
                                    testimonial={testimonial}
                                    isActive={position === 'center'}
                                    position={position}
                                    onCardClick={handleCardClick}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>

            {showArrows && testimonials.length > 1 && (
                <>
                    <motion.button
                        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 z-40 border border-white/30 dark:border-gray-700/50"
                        onClick={handlePrevious}
                        whileHover={{
                            scale: 1.1,
                            x: -2,
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 10px 10px -5px rgb(0 0 0 / 0.08)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={18} />
                    </motion.button>

                    <motion.button
                        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 z-40 border border-white/30 dark:border-gray-700/50"
                        onClick={handleNext}
                        whileHover={{
                            scale: 1.1,
                            x: 2,
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 10px 10px -5px rgb(0 0 0 / 0.08)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={18} />
                    </motion.button>
                </>
            )}

            {showDots && testimonials.length > 1 && (
                <motion.div
                    className="flex items-center justify-center gap-3 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`rounded-full transition-all duration-300 relative overflow-hidden ${index === currentIndex
                                ? 'bg-primary w-8 h-3 shadow-md'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 w-3 h-3'
                                }`}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: index === currentIndex ? 1.05 : 1.2 }}
                            whileTap={{ scale: 0.85 }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        >
                            <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-full"
                                initial={{ scale: 0, opacity: 0 }}
                                whileTap={{
                                    scale: 3,
                                    opacity: [0, 1, 0],
                                    transition: { duration: 0.4 }
                                }}
                            />
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
