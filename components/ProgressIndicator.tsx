"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
    currentStep: 1 | 2 | 3;
    className?: string;
}

const steps = [
    { number: 1, label: "Start" },
    { number: 2, label: "Puzzle" },
    { number: 3, label: "Success" },
];

export function ProgressIndicator({
    currentStep,
    className,
}: ProgressIndicatorProps) {
    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                        <Badge
                            variant={
                                step.number < currentStep
                                    ? "success"
                                    : step.number === currentStep
                                        ? "current"
                                        : "outline"
                            }
                            className={cn(
                                "h-8 w-8 rounded-full p-0 flex items-center justify-center text-sm",
                                step.number < currentStep && "bg-green-500",
                                step.number === currentStep && "ring-2 ring-primary ring-offset-2"
                            )}
                        >
                            {step.number < currentStep ? "✓" : step.number}
                        </Badge>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "w-8 sm:w-12 h-0.5 mx-2",
                                step.number < currentStep ? "bg-green-500" : "bg-border"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
