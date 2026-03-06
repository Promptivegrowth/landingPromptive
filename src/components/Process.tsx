"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Search, PenTool, Code, Rocket } from "lucide-react";

export default function Process() {
    const t = useTranslations("process");

    const steps: Array<{
        icon: React.ElementType;
        lordIcon?: string;
        title: string;
        desc: string;
        num: string;
        color: string;
    }> = [
            { icon: Search, lordIcon: "https://cdn.lordicon.com/iuvnsegf.json", title: t("step1Title"), desc: t("step1Desc"), num: "01", color: "text-brand-purple" },
            { icon: PenTool, lordIcon: "https://cdn.lordicon.com/yquwpfkc.json", title: t("step2Title"), desc: t("step2Desc"), num: "02", color: "text-brand-pink" },
            { icon: Code, lordIcon: "https://cdn.lordicon.com/xpesqpji.json", title: t("step3Title"), desc: t("step3Desc"), num: "03", color: "text-brand-blue" },
            { icon: Rocket, lordIcon: "https://cdn.lordicon.com/ekuoyiqn.json", title: t("step4Title"), desc: t("step4Desc"), num: "04", color: "text-brand-orange" },
        ];

    return (
        <section className="py-24 relative bg-white dark:bg-dark" id="process">
            <div className="absolute inset-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-12">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-purple/20 via-brand-pink/20 to-brand-orange/20 dark:from-white/10 dark:via-white/5 dark:to-white/10 z-0" />

                    {steps.map((step, i) => (
                        <ScrollReveal key={i} delay={i * 0.15} className="relative z-10">
                            <div className="flex flex-col items-center text-center group px-2">
                                {/* Badge */}
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-6 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] group-hover:border-brand-purple/30 group-hover:shadow-[0_8px_30px_rgba(64,48,232,0.15)] transition-all bg-clip-padding"
                                >
                                    {step.lordIcon ? (
                                        <div style={{ width: 64, height: 64 }}>
                                            {/* @ts-expect-error Custom element */}
                                            <lord-icon
                                                src={step.lordIcon}
                                                trigger="loop"
                                                style={{ width: "64px", height: "64px" }}
                                            />
                                        </div>
                                    ) : (
                                        <step.icon size={40} className={step.color} />
                                    )}
                                </motion.div>

                                {/* Step Number Pill */}
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 mb-4 transition-colors group-hover:bg-brand-orange/10 group-hover:border-brand-orange/20">
                                    <span className="text-[11px] font-extrabold text-brand-orange tracking-widest uppercase">
                                        STEP {step.num}
                                    </span>
                                </div>

                                {/* Texts */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors group-hover:text-brand-purple">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
                                    {step.desc}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
