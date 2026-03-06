"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { Globe, Code2, Cpu, Database, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";

export default function CEOBio() {
    const t = useTranslations("ceo");

    return (
        <section className="py-32 relative overflow-hidden bg-white dark:bg-dark" id="ceo">
            <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />

            {/* Advanced Ambient Background */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[400px] bg-brand-orange/5 dark:bg-brand-orange/10 blur-[150px] rounded-full -translate-y-1/2 -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-brand-pink/5 dark:bg-brand-pink/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Photo & Badge Identity Column */}
                    <div className="relative shrink-0 w-full max-w-sm lg:max-w-none lg:w-5/12 flex justify-center lg:justify-end">
                        <ScrollReveal>
                            <div className="relative">
                                {/* Photo Container */}
                                <div className="relative w-72 h-[420px] sm:w-80 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-brand-purple/20 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 z-10">
                                    <Image
                                        src="/luigi.webp"
                                        alt={t("name")}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 1024px) 320px, 320px"
                                        priority
                                    />
                                    {/* Overlay Gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Floating Tech Graphics behind photo */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full blur-[60px] opacity-50 -z-10 animate-pulse" />
                                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-br from-brand-pink to-brand-orange rounded-full blur-[70px] opacity-40 -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

                                {/* Premium Experience Floating Badge */}
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-12 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-white/10 shadow-xl shadow-black/10 z-20 flex items-center gap-4 backdrop-blur-md"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-pink flex items-center justify-center text-white shrink-0">
                                        {/* @ts-ignore */}
                                        <lord-icon
                                            src="https://cdn.lordicon.com/glwzslnh.json"
                                            trigger="loop"
                                            colors="primary:#ffffff,secondary:#ffffff"
                                            style={{ width: "32px", height: "32px" }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">+10</p>
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("experience")}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Bio content */}
                    <div className="w-full lg:w-7/12">
                        <ScrollReveal delay={0.2}>
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <span className="w-8 h-[2px] bg-brand-orange rounded-full" />
                                    <span className="text-brand-orange text-sm font-bold uppercase tracking-widest block">
                                        {t("role")}
                                    </span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
                                    {t("name")}
                                </h2>

                                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
                                    <p className="text-xl leading-relaxed">
                                        {t("bio")}
                                    </p>
                                </div>

                                {/* Premium Skills Matrix */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 mx-auto justify-center lg:justify-start lg:mx-0 max-w-xl lg:max-w-none">
                                    {[
                                        { icon: Code2, label: "Full Stack", color: "text-brand-purple" },
                                        { icon: Globe, label: "Web3 Builder", color: "text-brand-blue" },
                                        { icon: Cpu, label: "AI Integra", color: "text-brand-orange" },
                                        { icon: Database, label: "Cloud Arch", color: "text-brand-pink" },
                                    ].map((skill, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-2 lg:gap-3 p-3 lg:p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm text-center sm:text-left">
                                            <skill.icon size={20} className={`shrink-0 ${skill.color}`} />
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                {skill.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* LinkedIn button */}
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://www.linkedin.com/notifications/?filter=all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0A66C2] text-white font-bold text-lg hover:bg-[#004182] transition-colors shadow-xl shadow-[#0A66C2]/25"
                                >
                                    <Linkedin size={22} />
                                    {t("linkedin")}
                                </motion.a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
