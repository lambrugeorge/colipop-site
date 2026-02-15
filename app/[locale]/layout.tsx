import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>ColiPop - Patiserie, Colivă și Deserturi | Brăila</title>
        <meta name="description" content="SC ColiPop SRL - Patiserie specializată în colivă, torturi și deserturi din Brăila. Produse tradiționale și reinterpretări moderne pentru evenimente și momente speciale." />
        <meta name="keywords" content="ColiPop, patiserie, colivă, torturi, deserturi, Brăila, produse tradiționale" />
        <meta name="author" content="SC COLIPOP S.R.L." />
        <meta property="og:title" content="ColiPop - Patiserie, Colivă și Deserturi" />
        <meta property="og:description" content="Produse tradiționale și reinterpretări moderne de patiserie din Brăila" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased flex min-h-screen flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <LiveChat />
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
