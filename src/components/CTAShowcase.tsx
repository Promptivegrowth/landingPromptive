"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { trackAndRedirectToWhatsApp } from "@/utils/trackAndRedirect";

function TiltCard({ children, rotateYFinal, originClass }: { children: React.ReactNode, rotateYFinal: number, originClass: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const interactRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const width = rect.width;
        const height = rect.height;
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: 0 }}
            whileInView={{ opacity: 1, rotateY: rotateYFinal }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className={`relative w-full lg:w-[50%] ${originClass}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY: interactRotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full cursor-grab active:cursor-grabbing"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function CTAShowcase() {
    const t = useTranslations("ctaShowcase");

    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";

    const handleCTA = () => {
        trackAndRedirectToWhatsApp("Hola Promptive. Me interesa desarrollar un software a medida para mi empresa. Quisiera recibir más información y coordinar una breve llamada de asesoría para validar la viabilidad técnica.", "custom_software");
    };

    return (
        <section className="py-24 relative overflow-hidden" id="showcase">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                {/* 3D perspective container */}
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8" style={{ perspective: "1500px" }}>

                    {/* LEFT DOOR — print1 (login)
                        Hinge on LEFT edge (origin-left). Right edge pushes BACK into the screen (rotateY: 20). */}
                    <TiltCard rotateYFinal={20} originClass="origin-left">
                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-dark group">
                            <Image
                                src="/print1.webp"
                                alt="Promptive Login"
                                fill
                                className="object-cover object-left-top"
                                priority
                            />
                            {/* Shadow on the receding edge to enhance depth */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-black/25 pointer-events-none" />
                            {/* Inner ambient glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-brand-purple/10 to-transparent transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </TiltCard>

                    {/* RIGHT DOOR — print2 (dashboard)
                        Hinge on RIGHT edge (origin-right). Left edge pushes BACK into the screen (rotateY: -20). */}
                    <TiltCard rotateYFinal={-20} originClass="origin-right">
                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-dark group">
                            <Image
                                src="/print2.webp"
                                alt="Promptive Dashboard"
                                fill
                                className="object-cover object-left-top"
                                priority
                            />
                            {/* Shadow on the receding edge to enhance depth */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-transparent via-transparent to-black/25 pointer-events-none" />
                            {/* Inner ambient glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tl from-brand-blue/10 to-transparent transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </TiltCard>
                </div>

                {/* CTA below */}
                <ScrollReveal delay={0.3}>
                    <div className="text-center mt-20">
                        <button
                            onClick={handleCTA}
                            id="showcase-cta"
                            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-brand-orange text-dark font-bold text-lg shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            {t("cta")}
                            <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
