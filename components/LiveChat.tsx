"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
    time: string;
};

const AUTO_REPLIES: Record<string, string> = {
    salut: "Bună ziua! Vă mulțumim că ne-ați contactat. Cu ce vă putem ajuta?",
    buna: "Bună ziua! Cum vă putem fi de folos?",
    pret: "Prețurile noastre variază în funcție de produs. Vizitați pagina Produse sau Magazin pentru detalii complete.",
    comanda: "Pentru comenzi, puteți folosi magazinul online sau ne contactați la 0733 194 610.",
    livrare: "Livrăm în raza municipiului Brăila și zonele limitrofe. Termenul standard este de 24-48 ore.",
    coliva: "Coliva este specialitatea noastră! Oferim variante tradiționale și reinterpretări moderne.",
    tort: "Torturile noastre pot fi personalizate. Contactați-ne pentru detalii și preț.",
    program: "Programul nostru: Luni-Vineri, 08:00-15:00.",
    default: "Vă mulțumim pentru mesaj! Un reprezentant vă va răspunde în cel mai scurt timp. Între timp, puteți consulta secțiunea FAQ sau ne puteți suna la 0733 194 610.",
};

function getAutoReply(text: string): string {
    const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
        if (keyword !== "default" && lower.includes(keyword)) return reply;
    }
    return AUTO_REPLIES.default;
}

function getTimeString(): string {
    return new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
}

export default function LiveChat() {
    const t = useTranslations("chat");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: "Bună ziua! 👋 Sunt asistentul virtual ColiPop. Cu ce vă pot ajuta?",
            sender: "bot",
            time: getTimeString(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMsg: Message = {
            id: Date.now(),
            text: input.trim(),
            sender: "user",
            time: getTimeString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const botReply: Message = {
                id: Date.now() + 1,
                text: getAutoReply(userMsg.text),
                sender: "bot",
                time: getTimeString(),
            };
            setMessages((prev) => [...prev, botReply]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1500);
    };

    return (
        <>
            {/* Chat button */}
            <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b86d] to-[#F79A19] text-[#1a1510] shadow-2xl hover:shadow-3xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 0 0 0 rgba(232, 184, 109, 0)"
                        : [
                            "0 0 0 0 rgba(232, 184, 109, 0.4)",
                            "0 0 0 20px rgba(232, 184, 109, 0)",
                        ],
                }}
                transition={isOpen ? {} : { duration: 2, repeat: Infinity }}
                aria-label={t("title")}
            >
                {isOpen ? (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-amber-900/30 bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 bg-gradient-to-r from-[#1a1510] to-[#3d3125] px-5 py-4">
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8b86d] text-lg font-bold text-[#1a1510]">
                                    C
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1a1510] bg-green-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">{t("title")}</p>
                                <p className="text-xs text-amber-200/70">{t("online")}</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-gradient-to-b from-[#FFFEF7] to-white">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user"
                                                ? "rounded-br-sm bg-gradient-to-br from-[#e8b86d] to-[#F79A19] text-[#1a1510]"
                                                : "rounded-bl-sm bg-[#f5f0e0] text-[#1a1510]"
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                        <p className={`mt-1 text-[10px] ${msg.sender === "user" ? "text-[#1a1510]/60" : "text-[#5c4a3a]/60"}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl rounded-bl-sm bg-[#f5f0e0] px-4 py-3">
                                        <div className="flex gap-1">
                                            <motion.span className="h-2 w-2 rounded-full bg-[#5c4a3a]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                                            <motion.span className="h-2 w-2 rounded-full bg-[#5c4a3a]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                            <motion.span className="h-2 w-2 rounded-full bg-[#5c4a3a]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-[#E8DDB8] bg-white p-3">
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                                className="flex gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t("placeholder")}
                                    className="flex-1 rounded-xl border border-[#E8DDB8] bg-[#FFFEF7] px-4 py-2.5 text-sm text-[#1a1510] placeholder-[#5c4a3a]/50 outline-none focus:border-[#e8b86d] focus:ring-2 focus:ring-[#e8b86d]/30"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8b86d] to-[#F79A19] text-[#1a1510] transition-all hover:shadow-lg disabled:opacity-40"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
