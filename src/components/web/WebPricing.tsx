"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { ArrowRight, Check, Globe, Server, Mail, Lock, Smartphone, Search, BookOpen, HardDrive } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackAndRedirectToWhatsApp } from "@/utils/trackAndRedirect";

interface PlanCard {
    name: string;
    price: string;
    desc: string;
    features: string[];
    popular?: boolean;
}

export default function WebPricing() {
    const t = useTranslations("webPricing");
    const [activeTab, setActiveTab] = useState<"web" | "ecommerce">("web");
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";

    const handleCTA = (planName: string) => {
        const msg = currentLocale === "es"
            ? `Hola, me interesa el plan *${planName}* de diseño web. Quisiera más información y coordinar una reunión breve por Meet para conocer los detalles.`
            : `Hello, I'm interested in the *${planName}* web design plan. I would like more information and schedule a quick Google Meet to know the details.`;

        trackAndRedirectToWhatsApp(msg, "web_development", planName);
    };

    const webPlans: PlanCard[] = [
        {
            name: t("web1Name"),
            price: t("web1Price"),
            desc: t("web1Desc"),
            features: [t("web1F1"), t("web1F2"), t("web1F3"), t("web1F4"), t("web1F5"), t("web1F6")],
        },
        {
            name: t("web2Name"),
            price: t("web2Price"),
            desc: t("web2Desc"),
            features: [t("web2F1"), t("web2F2"), t("web2F3"), t("web2F4"), t("web2F5"), t("web2F6"), t("web2F7"), t("web2F8")],
            popular: true,
        },
        {
            name: t("web3Name"),
            price: t("web3Price"),
            desc: t("web3Desc"),
            features: [t("web3F1"), t("web3F2"), t("web3F3"), t("web3F4"), t("web3F5"), t("web3F6"), t("web3F7"), t("web3F8"), t("web3F10")],
        },
    ];

    const ecomPlans: PlanCard[] = [
        {
            name: t("ecom1Name"),
            price: t("ecom1Price"),
            desc: t("ecom1Desc"),
            features: [t("ecom1F1"), t("ecom1F2"), t("ecom1F3"), t("ecom1F4"), t("ecom1F5"), t("ecom1F6"), t("ecom1F7"), t("ecom1F8"), t("ecom1F9"), t("ecom1F10")],
        },
        {
            name: t("ecom2Name"),
            price: t("ecom2Price"),
            desc: t("ecom2Desc"),
            features: [t("ecom2F1"), t("ecom2F2"), t("ecom2F3"), t("ecom2F4"), t("ecom2F5"), t("ecom2F6"), t("ecom2F7"), t("ecom2F8"), t("ecom2F9"), t("ecom2F10")],
            popular: true,
        },
        {
            name: t("ecom3Name"),
            price: t("ecom3Price"),
            desc: t("ecom3Desc"),
            features: [t("ecom3F1"), t("ecom3F2"), t("ecom3F3"), t("ecom3F4"), t("ecom3F5"), t("ecom3F6"), t("ecom3F7"), t("ecom3F8"), t("ecom3F9"), t("ecom3F10"), t("ecom3F12")],
        },
    ];

    const plans = activeTab === "web" ? webPlans : ecomPlans;
    const currency = "S/";

    const includedFeatures = [
        { icon: Globe, text: t("domain") },
        { icon: Server, text: t("hosting") },
        { icon: Mail, text: t("email") },
        { icon: Lock, text: t("ssl") },
        { icon: Smartphone, text: t("responsive") },
        { icon: Search, text: t("seo") },
        { icon: BookOpen, text: t("complaintsBook") },
        { icon: HardDrive, text: t("storage") },
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-white dark:bg-dark" id="pricing">
            {/* Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-blue/5 dark:bg-brand-blue/10 blur-[150px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            {t("title")}
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Tab toggle */}
                <ScrollReveal delay={0.1}>
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex items-center p-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
                            <button
                                onClick={() => setActiveTab("web")}
                                className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${activeTab === "web"
                                    ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                {t("tabWeb")}
                            </button>
                            <button
                                onClick={() => setActiveTab("ecommerce")}
                                className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${activeTab === "ecommerce"
                                    ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                {t("tabEcommerce")}
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Plans grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20"
                    >
                        {plans.map((plan, i) => (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${plan.popular
                                    ? "border-brand-purple/50 dark:border-brand-purple/40 bg-gradient-to-b from-brand-purple/5 to-transparent dark:from-brand-purple/10 shadow-xl shadow-brand-purple/10"
                                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-lg shadow-slate-200/50 dark:shadow-none"
                                    }`}
                            >
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg">
                                            {t("popular")}
                                        </span>
                                    </div>
                                )}

                                {/* Plan name */}
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{plan.desc}</p>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{currency}</span>
                                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, fi) => (
                                        <li key={fi} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            <Check size={16} className="shrink-0 mt-0.5 text-brand-purple" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={() => handleCTA(plan.name)}
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 ${plan.popular
                                        ? "bg-brand-orange text-dark shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40"
                                        : "bg-slate-900 dark:bg-white text-white dark:text-dark hover:bg-slate-800 dark:hover:bg-slate-100"
                                        }`}
                                >
                                    {t("cta")}
                                    <ArrowRight size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Included in all plans */}
                <ScrollReveal delay={0.2}>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">{t("included")}</p>
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                            {includedFeatures.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    <feat.icon size={16} className="text-brand-purple" />
                                    {feat.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
