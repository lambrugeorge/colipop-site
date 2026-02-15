
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import LegalPageLayout from "@/components/LegalPageLayout";

type Props = { params: Promise<{ locale: string }> };

export default async function CookiePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  const cookieSections = [
    { title: t("cookies_sections.0.title"), content: t("cookies_sections.0.content") },
    { title: t("cookies_sections.1.title"), content: t("cookies_sections.1.content") },
    { title: t("cookies_sections.2.title"), content: t("cookies_sections.2.content") },
  ];

  return (
    <LegalPageLayout title={t("cookies_title")}>
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-[#5c4a3a] border-b border-[#E8DDB8] pb-6">
          {t("cookies_intro")}
        </p>

        <div className="space-y-12">
          {cookieSections.map((section, index) => (
            <section key={index} className="scroll-mt-24" id={`section-${index}`}>
              <h2 className="text-xl font-bold text-[#e8b86d] mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full bg-[#F7E396]/30 text-sm font-bold text-[#1a1510]">
                  {index + 1}
                </span>
                <span>{section.title.replace(/^\d+\.\s*/, "")}</span>
              </h2>
              <div className="pl-11 text-base leading-relaxed text-[#5c4a3a] bg-[#FFFEF7] p-6 rounded-xl border border-[#E8DDB8]/50 shadow-sm transition-shadow hover:shadow-md whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DDB8] text-sm text-[#5c4a3a] text-center">
          <p>Gestionați preferințele cookie direct din browserul dumneavoastră.</p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
