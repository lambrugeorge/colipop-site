import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import ValuesSection from "@/components/ValuesSection";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero image="/imagine4.jpeg" showCta={false} />

      <FeatureSection
        titleKey="mission_title"
        textKey="mission_text"
        imageSrc="/misiunea%20noastra.png"
        imageAlt="Misiunea ColiPop"
      />

      <FeatureSection
        titleKey="who_title"
        textKey="who_text"
        imageSrc="/bonete.png"
        imageAlt="Cine suntem"
        reversed
      />

      <section className="bg-gradient-to-b from-white to-[#F7E396]/10 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white p-10 shadow-xl border border-[#E8DDB8]">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[#e8b86d] p-3 text-4xl shadow-lg">
              💬
            </span>
            <blockquote className="mt-4">
              <p className="text-xl font-medium text-[#1a1510] sm:text-2xl font-serif">
                „{t("quote_text")}”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center space-x-2 text-base">
              <span className="font-semibold text-[#e8b86d]">— {t("quote_author")}</span>
            </figcaption>
            <div className="mt-10">
              <Link
                href="/testimoniale"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a1510] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#3d3125] hover:shadow-xl hover:-translate-y-1"
              >
                {t("section_popular_reviews")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
    </>
  );
}
