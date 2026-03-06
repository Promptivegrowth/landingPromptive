"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    const t = useTranslations("privacy");

    return (
        <div className="min-h-screen bg-white dark:bg-dark text-slate-900 dark:text-white flex flex-col">
            <Header />
            <main className="flex-grow max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-40 pb-32">
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                    {/* Decorative ambient blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 space-y-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-10 text-slate-900 dark:text-white leading-tight">
                            {t("title")}
                        </h1>

                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p1")}
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-4 text-brand-purple dark:text-brand-pink">
                            {t("h2_1")}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p2")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-slate-600 dark:text-slate-300 pl-4">
                            <li>{t("li1")}</li>
                            <li>{t("li2")}</li>
                            <li>{t("li3")}</li>
                        </ul>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p3")}
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-4 text-brand-purple dark:text-brand-pink">
                            {t("h2_2")}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p4")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-slate-600 dark:text-slate-300 pl-4">
                            <li>{t("li4")}</li>
                            <li>{t("li5")}</li>
                            <li>{t("li6")}</li>
                            <li>{t("li7")}</li>
                        </ul>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p5")}
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-4 text-brand-purple dark:text-brand-pink">
                            {t("h2_3")}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {t("p6")}
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
