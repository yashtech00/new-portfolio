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
      className="relative h-[calc(100dvh-68px)] overflow-hidden px-8 md:px-14 text-white"
    >
      {/* Background */}
     

      {/* Fade Gradient Overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

      {/* Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[150px] rounded-full top-[-150px] left-[-100px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* ── MAIN GRID — vertically centered ── */}
      <div className="relative z-20 grid h-full grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-8">

        {/* Left — name + bio */}
        <div className="flex flex-col gap-8 lg:gap-10 order-2 lg:order-1 lg:pr-6">

          {/* Name — pushed down via grid center, not stuck to top */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${bebas.className} text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] leading-[0.88] tracking-tight text-white select-none`}
          >
            YASH GUPTA
          </motion.h1>

          {/* Bio + CTA — sits right below name, not at bottom */}
          <div className="flex flex-col gap-7 max-w-[520px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[#9ca3af] text-lg md:text-xl leading-[1.65]"
            >
              I build fast, scalable enterprise applications
              using the MERN stack — currently an Analyst at{" "}
              <span className="text-white font-medium">KPMG India</span>,
              available for freelance projects worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <Link
                href="mailto:yashgtech00@gmail.com"
                className="inline-flex items-center gap-2.5 bg-[#363636] text-white text-sm font-bold tracking-widest px-8 py-4 rounded-full hover:bg-orange-500 transition-all duration-300 group"
              >
                CONTACT
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
              <div className="mt-5 flex flex-wrap gap-4">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="inline-flex items-center justify-center bg-[#363636] text-white w-12 h-12 rounded-full hover:bg-orange-500 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right — photo centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[340px] md:max-w-[500px] mx-auto">
            {/* Decorations — behind person (lower z-index) */}
            <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
              <svg
                className="absolute left-0 md:left-14 top-[12%] w-32 h-40 md:w-36 md:h-44 text-purple-500/55"
                viewBox="0 0 120 150"
                fill="none"
              >
                <path d="M8 120 V30 H78" stroke="currentColor" strokeWidth="2" />
                <path d="M28 140 V50 H98 V140" stroke="currentColor" strokeWidth="2" />
                <path d="M48 100 V70 H88" stroke="currentColor" strokeWidth="2" />
              </svg>

              <div className="absolute right-6 md:right-24 top-[34%] grid grid-cols-3 gap-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                ))}
              </div>
            </div>

            {/* Person — in front of decorations */}
            <div className="relative z-[2] overflow-hidden h-[360px] md:h-[400px]">
              <img
                src="/yash-nobg.png"
                alt="Yash Gupta"
                className="relative z-[2] w-full h-[155%] object-cover object-top"
                style={{
                  maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-[3]" />
            </div>

            {/* Status bar — on top */}
            <div className="relative z-[4] -mt-1 border border-white/25 bg-black/90 px-4 py-3 flex items-center gap-3">
              <span className="shrink-0 w-3 h-3 bg-orange-500" />
              <p className="text-sm text-neutral-300 font-mono">
                Currently working on{" "}
                <span className="text-white font-semibold">Portfolio</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black z-30" />
    </motion.section>
  );
};
