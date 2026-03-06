"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function FloatingCTA() {
    const t = useTranslations("header");
    const webT = useTranslations("webHero");
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/en") ? "en" : "es";
    const isWebRoute = pathname.includes("/desarrollo-web");

    const handleCTA = () => {
        if (isWebRoute) {
            router.push(`/${currentLocale}/whatsapp?text=${encodeURIComponent("Hola, me interesa el servicio de *diseño y desarrollo web*. Quisiera más información sobre los planes.")}&type=web_development`);
        } else {
            router.push(`/${currentLocale}/whatsapp?type=custom_software`);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
            <button
                onClick={handleCTA}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange text-dark font-bold text-sm shadow-xl shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
                {isWebRoute ? webT("cta") : t("cta")}
                <ArrowRight size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
}
