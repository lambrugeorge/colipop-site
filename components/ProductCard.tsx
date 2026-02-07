"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  price?: string;
  priceNote?: string;
  image: string;
  imageAlt?: string;
  index?: number;
};

export default function ProductCard({
  title,
  description,
  benefits,
  price,
  priceNote,
  image,
  imageAlt,
  index = 0,
}: ProductCardProps) {
  const t = useTranslations("products");
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.article
        className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg transition-all hover:border-[#F79A19] hover:shadow-xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-video w-full overflow-hidden bg-[#F7E396]/30 focus:outline-none focus:ring-2 focus:ring-[#F79A19] focus:ring-offset-2"
          aria-label={title}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#FACE68]/30 text-3xl font-bold text-[#1a1510]/40">
            {title.slice(0, 2)}
          </div>
          {!imgError && (
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="relative z-10 object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              onError={() => setImgError(true)}
            />
          )}
          <span className="absolute bottom-2 right-2 z-20 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {t("view_larger")}
          </span>
        </button>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-xl font-bold text-[#1a1510]">{title}</h3>
          <p className="mt-2 text-[#5c4a3a]">{description}</p>
          {benefits.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#F79A19]">{t("ingredients")}</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#5c4a3a]">
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {(price || priceNote) && (
            <p className="mt-4 font-semibold text-[#F79A19]">{price ?? priceNote}</p>
          )}
        </div>
      </motion.article>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
              aria-label={t("close")}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt ?? title}
                className="max-h-[90vh] max-w-full object-contain rounded-lg"
                style={{ width: "auto", height: "auto" }}
              />
              <p className="absolute bottom-0 left-0 right-0 mt-2 bg-black/50 py-2 text-center text-white">{title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
