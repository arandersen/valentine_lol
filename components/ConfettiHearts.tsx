"use client";

import { useEffect, useRef, useCallback } from "react";

interface Heart {
    x: number;
    y: number;
    size: number;
    color: string;
    velocityY: number;
    velocityX: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
}

interface ConfettiHeartsProps {
    duration?: number;
    heartCount?: number;
}

const COLORS = [
    "#E8A0B8", // primary
    "#C97C98", // primary-deep
    "#D8B07A", // accent-gold
    "#FF69B4", // hot pink
    "#FFB6C1", // light pink
];

export function ConfettiHearts({
    duration = 3000,
    heartCount = 40,
}: ConfettiHeartsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const heartsRef = useRef<Heart[]>([]);
    const startTimeRef = useRef<number>(0);

    const drawHeart = useCallback(
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();

            // Heart shape using bezier curves
            const topCurveHeight = size * 0.3;
            ctx.moveTo(0, topCurveHeight);

            // Left curve
            ctx.bezierCurveTo(
                -size / 2,
                -topCurveHeight,
                -size,
                topCurveHeight / 2,
                0,
                size
            );

            // Right curve
            ctx.bezierCurveTo(
                size,
                topCurveHeight / 2,
                size / 2,
                -topCurveHeight,
                0,
                topCurveHeight
            );

            ctx.fill();
            ctx.restore();
        },
        []
    );

    const createHeart = useCallback((canvas: HTMLCanvasElement): Heart => {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            size: Math.random() * 15 + 10,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            velocityY: -(Math.random() * 3 + 2),
            velocityX: (Math.random() - 0.5) * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            opacity: 1,
        };
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const elapsed = Date.now() - startTimeRef.current;
        const progress = elapsed / duration;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw hearts
        heartsRef.current.forEach((heart) => {
            heart.y += heart.velocityY;
            heart.x += heart.velocityX;
            heart.rotation += heart.rotationSpeed;

            // Fade out towards the end
            if (progress > 0.7) {
                heart.opacity = 1 - (progress - 0.7) / 0.3;
            }

            drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.rotation, heart.opacity);
        });

        // Continue animation if not finished
        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Clean up
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [duration, drawHeart]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            // Show static hearts for reduced motion
            const ctx = canvas.getContext("2d");
            if (ctx) {
                for (let i = 0; i < 10; i++) {
                    drawHeart(
                        ctx,
                        Math.random() * canvas.width,
                        Math.random() * canvas.height,
                        Math.random() * 15 + 10,
                        COLORS[Math.floor(Math.random() * COLORS.length)],
                        Math.random() * Math.PI * 2,
                        0.5
                    );
                }
            }
            return;
        }

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize hearts
        heartsRef.current = Array.from({ length: heartCount }, () => createHeart(canvas));
        startTimeRef.current = Date.now();

        // Start animation
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate, createHeart, drawHeart, heartCount]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            aria-hidden="true"
        />
    );
}
