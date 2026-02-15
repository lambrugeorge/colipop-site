"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";

type LegalPageLayoutProps = {
    children: React.ReactNode;
    title: string;
};

export default function LegalPageLayout({ children, title }: LegalPageLayoutProps) {
    const t = useTranslations("footer");
    const pathname = usePathname();

    const links = [
        { href: "/termeni-si-conditii", label: t("terms") },
        { href: "/politica-confidentialitate", label: t("privacy_policy") },
        { href: "/politica-cookie-uri", label: t("cookie_policy") },
        { href: "/politica-livrare", label: t("delivery_policy") },
        { href: "/politica-retur", label: t("return_policy") },
        { href: "/politica-plata", label: t("payment_policy") },
        { href: "/cum-comand", label: t("how_to_order") },
    ];

    return (
        <div className="bg-[#FFFEF7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3 mb-8 lg:mb-0">
                        <nav className="space-y-1 sticky top-24">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? "bg-[#e8b86d] text-[#1a1510]"
                                            : "text-[#5c4a3a] hover:bg-[#E8DDB8]/50 hover:text-[#1a1510]"
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full mr-3 ${isActive ? "bg-[#1a1510]" : "bg-transparent group-hover:bg-[#e8b86d]"}`} />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-sm border border-[#E8DDB8] overflow-hidden"
                        >
                            <div className="px-6 py-8 sm:p-10">
                                <h1 className="text-3xl font-bold text-[#1a1510] border-b border-[#E8DDB8] pb-6 mb-8">
                                    {title}
                                </h1>
                                <div className="prose prose-amber max-w-none text-[#5c4a3a]">
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
