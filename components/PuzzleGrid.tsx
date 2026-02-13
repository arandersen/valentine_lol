"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    TileState,
    canMove,
    moveTile,
    getTileBackgroundPosition,
} from "@/lib/puzzle";
import { playSound } from "@/lib/sound";

interface PuzzleGridProps {
    tiles: TileState;
    onTileMove: (newTiles: TileState) => void;
    disabled?: boolean;
}

export function PuzzleGrid({ tiles, onTileMove, disabled }: PuzzleGridProps) {
    const handleTileClick = (index: number) => {
        if (disabled) return;
        if (!canMove(tiles, index)) return;

        const newTiles = moveTile(tiles, index);
        if (newTiles) {
            playSound("click");
            onTileMove(newTiles);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-1 p-2 bg-secondary rounded-xl">
            {tiles.map((tile, index) => (
                <motion.button
                    key={`${tile}-${index}`}
                    className={cn(
                        "w-20 h-20 sm:w-24 sm:h-24 rounded-lg transition-all duration-200",
                        tile !== null && "cursor-pointer",
                        tile !== null && canMove(tiles, index)
                            ? "hover:scale-105 hover:shadow-md active:scale-95"
                            : "",
                        tile === null && "bg-transparent",
                        tile !== null && "bg-card shadow-sm border border-border/50"
                    )}
                    onClick={() => handleTileClick(index)}
                    disabled={disabled || tile === null}
                    style={
                        tile !== null
                            ? {
                                backgroundImage: "url('/valentine_lol/arthur3.jpeg')",
                                backgroundSize: "300% 300%",
                                backgroundPosition: getTileBackgroundPosition(tile),
                            }
                            : undefined
                    }
                    whileHover={tile !== null && canMove(tiles, index) ? { scale: 1.05 } : {}}
                    whileTap={tile !== null && canMove(tiles, index) ? { scale: 0.95 } : {}}
                    aria-label={
                        tile !== null
                            ? `Tile ${tile + 1}${canMove(tiles, index) ? " (movable)" : ""}`
                            : "Empty space"
                    }
                />
            ))}
        </div>
    );
}
