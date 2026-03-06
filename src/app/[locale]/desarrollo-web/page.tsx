import dynamic from "next/dynamic";
import Header from "@/components/Header";
import WebHero from "@/components/web/WebHero";
import WebMarquee from "@/components/web/WebMarquee";
import Footer from "@/components/Footer";

// Lazy loaded below-the-fold components
const WebPortfolio = dynamic(() => import("@/components/web/WebPortfolio"));
const WebResults = dynamic(() => import("@/components/web/WebResults"));
const WebPricing = dynamic(() => import("@/components/web/WebPricing"));
const CEOBio = dynamic(() => import("@/components/CEOBio"));
const Services = dynamic(() => import("@/components/Services"));
const WebFAQ = dynamic(() => import("@/components/web/WebFAQ"));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"));

export default function WebDevPage() {
    return (
        <>
            <Header />
            <main>
                <WebHero />
                <WebMarquee />
                <WebPortfolio />
                <WebResults />
                <WebPricing />
                <Services />
                <CEOBio />
                <WebFAQ />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
