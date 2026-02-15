
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import Organigrama from "@/components/Organigrama";
import { Building2, Hash, FileText, Landmark, MapPin, GraduationCap, Briefcase } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const CEIG_URL = "https://ceig.ro/";

export default async function DespreNoiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tRes = await getTranslations("resources");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl text-center mb-12">{t("title")}</h1>

      <section className="mb-16 rounded-3xl border border-[#E8DDB8] bg-white p-8 shadow-sm text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#e8b86d]" />
        <p className="text-xl leading-relaxed text-[#5c4a3a] font-serif italic">
          "{t("colipop_intro")}"
        </p>
      </section>

      <section className="grid gap-12 lg:grid-cols-2 items-center mb-20">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
          <Image
            src="/misiunea%20noastra.png"
            alt="Misiunea ColiPop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1a1510] relative inline-block">
            {t("mission")}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#e8b86d] rounded-full" />
          </h2>
          <p className="text-lg text-[#5c4a3a] leading-relaxed">{t("mission_full")}</p>
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-2 items-center mb-20">
        <div className="order-2 lg:order-1 space-y-6">
          <h2 className="text-3xl font-bold text-[#1a1510] relative inline-block">
            {t("who")}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#e8b86d] rounded-full" />
          </h2>
          <p className="text-lg text-[#5c4a3a] leading-relaxed">{t("who_text")}</p>
        </div>
        <div className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl -rotate-1 hover:rotate-0 transition-transform duration-500">
          <ImageWithFallback
            src="/Cinesuntem.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            fallbackContent="👥"
          />
        </div>
      </section>

      <div className="mb-20">
        <Organigrama />
      </div>

      {/* Company Identification - Compact & Premium */}
      <section className="mt-12 mb-24 overflow-hidden rounded-[32px] border border-[#E8DDB8] bg-white shadow-xl">
        <div className="bg-[#1a1510] px-8 py-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#e8b86d]">
            {t("company_details_title")}
          </h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <div className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Core Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">{t("company_name_label")}</p>
                  <p className="text-sm font-bold text-[#1a1510]">COLIPOP S.R.L.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <Hash size={20} />
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">CUI</p>
                    <p className="text-sm font-bold text-[#1a1510]">83252082</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">Reg. Com.</p>
                    <p className="text-sm font-bold text-[#1a1510]">J09/6282/2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Location & Academic */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">{t("address_label")}</p>
                  <p className="text-sm font-medium text-[#1a1510]">Col. Ec. "Ion Ghica", Brăila</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">{t("professors_label")}</p>
                  <p className="text-[13px] text-[#5c4a3a]">Feichter Narcisa, Istrate Camelia</p>
                </div>
              </div>
            </div>

            {/* Column 3: Finance & Activity */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <Landmark size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">{t("iban_label")}</p>
                  <p className="text-[12px] font-mono font-bold text-[#1a1510] break-all">RO25ROCT8325208210890001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#e8b86d]">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8b86d] uppercase tracking-wider mb-0.5">{t("activity_label")}</p>
                  <p className="text-[12px] italic text-[#5c4a3a]">Patiserie – Producție & Vânzare</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 text-center">
        <h2 className="text-2xl font-bold text-[#1a1510] mb-8">{t("team")}</h2>
        <div className="inline-block rounded-2xl border-2 border-dashed border-[#E8DDB8] bg-[#FFFEF7] p-8 max-w-2xl">
          <p className="text-lg text-[#5c4a3a] italic">
            {t("team_coming_soon")}
          </p>
        </div>
      </section>

      {/* Partners / School Link - Centered as requested */}
      <section className="mb-20 text-center">
        <h2 className="text-2xl font-bold text-[#1a1510] mb-4">{t("partners_ceig")}</h2>
        <p className="text-[#5c4a3a] mb-8 max-w-2xl mx-auto">{tRes("ceig_desc")}</p>

        <a
          href={CEIG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border border-[#E8DDB8] hover:border-[#e8b86d] transition-all hover:-translate-y-1 hover:shadow-xl max-w-sm mx-auto"
        >
          <div className="relative w-48 h-24 mb-4">
            <Image
              src="/ceig.jfif"
              alt={tRes("ceig_title")}
              fill
              className="object-contain"
              sizes="200px"
            />
          </div>
          <span className="font-bold text-[#1a1510] group-hover:text-[#e8b86d] transition-colors text-lg">
            Colegiul Economic "Ion Ghica"
          </span>
          <span className="text-sm text-[#5c4a3a] mt-1">Vizitează site-ul oficial →</span>
        </a>
      </section>


    </div>
  );
}
