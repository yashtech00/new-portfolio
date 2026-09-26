"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero-serction";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Projects } from "@/components/projects";
import Footer from "@/components/footer";
import { ConnectWithMe } from "@/components/connect-with-me";
import ScrollTimeline from "@/components/timeline-feature";
import AboutSection from "@/components/about-section";
import { WhatIDo } from "@/components/what-i-do";
import { StackSection } from "@/components/stack-section";
import { HalftoneFlow } from "@/components/ui/halftone-flow";

import { useTheme } from "next-themes";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[var(--surface)] text-[var(--on-surface)] min-h-screen transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-6 bg-[var(--surface)]"
          >
            <span className="label-eyebrow mb-6 text-xs tracking-widest text-[var(--teal)] font-mono">
              YASH GUPTA · PORTFOLIO
            </span>
            <GooeyText
              texts={["Engineering", "Architecture", "Performance", "Full-Stack developer"]}
              morphTime={0.9}
              cooldownTime={0.25}
              className="font-semibold text-5xl md:text-7xl text-[var(--ink)]"
              textClassName="text-[var(--ink)]"
            />
          </motion.div>
        ) : (
          <div className="relative w-full">
            {/* Subtle Halftone Flow WebGL Background Layer */}
            <div
              className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
              aria-hidden="true"
            >
              <HalftoneFlow
                className="w-full h-full"
                opacity={0.9}
                mode={mounted && resolvedTheme === "dark" ? "dark" : "light"}
              />
            </div>

            <main className="relative z-10 bg-transparent">
              {/* HERO */}
              <section id="hero" className="relative min-h-screen w-full bg-transparent">
                <Navbar />
                <HeroSection />
              </section>

              <StackSection
                id="services"
                zIndex={20}
                title="WHAT I DO /"
                label="CAPABILITIES & SERVICES"
                description="Scalable systems · clean architecture · modern web applications engineered for production."
              >
                <WhatIDo />
              </StackSection>

              <StackSection
                id="projects"
                zIndex={30}
                title="SELECTED WORKS /"
                label="FEATURED PROJECTS"
                description="Production platforms and experimental tools shipped with clean architecture, thoughtful UX, and reliable code."
              >
                <Projects />
              </StackSection>

              <StackSection
                id="about"
                zIndex={40}
                title="ABOUT ME /"
                label="BACKGROUND & METRICS"
                description="Full-Stack Developer & Analyst focused on building scalable, high-performance, and AI-driven solutions."
              >
                <AboutSection />
              </StackSection>

              <StackSection
                id="timeline"
                zIndex={50}
                title="MY JOURNEY /"
                label="EXPERIENCE & EDUCATION"
                description="From computer science fundamentals to enterprise digital transformation — a timeline of continuous engineering."
              >
                <ScrollTimeline />
              </StackSection>

              <StackSection
                id="contact"
                zIndex={60}
                title="LET'S CONNECT /"
                label="GET IN TOUCH"
                description="Open for architectural consulting, engineering collaborations, and impactful digital products."
              >
                <ConnectWithMe />
              </StackSection>

              <Footer />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
