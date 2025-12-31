"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import StarBorder from "./ui/star-border";

interface ComplimentCardProps {
    className?: string;
    onComplete?: () => void;
}

const compliments = [
    "You fix me when I'm broken.",
    "You healed my heart.",
    "Distance means nothing when someone means everything.",
    "I'm so proud of you for taking care of your family.",
    "You love me enough when I'm low.",
    "You are my forever.",
    "Every prayer is about being with you.",
    "2025 was better because of you.",
    "2026 will be OUR year.",
    "I love you, Saira."
];

export function ComplimentCard({ className, onComplete }: ComplimentCardProps) {
    const [index, setIndex] = useState(0);

    const nextCompliment = () => {
        if (index === compliments.length - 1) {
            onComplete?.();
        } else {
            setIndex((prev) => prev + 1);
        }
    };

    return (
        <motion.div
            layout
            className={cn("relative group cursor-pointer", className)}
            onClick={nextCompliment}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <StarBorder
                as="div"
                className="w-full max-w-md bg-neutral-900 border-none p-0"
                color="#ec4899"
                speed="4s"
            >
                <motion.div
                    layout
                    className="relative w-full flex flex-col items-center justify-center min-h-[200px] text-center p-4"
                >
                    <Heart className="w-8 h-8 text-pink-500 mb-4 animate-pulse" />
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-xl md:text-2xl font-medium text-neutral-200"
                        >
                            "{compliments[index]}"
                        </motion.p>
                    </AnimatePresence>
                    <p className="absolute bottom-[-10px] text-[10px] text-neutral-500 uppercase tracking-widest mt-4">
                        {index === compliments.length - 1 ? "Tap to finish" : "Tap for more love"}
                    </p>
                </motion.div>
            </StarBorder>
        </motion.div>
    );
}
