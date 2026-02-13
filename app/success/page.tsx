"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SoundToggle } from "@/components/SoundToggle";
import { ConfettiHearts } from "@/components/ConfettiHearts";
import { playSound } from "@/lib/sound";

export default function SuccessPage() {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [showFlowerAnimation, setShowFlowerAnimation] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Play success sound on mount
        playSound("success");
    }, []);

    const handlePlayAgain = () => {
        router.push("/");
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.origin);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API not available
        }
    };

    const handlePlayVoiceNote = () => {
        if (!audioRef.current) return;

        if (isPlayingVoice) {
            audioRef.current.pause();
            setIsPlayingVoice(false);
        } else {
            audioRef.current.play().catch(() => {
                // Browser may block autoplay
            });
            setIsPlayingVoice(true);
        }
    };

    const handleVoiceNoteEnded = () => {
        setIsPlayingVoice(false);
        setShowFlowerAnimation(true);
    };

    if (!mounted) {
        return (
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="animate-pulse">
                            <div className="h-12 bg-secondary rounded mb-6" />
                            <div className="w-64 h-64 mx-auto bg-secondary rounded-xl mb-6" />
                            <div className="flex justify-center gap-4">
                                <div className="h-11 w-28 bg-secondary rounded-full" />
                                <div className="h-11 w-20 bg-secondary rounded-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            {/* Audio Element for Voice Note */}
            <audio
                ref={audioRef}
                src="/Yolo.m4a"
                onEnded={handleVoiceNoteEnded}
                onPlay={() => setIsPlayingVoice(true)}
                onPause={() => setIsPlayingVoice(false)}
            />

            {/* Confetti Animation */}
            <ConfettiHearts duration={3000} heartCount={50} />

            <Card className="w-full max-w-md relative">
                <CardContent className="p-6">
                    {/* Sound Toggle */}
                    <div className="absolute top-4 right-4">
                        <SoundToggle />
                    </div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Happy Valentine baby 💖
                        </h1>

                        {/* Meme GIF */}
                        <div className="flex justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="w-64 h-64 relative rounded-xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src="/final.jpeg"
                                    alt="Happy Valentine"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Decorative hearts */}
                        <div className="flex justify-center gap-2 mb-6">
                            {["💕", "💗", "💖", "💝", "💘"].map((heart, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="text-2xl"
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </div>

                        {/* Voice Note Button */}
                        <div className="flex justify-center mb-6">
                            <motion.button
                                onClick={handlePlayVoiceNote}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isPlayingVoice
                                    ? "bg-primary text-primary-foreground animate-pulse"
                                    : "bg-gradient-to-br from-primary to-accent-gold text-white"
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {isPlayingVoice ? (
                                        <motion.span
                                            key="playing"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="text-3xl"
                                        >
                                            ⏸️
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="play"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="text-3xl"
                                        >
                                            🔊
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>

                        {/* Voice Note Label */}
                        <p className="text-muted-foreground text-sm mb-6">
                            {isPlayingVoice ? "Playing voice note..." : "Click to play a special message 🎧"}
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mb-6">
                            <Button onClick={handlePlayAgain} size="lg">
                                Play Again
                            </Button>
                            <Button variant="outline" onClick={handleShare}>
                                {copied ? "Copied! ✓" : "Share"}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Progress Indicator */}
                    <ProgressIndicator currentStep={3} />
                </CardContent>
            </Card>

            {/* Flower Animation Overlay */}
            <AnimatePresence>
                {showFlowerAnimation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                        onClick={() => setShowFlowerAnimation(false)}
                    >
                        {/* Multiple animated flowers */}
                        <div className="relative">
                            {/* Center main flower */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="text-[150px] md:text-[200px]"
                            >
                                🌸
                            </motion.div>

                            {/* Surrounding flowers */}
                            {[
                                { emoji: "🌹", delay: 0.1, x: -120, y: -80 },
                                { emoji: "🌺", delay: 0.2, x: 120, y: -80 },
                                { emoji: "🌷", delay: 0.3, x: -120, y: 80 },
                                { emoji: "🌻", delay: 0.4, x: 120, y: 80 },
                                { emoji: "💐", delay: 0.5, x: 0, y: -130 },
                                { emoji: "🌼", delay: 0.6, x: 0, y: 130 },
                            ].map((flower, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        x: flower.x,
                                        y: flower.y,
                                    }}
                                    transition={{
                                        delay: flower.delay,
                                        duration: 0.5,
                                        type: "spring",
                                    }}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl"
                                >
                                    {flower.emoji}
                                </motion.div>
                            ))}

                            {/* Floating petals animation */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={`petal-${i}`}
                                    initial={{
                                        opacity: 0,
                                        x: 0,
                                        y: 0,
                                        scale: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: (Math.random() - 0.5) * 400,
                                        y: (Math.random() - 0.5) * 400,
                                        scale: 1,
                                        rotate: Math.random() * 360,
                                    }}
                                    transition={{
                                        delay: 0.8 + i * 0.1,
                                        duration: 2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute left-1/2 top-1/2 text-3xl"
                                >
                                    {["🌸", "💕", "💖", "✨", "💗"][i % 5]}
                                </motion.div>
                            ))}
                        </div>

                        {/* Close hint */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="absolute bottom-10 text-white/80 text-sm"
                        >
                            Click anywhere to close
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
