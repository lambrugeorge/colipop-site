
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import LegalPageLayout from "@/components/LegalPageLayout";

type Props = { params: Promise<{ locale: string }> };

export default async function HowToOrderPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("how_to_order");

    const steps = [
        { title: t("steps.0.title"), content: t("steps.0.content") },
        { title: t("steps.1.title"), content: t("steps.1.content") },
        { title: t("steps.2.title"), content: t("steps.2.content") },
        { title: t("steps.3.title"), content: t("steps.3.content") },
    ];

    return (
        <LegalPageLayout title={t("title")}>
            <div className="space-y-12">
                <p className="text-lg leading-relaxed text-[#5c4a3a] border-b border-[#E8DDB8] pb-6">
                    {t("intro")}
                </p>

                <div className="relative border-l-2 border-[#E8DDB8] ml-3 sm:ml-6 space-y-12 pb-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative pl-8 sm:pl-12">
                            <span className="absolute -left-[9px] top-0 flex h-4 w-4 rounded-full border-2 border-[#e8b86d] bg-white ring-4 ring-[#FFFEF7]" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                <h3 className="text-xl font-bold text-[#e8b86d]">
                                    {step.title}
                                </h3>
                            </div>

                            <div className="text-base leading-relaxed text-[#5c4a3a] bg-[#FFFEF7]/80 p-5 rounded-xl border border-[#E8DDB8]/40 shadow-sm transition-all hover:bg-white hover:shadow-md">
                                {step.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#E8DDB8] text-center">
                    <a href="/magazin" className="inline-block rounded-full bg-[#1a1510] px-8 py-3 text-sm font-semibold text-[#f5f3ef] shadow-lg transition-all hover:bg-[#3d3125] hover:-translate-y-1">
                        🛒 Începe Cumpărăturile
                    </a>
                </div>
            </div>
        </LegalPageLayout>
    );
}
