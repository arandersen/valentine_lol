"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SoundToggle } from "@/components/SoundToggle";
import { PuzzleGrid } from "@/components/PuzzleGrid";
import { TileState, shufflePuzzle, isSolved } from "@/lib/puzzle";
import { playSound } from "@/lib/sound";

export default function PuzzlePage() {
    const router = useRouter();
    const [tiles, setTiles] = useState<TileState>([0, 1, 2, 3, 4, 5, 6, 7, null]);
    const [moves, setMoves] = useState(0);
    const [isWin, setIsWin] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showNoobPopup, setShowNoobPopup] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Shuffle puzzle on mount
        setTiles(shufflePuzzle(150));
    }, []);

    const handleTileMove = useCallback((newTiles: TileState) => {
        setTiles(newTiles);
        setMoves((prev) => prev + 1);

        if (isSolved(newTiles)) {
            setIsWin(true);
            setShowWinMessage(true);
            playSound("success");

            // Navigate to success page after delay
            setTimeout(() => {
                router.push("/success");
            }, 1200);
        }
    }, [router]);

    const handleReset = useCallback(() => {
        setTiles(shufflePuzzle(150));
        setMoves(0);
        setIsWin(false);
        setShowWinMessage(false);
    }, []);

    const handleBack = useCallback(() => {
        setShowNoobPopup(true);
        playSound("pop");
    }, []);

    const closeNoobPopup = useCallback(() => {
        setShowNoobPopup(false);
    }, []);

    // Secret solution function - solves the puzzle instantly
    const handleSecretSolution = useCallback(() => {
        const solvedState: TileState = [0, 1, 2, 3, 4, 5, 6, 7, null];
        setTiles(solvedState);
        setMoves((prev) => prev + 1);
        setIsWin(true);
        setShowWinMessage(true);
        playSound("success");

        // Navigate to success page after delay
        setTimeout(() => {
            router.push("/success");
        }, 1200);
    }, [router]);

    if (!mounted) {
        return (
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-secondary rounded mb-6" />
                            <div className="grid grid-cols-3 gap-1">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="w-24 h-24 bg-secondary rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-md relative">
                <CardContent className="p-6">
                    {/* Sound Toggle */}
                    <div className="absolute top-4 right-4">
                        <SoundToggle />
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            Challenge 1: Put the photo back together 🧩
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Click tiles adjacent to the empty space to move them
                        </p>
                    </div>

                    {/* Puzzle Grid */}
                    <div className="flex justify-center mb-6">
                        <PuzzleGrid
                            tiles={tiles}
                            onTileMove={handleTileMove}
                            disabled={isWin}
                        />
                    </div>

                    {/* Move Counter */}
                    <div className="text-center mb-6">
                        <span className="text-lg font-medium text-foreground">
                            Moves: {moves}
                        </span>
                    </div>

                    {/* Win Message */}
                    {showWinMessage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-card/95 rounded-2xl z-10"
                        >
                            <div className="text-center p-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="text-4xl mb-4"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="text-2xl font-bold text-primary mb-2">
                                    You did it! 💖
                                </h2>
                                <p className="text-muted-foreground">
                                    Redirecting to your surprise...
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mb-6">
                        <Button variant="outline" onClick={handleBack}>
                            Back
                        </Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>

                    {/* Progress Indicator */}
                    <ProgressIndicator currentStep={2} />
                </CardContent>
            </Card>

            {/* Noob Popup Modal */}
            <AnimatePresence>
                {showNoobPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                        onClick={closeNoobPopup}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-card p-8 rounded-2xl text-center shadow-2xl border border-border/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated Crying Emoji */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -15, 15, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    ease: "easeInOut",
                                }}
                                className="text-7xl mb-6"
                            >
                                😭
                            </motion.div>

                            {/* Noob Text */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold text-foreground mb-6"
                            >
                                Noob
                            </motion.h2>

                            {/* Back Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button onClick={closeNoobPopup} size="lg">
                                    Back
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Solution Button - appears on hover in bottom right corner */}
            <div className="fixed bottom-4 right-4 z-40 group">
                <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSecretSolution}
                    className="bg-transparent group-hover:bg-primary/20 text-transparent group-hover:text-primary font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🤫 Help Me
                    </span>
                </motion.button>
            </div>
        </main>
    );
}
