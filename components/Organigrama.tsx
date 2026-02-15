"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, ChefHat, Megaphone, Wallet, Users } from "lucide-react";

type OrgMember = {
    role: string;
    name: string;
    icon: React.ElementType;
    color: string;
};

export default function Organigrama() {
    const t = useTranslations("organigrama");

    const management: OrgMember = {
        role: t("director_role"),
        name: t("director_name"),
        icon: Briefcase,
        color: "#e8b86d",
    };

    const departments: OrgMember[][] = [
        [
            { role: t("prod_role"), name: t("prod_name"), icon: ChefHat, color: "#F79A19" },
            { role: t("marketing_role"), name: t("marketing_name"), icon: Megaphone, color: "#3B82F6" },
        ],
        [
            { role: t("finance_role"), name: t("finance_name"), icon: Wallet, color: "#10B981" },
            { role: t("hr_role"), name: t("hr_name"), icon: Users, color: "#8B5CF6" },
        ],
    ];

    return (
        <section className="mt-16 text-center">
            <h2 className="text-4xl font-bold text-[#1a1510]">{t("title")}</h2>
            <p className="mt-3 text-lg text-[#5c4a3a] max-w-2xl mx-auto">{t("subtitle")}</p>

            <div className="mt-12 flex flex-col items-center">
                {/* Director */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <OrgCard member={management} isDirector />
                </motion.div>

                {/* Vertical Line */}
                <div className="h-12 w-1 bg-gradient-to-b from-[#e8b86d] to-[#E8DDB8]" />

                {/* Horizontal Connector */}
                <div className="h-1 w-full max-w-3xl bg-gradient-to-r from-transparent via-[#E8DDB8] to-transparent rounded-full" />

                {/* Rows Container */}
                <div className="mt-0 w-full max-w-4xl space-y-12 pt-0">
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-8 md:gap-16">
                        {departments[0].map((member, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-8 w-1 bg-[#E8DDB8]" />
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="w-full"
                                >
                                    <OrgCard member={member} />
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-8 md:gap-16">
                        {departments[1].map((member, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-8 w-1 bg-[#E8DDB8]" />
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.2 }}
                                    className="w-full"
                                >
                                    <OrgCard member={member} />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function OrgCard({ member, isDirector = false }: { member: OrgMember; isDirector?: boolean }) {
    const Icon = member.icon;

    return (
        <div
            className={`group flex flex-col items-center rounded-3xl border-2 px-8 py-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] ${isDirector
                ? "border-[#e8b86d] bg-gradient-to-br from-[#FFF8E1] to-white min-w-[280px]"
                : "border-[#E8DDB8] bg-white hover:border-[#e8b86d]"
                }`}
        >
            <div
                className="p-5 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors duration-300 shadow-inner"
                style={{ color: member.color }}
            >
                <Icon size={isDirector ? 56 : 48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="mt-6 text-center">
                <p className={`text-xl font-bold uppercase tracking-wider ${isDirector ? "text-[#e8b86d]" : "text-[#1a1510]"}`}>
                    {member.role}
                </p>
                <div className="mt-2 h-1 w-12 bg-[#e8b86d]/30 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="mt-3 text-base font-medium text-[#5c4a3a]">{member.name}</p>
            </div>
        </div>
    );
}
