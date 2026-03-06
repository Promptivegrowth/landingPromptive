"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MetaPixelCAPI() {
    const pathname = usePathname();
    const hasFired = useRef<string | null>(null);

    useEffect(() => {
        // Prevent duplicate firing on same pathname (React strict mode issues)
        if (hasFired.current === pathname) return;
        hasFired.current = pathname;

        const fireViewContent = async () => {
            try {
                const genUUID = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
                const eventId = genUUID();

                const fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1] || "";
                const fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1] || "";

                let externalId = localStorage.getItem("promptive_ext_id");
                if (!externalId) {
                    externalId = genUUID();
                    localStorage.setItem("promptive_ext_id", externalId);
                }

                // Fire Browser Web Event
                if (typeof window !== "undefined" && typeof window.fbq === "function") {
                    window.fbq("track", "ViewContent", {}, { eventID: eventId });
                }

                // Fire Server Conversions API Event
                await fetch("/api/meta-capi", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        event_name: "ViewContent",
                        event_source_url: window.location.href,
                        fbp,
                        fbc,
                        external_id: externalId,
                        event_id: eventId
                    })
                });

            } catch (error) {
                console.error("Meta CAPI ViewContent Error:", error);
            }
        };

        // Delay slightly to ensure _fbp cookie from base pixel script is created before sending
        setTimeout(fireViewContent, 1200);
    }, [pathname]);

    return null;
}
