"use client";

import { motion } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";
import { useTranslations } from "next-intl";

interface FeatureSectionProps {
    titleKey: string;
    textKey: string;
    imageSrc: string;
    imageAlt: string;
    reversed?: boolean;
}

export default function FeatureSection({
    titleKey,
    textKey,
    imageSrc,
    imageAlt,
    reversed = false,
}: FeatureSectionProps) {
    const t = useTranslations("home");

    return (
        <section className="overflow-hidden py-20 lg:py-28 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <motion.div
                        className={`flex flex-col justify-center ${reversed ? "lg:order-2" : "lg:order-1"
                            }`}
                        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-[#1a1510] sm:text-4xl lg:text-5xl font-serif">
                            {t(titleKey)}
                        </h2>
                        <div className="mt-6 h-1 w-20 bg-[#e8b86d] rounded-full" />
                        <p className="mt-6 text-lg text-[#5c4a3a] leading-relaxed">
                            {t(textKey)}
                        </p>
                    </motion.div>
                    <motion.div
                        className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ${reversed ? "lg:order-1" : "lg:order-2"
                            }`}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                        <ImageWithFallback
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            fallbackContent="🖼️"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
