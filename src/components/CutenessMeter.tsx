"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CutenessMeterProps {
    className?: string;
    onComplete?: () => void;
}

export function CutenessMeter({ className, onComplete }: CutenessMeterProps) {
    const [level, setLevel] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        console.log("CutenessMeter mounted");
        // Animate the meter filling up to 120%
        const duration = 2000; // 2 seconds to fill
        const interval = 20;
        const target = 100;
        const steps = duration / interval;
        const increment = target / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                triggerEffect();
            }
            setLevel(current);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const triggerEffect = async () => {
        // Vibrate effect
        await controls.start({
            x: [-5, 5, -5, 5, 0],
            transition: { duration: 0.4 }
        });

        // Zoom in effect
        await controls.start({
            scale: 1.2,
            transition: { duration: 0.5, ease: "easeOut" }
        });

        setTimeout(() => {
            onComplete?.();
        }, 1000); // reduced wait time
    };

    return (
        <motion.div
            animate={controls}
            className={cn("w-full max-w-md space-y-4", className)}
        >
            <div className="flex justify-between text-sm font-medium text-neutral-400">
                <span>Cuteness Level</span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-pink-500 font-bold"
                >
                    {Math.round(level)}%
                </motion.span>
            </div>

            <div className="relative h-6 w-full overflow-hidden rounded-full bg-neutral-900 border border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                {/* Striped background matching the theme */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" />

                <motion.div
                    className="h-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(level, 100)}%` }}
                    style={{ width: `${Math.min(level, 100)}%` }}
                >
                    <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full" />
                </motion.div>
            </div>

            <AnimatePresence>
                {level >= 100 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <p className="text-sm md:text-base text-pink-500 font-bold animate-pulse uppercase tracking-widest text-shadow-glow">
                            Full Cuteness Achieved!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
