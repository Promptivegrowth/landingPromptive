"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

// Tells TypeScript to ignore the custom web component
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'dotlottie-wc': any;
        }
    }
}

export default function Hero() {
    const t = useTranslations("hero");
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCTA = () => {
        router.push(`/${currentLocale}/whatsapp?type=custom_software`);
    };

    return (
        <>
            {/* Load Lottie Web Component Script */}
            <Script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js" type="module" strategy="lazyOnload" />

            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20" id="hero">
                {/* Ambient background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-purple/5 dark:bg-brand-purple/10 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-pink/5 dark:bg-brand-pink/8 blur-[100px]" />
                    <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-brand-orange/5 dark:bg-brand-orange/8 blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-brand-purple/20 dark:border-brand-purple/30 bg-brand-purple/5 dark:bg-brand-purple/10 mb-8"
                    >
                        <div style={{ width: 64, height: 64 }}>
                            {/* @ts-expect-error Custom element */}
                            <lord-icon
                                src="https://cdn.lordicon.com/aszjakup.json"
                                trigger="loop"
                                colors="primary:#4030e8,secondary:#a866ee,tertiary:#faddd1"
                                style={{ width: "64px", height: "64px" }}
                            />
                        </div>
                        <span className="text-[15px] sm:text-base font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("badge")}</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.08] tracking-tight mb-6 max-w-5xl"
                    >
                        {t("headline")}
                    </motion.h1>

                    {/* Highlight */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-xl sm:text-2xl font-bold text-gradient mb-6"
                    >
                        {t("highlight")}
                    </motion.p>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        {t("subheadline")}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
                    >
                        <button
                            onClick={handleCTA}
                            id="hero-cta"
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-brand-orange text-dark font-bold text-lg shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            {t("cta")}
                            <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>


                    </motion.div>

                    {/* Lottie Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="relative flex justify-center items-center w-full h-[250px] sm:h-[300px] mt-6 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/10 via-brand-pink/5 to-transparent blur-3xl rounded-full" />
                        {isMounted && (
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                {/* @ts-ignore */}
                                <dotlottie-wc
                                    src="https://lottie.host/c32102df-acfc-4137-83c9-eb61c5b0d37b/bxudp1wyC6.lottie"
                                    style={{ width: "300px", height: "300px" }}
                                    autoplay
                                    loop
                                />
                            </div>
                        )}
                    </motion.div>

                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark to-transparent z-10 pointer-events-none" />
            </section>
        </>
    );
}
