import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
}) {
    const messages = await getMessages();
    const { lng } = await params;
    if (!hasLocale(routing.locales, lng)) {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={lng} messages={messages}>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </NextIntlClientProvider>
    );
}

export async function generateStaticParams() {
    return routing.locales.map((lng) => ({ lng }));
}