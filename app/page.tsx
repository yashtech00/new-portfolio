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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full bg-[#fcf9f3] text-[#1c1c18]"
      style={{ backgroundColor: "#fcf9f3", color: "#1c1c18" }}
    >
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-6"
            style={{ backgroundColor: "#fcf9f3" }}
          >
            <span className="label-eyebrow mb-6 text-xs tracking-widest text-[#0e8f8b]">
              YASH GUPTA · PORTFOLIO
            </span>
            <GooeyText
              texts={["Engineering", "Architecture", "Performance", "Full-Stack"]}
              morphTime={0.9}
              cooldownTime={0.25}
              className="font-semibold text-5xl md:text-7xl text-[#0b1c2c]"
            />
          </motion.div>
        ) : (
          <div className="relative w-full">
            {/* Subtle Halftone Flow WebGL Background Layer */}
            <div
              className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
              aria-hidden="true"
            >
              <HalftoneFlow className="w-full h-full" opacity={0.9} />
            </div>

            <main className="relative z-10 bg-transparent">
              {/* HERO */}
              <section className="relative min-h-screen w-full bg-transparent">
                <Navbar />
                <HeroSection />
              </section>

            <StackSection
              id="services"
              zIndex={20}
              title="WHAT I DO /"
              label="(CAPABILITIES & SERVICES)"
              description="I specialize in building fast, reliable, and user-friendly full-stack web applications. I help businesses and teams turn technical requirements into high-quality digital platforms that perform and scale."
            >
              <WhatIDo />
            </StackSection>

            <StackSection
              id="projects"
              zIndex={30}
              title="SELECTED WORKS /"
              label="(FEATURED PROJECTS)"
              description="Real products shipped with clean architecture, thoughtful UX, and production-ready code — from enterprise systems to experimental tools."
            >
              <Projects />
            </StackSection>

            <StackSection
              id="about"
              zIndex={40}
              title="ABOUT ME /"
              label="(BACKGROUND & METRICS)"
              description="Full-Stack Developer & Analyst focused on building scalable, high-performance, and AI-driven solutions that solve real-world business problems."
            >
              <AboutSection />
            </StackSection>

            <StackSection
              id="timeline"
              zIndex={50}
              title="MY JOURNEY /"
              label="(EXPERIENCE & EDUCATION)"
              description="From learning computer science fundamentals to delivering enterprise digital solutions — a timeline of growth, impact, and continuous engineering."
            >
              <ScrollTimeline />
            </StackSection>

            <StackSection
              id="contact"
              zIndex={60}
              title="LET'S CONNECT /"
              label="(GET IN TOUCH)"
              description="Whether it's a project, consulting inquiry, or technical collaboration — I'm always open to meaningful conversations and building something impactful together."
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
