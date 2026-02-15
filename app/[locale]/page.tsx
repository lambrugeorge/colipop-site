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
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#1a1510] via-[#3d3125] to-[#1a1510] text-center py-3 px-4">
        <p className="text-sm font-medium text-[#e8b86d]">
          🎉 {t("promo_banner")}
          <Link href="/magazin" className="ml-2 underline hover:text-white transition-colors">
            {t("promo_cta")} →
          </Link>
        </p>
      </div>

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

      {/* Offer section */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#3d3125] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-[#e8b86d]/20 px-4 py-1.5 text-sm font-medium text-[#e8b86d]">
            ✨ {t("offer_badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{t("offer_title")}</h2>
          <p className="mt-4 text-lg text-amber-200/80">{t("offer_text")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/magazin"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8b86d] to-[#F79A19] px-8 py-3 text-sm font-semibold text-[#1a1510] shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              🛒 {t("offer_shop")}
            </Link>
            <Link
              href="/produse"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#e8b86d] px-8 py-3 text-sm font-semibold text-[#e8b86d] transition-all hover:bg-[#e8b86d] hover:text-[#1a1510]"
            >
              📋 {t("offer_prices")}
            </Link>
          </div>
        </div>
      </section>

      {/* Price list preview */}
      <section className="bg-gradient-to-b from-white to-[#F7E396]/10 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#1a1510] sm:text-3xl">{t("price_list_title")}</h2>
          <p className="mt-2 text-center text-[#5c4a3a]">{t("price_list_subtitle")}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#1a1510] to-[#3d3125]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#e8b86d]">{t("price_product")}</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-[#e8b86d]">{t("price_amount")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDB8]">
                {[
                  { name: t("price_item1"), price: "45 RON" },
                  { name: t("price_item2"), price: "18 RON / buc" },
                  { name: t("price_item3"), price: "22 RON / buc" },
                  { name: t("price_item4"), price: "150 RON" },
                  { name: t("price_item5"), price: "25 RON / buc" },
                  { name: t("price_item6"), price: "60 RON" },
                ].map((item, i) => (
                  <tr key={i} className="transition-colors hover:bg-[#F7E396]/10">
                    <td className="px-6 py-4 text-sm text-[#1a1510]">{item.name}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-[#F79A19]">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-[#5c4a3a]">{t("price_note")}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#F7E396]/10 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white p-10 shadow-xl border border-[#E8DDB8]">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[#e8b86d] p-3 text-4xl shadow-lg">
              💬
            </span>
            <blockquote className="mt-4">
              <p className="text-xl font-medium text-[#1a1510] sm:text-2xl font-serif">
                „{t("quote_text")}"
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center space-x-2 text-base">
              <span className="font-semibold text-[#e8b86d]">— {t("quote_author")}</span>
            </figcaption>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/testimoniale"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a1510] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#3d3125] hover:shadow-xl hover:-translate-y-1"
              >
                {t("section_popular_reviews")} →
              </Link>
              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1510] px-8 py-3 text-sm font-semibold text-[#1a1510] transition-all hover:bg-[#1a1510] hover:text-white"
              >
                📝 {t("feedback_cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
    </>
  );
}
