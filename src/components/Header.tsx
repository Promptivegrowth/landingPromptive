"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, ArrowRight, ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
    const t = useTranslations("header");
    const nav = useTranslations("headerNav");
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggle } = useTheme();

    const currentLocale = pathname.startsWith("/en") ? "en" : "es";
    const isWebRoute = pathname.includes("/desarrollo-web");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const switchLocale = (locale: string) => {
        const newPath = pathname.replace(/^\/(es|en)/, `/${locale}`);
        router.push(newPath);
        setLangOpen(false);
    };

    const handleCTA = () => {
        if (isWebRoute) {
            router.push(`/${currentLocale}/whatsapp?text=${encodeURIComponent("Hola, me interesa el servicio de *diseño y desarrollo web*. Quisiera más información sobre los planes.")}&type=web_development`);
        } else {
            router.push(`/${currentLocale}/whatsapp?type=custom_software`);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "py-3 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-sm"
                : "py-5 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image src="/isotipo2.png" alt="Promptive" width={36} height={36} priority />
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight hidden sm:block">
                        PROMPTIVE
                    </span>
                </div>

                {/* Navigation Tabs */}
                <nav className="hidden md:flex items-center gap-1 ml-6">
                    <a
                        href={`/${currentLocale}`}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${!isWebRoute
                            ? "bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20 dark:text-brand-pink"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                            }`}
                    >
                        {nav("software")}
                    </a>
                    <a
                        href={`/${currentLocale}/desarrollo-web`}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isWebRoute
                            ? "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                            }`}
                    >
                        {nav("web")}
                    </a>
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Theme toggle */}
                    <button
                        onClick={toggle}
                        className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 flex items-center p-0.5"
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            className="w-6 h-6 rounded-full bg-white dark:bg-dark shadow-md flex items-center justify-center"
                            animate={{ x: theme === "dark" ? 26 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            {theme === "light" ? (
                                <Sun size={13} className="text-brand-orange" />
                            ) : (
                                <Moon size={13} className="text-brand-blue" />
                            )}
                        </motion.div>
                    </button>

                    {/* Language toggle */}
                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-sm font-medium text-slate-600 dark:text-white/70"
                        >
                            <Globe size={16} />
                            {currentLocale.toUpperCase()}
                            <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 bg-white dark:bg-dark-light rounded-xl shadow-lg border border-slate-200 dark:border-white/10 overflow-hidden min-w-[140px]"
                                >
                                    <button
                                        onClick={() => switchLocale("es")}
                                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${currentLocale === "es" ? "text-brand-purple font-semibold" : "text-slate-600 dark:text-white/70"
                                            }`}
                                    >
                                        🇪🇸 Español
                                    </button>
                                    <button
                                        onClick={() => switchLocale("en")}
                                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${currentLocale === "en" ? "text-brand-purple font-semibold" : "text-slate-600 dark:text-white/70"
                                            }`}
                                    >
                                        🇺🇸 English
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleCTA}
                        id="header-cta"
                        className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-dark font-bold text-sm hover:shadow-lg hover:shadow-brand-orange/25 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        {t("cta")}
                        <ArrowRight size={16} strokeWidth={2.5} />
                    </button>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-slate-200/50 dark:border-white/5 bg-white/95 dark:bg-dark/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2 flex flex-col">
                            <a
                                href={`/${currentLocale}`}
                                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${!isWebRoute
                                    ? "bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20 dark:text-brand-pink"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-white/5"
                                    }`}
                            >
                                {nav("software")}
                            </a>
                            <a
                                href={`/${currentLocale}/desarrollo-web`}
                                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isWebRoute
                                    ? "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-white/5"
                                    }`}
                            >
                                {nav("web")}
                            </a>

                            {/* CTA for Mobile */}
                            <button
                                onClick={handleCTA}
                                className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-orange text-dark font-bold text-sm hover:shadow-lg hover:shadow-brand-orange/25 active:scale-95 transition-all duration-200 sm:hidden"
                            >
                                {t("cta")}
                                <ArrowRight size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
