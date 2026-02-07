"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../i18n/navigation";

const menuLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/despre-noi" },
  { key: "products", href: "/produse" },
  { key: "news", href: "/noutati" },
  { key: "resources", href: "/resurse" },
  { key: "testimonials", href: "/testimoniale" },
  { key: "contact", href: "/contact" },
] as const;

const usefulLinks = [
  { key: "cookie_policy", href: "/politica-cookie-uri" },
  { key: "privacy_policy", href: "/politica-confidentialitate" },
  { key: "terms", href: "/termeni-si-conditii" },
] as const;

const ADDRESS = "Strada Dimitrie Bolintineanu 16, 810183 Brăila";
const EMAIL = "sc.colipop.sr@gmail.com";
const PHONE = "0733 194 610";

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-amber-900/50 bg-[#1a1510] text-[#f5f3ef]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-28 w-28 overflow-hidden rounded-full bg-amber-900/30">
                <Image
                  src="/logo.png"
                  alt="ColiPop"
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-sm font-medium text-amber-200/80">{tFooter("practice_firm")}</p>
            <div className="space-y-3 text-sm text-amber-100/90">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Strada+Dimitrie+Bolintineanu+16,+810183+Brăila"
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
          </div>

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
                  unoptimized
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
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-amber-900/50 pt-6 text-center text-sm text-amber-200/70">
          © {new Date().getFullYear()} ColiPop. {tFooter("rights")}
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
