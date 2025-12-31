"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    distance?: number;
    direction?: 'vertical' | 'horizontal';
    reverse?: boolean;
    duration?: number;
    ease?: string;
    initialOpacity?: number;
    animateOpacity?: boolean;
    scale?: number;
    threshold?: number;
    delay?: number;
    onComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
    children,
    distance = 20,
    direction = 'vertical',
    reverse = false,
    duration = 0.6,
    ease = 'power3.out',
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    onComplete,
    className = '',
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const axis = direction === 'horizontal' ? 'x' : 'y';
        const offset = reverse ? -distance : distance;

        gsap.fromTo(el,
            {
                [axis]: offset,
                scale,
                opacity: animateOpacity ? initialOpacity : 1,
                visibility: 'visible'
            },
            {
                [axis]: 0,
                scale: 1,
                opacity: 1,
                duration,
                ease,
                delay,
                onComplete
            }
        );
    }, [
        children, // Re-run animation when content changes
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        delay,
        onComplete
    ]);

    return (
        <div ref={ref} className={`invisible ${className}`} {...props}>
            {children}
        </div>
    );
};

export default AnimatedContent;
