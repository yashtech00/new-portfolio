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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full bg-black">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center min-h-screen bg-black"
          >
            <GooeyText
              texts={["Design", "Engineering", "AI", "Web3"]}
              morphTime={1}
              cooldownTime={0.25}
              className="font-bold text-5xl md:text-7xl bg-black"
            />
          </motion.div>
        ) : (
          <main className="relative bg-black">
            {/* HERO: pinned behind everything */}
            <section className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-black">
              <Navbar />
              <HeroSection />
            </section>

            <StackSection
              id="services"
              zIndex={20}
              title="WHAT I DO /"
              label="(SERVICES)"
              description="I specialize in building fast, reliable, and user-friendly full-stack web applications. I help small businesses and startups turn ideas into high-quality websites and products that actually work and scale."
            >
              <WhatIDo />
            </StackSection>

            <StackSection
              id="projects"
              zIndex={30}
              title="SELECTED WORKS /"
              label="(PROJECTS)"
              description="Those late-night builds — real products shipped with clean architecture, thoughtful UX, and production-ready code."
            >
              <Projects />
            </StackSection>

            <StackSection
              id="about"
              zIndex={40}
              title="ABOUT ME /"
              label="(INTRO)"
              description="Full-Stack Developer & Analyst focused on building scalable, high-performance, and AI-driven solutions that solve real-world business problems."
            >
              <AboutSection />
            </StackSection>

            <StackSection
              id="timeline"
              zIndex={50}
              title="MY JOURNEY /"
              label="(EXPERIENCE)"
              description="From learning fundamentals to delivering enterprise solutions — a journey of growth, impact, and continuous building."
            >
              <ScrollTimeline />
            </StackSection>

            <StackSection
              id="contact"
              zIndex={60}
              title="LET'S CONNECT /"
              label="(CONTACT)"
              description="Whether it's a project, idea, or collaboration — I'm always open to meaningful conversations and building something amazing together."
            >
              <ConnectWithMe />
              <Footer />
            </StackSection>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
