import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

export function ConfettiSubmit() {
    const [status, setStatus] = useState < "idle" | "loading" | "success" > ("idle");

    const handleClick = async () => {
        if (status !== "idle") return;

        setStatus("loading");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus("success");
        triggerConfetti();

        // Reset after a delay
        setTimeout(() => setStatus("idle"), 3000);
    };

    const triggerConfetti = () => {
        const end = Date.now() + 1000;
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    return (
        <div className="flex items-center justify-center p-10 bg-[#060010] rounded-xl border border-white/10">
            <motion.div
                animate={status === "success" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.2 }}
            >
                <Button
                    onClick={handleClick}
                    className={`
            relative overflow-hidden min-w-[140px] h-12 text-lg font-medium transition-all duration-300
            ${status === "success"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-white text-black hover:bg-neutral-200"
                        }
          `}
                >
                    <div className="relative z-10 flex items-center gap-2">
                        {status === "idle" && <span>Submit Order</span>}
                        {status === "loading" && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing</span>
                            </>
                        )}
                        {status === "success" && (
                            <>
                                <Check className="w-5 h-5" />
                                <span>Success!</span>
                            </>
                        )}
                    </div>

                    {/* Progress bar effect for loading */}
                    {status === "loading" && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-black/10"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5 }}
                        />
                    )}
                </Button>
            </motion.div>
        </div>
    );
}
