"use client";

import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FlickeringGrid } from "./ui/flickering-grid";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/yashtech00", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/yashgtech00", label: "Twitter" },
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

  return (
    <motion.section
      style={{ scale }}
      className="relative min-h-screen flex flex-col px-8 md:px-14 pt-4 pb-2 text-white overflow-hidden"
    >
      {/* Background — untouched */}
      <div className="absolute inset-0 -z-10">
        <FlickeringGrid
          className="bg-black relative inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.7}
          flickerChance={0.1}
          height={2000}
          width={2000}
        />
      </div>

      {/* Fade Gradient Overlay — untouched */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

      {/* Glow — untouched */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[150px] rounded-full top-[-150px] left-[-100px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* ── FULL-WIDTH NAME ── */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`${bebas.className} relative text-[18vw] leading-[0.88] tracking-tight text-white w-full select-none`}
      >
        YASH GUPTA
      </motion.h1>

      {/* ── MIDDLE ROW: bio left · image center · (empty) right ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-end md:items-start gap-3 mt-6 flex-1">

        {/* Left — arrow + bio + CTA */}
        <div className="flex flex-col gap-6 md:w-[420px] shrink-0 mt-8">
          {/* diagonal arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <polyline points="17 7 17 17 7 17"></polyline>
            </svg>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#9ca3af] text-[17px] leading-[1.6]"
          >
            I build fast, scalable enterprise applications
            using the MERN stack — currently an Analyst at{" "}
            <span className="text-white font-medium">KPMG India</span>,
            available for freelance projects worldwide.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Link
              href="mailto:yashgtech00@gmail.com"
              className="inline-flex items-center gap-2 bg-[#363636] text-white text-[13px] font-bold tracking-widest px-7 py-3.5 rounded-full hover:bg-orange-500 transition-all duration-300 group"
            >
              CONTACT
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
            <div className="mt-4 flex flex-wrap gap-4 ">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="inline-flex items-center gap-2 bg-[#363636] text-white text-[13px] font-bold tracking-widest px-7 py-3.5 rounded-full hover:bg-orange-500 transition-all duration-300 group"
                >
                  <Icon size={16} />
                  
                </Link>
              ))} 
            </div>
          </motion.div>
        </div>

        {/* Center — image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative group">
            <img
              src="/yash.png"
              alt="Yash Gupta"
              className="w-[260px] md:w-[320px] lg:w-[360px] rounded-2xl object-cover shadow-2xl shadow-black/60  transition-all duration-700"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right — availability */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="md:w-[220px] shrink-0 flex flex-col items-end justify-end text-right self-end pb-28"
        >
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-1">
            Available for work
          </p>
          <p className={`${bebas.className} text-6xl md:text-7xl text-white leading-none`}>
            APR&apos;26
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-50" />
    </motion.section>
  );
};
