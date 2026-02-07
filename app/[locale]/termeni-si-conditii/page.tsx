import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function TermeniPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  const sections = (t.raw("terms_sections") as { title?: string; content: string }[]) || [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-[#1a1510] font-serif">{t("terms_title")}</h1>

      <div className="mb-10 rounded-2xl bg-[#F7E396]/20 p-6 border border-[#E8DDB8]">
        <p className="font-semibold text-[#1a1510]">{t("company_info")}</p>
        <p className="mt-2 text-sm text-[#5c4a3a]">
          {t("last_update")}: 08.02.2026
        </p>
      </div>

      <div className="space-y-10 text-[#5c4a3a]">
        <div>
          <p className="text-lg leading-relaxed font-medium">{t("terms_intro")}</p>
        </div>

        {sections.map((section, i) => (
          <section key={i} className="space-y-4">
            {section.title && (
              <h2 className="text-2xl font-bold text-[#1a1510] font-serif">{section.title}</h2>
            )}
            <div className="prose prose-amber max-w-none">
              <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
