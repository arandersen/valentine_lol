const SOUND_KEY = "valentine-sound-enabled";

export function getSoundPreference(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SOUND_KEY) === "true";
}

export function setSoundPreference(enabled: boolean): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(SOUND_KEY, String(enabled));
}

export function playSound(soundName: "pop" | "click" | "success"): void {
    if (!getSoundPreference()) return;

    try {
        const audio = new Audio(`/valentine_lol/sounds/${soundName}.mp3`);
        audio.volume = 0.5;
        audio.play().catch(() => {
            // Browser may block autoplay - this is expected
        });
    } catch {
        // Audio file might not exist yet
    }
}
