"use client";

import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";

interface MessageCardProps {
    className?: string;
    message: string;
}

export function MessageCard({ className, message }: MessageCardProps) {
    return (
        <div className={cn("w-full max-w-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-2xl", className)}>
            <div className="prose prose-invert max-w-none">
                <TextAnimate
                    animation="blurInUp"
                    duration={0.02}
                    as="p"
                    className="text-neutral-300 leading-relaxed text-lg md:text-xl font-light tracking-wide"
                >
                    {message}
                </TextAnimate>
            </div>
            <div className="mt-8 flex justify-end">
                <p className="text-sm font-handwriting text-neutral-500 italic">- Your Love</p>
            </div>
        </div>
    );
}
