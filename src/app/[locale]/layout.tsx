import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import MetaPixelCAPI from "@/components/MetaPixelCAPI";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Promptive — Software de Alto Rendimiento | Sinergia Digital",
    description:
        "Desarrollamos plataformas web y software a medida optimizados para la conversión. Tecnología ágil, robusta y lista para el mercado.",
    keywords: [
        "software a medida",
        "desarrollo web",
        "inteligencia artificial",
        "Next.js",
        "agencia de software",
        "Promptive",
    ],
    openGraph: {
        title: "Promptive — Software de Alto Rendimiento",
        description:
            "Plataformas web y software a medida optimizados para la conversión.",
        type: "website",
    },
    other: {
        "facebook-domain-verification": "y6yiip6gya8b0jqearvai5p6fdcuhg",
    },
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "es" | "en")) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                {/* Meta Pixel Code */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1315312920643836');
              fbq('track', 'PageView');
            `,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=1315312920643836&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
            </head>
            <body className={`${inter.variable} font-galano antialiased bg-white dark:bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <MetaPixelCAPI />
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
