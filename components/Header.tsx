"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "../i18n/navigation";
import AnimatedLogo from "./AnimatedLogo";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/despre-noi" },
  { key: "products", href: "/produse" },
  { key: "shop", href: "/magazin" },
  { key: "news", href: "/noutati" },
  { key: "resources", href: "/resurse" },
  { key: "testimonials", href: "/testimoniale" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathWithoutLocale =
    typeof pathname === "string"
      ? (pathname.replace(/^\/(ro|en)(?=\/|$)/, "") || "/").replace(/^$/, "/")
      : "/";
  const hrefForLocale = pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-900/50 bg-[#1a1510] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <AnimatedLogo size={56} />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "rounded-lg bg-[#e8b86d] px-3 py-2 text-sm font-medium text-[#1a1510] sm:px-4"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-[#f5f3ef] transition-colors hover:bg-amber-800/40 hover:text-white sm:px-4"
              }
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-amber-800/50 bg-amber-950/30 p-1">
            <Link
              href={hrefForLocale}
              locale="ro"
              className="rounded-md px-2 py-1 text-xs font-medium text-[#f5f3ef] hover:bg-[#e8b86d] hover:text-[#1a1510] sm:px-3"
            >
              RO
            </Link>
            <Link
              href={hrefForLocale}
              locale="en"
              className="rounded-md px-2 py-1 text-xs font-medium text-[#f5f3ef] hover:bg-[#e8b86d] hover:text-[#1a1510] sm:px-3"
            >
              EN
            </Link>
          </div>

          <button
            type="button"
            aria-label="Meniu"
            className="rounded-lg p-2 text-[#f5f3ef] hover:bg-amber-800/40 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-amber-900/50 bg-[#1a1510] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      pathname === href || (href !== "/" && pathname.startsWith(href))
                        ? "block rounded-lg bg-[#e8b86d] px-4 py-3 text-sm font-medium text-[#1a1510]"
                        : "block rounded-lg px-4 py-3 text-sm font-medium text-[#f5f3ef] hover:bg-amber-800/40"
                    }
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
