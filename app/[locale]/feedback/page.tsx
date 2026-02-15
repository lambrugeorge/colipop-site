import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import OnlineQuestionnaire from "@/components/OnlineQuestionnaire";

type Props = { params: Promise<{ locale: string }> };

export default async function FeedbackPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("questionnaire");

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#1a1510] sm:text-4xl">{t("page_title")}</h1>
            <p className="mt-2 text-[#5c4a3a]">{t("page_subtitle")}</p>
            <div className="mt-10">
                <OnlineQuestionnaire />
            </div>
        </div>
    );
}
