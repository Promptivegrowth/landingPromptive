"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
    UtensilsCrossed, Truck, Bus, Factory,
    Wrench, Building2, Scale, Briefcase,
    ShoppingBag, Heart, GraduationCap, Landmark,
    ArrowUpRight
} from "lucide-react";

export default function Industries() {
    const t = useTranslations("industries");

    const industries = [
        { key: "restaurant", icon: UtensilsCrossed, color: "text-orange-500", bgGlow: "group-hover:shadow-orange-500/20" },
        { key: "logistics", icon: Truck, color: "text-blue-500 dark:text-blue-400", bgGlow: "group-hover:shadow-blue-500/20" },
        { key: "transport", icon: Bus, color: "text-teal-500 dark:text-teal-400", bgGlow: "group-hover:shadow-teal-500/20" },
        { key: "industrial", icon: Factory, color: "text-slate-600 dark:text-slate-400", bgGlow: "group-hover:shadow-slate-500/20" },
        { key: "engineering", icon: Wrench, color: "text-amber-500", bgGlow: "group-hover:shadow-amber-500/20" },
        { key: "construction", icon: Building2, color: "text-yellow-600 dark:text-yellow-500", bgGlow: "group-hover:shadow-yellow-600/20" },
        { key: "legal", icon: Scale, color: "text-indigo-500 dark:text-indigo-400", bgGlow: "group-hover:shadow-indigo-500/20" },
        { key: "consulting", icon: Briefcase, color: "text-violet-500 dark:text-violet-400", bgGlow: "group-hover:shadow-violet-500/20" },
        { key: "retail", icon: ShoppingBag, color: "text-pink-500 dark:text-pink-400", bgGlow: "group-hover:shadow-pink-500/20" },
        { key: "health", icon: Heart, color: "text-red-500 dark:text-red-400", bgGlow: "group-hover:shadow-red-500/20" },
        { key: "education", icon: GraduationCap, color: "text-emerald-500 dark:text-emerald-400", bgGlow: "group-hover:shadow-emerald-500/20" },
        { key: "fintech", icon: Landmark, color: "text-cyan-600 dark:text-cyan-400", bgGlow: "group-hover:shadow-cyan-500/20" },
    ];

    return (
        <section className="py-32 relative bg-white dark:bg-dark overflow-hidden" id="industries">
            {/* Ambient background blur */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/20 bg-brand-purple/5 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                            <span className="text-sm font-bold text-brand-purple tracking-widest uppercase">Multi-sector</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            {t("title")}
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {industries.map((industry, i) => (
                        <ScrollReveal key={industry.key} delay={i * 0.05}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`group relative h-full rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${industry.bgGlow}`}
                            >
                                {/* Animated Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/[0.03] to-brand-blue/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-white/10 transition-transform duration-500 shadow-sm">
                                            <industry.icon size={26} className={`${industry.color} transition-colors duration-300`} strokeWidth={1.5} />
                                        </div>
                                        <ArrowUpRight
                                            size={20}
                                            className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-brand-purple translate-y-2 translate-x-[-8px] group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                                        />
                                    </div>

                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3 tracking-tight group-hover:text-brand-purple dark:group-hover:text-brand-purple transition-colors duration-300">
                                        {t(industry.key)}
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-auto group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                                        {t(`${industry.key}Desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
