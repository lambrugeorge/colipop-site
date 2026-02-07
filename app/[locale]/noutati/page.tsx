import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

const FEATURED_SLUG = "produse-traditionale-ingrediente-calitate";
const ARTICLE_IMAGE = "/Imagine%20articol.png";

export default async function NoutatiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>

      <article className="mt-10 overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg transition-all hover:border-[#F79A19] sm:flex sm:flex-row-reverse">
        <div className="relative aspect-video w-full flex-shrink-0 sm:aspect-square sm:max-w-md">
          <Image
            src={ARTICLE_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-sm text-[#F79A19]">{t("date1")}</p>
            <h2 className="mt-2 text-xl font-bold text-[#1a1510] sm:text-2xl">
              {t("featured_title")}
            </h2>
            <p className="mt-4 text-[#5c4a3a]">{t("featured_excerpt")}</p>
          </div>
          <Link
            href={`/noutati/${FEATURED_SLUG}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#F79A19] px-5 py-3 text-sm font-semibold text-[#1a1510] hover:bg-[#e08a14]"
          >
            {t("read_more")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
