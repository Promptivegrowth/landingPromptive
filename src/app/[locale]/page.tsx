import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CTAShowcase from "@/components/CTAShowcase";
import Footer from "@/components/Footer";

// Lazy loaded below-the-fold components
const ProblemSolution = dynamic(() => import("@/components/ProblemSolution"));
const Industries = dynamic(() => import("@/components/Industries"));
const Modules = dynamic(() => import("@/components/Modules"));
const Services = dynamic(() => import("@/components/Services"));
const Process = dynamic(() => import("@/components/Process"));
const CEOBio = dynamic(() => import("@/components/CEOBio"));
const TechLogos = dynamic(() => import("@/components/TechLogos"));
const Results = dynamic(() => import("@/components/Results"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"));

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Marquee />
                <CTAShowcase />
                <ProblemSolution />
                <Industries />
                <Results />
                <CEOBio />
                <Modules />
                <Services />
                <Process />
                <FAQ />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
