"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps, Variants } from "framer-motion";
import { ElementType } from "react";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
    | "fadeIn"
    | "blurIn"
    | "blurInUp"
    | "blurInDown"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleUp"
    | "scaleDown";

interface TextAnimateProps extends MotionProps {
    /**
     * The text content to animate
     */
    children: string; // Changed from text to children to match usage
    text?: string; // Keep text prop for backward compatibility or if needed
    /**
     * The class name to be applied to the component
     */
    className?: string;
    /**
     * The class name to be applied to each segment
     */
    segmentClassName?: string;
    /**
     * The delay before the animation starts
     */
    delay?: number;
    /**
     * The duration of the animation
     */
    duration?: number;
    /**
     * Custom motion variants for the animation
     */
    variants?: Variants;
    /**
     * The HTML element to render
     */
    as?: ElementType;
    /**
     * How to animate the text
     */
    type?: AnimationType;
    /**
     * The preset animation to use
     */
    animation?: AnimationVariant;
    /**
     * Whether to animate on start
     */
    startOnView?: boolean;
}

const defaultItemVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export function TextAnimate({
    children,
    text,
    className,
    segmentClassName,
    delay = 0,
    duration = 0.3,
    variants,
    as: Component = "p",
    type = "character",
    animation = "fadeIn",
    startOnView = true,
    ...props
}: TextAnimateProps) {
    const content = text || children;

    // Generate variants based on animation prop
    const getMotionVariants = (): Variants => {
        if (variants) return variants;

        switch (animation) {
            case "blurIn":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    show: {
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: { duration },
                    },
                    exit: {
                        opacity: 0,
                        filter: "blur(10px)",
                        transition: { duration },
                    },
                };
            case "blurInUp":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                    show: {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        transition: { duration },
                    },
                    exit: {
                        opacity: 0,
                        filter: "blur(10px)",
                        y: 20,
                        transition: { duration },
                    },
                };
            case "slideUp":
                return {
                    hidden: { opacity: 0, y: 20 },
                    show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration }
                    },
                    exit: {
                        opacity: 0,
                        y: 20,
                        transition: { duration }
                    },
                };
            // Add other cases as needed, defaulting to fadeIn
            default:
                return {
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { duration }
                    },
                    exit: {
                        opacity: 0,
                        transition: { duration }
                    },
                };
        }
    };

    const itemVariants = getMotionVariants();

    // Split text based on type
    const segments = type === "word" ? content.split(" ") : content.split("");

    return (
        <AnimatePresence mode="popLayout">
            <Component
                className={cn("whitespace-pre-wrap", className)}
                {...props}
            >
                <motion.span
                    variants={defaultContainerVariants}
                    initial="hidden"
                    whileInView={startOnView ? "show" : undefined}
                    animate={!startOnView ? "show" : undefined}
                    exit="exit"
                    viewport={{ once: true }}
                >
                    {segments.map((segment, i) => (
                        <motion.span
                            key={`${i}-${segment}`}
                            variants={itemVariants}
                            className={cn("inline-block", segmentClassName)}
                        >
                            {segment}
                            {type === "word" && i !== segments.length - 1 && "\u00A0"}
                        </motion.span>
                    ))}
                </motion.span>
            </Component>
        </AnimatePresence>
    );
}
