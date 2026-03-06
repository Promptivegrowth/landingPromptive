"use client";

import { useTranslations } from "next-intl";

export default function Marquee() {
    const t = useTranslations("marquee");

    // Create enough items to loop seamlessly across wide screens
    const items = Array.from({ length: 15 });

    return (
        <div
            className="relative py-4 sm:py-6 bg-brand-purple overflow-hidden flex whitespace-nowrap z-20 border-y border-brand-purple/50 shadow-2xl"
            style={{ transform: "rotate(-2deg) scale(1.05)", marginTop: "-2rem", marginBottom: "4rem" }}
        >
            <div
                className="flex items-center"
                style={{
                    animation: "scroll-marquee 60s linear infinite",
                    width: "max-content",
                }}
            >
                {/* First set of items */}
                <div className="flex items-center">
                    {items.map((_, i) => (
                        <div key={`first-${i}`} className="flex items-center text-white font-extrabold text-2xl sm:text-3xl tracking-widest px-8">
                            <span>{t("item1")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                            <span>&nbsp;{t("item2")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                            <span>&nbsp;{t("item3")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                        </div>
                    ))}
                </div>
                {/* Second identical set of items for seamless loop */}
                <div className="flex items-center" aria-hidden="true">
                    {items.map((_, i) => (
                        <div key={`second-${i}`} className="flex items-center text-white font-extrabold text-2xl sm:text-3xl tracking-widest px-8">
                            <span>{t("item1")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                            <span>&nbsp;{t("item2")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                            <span>&nbsp;{t("item3")}&nbsp;</span>
                            <span className="text-brand-pink text-3xl sm:text-4xl">✦</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
