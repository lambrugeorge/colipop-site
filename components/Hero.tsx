"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  image?: string;
};

export default function Hero({
  title,
  subtitle,
  showCta = false,
  image = "/imagine4.jpeg",
}: HeroProps) {
  const t = useTranslations("home");
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F7E396] via-[#FFFEF7] to-[#FACE68]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20 lg:px-8">
        <div className="flex flex-col justify-center">
          <motion.h1
            className="text-3xl font-bold tracking-tight text-[#1a1510] sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title ?? t("welcome")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-[#5c4a3a] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle ?? t("motto")}
          </motion.p>
        </div>
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-[#F7E396]/30 shadow-xl sm:aspect-video lg:aspect-[4/3]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#FACE68]/40 text-4xl font-bold text-[#1a1510]/30">
            ColiPop
          </div>
          {!imgError && (
            <Image
              src={image}
              alt="ColiPop"
              fill
              className="relative z-10 object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
