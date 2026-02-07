import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };

const CEIG_URL = "https://ceig.ro/";

export default async function ResursePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>

      <div className="mt-10 space-y-8">
        <section className="rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#e8b86d]">{t("documents_title")}</h2>
          <p className="mt-1 text-sm text-[#5c4a3a]">{t("documents_subtitle")}</p>
          <p className="mt-3 text-[#5c4a3a]">{t("documents_coming")}</p>
        </section>

        <section className="rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#e8b86d]">{t("links_external_title")}</h2>
          <p className="mt-1 text-sm text-[#5c4a3a]">{t("links_external_subtitle")}</p>
          <p className="mt-3 text-[#5c4a3a]">{t("links_external_coming")}</p>
        </section>

        <section className="rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#e8b86d]">{t("guides_title")}</h2>
          <p className="mt-3 text-[#5c4a3a]">{t("guides_coming")}</p>
        </section>

        <section className="rounded-2xl border-2 border-[#E8DDB8] bg-[#FFFEF7] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#e8b86d]">{t("network_title")}</h2>
          <a
            href={CEIG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex max-w-md flex-col overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg transition-all hover:border-[#e8b86d] hover:shadow-xl"
          >
            <div className="relative aspect-video w-full bg-[#F7E396]/30">
              <Image
                src="/ceig.jfif"
                alt={t("ceig_title")}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#1a1510]">{t("network_ceig")}</h3>
              <p className="mt-1 text-sm text-[#e8b86d]">ceig.ro →</p>
            </div>
          </a>
        </section>
      </div>
    </div>
  );
}
