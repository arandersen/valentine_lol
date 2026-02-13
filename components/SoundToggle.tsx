"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    getSoundPreference,
    setSoundPreference,
} from "@/lib/sound";

interface SoundToggleProps {
    className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsSoundOn(getSoundPreference());
    }, []);

    const toggleSound = useCallback(() => {
        const newValue = !isSoundOn;
        setIsSoundOn(newValue);
        setSoundPreference(newValue);
    }, [isSoundOn]);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className={className}
                disabled
            >
                <VolumeX className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className={className}
            title={isSoundOn ? "Sound: On" : "Sound: Off"}
            aria-label={isSoundOn ? "Turn sound off" : "Turn sound on"}
        >
            {isSoundOn ? (
                <Volume2 className="h-5 w-5 text-primary" />
            ) : (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
            )}
        </Button>
    );
}
