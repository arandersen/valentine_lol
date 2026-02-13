"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMusic = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {
                // Browser may block autoplay
            });
            setIsPlaying(true);
        }
    }, [isPlaying]);

    if (!mounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src="/sounds/valentine-music.mp3"
                loop
                preload="none"
            />

            {/* Music Toggle Button - Fixed position bottom right */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                onClick={toggleMusic}
                className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.span
                            key="pause"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="text-xl"
                        >
                            🔇
                        </motion.span>
                    ) : (
                        <motion.span
                            key="play"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            className="text-xl"
                        >
                            🎵
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
