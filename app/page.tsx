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
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full overflow-x-hidden bg-black">
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
          <>
            {/* HERO SECTION WITH BACKGROUND */}
            <section className="relative z-10 min-h-screen">
              <Navbar />
              <HeroSection />
            </section>
            <section className="relative bg-black">
              <AboutSection />
            </section>
            {/* TIMELINE SECTION */}
            <section className="relative bg-black">
              <ScrollTimeline />
            </section>
            <section>
              <Projects />
            </section>
            <section>
              <ConnectWithMe />
            </section>
            <section>
              <Footer />
            </section>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
