"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const projectsList = [
    { id: "p1", image: "llacza_5_11zon.webp", url: "https://estudiollacza.com/" },
    { id: "p2", image: "gophora2_1_11zon.webp", url: "https://www.gophora.com/" },
    { id: "p3", image: "morrizon pizza_2_11zon.webp", url: "https://guileless-blancmange-a9b667.netlify.app/" },
    { id: "p4", image: "mandragora_4_11zon.webp", url: "https://mandragoraconsultores.com/" },
    { id: "p5", image: "mallas_7_11zon.webp", url: "https://mallastumiperu.com/" },
    { id: "p6", image: "ravmar_3_11zon.webp", url: "https://www.ravmarlogistics.com/" },
    { id: "p7", image: "almacenes_6_11zon.webp", url: "https://xn--almacenestresnorteos-l7b.com/" },
];

export default function WebPortfolio() {
    const t = useTranslations("webPortfolio");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projectsList.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
    };

    const currentProject = projectsList[currentIndex];

    // Animation variants
    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 100 : -100,
                opacity: 0,
                scale: 0.95,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 100 : -100,
                opacity: 0,
                scale: 0.95,
            };
        }
    };

    return (
        <section className="py-24 relative bg-slate-50 dark:bg-slate-900 overflow-hidden" id="portfolio">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-slate-950 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/20 bg-brand-purple/5 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
                            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink uppercase tracking-widest">
                                {t("title")}
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Casos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">Éxito</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="relative group rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl dark:shadow-none border border-slate-100 dark:border-white/10 p-4 sm:p-8 flex flex-col lg:flex-row gap-8 items-center">

                            {/* Image Showcase */}
                            <div className="w-full lg:w-3/5 aspect-[4/3] sm:aspect-video lg:aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <Link href={currentProject.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block group/link">
                                    <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-white text-brand-purple px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover/link:translate-y-0 transition-transform duration-300 shadow-xl">
                                            {t("visitBtn")} <ExternalLink size={18} />
                                        </div>
                                    </div>
                                </Link>

                                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                            scale: { duration: 0.2 }
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={`/logos/webs/${currentProject.image}`}
                                            alt={t(`projects.${currentProject.id}.name`)}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Content Description */}
                            <div className="w-full lg:w-2/5 flex flex-col h-full justify-center relative z-20 bg-white dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent">

                                <div className="mb-8 overflow-hidden relative" style={{ minHeight: "180px" }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute md:static"
                                        >
                                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                                {t(`projects.${currentProject.id}.name`)}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                                                {t(`projects.${currentProject.id}.desc`)}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-white/10 pt-6">
                                    <div className="flex gap-2">
                                        {projectsList.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setDirection(idx > currentIndex ? 1 : -1);
                                                    setCurrentIndex(idx);
                                                }}
                                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-purple' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handlePrev}
                                            className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-purple hover:text-white transition-colors duration-300"
                                            aria-label="Previous project"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-purple hover:text-white transition-colors duration-300"
                                            aria-label="Next project"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
