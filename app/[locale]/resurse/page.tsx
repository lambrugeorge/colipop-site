
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";
import PptxViewer from "@/components/PptxViewer";
import { Download, Eye, ExternalLink, Instagram, FileBadge, FilePieChart } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const CEIG_URL = "https://ceig.ro/";

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-[#FFFEF7] min-h-screen">

      {/* SECTION 1: Documents (CUI) */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a1510] mb-4">{t("documents_title")}</h1>
          <p className="text-[#5c4a3a] max-w-2xl mx-auto">{t("documents_subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* CUI Certificate */}
          <div className="group bg-white rounded-3xl shadow-sm border border-[#E8DDB8] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full max-w-md">
            <div className="h-64 bg-gray-100 relative border-b border-[#E8DDB8] flex items-center justify-center">
              <iframe
                src="/CUI.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full object-cover absolute inset-0"
                title="Certificat CUI Preview"
              />
              <div className="absolute inset-0 bg-transparent" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm z-10">
                <FileBadge size={24} className="text-[#1a1510]" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-[#1a1510] mb-2">Certificat de Înregistrare</h3>
              <p className="text-sm text-[#5c4a3a] mb-6">Vizualizați certificatul oficial de înregistrare al firmei.</p>
              <div className="flex gap-3">
                <a href="/CUI.pdf" target="_blank" className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1510] text-white py-2.5 rounded-xl font-medium hover:bg-[#3d3125] transition-colors">
                  <Eye size={18} /> Previzualizare
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Guides & Media (PPTX, Spot) */}
      <div className="mb-24 border-t border-[#E8DDB8] pt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a1510] mb-3">{t("guides_title")}</h2>
          <p className="text-[#5c4a3a]">Materiale de prezentare și tutoriale.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* Presentation PPTX */}
          <div className="group bg-white rounded-3xl shadow-sm border border-[#E8DDB8] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <PptxViewer src="/prezentare.pptx" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-[#1a1510] mb-2">Prezentare Firmă</h3>
              <p className="text-sm text-[#5c4a3a] mb-6">Descoperiți misiunea, viziunea și valorile ColiPop în format detaliat.</p>
              <div className="flex gap-3">
                <a href="/prezentare.pptx" download className="flex-1 inline-flex items-center justify-center gap-2 bg-[#e8b86d] text-[#1a1510] py-2.5 rounded-xl font-medium hover:bg-[#d4a55a] transition-colors shadow-md">
                  <Download size={18} /> Descarcă (PPTX)
                </a>
              </div>
            </div>
          </div>

          {/* Advertising Spot MP4 */}
          <div className="group bg-white rounded-3xl shadow-sm border border-[#E8DDB8] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <VideoPreview src="/spot.mp4" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-[#1a1510] mb-2">Spot Publicitar</h3>
              <p className="text-sm text-[#5c4a3a] mb-6">Urmăriți clipul nostru de prezentare oficial.</p>
              <div className="flex gap-3">
                <a href="/spot.mp4" download className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#E8DDB8] text-[#1a1510] py-2.5 rounded-xl font-medium hover:bg-[#1a1510] hover:text-white hover:border-[#1a1510] transition-all">
                  <Download size={18} /> Descarcă (MP4)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Widgets */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1a1510]">{t("links_external_title")}</h2>
          <p className="text-[#5c4a3a]">{t("links_external_subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Instagram Card */}
          <a href="https://www.instagram.com/colipop1" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="bg-white/90 backdrop-blur-sm h-full w-full rounded-[20px] p-6 flex items-center justify-between group-hover:bg-white/95 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-3 rounded-full shadow-md">
                  <Instagram size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1510]">Instagram</h3>
                  <p className="text-sm text-gray-600">@colipop1</p>
                </div>
              </div>
              <ExternalLink className="text-gray-400 group-hover:text-[#e8b86d] transition-colors" />
            </div>
          </a>

          {/* TikTok Card */}
          <a href="https://www.tiktok.com/@colipop6?_r=1&_t=ZN-93jMVKrFwnu" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-black p-1 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="bg-[#1a1510] h-full w-full rounded-[20px] p-6 flex items-center justify-between border border-white/10 group-hover:bg-black transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-[#00f2ea] text-black p-3 rounded-full shadow-[2px_2px_0px_rgba(255,0,80,1)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12v8.76c0 5.29-5.43 7.61-9.35 5.56-2.9-1.51-4.04-5.26-2.56-8.21 1.07-2.14 3.3-3.26 5.6-2.94v4.19c-.8-.11-1.67.14-2.28.72-.81.78-.85 2.11-.08 2.92.77.81 2.11.85 2.93.08.57-.54.85-1.32.85-2.11V.02z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">TikTok</h3>
                  <p className="text-sm text-gray-400">@colipop6</p>
                </div>
              </div>
              <ExternalLink className="text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </a>
        </div>
      </div>

      {/* Network Link */}
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold text-[#1a1510] mb-8">{t("network_title")}</h2>
        <a
          href={CEIG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-6 bg-white px-8 py-6 rounded-3xl border-2 border-[#E8DDB8] shadow-lg hover:border-[#e8b86d] hover:shadow-xl transition-all hover:-translate-y-1 mx-auto"
        >
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-gray-100 overflow-hidden bg-white">
            <Image
              src="/ceig.jfif"
              alt={t("ceig_title")}
              width={80}
              height={80}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-[#1a1510] group-hover:text-[#e8b86d] transition-colors">{t("network_ceig")}</h3>
            <span className="inline-block mt-2 text-sm bg-[#e8b86d]/10 text-[#e8b86d] px-3 py-1 rounded-full font-medium">Portal Educațional</span>
          </div>
          <ExternalLink className="text-[#E8DDB8] group-hover:text-[#e8b86d] transition-colors ml-4" size={24} />
        </a>
      </div>

    </div>
  );
}
