"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/CartContext";
import { submitOrder } from "@/app/actions/order";
import { Ticket, X, CheckCircle2, AlertCircle } from "lucide-react";

type CheckoutStep = "details" | "payment" | "confirm";

export default function CheckoutPage() {
    const t = useTranslations("checkout");
    const {
        items, subtotal, discount, total, clearCart, count,
        coupon, applyCoupon, removeCoupon
    } = useCart();

    const [step, setStep] = useState<CheckoutStep>("details");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "Brăila",
        notes: "",
        payment: "cash",
    });

    const [couponInput, setCouponInput] = useState("");
    const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");

    const updateField = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const result = applyCoupon(couponInput);
        if (result.success) {
            setCouponMsg({ type: "success", text: result.message });
            setCouponInput("");
        } else {
            setCouponMsg({ type: "error", text: result.message });
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = await submitOrder({
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                notes: form.notes,
                payment: form.payment,
                items: items.map((item) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                })),
                subtotal,
                discount,
                coupon: coupon || undefined,
                total,
            });
            if (result.success) {
                setOrderNumber(result.orderNumber || "");
                setOrderPlaced(true);
                clearCart();
            }
        } catch (err) {
            console.error("Order error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border-2 border-green-200 bg-gradient-to-b from-green-50 to-white p-10 shadow-xl"
                >
                    <motion.span
                        className="inline-block text-7xl"
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        ✅
                    </motion.span>
                    <h2 className="mt-4 text-2xl font-bold text-[#1a1510]">{t("success_title")}</h2>
                    <p className="mt-2 text-[#5c4a3a]">{t("success_text")}</p>
                    {orderNumber && (
                        <div className="mt-4 rounded-xl bg-[#FFF8E1] p-3 border border-[#E8DDB8]">
                            <p className="text-sm font-bold text-[#1a1510]">CMD: {orderNumber}</p>
                        </div>
                    )}
                    <p className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-700 border border-green-200">
                        📧 {t("success_email")}
                    </p>
                    <div className="mt-6 rounded-xl border border-[#E8DDB8] bg-[#FFFEF7] p-4 text-left text-sm">
                        <p className="font-semibold text-[#1a1510]">{t("company_details")}:</p>
                        <p className="mt-1 text-[#5c4a3a]">Firma de Exercițiu COLIPOP S.R.L.</p>
                        <p className="text-[#5c4a3a]">Colegiul Economic "Ion Ghica", Brăila</p>
                        <p className="text-[#5c4a3a]">CUI: 83252082 | Reg. Com: J09/6282/2025</p>
                        <p className="text-[#5c4a3a] font-mono select-all">IBAN: RO25ROCT8325208210890001</p>
                        <p className="text-[#5c4a3a] mt-2 text-xs italic">Profesori coordonatori: Feichter Narcisa Liliana, Istrate Camelia</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (count === 0 && !orderPlaced) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                <span className="text-6xl">🧁</span>
                <h2 className="mt-4 text-2xl font-bold text-[#1a1510]">{t("empty_cart")}</h2>
                <p className="mt-2 text-[#5c4a3a]">{t("empty_cart_desc")}</p>
            </div>
        );
    }

    const steps: CheckoutStep[] = ["details", "payment", "confirm"];
    const stepIndex = steps.indexOf(step);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#1a1510]">{t("title")}</h1>

            {/* Steps */}
            <div className="mt-8 flex items-center justify-center gap-2">
                {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${i <= stepIndex
                                ? "bg-[#e8b86d] text-[#1a1510]"
                                : "bg-[#E8DDB8] text-[#5c4a3a]"
                                }`}
                        >
                            {i + 1}
                        </div>
                        <span className={`text-sm ${i <= stepIndex ? "font-semibold text-[#1a1510]" : "text-[#5c4a3a]"}`}>
                            {t(`step_${s}`)}
                        </span>
                        {i < steps.length - 1 && <div className="mx-2 h-0.5 w-12 bg-[#E8DDB8]" />}
                    </div>
                ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
                {/* Form */}
                <div className="lg:col-span-2">
                    {step === "details" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-[#1a1510] mb-1">{t("name")} *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="w-full rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-3 text-sm text-[#1a1510] outline-none focus:border-[#e8b86d]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1a1510] mb-1">{t("phone")} *</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, "");
                                            if (val.length <= 15) updateField("phone", val);
                                        }}
                                        className="w-full rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-3 text-sm text-[#1a1510] outline-none focus:border-[#e8b86d]"
                                        required
                                        placeholder="07..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1510] mb-1">{t("email")} *</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    // Simple validation check for visual feedback
                                    className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-[#1a1510] outline-none focus:border-[#e8b86d] ${form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                                        ? "border-red-500 bg-red-50"
                                        : "border-[#E8DDB8] bg-[#FFFEF7]"
                                        }`}
                                    required
                                />
                                {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                                    <p className="mt-1 text-xs text-red-500">Email invalid</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1510] mb-1">{t("address")} *</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => updateField("address", e.target.value)}
                                    className="w-full rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-3 text-sm text-[#1a1510] outline-none focus:border-[#e8b86d]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1510] mb-1">{t("notes")}</label>
                                <textarea
                                    value={form.notes}
                                    onChange={(e) => updateField("notes", e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-3 text-sm text-[#1a1510] outline-none focus:border-[#e8b86d]"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep("payment")}
                                disabled={
                                    !form.name ||
                                    !form.address ||
                                    !form.phone ||
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                                }
                                className="w-full rounded-xl bg-gradient-to-r from-[#e8b86d] to-[#F79A19] py-3 font-semibold text-[#1a1510] shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {t("continue")} →
                            </button>
                        </motion.div>
                    )}

                    {step === "payment" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <h3 className="text-lg font-bold text-[#1a1510]">{t("payment_method")}</h3>
                            {["cash", "transfer"].map((method) => (
                                <label
                                    key={method}
                                    className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-5 transition-all ${form.payment === method ? "border-[#e8b86d] bg-[#FFF8E1]" : "border-[#E8DDB8] hover:border-[#e8b86d]/50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method}
                                        checked={form.payment === method}
                                        onChange={() => updateField("payment", method)}
                                        className="sr-only"
                                    />
                                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${form.payment === method ? "border-[#e8b86d] bg-[#e8b86d]" : "border-[#E8DDB8]"
                                        }`}>
                                        {form.payment === method && <span className="h-2 w-2 rounded-full bg-white" />}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-[#1a1510]">{t(`pay_${method}`)}</p>
                                        <p className="text-sm text-[#5c4a3a]">{t(`pay_${method}_desc`)}</p>
                                    </div>
                                </label>
                            ))}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep("details")}
                                    className="rounded-xl border border-[#E8DDB8] px-6 py-3 text-sm font-medium text-[#5c4a3a] hover:bg-[#F7E396]/20"
                                >
                                    ← {t("back")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep("confirm")}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-[#e8b86d] to-[#F79A19] py-3 font-semibold text-[#1a1510] shadow-lg hover:shadow-xl"
                                >
                                    {t("continue")} →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "confirm" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <h3 className="text-lg font-bold text-[#1a1510]">{t("order_summary")}</h3>
                            <div className="rounded-xl border border-[#E8DDB8] bg-[#FFFEF7] p-5 space-y-2 text-sm">
                                <p><strong>{t("name")}:</strong> {form.name}</p>
                                <p><strong>{t("email")}:</strong> {form.email}</p>
                                <p><strong>{t("phone")}:</strong> {form.phone}</p>
                                <p><strong>{t("address")}:</strong> {form.address}</p>
                                <p><strong>{t("payment_method")}:</strong> {t(`pay_${form.payment}`)}</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep("payment")}
                                    className="rounded-xl border border-[#E8DDB8] px-6 py-3 text-sm font-medium text-[#5c4a3a] hover:bg-[#F7E396]/20"
                                >
                                    ← {t("back")}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-50"
                                >
                                    {submitting ? "Se procesează..." : `✓ ${t("place_order")}`}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Order summary sidebar */}
                <div className="space-y-6">
                    <div className="rounded-2xl border-2 border-[#E8DDB8] bg-[#FFFEF7] p-5">
                        <h3 className="font-bold text-[#1a1510]">{t("your_order")}</h3>
                        <div className="mt-4 space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F7E396]/30">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1a1510]">{item.title}</p>
                                        <p className="text-xs text-[#5c4a3a]">{item.quantity} × {item.price} RON</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Coupon Section in Checkout */}
                        <div className="mt-6 border-t border-[#E8DDB8] pt-4 space-y-3">
                            {!coupon ? (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-[#5c4a3a] uppercase tracking-wider">Ai un cod de reducere?</p>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <input
                                                type="text"
                                                placeholder="Cod..."
                                                value={couponInput}
                                                onChange={(e) => setCouponInput(e.target.value)}
                                                className="w-full rounded-lg border border-[#E8DDB8] bg-white py-2 pl-9 pr-4 text-xs outline-none focus:border-[#e8b86d]"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyCoupon}
                                            className="rounded-lg bg-[#1a1510] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#3d3125]"
                                        >
                                            Aplică
                                        </button>
                                    </div>
                                    {couponMsg && (
                                        <p className={`text-[10px] font-medium ${couponMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                                            {couponMsg.text}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 border border-green-200">
                                    <div className="flex items-center gap-2 text-green-700 text-xs">
                                        <CheckCircle2 size={14} />
                                        <span className="font-bold underline">{coupon}</span> aplicat
                                    </div>
                                    <button onClick={removeCoupon} className="text-red-400 hover:text-red-600 p-1">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 border-t border-[#E8DDB8] pt-4 space-y-1">
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
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#E8DDB8]/30 mt-2">
                                <span>{t("total")}:</span>
                                <span className="text-[#F79A19]">{total.toFixed(2)} RON</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Notification */}
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 flex gap-3">
                        <div className="text-2xl">🚚</div>
                        <div className="text-xs text-blue-800 leading-relaxed">
                            {subtotal >= 100 ? (
                                <p className="font-bold">Livrare GRATUITĂ aplicată!</p>
                            ) : (
                                <p>Mai adaugă produse de <span className="font-bold">{(100 - subtotal).toFixed(2)} RON</span> pentru livrare gratuită.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
