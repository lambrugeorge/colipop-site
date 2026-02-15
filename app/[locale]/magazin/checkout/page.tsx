import { setRequestLocale } from "next-intl/server";
import CheckoutPage from "./CheckoutPage";

type Props = { params: Promise<{ locale: string }> };

export default async function CheckoutRoute({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <CheckoutPage />;
}
