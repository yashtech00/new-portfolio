"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShaderBackground from "@/components/ui/shader-background";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero-serction";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import GithubGraph from "@/components/github-graph";
import { TimelineDemo } from "@/components/timeline-feature";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden  text-white">

      {/* 🔥 Fixed Shader Background */}
      <div className="">
        <ShaderBackground />
      </div>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center min-h-screen"
          >
            <GooeyText
              texts={["Design", "Engineering", "AI", "Web3"]}
              morphTime={1}
              cooldownTime={0.25}
              className="font-bold text-5xl md:text-7xl"
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navbar />
            <HeroSection />
            <GithubGraph />
            {/* <TimelineDemo /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}