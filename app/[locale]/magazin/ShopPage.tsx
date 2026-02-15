"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/CartContext";

type ShopProduct = {
    id: string;
    titleKey: string;
    descKey: string;
    price: number;
    image: string;
    category: string;
};

const shopProducts: ShopProduct[] = [
    { id: "p1", titleKey: "sp1_title", descKey: "sp1_desc", price: 45, image: "/imagine1.jpeg", category: "coliva" },
    { id: "p2", titleKey: "sp2_title", descKey: "sp2_desc", price: 18, image: "/imagine2.jpeg", category: "deserturi" },
    { id: "p3", titleKey: "sp3_title", descKey: "sp3_desc", price: 22, image: "/imagine3.jpeg", category: "deserturi" },
    { id: "p4", titleKey: "sp4_title", descKey: "sp4_desc", price: 150, image: "/imagine4.jpeg", category: "torturi" },
    { id: "p5", titleKey: "sp5_title", descKey: "sp5_desc", price: 25, image: "/imagine5.jpeg", category: "deserturi" },
    { id: "p6", titleKey: "sp6_title", descKey: "sp6_desc", price: 60, image: "/imagine1.jpeg", category: "coliva" },
];

const categories = ["all", "coliva", "deserturi", "torturi"];

export default function ShopPage() {
    const t = useTranslations("shop");
    const { addItem, setIsOpen, count } = useCart();
    const [activeCategory, setActiveCategory] = useState("all");
    const [addedId, setAddedId] = useState<string | null>(null);

    const filtered = activeCategory === "all"
        ? shopProducts
        : shopProducts.filter((p) => p.category === activeCategory);

    const handleAdd = (product: ShopProduct) => {
        addItem({
            id: product.id,
            title: t(product.titleKey),
            price: product.price,
            image: product.image,
        });
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1000);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
                    <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="relative inline-flex items-center gap-2 rounded-xl bg-[#1a1510] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3d3125] transition-colors"
                >
                    🛒 {t("view_cart")}
                    {count > 0 && (
                        <motion.span
                            key={count}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#F79A19] text-xs font-bold text-[#1a1510]"
                        >
                            {count}
                        </motion.span>
                    )}
                </button>
            </div>

            {/* Promotion banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl bg-gradient-to-r from-[#1a1510] to-[#3d3125] p-6 text-center"
            >
                <p className="text-lg font-bold text-[#e8b86d]">🎁 {t("promo_title")}</p>
                <p className="mt-1 text-sm text-amber-200/80">{t("promo_desc")}</p>
            </motion.div>

            {/* Category filter */}
            <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-[#e8b86d] text-[#1a1510] shadow-lg"
                                : "border border-[#E8DDB8] bg-white text-[#5c4a3a] hover:border-[#e8b86d]"
                            }`}
                    >
                        {t(`cat_${cat}`)}
                    </button>
                ))}
            </div>

            {/* Product grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg transition-all hover:border-[#F79A19] hover:shadow-xl"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#F7E396]/30">
                            <Image
                                src={product.image}
                                alt={t(product.titleKey)}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                unoptimized
                            />
                            <span className="absolute left-3 top-3 rounded-full bg-[#1a1510]/80 px-3 py-1 text-xs font-medium text-white">
                                {t(`cat_${product.category}`)}
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                            <h3 className="text-lg font-bold text-[#1a1510]">{t(product.titleKey)}</h3>
                            <p className="mt-1 flex-1 text-sm text-[#5c4a3a]">{t(product.descKey)}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-xl font-bold text-[#F79A19]">{product.price} RON</p>
                                <motion.button
                                    type="button"
                                    onClick={() => handleAdd(product)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${addedId === product.id
                                            ? "bg-green-500 text-white"
                                            : "bg-gradient-to-r from-[#e8b86d] to-[#F79A19] text-[#1a1510] hover:shadow-lg"
                                        }`}
                                >
                                    {addedId === product.id ? "✓ " + t("added") : "🛒 " + t("add_to_cart")}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Payment info */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                    { icon: "🔒", titleKey: "pay_secure_title", descKey: "pay_secure_desc" },
                    { icon: "🚚", titleKey: "pay_delivery_title", descKey: "pay_delivery_desc" },
                    { icon: "📧", titleKey: "pay_confirm_title", descKey: "pay_confirm_desc" },
                ].map((info, i) => (
                    <div key={i} className="flex gap-4 rounded-2xl border border-[#E8DDB8] bg-[#FFFEF7] p-5">
                        <span className="text-3xl">{info.icon}</span>
                        <div>
                            <p className="font-semibold text-[#1a1510]">{t(info.titleKey)}</p>
                            <p className="mt-1 text-sm text-[#5c4a3a]">{t(info.descKey)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
