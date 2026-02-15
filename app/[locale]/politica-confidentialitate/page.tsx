
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import LegalPageLayout from "@/components/LegalPageLayout";

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  const privacySections = [
    { title: t("privacy_sections.0.title"), content: t("privacy_sections.0.content") },
    { title: t("privacy_sections.1.title"), content: t("privacy_sections.1.content") },
    { title: t("privacy_sections.2.title"), content: t("privacy_sections.2.content") },
    { title: t("privacy_sections.3.title"), content: t("privacy_sections.3.content") },
    { title: t("privacy_sections.4.title"), content: t("privacy_sections.4.content") },
  ];

  return (
    <LegalPageLayout title={t("privacy_title")}>
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-[#5c4a3a] border-b border-[#E8DDB8] pb-6">
          {t("privacy_intro")}
        </p>

        <div className="space-y-12">
          {privacySections.map((section, index) => (
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
          <p>Dacă aveți întrebări privind confidențialitatea datelor dvs., scrieți-ne la <a href="mailto:sc.colipop.sr@gmail.com" className="font-semibold text-[#e8b86d] hover:underline">sc.colipop.sr@gmail.com</a>.</p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
