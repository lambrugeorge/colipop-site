import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ locale: string }> };

const products = [
  { id: "1", titleKey: "prod1_title", descKey: "prod1_desc", benefitsKey: "prod1_benefits", priceKey: "prod1_price", image: "/imagine1.jpeg" },
  { id: "2", titleKey: "prod2_title", descKey: "prod2_desc", benefitsKey: "prod2_benefits", priceKey: "prod2_price", image: "/imagine2.jpeg" },
  { id: "3", titleKey: "prod3_title", descKey: "prod3_desc", benefitsKey: "prod3_benefits", priceKey: "prod3_price", image: "/imagine3.jpeg" },
  { id: "4", titleKey: "prod4_title", descKey: "prod4_desc", benefitsKey: "prod4_benefits", priceKey: "prod4_price", image: "/imagine4.jpeg" },
  { id: "5", titleKey: "prod5_title", descKey: "prod5_desc", benefitsKey: "prod5_benefits", priceKey: "prod5_price", image: "/imagine5.jpeg" },
];

export default async function ProdusePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, index) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={t(p.titleKey)}
            description={t(p.descKey)}
            benefits={(t.raw(p.benefitsKey) as string[]) || []}
            price={p.priceKey ? t(p.priceKey) : undefined}
            image={p.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
