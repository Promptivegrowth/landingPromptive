"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Globe, Code2, Brain, Blocks } from "lucide-react";

export default function Services() {
    const t = useTranslations("services");

    const services: Array<{
        key: string;
        icon: React.ElementType;
        lordIcon?: string;
        lordColors?: string;
        color: string;
        bg: string;
        border: string;
        shadow: string;
    }> = [
            {
                key: "web",
                icon: Globe,
                lordIcon: "https://cdn.lordicon.com/tyntlpjn.json",
                lordColors: "primary:#121331,secondary:#a866ee",
                color: "text-brand-blue",
                bg: "bg-brand-blue/5 dark:bg-brand-blue/15",
                border: "group-hover:border-brand-blue/40 dark:group-hover:border-brand-blue/50",
                shadow: "group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)]",
            },
            {
                key: "software",
                icon: Code2,
                lordIcon: "https://cdn.lordicon.com/aszjakup.json",
                lordColors: "primary:#121331,secondary:#a866ee,tertiary:#3a3347",
                color: "text-brand-purple",
                bg: "bg-brand-purple/5 dark:bg-brand-purple/15",
                border: "group-hover:border-brand-purple/40 dark:group-hover:border-brand-purple/50",
                shadow: "group-hover:shadow-[0_8px_30px_rgba(64,48,232,0.15)]",
            },
            {
                key: "ai",
                icon: Brain,
                color: "text-brand-pink",
                bg: "bg-brand-pink/5 dark:bg-brand-pink/15",
                border: "group-hover:border-brand-pink/40 dark:group-hover:border-brand-pink/50",
                shadow: "group-hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)]",
            },
            {
                key: "web3",
                icon: Blocks,
                lordIcon: "https://cdn.lordicon.com/tyrtsvxn.json",
                color: "text-brand-orange",
                bg: "bg-brand-orange/5 dark:bg-brand-orange/15",
                border: "group-hover:border-brand-orange/40 dark:group-hover:border-brand-orange/50",
                shadow: "group-hover:shadow-[0_8px_30px_rgba(255,107,43,0.15)]",
            },
        ];

    return (
        <section className="py-32 relative bg-vibrant-gradient" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto font-medium">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <ScrollReveal key={service.key} delay={i * 0.1}>
                            <div
                                className={`group p-8 pt-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900 backdrop-blur-sm ${service.border} ${service.shadow} hover:-translate-y-2 transition-all duration-300 ease-out will-change-transform relative overflow-hidden h-full flex flex-col`}
                            >
                                <div className={`w-20 h-20 rounded-2xl ${service.bg} flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110`}>
                                    {service.lordIcon ? (
                                        <div style={{ width: 56, height: 56 }}>
                                            {/* @ts-expect-error Custom element */}
                                            <lord-icon
                                                src={service.lordIcon}
                                                trigger="hover"
                                                colors={service.lordColors}
                                                style={{ width: "56px", height: "56px" }}
                                            />
                                        </div>
                                    ) : (
                                        <service.icon size={40} className={service.color} strokeWidth={1.5} />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t(`${service.key}.title`)}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {t(`${service.key}.desc`)}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {(t.raw(`${service.key}.features`) as string[]).map((feature: string) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
