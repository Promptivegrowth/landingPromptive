"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function WhatsAppBridge() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);
    const message = searchParams.get("text") || "Hola Promptive, quisiera agendar una demo gratuita y contarles mi idea";
    const leadType = searchParams.get("type") || "general";
    const leadPlan = searchParams.get("plan") || "none";

    useEffect(() => {
        setMounted(true);
    }, []);

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
                // 3. Redirect to WhatsApp regardless of tracking success
                setTimeout(() => {
                    window.location.href = `https://wa.me/51916854842?text=${encodeURIComponent(message)}`;
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
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Redirigiendo a WhatsApp...</h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Preparando tu conexión directa. Por favor espera un momento.</p>
                </div>
            </div>
        </div>
    );
}
