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
import { TechStack } from "@/components/tech-stack";
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
              texts={["Engineering", "Systems", "AI Workflows", "Full-Stack Builder"]}
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
                title="WHAT I BUILD /"
                label="ENGINEERING DISCIPLINES"
                description="Full-stack web applications, scalable backend systems, AI workflows, and cloud deployments engineered for production."
              >
                <WhatIDo />
              </StackSection>

              <StackSection
                id="projects"
                zIndex={30}
                title="SELECTED BUILDS /"
                label="SYSTEMS & APPLICATIONS"
                description="Production applications, experiments, and systems I've built across full-stack development and AI."
              >
                <Projects />
              </StackSection>

              <StackSection
                id="stack"
                zIndex={35}
                title="CORE STACK /"
                label="ENGINEERING ARSENAL"
                description="Explicit technologies and tools I engineer with across frontend, backend, databases, AI systems, and cloud infrastructure."
              >
                <TechStack />
              </StackSection>

              <StackSection
                id="about"
                zIndex={40}
                title="ABOUT ME /"
                label="ENGINEER IDENTITY"
                description="Full-stack engineer focused on building production software across the frontend, backend, AI and cloud infrastructure."
              >
                <AboutSection />
              </StackSection>

              <StackSection
                id="timeline"
                zIndex={50}
                title="MY JOURNEY /"
                label="ENGINEERING PROGRESSION"
                description="From computer science fundamentals to production software systems — a timeline of continuous building."
              >
                <ScrollTimeline />
              </StackSection>

              <StackSection
                id="contact"
                zIndex={60}
                title="LET'S BUILD /"
                label="GET IN TOUCH"
                description="Have an interesting engineering problem, product idea, or collaboration in mind?"
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
