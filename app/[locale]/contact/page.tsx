import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

type Props = { params: Promise<{ locale: string }> };

const INSTAGRAM_URL = "https://www.instagram.com/colipop1";
const TIKTOK_URL = "https://www.tiktok.com/@colipop6?_r=1&_t=ZN-93jMVKrFwnu";
const ADDRESS = "Strada Dimitrie Bolintineanu 16, 810183 Brăila";
const EMAIL = "sc.colipop.sr@gmail.com";
const PHONE = "0733 194 610";

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F79A19]">
              {t("address")}
            </h2>
            <p className="mt-1 text-[#1a1510]">{ADDRESS}</p>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F79A19]">
              {t("phone")}
            </h2>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="mt-1 block text-[#1a1510] hover:text-[#F79A19]"
            >
              {PHONE}
            </a>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F79A19]">
              {t("email")}
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block text-[#1a1510] hover:text-[#F79A19]"
            >
              {EMAIL}
            </a>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F79A19]">
              {t("social")}
            </h2>
            <div className="mt-3 flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1510] text-[#F7E396] transition-colors hover:bg-[#F79A19] hover:text-[#1a1510]"
                aria-label="Instagram ColiPop"
              >
                <InstagramIcon />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1510] text-[#F7E396] transition-colors hover:bg-[#F79A19] hover:text-[#1a1510]"
                aria-label="TikTok ColiPop"
              >
                <TikTokIcon />
              </a>
            </div>
          </section>

          {/* Company identification */}
          <section className="rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F79A19]">
              {t("company_id")}
            </h2>
            <div className="mt-3 space-y-1 text-sm text-[#5c4a3a]">
              <p><strong className="text-[#1a1510]">{t("company_name_label")}:</strong> SC COLIPOP S.R.L.</p>
              <p><strong className="text-[#1a1510]">CUI:</strong> RO12345678</p>
              <p><strong className="text-[#1a1510]">{t("reg_com_label")}:</strong> J09/123/2024</p>
              <p><strong className="text-[#1a1510]">{t("address")}:</strong> {ADDRESS}</p>
              <p><strong className="text-[#1a1510]">{t("phone")}:</strong> {PHONE}</p>
              <p><strong className="text-[#1a1510]">{t("email")}:</strong> {EMAIL}</p>
            </div>
          </section>
        </div>
        <ContactForm />
      </div>

      {/* Google Maps - Situare geografică */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[#e8b86d]">{t("map_title")}</h2>
        <p className="mt-1 text-sm text-[#5c4a3a]">{t("map_subtitle")}</p>
        <div className="mt-4 overflow-hidden rounded-2xl border-2 border-[#E8DDB8] shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.0!2d27.9697!3d45.2719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b215!2sStrada+Dimitrie+Bolintineanu+16%2C+Br%C4%83ila!5e0!3m2!1sro!2sro!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Locația ColiPop pe hartă - Strada Dimitrie Bolintineanu 16, Brăila"
          />
        </div>
      </section>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88 0.06V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}
