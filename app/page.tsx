"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SoundToggle } from "@/components/SoundToggle";
import { playSound } from "@/lib/sound";
import Image from "next/image";

export default function LandingPage() {
    const router = useRouter();
    const yesButtonRef = useRef<HTMLButtonElement>(null);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Button dimensions
    const NO_BUTTON_WIDTH = 80;
    const NO_BUTTON_HEIGHT = 44;
    const REPEL_RADIUS = 150;

    useEffect(() => {
        setMounted(true);
        // Initialize No button position in the center of the screen
        setNoButtonPosition({
            x: window.innerWidth / 2 + 100,
            y: window.innerHeight / 2,
        });
    }, []);

    // Global pointer move handler for the No button
    useEffect(() => {
        const handleGlobalPointerMove = (e: PointerEvent) => {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const buttonCenterX = noButtonPosition.x + NO_BUTTON_WIDTH / 2;
            const buttonCenterY = noButtonPosition.y + NO_BUTTON_HEIGHT / 2;

            const distance = Math.hypot(
                pointerX - buttonCenterX,
                pointerY - buttonCenterY
            );

            if (distance < REPEL_RADIUS) {
                // Calculate angle to move away from pointer
                const angle = Math.atan2(
                    buttonCenterY - pointerY,
                    buttonCenterX - pointerX
                );

                // Move button in opposite direction
                const moveDistance = REPEL_RADIUS - distance + 50;
                let newX =
                    buttonCenterX + Math.cos(angle) * moveDistance - NO_BUTTON_WIDTH / 2;
                let newY =
                    buttonCenterY + Math.sin(angle) * moveDistance - NO_BUTTON_HEIGHT / 2;

                // Clamp to viewport bounds with padding
                const padding = 10;
                newX = Math.max(
                    padding,
                    Math.min(window.innerWidth - NO_BUTTON_WIDTH - padding, newX)
                );
                newY = Math.max(
                    padding,
                    Math.min(window.innerHeight - NO_BUTTON_HEIGHT - padding, newY)
                );

                setNoButtonPosition({ x: newX, y: newY });
                setShowTooltip(true);
                setIsShaking(true);
                playSound("pop");

                // Hide tooltip after a delay
                setTimeout(() => setShowTooltip(false), 1500);
                setTimeout(() => setIsShaking(false), 300);
            }
        };

        window.addEventListener("pointermove", handleGlobalPointerMove);
        return () => window.removeEventListener("pointermove", handleGlobalPointerMove);
    }, [noButtonPosition]);

    const handleYesClick = () => {
        router.push("/puzzle");
    };

    if (!mounted) {
        return (
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="animate-pulse">
                            <div className="w-48 h-48 mx-auto bg-secondary rounded-xl mb-6" />
                            <div className="h-8 bg-secondary rounded mb-6" />
                            <div className="flex justify-center gap-4">
                                <div className="h-11 w-20 bg-secondary rounded-full" />
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
            <Card className="w-full max-w-md relative overflow-hidden">
                <CardContent className="p-6">
                    {/* Sound Toggle */}
                    <div className="absolute top-4 right-4">
                        <SoundToggle />
                    </div>

                    {/* Header Image */}
                    <div className="flex justify-center mb-6">
                        <div className="w-48 h-48 relative">
                            <Image
                                src="/arthur2.jpeg"
                                alt="Valentine"
                                fill
                                className="object-cover rounded-xl shadow-lg"
                                priority
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
                        Will you be my Valentine?
                    </h1>

                    {/* Buttons Container */}
                    <div className="flex justify-center gap-4 mb-6">
                        <Button
                            ref={yesButtonRef}
                            onClick={handleYesClick}
                            size="lg"
                            className="min-w-[80px]"
                        >
                            Yes 💖
                        </Button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-8">
                        <ProgressIndicator currentStep={1} />
                    </div>
                </CardContent>
            </Card>

            {/* No Button - Fixed position, moves throughout screen */}
            <motion.button
                className={`fixed bg-secondary hover:bg-secondary/80 text-foreground font-medium py-3 px-6 rounded-full transition-colors z-50 pointer-events-none ${isShaking ? "animate-shake" : ""}`}
                style={{
                    left: noButtonPosition.x,
                    top: noButtonPosition.y,
                    width: NO_BUTTON_WIDTH,
                }}
                animate={{
                    x: 0,
                    y: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                No
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed text-sm text-muted-foreground z-50 pointer-events-none"
                        style={{
                            left: noButtonPosition.x + NO_BUTTON_WIDTH / 2,
                            top: noButtonPosition.y + NO_BUTTON_HEIGHT + 10,
                            transform: "translateX(-50%)",
                        }}
                    >
                        hehe nope 😝
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
