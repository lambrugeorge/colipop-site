import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import PresentationViewer from "@/components/PresentationViewer";


type Props = { params: Promise<{ locale: string }> };

const CEIG_URL = "https://ceig.ro/";

export default async function DespreNoiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tRes = await getTranslations("resources");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>

      <section className="mt-8 rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-lg leading-relaxed text-[#5c4a3a]">{t("colipop_intro")}</p>
      </section>

      <section className="mt-10 grid gap-8 rounded-2xl border-2 border-[#E8DDB8] bg-[#FFFEF7] p-6 shadow-sm lg:grid-cols-2 lg:gap-10 lg:p-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F7E396]/20">
          <Image
            src="/misiunea%20noastra.png"
            alt="Misiunea ColiPop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-[#e8b86d]">{t("mission")}</h2>
          <p className="mt-4 text-[#5c4a3a]">{t("mission_full")}</p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-sm lg:grid-cols-2 lg:gap-10 lg:p-8">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <h2 className="text-xl font-semibold text-[#e8b86d]">{t("who")}</h2>
          <p className="mt-4 text-[#5c4a3a]">{t("who_text")}</p>
        </div>
        <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl bg-[#F7E396]/20 lg:order-2">
          <ImageWithFallback
            src="/Cinesuntem.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            fallbackContent="👥"
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#e8b86d]">{t("team")}</h2>
        <p className="mt-4 rounded-2xl border-2 border-[#E8DDB8] bg-[#FFFEF7] p-6 text-[#5c4a3a]">
          {t("team_coming_soon")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#e8b86d]">{t("partners_ceig")}</h2>
        <p className="mt-2 text-[#5c4a3a]">{tRes("ceig_desc")}</p>
        <a
          href={CEIG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex max-w-md flex-col overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-white shadow-lg transition-all hover:border-[#e8b86d] hover:shadow-xl"
        >
          <div className="relative aspect-video w-full bg-[#F7E396]/30">
            <Image
              src="/ceig.jfif"
              alt={tRes("ceig_title")}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-[#1a1510]">{tRes("ceig_title")}</h3>
            <p className="mt-1 text-sm text-[#e8b86d]">ceig.ro →</p>
          </div>
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#e8b86d]">{t("presentation_view")}</h2>
        <p className="mt-1 text-sm text-[#5c4a3a]">
          Prezentarea se poate vizualiza direct mai jos (sau descărcați-o dacă nu se încarcă).
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="/prezentare.pptx"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-[#e8b86d] px-5 py-3 text-sm font-semibold text-[#1a1510] hover:bg-[#d4a55a]"
          >
            <span>📥</span>
            {t("presentation_download")}
          </a>
        </div>
        <PresentationViewer />
      </section>
    </div>
  );
}
