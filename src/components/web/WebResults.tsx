"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { animate, motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import { TrendingUp, Server, Clock, Globe } from "lucide-react";

function AnimatedMetricContent({ target, prefix = "", suffix = "", isDecimal = false }: { target: number, prefix?: string, suffix?: string, isDecimal?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState("0");
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const ctrl = animate(0, target, {
                        duration: 2.0,
                        ease: "easeOut",
                        onUpdate: (v) => {
                            if (isDecimal) {
                                setDisplay(v.toFixed(1));
                            } else {
                                setDisplay(Math.round(v).toString());
                            }
                        },
                    });
                    return () => ctrl.stop();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, isDecimal]);

    return (
        <span ref={ref}>
            {prefix}{display}{suffix}
        </span>
    );
}

const logos = [
    "Espacio Logo_1_11zon.webp",
    "Frame_13sd (1)_2_11zon.webp",
    "gophora-plomo-logo_3_11zon.webp",
    "images (2)_11zon.webp",
    "images (3)-Photoroom_4_11zon.webp",
    "images (4)_11zon.webp",
    "logo (1)asdas_5_11zon.webp",
    "logo2 (1)_7_11zon.webp",
    "logo2_8_11zon.webp",
    "logomallas_9_11zon.webp",
    "logo-morri_10_11zon.webp",
    "logovertical_11_11zon.webp",
    "Untitled design (19)_12_11zon.webp",
    "Untitled design (27)_13_11zon.webp",
    "Untitled design (34)_14_11zon.webp",
];

export default function WebResults() {
    const t = useTranslations("webResults");
    const trustT = useTranslations("trust");

    const metrics = [
        { icon: Globe, target: 100, prefix: "+", suffix: "", label: t("metric1Label"), color: "text-white" },
        { icon: Server, target: 99.9, isDecimal: true, prefix: "", suffix: "%", label: t("metric3Label"), color: "text-white" },
        { icon: Clock, isLordIcon: true, target: 2, prefix: "< ", suffix: t("metric4Value").replace(/<\s*\d+/, ''), label: t("metric4Label"), color: "text-white" },
    ];

    return (
        <section className="py-24 relative bg-vibrant-gradient-alt" id="results">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-sm font-bold text-white tracking-widest uppercase">Métricas</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            {t("title")}
                        </h2>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-6 mb-12">
                    {metrics.map((metric, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="h-full flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
                            >
                                {metric.isLordIcon ? (
                                    <div className="mb-3">
                                        {/* @ts-ignore */}
                                        <lord-icon
                                            src="https://cdn.lordicon.com/gdowkrjt.json"
                                            trigger="loop"
                                            colors="primary:#ffffff"
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                    </div>
                                ) : (
                                    <metric.icon size={40} className={`mx-auto mb-4 ${metric.color}`} />
                                )}
                                <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2 tabular-nums drop-shadow-sm">
                                    <AnimatedMetricContent
                                        target={metric.target}
                                        prefix={metric.prefix}
                                        suffix={metric.suffix}
                                        isDecimal={metric.isDecimal}
                                    />
                                </div>
                                <p className="text-sm font-bold text-white/80 uppercase tracking-wide">
                                    {metric.label}</p>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Styled Logo Carousel (Integrated from old TrustSection) */}
                <ScrollReveal>
                    <div className="border-t border-white/20 pt-16 mt-16 relative">
                        <p className="text-center text-sm font-bold text-white/80 uppercase tracking-widest mb-12">
                            {trustT("logosTitle")}
                        </p>

                        <div className="relative">
                            {/* Scrolling track */}
                            <div className="overflow-hidden">
                                <div
                                    className="flex gap-10 items-center"
                                    style={{
                                        animation: "scroll-logos 45s linear infinite",
                                        width: "max-content",
                                    }}
                                >
                                    {[...logos, ...logos].map((logo, i) => (
                                        <div
                                            key={i}
                                            className="shrink-0 w-44 h-24 p-5 rounded-2xl border border-white/20 bg-white flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="relative w-full h-full grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                                                <Image
                                                    src={`/logos/${logo}`}
                                                    alt={`Client ${(i % logos.length) + 1}`}
                                                    fill
                                                    className="object-contain"
                                                    sizes="176px"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
