"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Script from "next/script";
import ScrollReveal from "./ScrollReveal";
import {
    Ban,
    GitMerge,
    LayoutTemplate,
    Code2,
    Sliders,
    Sparkles,
    ArrowRight,
    TrendingDown,
    TrendingUp
} from "lucide-react";

export default function ProblemSolution() {
    const t = useTranslations("problem");

    const comparisons: Array<{
        pain: { icon: React.ElementType; lordIcon?: string; title: string; desc: string };
        sol: { icon: React.ElementType; lordIcon?: string; title: string; desc: string };
    }> = [
            {
                pain: { icon: Ban, title: t("pain1Title"), desc: t("pain1Desc") },
                sol: { icon: Code2, lordIcon: "https://cdn.lordicon.com/gvtjlyjf.json", title: t("sol1Title"), desc: t("sol1Desc") },
            },
            {
                pain: { icon: GitMerge, title: t("pain2Title"), desc: t("pain2Desc") },
                sol: { icon: Sliders, lordIcon: "https://cdn.lordicon.com/ubpgwkmy.json", title: t("sol2Title"), desc: t("sol2Desc") },
            },
            {
                pain: { icon: LayoutTemplate, title: t("pain3Title"), desc: t("pain3Desc") },
                sol: { icon: Sparkles, lordIcon: "https://cdn.lordicon.com/wjdlpfml.json", title: t("sol3Title"), desc: t("sol3Desc") },
            },
            {
                pain: { icon: TrendingDown, title: t("pain4Title"), desc: t("pain4Desc") },
                sol: { icon: TrendingUp, lordIcon: "https://cdn.lordicon.com/lbcxnxti.json", title: t("sol4Title"), desc: t("sol4Desc") },
            },
        ];

    return (
        <section className="py-24 relative bg-vibrant-gradient" id="problem">
            <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            {t("sectionTitle")}
                        </h2>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            {t("sectionSubtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="space-y-6">
                    {comparisons.map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="flex flex-col md:flex-row items-stretch gap-0 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 group bg-white dark:bg-dark relative">

                                {/* Left: Problem */}
                                <div className="flex-1 p-8 sm:p-10 bg-slate-50/50 dark:bg-white/[0.02] border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 relative transition-colors duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/[0.03] group-hover:to-red-500/[0.08] dark:from-red-500/0 dark:to-red-500/[0.02] dark:group-hover:to-red-500/[0.08] transition-colors duration-500" />
                                    <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-6 border border-red-200 dark:border-red-500/20">
                                            {t("title")}
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-red-100 dark:border-red-500/20 text-red-500 dark:text-red-400 flex items-center justify-center mb-6 shadow-sm">
                                            <item.pain.icon size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
                                            {item.pain.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                                            {item.pain.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* VS VS Badge (Desktop only overlapping) */}
                                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#0f172a] border-4 border-slate-50 dark:border-dark items-center justify-center z-10 shadow-sm text-slate-400 dark:text-slate-500">
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Right: Solution */}
                                <div className="flex-1 p-8 sm:p-10 relative transition-colors duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/0 to-emerald-500/[0.03] group-hover:to-emerald-500/[0.08] dark:from-emerald-500/0 dark:to-emerald-500/[0.02] dark:group-hover:to-emerald-500/[0.08] transition-colors duration-500" />
                                    <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-200 dark:border-emerald-500/20">
                                            {t("subtitle")}
                                        </div>
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/20 overflow-hidden">
                                            {item.sol.lordIcon ? (
                                                <div style={{ width: 56, height: 56 }}>
                                                    {/* @ts-expect-error Custom element */}
                                                    <lord-icon
                                                        src={item.sol.lordIcon}
                                                        trigger="loop"
                                                        colors="primary:#ffffff,secondary:#ffffff"
                                                        style={{ width: "56px", height: "56px" }}
                                                    />
                                                </div>
                                            ) : (
                                                <item.sol.icon size={40} />
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
                                            {item.sol.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-[15px]">
                                            {item.sol.desc}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
