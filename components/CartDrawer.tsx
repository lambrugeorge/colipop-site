"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import { useState } from "react";
import { Ticket, X, CheckCircle2, AlertCircle } from "lucide-react";

export default function CartDrawer() {
    const {
        items, removeItem, updateQuantity,
        subtotal, discount, total, count,
        isOpen, setIsOpen,
        coupon, applyCoupon, removeCoupon
    } = useCart();
    const t = useTranslations("shop");
    const [couponInput, setCouponInput] = useState("");
    const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const result = applyCoupon(couponInput);
        if (result.success) {
            setMsg({ type: "success", text: result.message });
            setCouponInput("");
        } else {
            setMsg({ type: "error", text: result.message });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#E8DDB8] bg-gradient-to-r from-[#1a1510] to-[#3d3125] px-6 py-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🛒</span>
                                <h2 className="text-lg font-bold text-white">{t("cart_title")}</h2>
                                {count > 0 && (
                                    <span className="rounded-full bg-[#e8b86d] px-2.5 py-0.5 text-xs font-bold text-[#1a1510]">
                                        {count}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-white hover:bg-white/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Banner Ofertă */}
                        <div className="bg-[#FFF8E1] border-b border-[#E8DDB8] px-4 py-2 flex items-center gap-2">
                            <span className="text-lg">🎁</span>
                            <div className="text-[11px] leading-tight text-[#1a1510]">
                                <span className="font-bold underline">COLIPOP10</span> - 10% la prima comandă!
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <span className="text-5xl">🧁</span>
                                    <p className="mt-4 text-lg font-medium text-[#5c4a3a]">{t("cart_empty")}</p>
                                    <p className="mt-1 text-sm text-[#5c4a3a]/70">{t("cart_empty_desc")}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 rounded-xl border border-[#E8DDB8] bg-[#FFFEF7] p-3 shadow-sm"
                                        >
                                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F7E396]/30">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-[#1a1510] text-sm">{item.title}</h3>
                                                    <p className="text-sm font-bold text-[#F79A19]">{item.price} RON</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center rounded-lg border border-[#E8DDB8] bg-white">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-sm hover:bg-[#F7E396]/30"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-sm hover:bg-[#F7E396]/30"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-400 hover:text-red-600 text-xs font-medium"
                                                    >
                                                        {t("remove")}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-[#E8DDB8] bg-[#FFFEF7] p-4 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                                {/* Coupon Application */}
                                <div className="space-y-2">
                                    {!coupon ? (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c4a3a]" size={16} />
                                                <input
                                                    type="text"
                                                    placeholder="Cod cupon..."
                                                    value={couponInput}
                                                    onChange={(e) => setCouponInput(e.target.value)}
                                                    className="w-full rounded-lg border border-[#E8DDB8] bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-[#e8b86d]"
                                                />
                                            </div>
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="rounded-lg bg-[#1a1510] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3d3125]"
                                            >
                                                Aplică
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 border border-green-200">
                                            <div className="flex items-center gap-2 text-green-700 text-sm">
                                                <CheckCircle2 size={16} />
                                                <span className="font-bold">{coupon}</span> aplicat
                                            </div>
                                            <button onClick={removeCoupon} className="text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 p-1">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                    {msg && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex items-center gap-1 text-[11px] font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}
                                        >
                                            {msg.type === "success" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                            {msg.text}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="space-y-1 bg-white/50 p-3 rounded-xl border border-[#E8DDB8]/50">
                                    <div className="flex justify-between text-sm text-[#5c4a3a]">
                                        <span>Subtotal:</span>
                                        <span>{subtotal.toFixed(2)} RON</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600 font-medium">
                                            <span>Reducere (10%):</span>
                                            <span>-{discount.toFixed(2)} RON</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-[#E8DDB8]/30 pt-2 text-lg font-bold text-[#1a1510]">
                                        <span>Total:</span>
                                        <span className="text-[#F79A19]">{total.toFixed(2)} RON</span>
                                    </div>
                                </div>

                                <Link
                                    href="/magazin/checkout"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full rounded-xl bg-gradient-to-r from-[#e8b86d] to-[#F79A19] px-6 py-4 text-center font-bold text-[#1a1510] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                                >
                                    {t("checkout")} →
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
