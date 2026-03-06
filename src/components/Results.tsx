"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, animate } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import { Quote, TrendingDown, TrendingUp, Server, Clock, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function Results() {
    const t = useTranslations("results");
    const trustT = useTranslations("trust");

    const metrics = [
        { icon: TrendingDown, target: 40, prefix: "", suffix: "%", label: t("metric1Label"), color: "text-white" },
        { icon: TrendingUp, target: 3, prefix: "", suffix: "x", label: t("metric2Label"), color: "text-white" },
        { icon: Server, target: 99.9, isDecimal: true, prefix: "", suffix: "%", label: t("metric3Label"), color: "text-white" },
        { icon: Clock, isLordIcon: true, target: 3, prefix: "< ", suffix: t("metric4Value").replace(/<\s*\d+/, ''), label: t("metric4Label"), color: "text-white" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        { quote: t("client1Quote"), name: t("client1Name"), role: t("client1Role"), image: t("client1Image"), position: "object-center" },
        { quote: t("client2Quote"), name: t("client2Name"), role: t("client2Role"), image: t("client2Image"), position: "object-top" },
        { quote: t("client3Quote"), name: t("client3Name"), role: t("client3Role"), image: t("client3Image"), position: "object-top" },
        { quote: t("client4Quote"), name: t("client4Name"), role: t("client4Role"), image: t("client4Image"), position: "object-center" },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

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

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

                <div className="relative max-w-4xl mx-auto">
                    <ScrollReveal delay={0.2}>
                        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl overflow-hidden">

                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <Quote size={48} className="text-white/20 mb-8 relative z-10" />

                            <div className="relative min-h-[280px] sm:min-h-[220px] md:min-h-[200px] flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="w-full relative z-10"
                                    >
                                        <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-medium mb-10 italic">
                                            "{testimonials[currentIndex].quote}"
                                        </p>

                                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mt-12">
                                            <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 flex-shrink-0 shadow-2xl ring-4 ring-brand-purple/20">
                                                <Image
                                                    src={testimonials[currentIndex].image}
                                                    alt={testimonials[currentIndex].name}
                                                    fill
                                                    className={`object-cover ${testimonials[currentIndex].position}`}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                                                    {testimonials[currentIndex].name}
                                                </h4>
                                                <p className="text-lg md:text-xl lg:text-2xl font-bold text-white/90">
                                                    {testimonials[currentIndex].role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Carousel Controls */}
                            <div className="absolute bottom-[200px] sm:bottom-[160px] md:bottom-12 right-8 md:right-12 flex items-center gap-3 z-30">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-brand-purple transition-all"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-brand-purple transition-all"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Styled Logo Carousel (Integrated from old TrustSection) */}
                <ScrollReveal>
                    <div className="border-t border-white/20 pt-16 mt-32 relative">
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
