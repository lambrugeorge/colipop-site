import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

const testimonials = [
  { nameKey: "t1_name", textKey: "t1_text", roleKey: "t1_role" },
  { nameKey: "t2_name", textKey: "t2_text", roleKey: "t2_role" },
  { nameKey: "t3_name", textKey: "t3_text", roleKey: "t3_role" },
];

export default async function TestimonialePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("testimonials");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-[#5c4a3a]">{t("subtitle")}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.nameKey}
            className="rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-lg hover:border-[#F79A19]"
          >
            <div className="mb-4 flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#5c4a3a]">&ldquo;{t(item.textKey)}&rdquo;</p>
            <footer className="mt-4">
              <p className="font-semibold text-[#1a1510]">{t(item.nameKey)}</p>
              <p className="text-sm text-[#F79A19]">{t(item.roleKey)}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
