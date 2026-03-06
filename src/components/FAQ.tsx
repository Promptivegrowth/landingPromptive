"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
    const t = useTranslations("faq");
    const [open, setOpen] = useState<number | null>(null);

    const faqs = [
        { q: t("q1"), a: t("a1") },
        { q: t("q2"), a: t("a2") },
        { q: t("q3"), a: t("a3") },
        { q: t("q4"), a: t("a4") },
        { q: t("q5"), a: t("a5") },
        { q: t("q6"), a: t("a6") },
        { q: t("q7"), a: t("a7") },
    ];

    return (
        <section className="py-24 relative bg-vibrant-gradient-alt" id="faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-white/90 font-medium">{t("subtitle")}</p>
                    </div>
                </ScrollReveal>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <ScrollReveal key={i} delay={i * 0.05}>
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-purple/30">
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: open === i ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="shrink-0"
                                    >
                                        <ChevronDown size={20} className="text-slate-400 dark:text-slate-500" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
