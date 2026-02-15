"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../i18n/navigation";
import AnimatedLogo from "./AnimatedLogo";

const menuLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/despre-noi" },
  { key: "products", href: "/produse" },
  { key: "shop", href: "/magazin" },
  { key: "news", href: "/noutati" },
  { key: "resources", href: "/resurse" },
  { key: "testimonials", href: "/testimoniale" },
  { key: "contact", href: "/contact" },
] as const;

const usefulLinks = [
  { key: "terms", href: "/termeni-si-conditii" },
  { key: "privacy_policy", href: "/politica-confidentialitate" },
  { key: "cookie_policy", href: "/politica-cookie-uri" },
  { key: "delivery_policy", href: "/politica-livrare" },
  { key: "return_policy", href: "/politica-retur" },
  { key: "payment_policy", href: "/politica-plata" },
  { key: "how_to_order", href: "/cum-comand" },
] as const;

const ADDRESS = "Colegiul Economic \"Ion Ghica\", Brăila, jud. Brăila";
const EMAIL = "sc.colipop.sr@gmail.com";
const PHONE = "0733 194 610";
const CUI = "83252082";
const REG_COM = "J09/6282/2025";
// const LAST_UPDATE = ""; 

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-amber-900/50 bg-[#1a1510] text-[#f5f3ef]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Column 1: Logo + Contact */}
          <div className="space-y-6 lg:col-span-1">
            <AnimatedLogo size={80} showText={false} />
            <p className="text-sm font-medium text-amber-200/80">{tFooter("practice_firm")}</p>
            <div className="space-y-3 text-sm text-amber-100/90">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Colegiul+Economic+Ion+Ghica+Brăila"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white"
              >
                <span className="mt-0.5 shrink-0 text-[#e8b86d]">
                  <LocationIcon />
                </span>
                <span>{ADDRESS}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <span className="shrink-0 text-[#e8b86d]">
                  <EmailIcon />
                </span>
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <span className="shrink-0 text-[#e8b86d]">
                  <PhoneIcon />
                </span>
                {PHONE}
              </a>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-[#e8b86d]">
                  <ClockIcon />
                </span>
                <span>{tFooter("schedule_value")}</span>
              </p>
            </div>
            {/* Company fiscal data - REMOVED */}
          </div>

          {/* Column 2: Menu */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8b86d]">
              {tFooter("menu_title")}
            </h3>
            <ul className="mt-4 space-y-2">
              {menuLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-[#f5f3ef] transition-colors hover:text-white"
                  >
                    <span className="text-[#e8b86d]">
                      <ChevronIcon />
                    </span>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8b86d]">
              {tFooter("useful_links")}
            </h3>
            <ul className="mt-4 space-y-2">
              {usefulLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-[#f5f3ef] transition-colors hover:text-white"
                  >
                    <span className="text-[#e8b86d]">
                      <ChevronIcon />
                    </span>
                    {tFooter(key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://anpc.gov.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-[200px]"
              >
                <Image
                  src="/anpc-sal.png"
                  alt="ANPC - Soluționarea alternativă a litigiilor"
                  width={200}
                  height={80}
                  className="h-auto w-full rounded object-contain"
                />
              </a>
              <a
                href="https://anpc.gov.ro/sol/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-[200px]"
              >
                <Image
                  src="/anpc-sol.png"
                  alt="ANPC - Soluționarea online a litigiilor"
                  width={200}
                  height={80}
                  className="h-auto w-full rounded object-contain"
                />
              </a>
            </div>
          </div>

          {/* Column 4: Map preview */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8b86d]">
              {tFooter("location_title")}
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-amber-800/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.2!2d27.9697!3d45.2719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b215!2sBr%C4%83ila!5e0!3m2!1sro!2sro!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locația ColiPop - Brăila"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar with last update */}
        <div className="mt-10 border-t border-amber-900/50 pt-6">
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-amber-200/70">
            <p className="text-center">© {new Date().getFullYear()} ColiPop. {tFooter("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LocationIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="h-4 w-4 text-[#e8b86d]" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );
}
