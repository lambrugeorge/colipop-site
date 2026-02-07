"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ValuesSection() {
    const t = useTranslations("home");

    const values = [
        {
            icon: <CroissantIcon />,
            title: t("stats_products"),
            desc: t("stats_products_desc"),
        },
        {
            icon: <SparklesIcon />,
            title: t("stats_tradition"),
            desc: t("stats_tradition_desc"),
        },
        {
            icon: <TruckIcon />,
            title: t("stats_servicii"),
            desc: t("stats_servicii_desc"),
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="bg-white/80 backdrop-blur-sm py-20 lg:py-28 relative z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid gap-10 sm:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            className="group relative flex flex-col items-center rounded-3xl border border-[#E8DDB8]/70 bg-gradient-to-b from-white to-[#F7E396]/10 p-8 text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-[#e8b86d]"
                            variants={item}
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8b86d]/20 text-[#1a1510] shadow-inner group-hover:rotate-6 transition-transform">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1510] font-sans tracking-wide">
                                {val.title}
                            </h3>
                            <p className="mt-3 text-[#5c4a3a] leading-relaxed">{val.desc}</p>
                            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/[0.03] group-hover:ring-[#e8b86d]/30" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CroissantIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.6 13.7a4.1 4.1 0 0 0 1 .5 6 6 0 0 1 2.2-1.8 11.2 11.2 0 0 0-1.7-5.5 13.9 13.9 0 0 1 3.7.8c.8.3 1.6.8 2.3 1.3.4.3.9.7 1.3 1a5.9 5.9 0 0 1 1 2.7 6 6 0 0 0 1.2-1.3l.5-.5c.8-.9 1.5-1.7 2.9-1.2 1.4.5 1.7 2.1 1 3.5l-.6.9a5.3 5.3 0 0 1-1.3 1.3c-.4.3-.9.6-1.3.9-.7.4-1.5.7-2.3.8-1.5.2-3-.3-4.3-.9a10.9 10.9 0 0 0-2.4-.6c-1.3-.1-2.6.2-3.8.8a4.3 4.3 0 0 1-1.2.3 2 2 0 0 1-1.5-.7 2 2 0 0 1 0-2.8Z" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 17h4V5H2v12h3" />
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
            <path d="M14 17h1" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    );
}
