import { setRequestLocale } from "next-intl/server";
import ShopPage from "./ShopPage";

type Props = { params: Promise<{ locale: string }> };

export default async function MagazinPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ShopPage />;
}
