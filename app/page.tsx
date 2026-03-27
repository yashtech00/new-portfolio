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
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full  bg-black">
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
          <main className="relative">
            {/* HERO: Stays pinned at the very bottom */}
            <section className="sticky top-0 z-10 h-screen w-full overflow-hidden">
              <Navbar />
              <HeroSection />
            </section>

            {/* WHAT I DO: Slides over Hero, then its own cards stack inside */}
            <section className="relative z-20 bg-black shadow-[0_-20px_50px_rgba(0,0,0,1)]">
              <WhatIDo />
            </section>

            {/* ABOUT: Slides over the completed WhatIDo stack */}
            <section className="relative z-30 min-h-screen w-full bg-black shadow-[0_-20px_50px_rgba(0,0,0,1)]">
              <Projects />
              
            </section>

            {/* JOURNEY/TIMELINE: Slides over About */}
            <section className="relative z-40 min-h-screen w-full bg-black shadow-[0_-20px_50px_rgba(0,0,0,1)]">
              <AboutSection />
            </section>

            {/* FINAL SECTIONS: Move together */}
            <div className="relative z-50 bg-black">
              <ScrollTimeline />
              
              <ConnectWithMe />
              <Footer />
            </div>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
