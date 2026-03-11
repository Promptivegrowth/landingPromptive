"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function WhatsAppBridge() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);
    const [showFallback, setShowFallback] = useState(false);
    const [fallbackUrl, setFallbackUrl] = useState("");
    const message = searchParams.get("text") || "Hola Promptive, quisiera agendar una demo gratuita y contarles mi idea";
    const leadType = searchParams.get("type") || "general";
    const leadPlan = searchParams.get("plan") || "none";
    const phone = "51916854842";

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setShowFallback(true), 2500);

        // Pre-compute the best URL for the platform
        const text = encodeURIComponent(message);
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isAndroid) {
            setFallbackUrl(`intent://send?phone=${phone}&text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;end`);
        } else if (isIOS) {
            setFallbackUrl(`whatsapp://send?phone=${phone}&text=${text}`);
        } else {
            setFallbackUrl(`https://wa.me/${phone}?text=${text}`);
        }

        return () => clearTimeout(timer);
    }, [message]);

    useEffect(() => {
        if (!mounted) return;

        const fireEventsAndRedirect = async () => {
            try {
                // Ensure crypto.randomUUID is available or fallback
                const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

                // Parse browser cookies
                const fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1] || "";
                const fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1] || "";

                // Handle external ID for continuous session tracking
                let externalId = localStorage.getItem("promptive_ext_id");
                if (!externalId) {
                    externalId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
                    localStorage.setItem("promptive_ext_id", externalId);
                }

                // 1. Fire Browser Event (Pixel)
                const eventPayload = {
                    content_category: leadType,
                    content_name: leadPlan !== "none" ? leadPlan : undefined
                };

                if (typeof window !== "undefined" && typeof window.fbq === "function") {
                    window.fbq("track", "Contact", eventPayload, { eventID: eventId });
                }

                // 2. Fire Server Event (CAPI)
                await fetch("/api/meta-capi", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        event_name: "Contact",
                        event_source_url: window.location.href,
                        fbp,
                        fbc,
                        external_id: externalId,
                        event_id: eventId,
                        custom_data: eventPayload
                    })
                });

            } catch (error) {
                console.error("Tracking Error:", error);
            } finally {
                // 3. Redirect to WhatsApp using advanced intent logic for IG/FB WebViews
                setTimeout(() => {
                    const text = encodeURIComponent(message);
                    const isAndroid = /Android/i.test(navigator.userAgent);
                    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

                    if (isAndroid) {
                        // Advanced Android Intent to bypass WebView blocks
                        window.location.href = `intent://send?phone=${phone}&text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
                    } else if (isIOS) {
                        // Native app scheme for iOS
                        window.location.href = `whatsapp://send?phone=${phone}&text=${text}`;

                        // Fallback to wa.me if the scheme fails
                        setTimeout(() => {
                            window.location.href = `https://wa.me/${phone}?text=${text}`;
                        }, 1500);
                    } else {
                        // Desktop relies on wa.me/web
                        window.location.href = `https://wa.me/${phone}?text=${text}`;
                    }
                }, 800);
            }
        };

        fireEventsAndRedirect();
    }, [message, mounted]);

    // UI Loading state while firing events
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark relative overflow-hidden">
            {/* Ambient Blobs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center space-y-6 relative z-10 p-8 rounded-3xl border border-slate-100 dark:border-white/5 bg-white/50 dark:bg-dark-light/50 backdrop-blur-xl shadow-2xl">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-brand-purple animate-spin mx-auto"></div>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Abriendo WhatsApp...</h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Te estamos conectando directamente.</p>
                </div>

                {/* Fallback button in case Instagram/Facebook WebView blocks the automatic redirect */}
                <div className={`pt-4 transition-opacity duration-500 ${showFallback ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <p className="text-xs text-slate-400 mb-3 block">¿No se abre automáticamente?</p>
                    <a
                        href={fallbackUrl || `https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5C] text-white font-bold rounded-full transition-colors shadow-lg shadow-green-500/20"
                    >
                        Haz clic aquí para continuar
                    </a>
                </div>
            </div>
        </div>
    );
}
