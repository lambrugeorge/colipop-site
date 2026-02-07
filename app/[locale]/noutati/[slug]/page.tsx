import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

const FEATURED_SLUG = "produse-traditionale-ingrediente-calitate";
const ARTICLE_IMAGE = "/Imagine%20articol.png";

export default async function NoutatiArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (slug !== FEATURED_SLUG) notFound();

  const t = await getTranslations("news");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/noutati"
        className="mb-8 inline-flex items-center gap-2 text-[#F79A19] hover:underline"
      >
        ← {t("back_to_list")}
      </Link>

      <article className="overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg">
        <div className="relative aspect-video w-full">
          <Image
            src={ARTICLE_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized
            priority
          />
        </div>
        <div className="p-6 sm:p-10">
          <p className="text-sm text-[#F79A19]">{t("date1")}</p>
          <span className="mt-2 inline-block rounded-full bg-[#F7E396]/50 px-3 py-1 text-xs font-medium text-[#5c4a3a]">
            {t("category_patisserie")}
          </span>
          <h1 className="mt-4 text-2xl font-bold text-[#1a1510] sm:text-3xl lg:text-4xl">
            {t("featured_title")}
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#5c4a3a]">
            <p>{t("featured_body")}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {((t("tags_quality") as string) || "")
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-[#E8DDB8]/50 px-3 py-1 text-sm text-[#5c4a3a]"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return [{ slug: FEATURED_SLUG }];
}
