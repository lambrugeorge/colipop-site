"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "../i18n/navigation";

type AnimatedLogoProps = {
    size?: number;
    className?: string;
    showText?: boolean;
};

export default function AnimatedLogo({ size = 56, className = "", showText = true }: AnimatedLogoProps) {
    const [logoError, setLogoError] = useState(false);

    return (
        <Link href="/" className={`flex items-center gap-3 group ${className}`} aria-label="Pagina principală ColiPop">
            <motion.div
                className="relative shrink-0 overflow-hidden rounded-full bg-amber-900/30 shadow-lg"
                style={{ width: size, height: size }}
                animate={{
                    boxShadow: [
                        "0 0 0 0 rgba(232, 184, 109, 0)",
                        "0 0 20px 4px rgba(232, 184, 109, 0.5)",
                        "0 0 0 0 rgba(232, 184, 109, 0)",
                    ],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, -5, 5, 0],
                    transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
            >
                {!logoError ? (
                    <Image
                        src="/logo.png"
                        alt="ColiPop - Pagina principală"
                        fill
                        className="object-contain p-1"
                        sizes={`${size}px`}
                        unoptimized
                        onError={() => setLogoError(true)}
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-lg font-bold text-[#FFE52A]">
                        C
                    </span>
                )}
                {/* Glow ring effect */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#e8b86d]/50"
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
            {showText && (
                <motion.span
                    className="text-xl font-bold text-[#f5f3ef] sm:text-2xl group-hover:text-[#e8b86d] transition-colors"
                    whileHover={{ x: 3 }}
                >
                    ColiPop
                </motion.span>
            )}
        </Link>
    );
}
