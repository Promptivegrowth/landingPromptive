export const trackAndRedirectToWhatsApp = async (
    message: string,
    leadType: string = "general",
    leadPlan: string = "none"
) => {
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

        const eventPayload = {
            content_category: leadType,
            content_name: leadPlan !== "none" ? leadPlan : undefined
        };

        // 1. Fire Browser Event (Pixel) - Fire and forget
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
            window.fbq("track", "Contact", eventPayload, { eventID: eventId });
        }

        // 2. Fire Server Event (CAPI) - Non-blocking fetch
        fetch("/api/meta-capi", {
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
            }),
            keepalive: true // Ensures the request completes even if the page unloads
        }).catch(err => console.error("CAPI error:", err));

    } catch (error) {
        console.error("Tracking Error:", error);
    } finally {
        // 3. Immediately redirect to WhatsApp (avoiding WebView blockers)
        const phone = "51916854842";
        const text = encodeURIComponent(message);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isIOS) {
            window.location.href = `https://wa.me/${phone}?text=${text}`;
        } else if (isMobile) {
            // Safer generic fallback for Android WebViews (avoids intent crash)
            window.location.href = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
        } else {
            window.location.href = `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;
        }
    }
};
