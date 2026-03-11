"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ScrollReveal from "./ScrollReveal";
import { trackAndRedirectToWhatsApp } from "@/utils/trackAndRedirect";
import {
    Users, Package, DollarSign, Receipt,
    Cog, UserCheck, Target, FileText,
    CalendarDays, BarChart3, ShieldCheck, Settings,
    Sparkles, Workflow, Database, Lock, Wallet, Truck, Store, Bot
} from "lucide-react";

export default function Modules() {
    const t = useTranslations("modules");

    const modules = [
        { key: "crm", icon: Users, color: "text-brand-pink" },
        { key: "inventory", icon: Package, color: "text-amber-500" },
        { key: "ecommerce", icon: Store, color: "text-brand-purple" },
        { key: "delivery", icon: Truck, color: "text-emerald-500" },
        { key: "finance", icon: DollarSign, color: "text-emerald-500 dark:text-emerald-400" },
        { key: "billing", icon: Receipt, color: "text-brand-blue" },
        { key: "crypto", icon: Wallet, color: "text-indigo-500 dark:text-indigo-400" },
        { key: "operations", icon: Cog, color: "text-slate-600 dark:text-slate-400" },
        { key: "workflows", icon: Workflow, color: "text-brand-orange" },
        { key: "hr", icon: UserCheck, color: "text-blue-500 dark:text-blue-400" },
        { key: "tracking", icon: Target, color: "text-red-500 dark:text-red-400" },
        { key: "database", icon: Database, color: "text-teal-600 dark:text-teal-400" },
        { key: "security", icon: Lock, color: "text-red-600 dark:text-red-500" },
        { key: "calendar", icon: CalendarDays, color: "text-violet-500 dark:text-violet-400" },
        { key: "documents", icon: FileText, color: "text-blue-400" },
        { key: "analytics", icon: BarChart3, color: "text-brand-orange" },
        { key: "ai", icon: Bot, color: "text-brand-purple" },
        { key: "config", icon: Settings, color: "text-slate-500 dark:text-slate-400" },
    ];

    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";

    const handleCTA = () => {
        trackAndRedirectToWhatsApp("Hola Promptive. Me interesa desarrollar un software a medida para mi empresa. Quisiera recibir más información y coordinar una breve llamada de asesoría para validar la viabilidad técnica.", "custom_software");
    };

    return (
        <section className="py-24 relative bg-vibrant-gradient" id="modules">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-white/90 max-w-3xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-8">
                    {modules.map((mod, i) => (
                        <ScrollReveal key={mod.key} delay={i * 0.03} className="h-full">
                            <motion.div
                                whileHover={{ x: 4, scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-brand-purple/30 dark:hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0`}>
                                    <mod.icon size={24} className={`${mod.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-[14px] sm:text-[15px] mb-1 sm:mb-2 leading-tight">
                                        {t(mod.key)}
                                    </h3>
                                    <p className="text-[13px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {t(`${mod.key}Desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Custom module CTA */}
                <ScrollReveal delay={0.3}>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative p-8 rounded-2xl overflow-hidden cursor-pointer"
                        onClick={handleCTA}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-brand-pink/10 to-brand-orange/10 dark:from-brand-purple/20 dark:via-brand-pink/20 dark:to-brand-orange/20 rounded-2xl" />
                        <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-slate-900" />
                        <div className="absolute inset-0 rounded-2xl border border-brand-purple/20 dark:border-brand-purple/30" />
                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange flex items-center justify-center shrink-0 shadow-lg shadow-brand-purple/20">
                                    <div style={{ width: 44, height: 44 }}>
                                        {/* @ts-expect-error Custom element */}
                                        <lord-icon
                                            src="https://cdn.lordicon.com/nsqneknp.json"
                                            trigger="loop"
                                            colors="primary:#ffffff,secondary:#2ca58d,tertiary:#ffc738,quaternary:#faddd1,quinary:#ebe6ef,senary:#f24c00"
                                            style={{ width: "44px", height: "44px" }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t("custom")}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("customDesc")}</p>
                                </div>
                            </div>
                            <button onClick={handleCTA} className="px-6 py-3 rounded-full bg-brand-orange text-dark font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0">
                                {t("customCta")}
                            </button>
                        </div>
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    );
}
