"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, MapPin, Mail, ShieldCheck, BookOpen } from "lucide-react";

export default function Footer() {
    const t = useTranslations("footer");
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";
    const isWebRoute = pathname.includes("/desarrollo-web");

    const handleCTA = () => {
        if (isWebRoute) {
            router.push(`/${currentLocale}/whatsapp?text=${encodeURIComponent("Hola, me interesa el servicio de *diseño y desarrollo web*. Quisiera más información sobre los planes.")}&type=web_development`);
        } else {
            router.push(`/${currentLocale}/whatsapp?type=custom_software`);
        }
    };

    return (
        <footer className="relative" id="contact">
            {/* Full Width CTA Banner */}
            <div className="relative overflow-hidden bg-slate-950 border-t border-b border-white/5 w-full py-24 sm:py-32 mb-16">
                {/* Background ambient lighting */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {isWebRoute ? t("ctaTitleWeb") : t("ctaTitle")}
                        </h2>
                        <p className="text-slate-300 text-lg sm:text-xl font-medium mb-12 max-w-2xl mx-auto">
                            {isWebRoute ? t("ctaSubtitleWeb") : t("ctaSubtitle")}
                        </p>
                        <button
                            onClick={handleCTA}
                            id="footer-cta"
                            className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-lg hover:shadow-2xl hover:shadow-brand-purple/25 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            {isWebRoute ? t("ctaButtonWeb") : t("ctaButton")}
                            <ArrowRight size={22} strokeWidth={2.5} />
                        </button>
                    </ScrollReveal>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t border-slate-200 dark:border-white/10 py-16 lg:py-24 bg-white dark:bg-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                        {/* Column 1: Brand */}
                        <div className="space-y-6 lg:col-span-4">
                            <div className="flex items-center gap-3">
                                <Image src="/isotipo.png" alt="Promptive" width={32} height={32} />
                                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">PROMPTIVE</span>
                            </div>
                            <p className="text-base text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">{t("tagline")}</p>

                            {/* Social Icons Placeholder */}
                            <div className="flex items-center gap-4 pt-2">
                                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brand-purple hover:border-brand-purple hover:bg-brand-purple/5 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="space-y-6 lg:col-span-2 mt-4 lg:mt-0">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-widest">{t("explore")}</h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="/#services" className="text-base font-medium text-slate-500 hover:text-brand-purple dark:text-slate-400 dark:hover:text-brand-pink transition-colors">
                                        {t("navServices")}
                                    </a>
                                </li>
                                <li>
                                    <a href="/#process" className="text-base font-medium text-slate-500 hover:text-brand-purple dark:text-slate-400 dark:hover:text-brand-pink transition-colors">
                                        {t("navProcess")}
                                    </a>
                                </li>
                                <li>
                                    <a href="/#results" className="text-base font-medium text-slate-500 hover:text-brand-purple dark:text-slate-400 dark:hover:text-brand-pink transition-colors">
                                        {t("navResults")}
                                    </a>
                                </li>
                                <li>
                                    <a href="/#faq" className="text-base font-medium text-slate-500 hover:text-brand-purple dark:text-slate-400 dark:hover:text-brand-pink transition-colors">
                                        {t("navFAQ")}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div className="space-y-6 lg:col-span-3 mt-4 lg:mt-0">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-widest">{t("contactTitle")}</h4>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4 text-base font-medium text-slate-500 dark:text-slate-400">
                                    <MapPin size={22} className="shrink-0 text-brand-purple mt-0.5" />
                                    <span className="leading-relaxed">{t("address")}</span>
                                </div>
                                <div className="flex items-center gap-4 text-base font-medium text-slate-500 dark:text-slate-400">
                                    <Mail size={22} className="shrink-0 text-brand-purple" />
                                    <a href={`mailto:${t("email")}`} className="hover:text-brand-purple dark:hover:text-brand-pink transition-colors">{t("email")}</a>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Legal & Trust */}
                        <div className="space-y-6 lg:col-span-3 mt-4 lg:mt-0">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-widest">{t("legalTitle")}</h4>
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/privacy"
                                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-purple hover:border-brand-purple dark:hover:text-brand-pink dark:hover:border-brand-pink hover:bg-brand-purple/5 transition-all w-full lg:w-fit"
                                >
                                    <ShieldCheck size={18} className="text-brand-purple dark:text-brand-pink" />
                                    {t("privacy")}
                                </Link>
                                <a
                                    href="https://promptiveagency.com/libro-de-reclamaciones/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/5 transition-all w-full lg:w-fit"
                                >
                                    <BookOpen size={18} className="text-brand-orange" />
                                    {t("complaintsBook")}
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Copyright bar */}
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            © 2026 Promptive. {t("rights")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
