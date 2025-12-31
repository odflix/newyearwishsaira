"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { DotPattern } from "@/components/ui/dot-pattern";
import { CutenessMeter } from "@/components/CutenessMeter";
import { ComplimentCard } from "@/components/ComplimentCard";
import { MessageCard } from "@/components/MessageCard";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import Image from "next/image";

type Stage = "hero" | "cuteness" | "question" | "compliments" | "letter" | "ending";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const [stage, setStage] = useState<Stage>("hero");

    if (!mounted) return null;

    const nextStage = (next: Stage) => {
        console.log("Transitioning to stage:", next);
        setStage(next);
    };

    const handleStart = () => {
        nextStage("cuteness");
    };

    const handleCutenessComplete = () => {
        setTimeout(() => {
            nextStage("question");
        }, 500);
    };

    const handleReplay = () => {
        setStage("hero");
    };

    const message = `My Dearest Saira,

This year has been... a lot. But through it all, you have fixed me. You have healed me. You have walked through fire with me, even from a distance.

Missing you has been the hardest part of 2025, but every day I am proud of you. I'm proud of how you take care of your family, how you take care of yourself, and how, no matter what, you love me enough to lift me up when I am low.

As 2025 fades into a memory and 2026 begins, my only prayer is this: to close the distance. To finally meet, to hold you, and to never let go.

You are my peace, my pride, and my love.`;

    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 selection:bg-pink-500/30">
            {/* Background */}
            <DotPattern
                width={32}
                height={32}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-50 transition-opacity duration-1000",
                )}
            />

            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="z-10 w-full max-w-4xl flex flex-col items-center justify-center min-h-[60vh] relative"
            >
                <AnimatePresence mode="wait">

                    {/* STAGE 1: HERO */}
                    {stage === "hero" && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8 text-center"
                        >
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                                {/* Using the waving.gif as requested for the start */}
                                <Image
                                    src="/gifs/waving.gif"
                                    alt="Cute waving gif"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            </div>

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800 text-xs font-medium text-pink-500 animate-pulse"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    <span>For Saira</span>
                                    <Sparkles className="w-3 h-3" />
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent">
                                    Our Future Together
                                </h1>
                                <p className="text-neutral-400 text-lg md:text-xl max-w-lg mx-auto">
                                    Ready to step into 2026?
                                </p>
                            </div>

                            <motion.button
                                onClick={handleStart}
                                className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                                whileHover={{ boxShadow: "0 0 60px -10px rgba(255,255,255,0.5)" }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Yes, Let's Go <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STAGE 2: CUTENESS METER */}
                    {stage === "cuteness" && (
                        <motion.div
                            key="cuteness"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-full flex flex-col items-center gap-8 max-w-md"
                        >
                            <h2 className="text-2xl font-medium text-center text-neutral-200">
                                First, checking vital stats...
                            </h2>
                            <CutenessMeter onComplete={handleCutenessComplete} />
                        </motion.div>
                    )}

                    {/* STAGE 3: QUESTION (Transition) */}
                    {stage === "question" && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                transition={{ type: "tween", duration: 0.6, ease: "backOut", delay: 0.2 }}
                                className="w-32 h-32 mx-auto relative"
                            >
                                <Heart className="w-full h-full text-red-500 fill-red-500 drop-shadow-glow animate-pulse" />
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white">
                                Do you know why I love you?
                            </h2>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => nextStage("compliments")}
                                    className="px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white font-medium transition-colors shadow-lg shadow-pink-500/20"
                                >
                                    Tell me why ❤️
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 4: COMPLIMENTS */}
                    {stage === "compliments" && (
                        <motion.div
                            key="compliments"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full flex flex-col items-center gap-8"
                        >
                            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-pink-500/20 shadow-xl rotate-3">
                                {/* Using cute.gif for the love section */}
                                <Image
                                    src="/gifs/cute.gif"
                                    alt="Cute love gif"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            <ComplimentCard onComplete={() => nextStage("letter")} />

                            <button
                                onClick={() => nextStage("letter")}
                                className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors underline underline-offset-4"
                            >
                                I have one more thing to say...
                            </button>
                        </motion.div>
                    )}

                    {/* STAGE 5: LETTER */}
                    {stage === "letter" && (
                        <motion.div
                            key="letter"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            className="w-full flex flex-col items-center gap-8"
                        >
                            <motion.div
                                className="text-center space-y-2 mb-4"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h2 className="text-6xl md:text-7xl font-sacramento text-pink-500 leading-tight">
                                    Happy New Year
                                </h2>
                                <p className="text-xl text-neutral-400 font-light">My Saira</p>
                            </motion.div>

                            <MessageCard message={message} />

                            <motion.button
                                onClick={() => {
                                    confetti({
                                        particleCount: 200,
                                        spread: 100,
                                        origin: { y: 0.8 },
                                        colors: ["#ffffff", "#ff0000", "#ff69b4"]
                                    });
                                    nextStage("ending");
                                }}
                                className="mt-8 px-6 py-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                One last surprise... ✨
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STAGE 6: ENDING */}
                    {stage === "ending" && (
                        <motion.div
                            key="ending"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8 text-center"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-white to-purple-500 bg-clip-text text-transparent leading-tight p-2">
                                Have the best year ahead!
                            </h2>

                            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl">
                                <Image
                                    src="/gifs/waving.gif"
                                    alt="Waving goodbye"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            <p className="text-neutral-400 max-w-md">
                                I love you forever and always.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <motion.button
                                    onClick={handleReplay}
                                    className="px-6 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Replay Memory ↺
                                </motion.button>

                                <motion.a
                                    href="https://t.me/" // Add username here
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Tell me how was it? ✈️
                                </motion.a>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>
        </main>
    );
}
