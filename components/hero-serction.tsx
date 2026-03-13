"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Highlighter } from "./ui/highlighter";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-between px-10 py-20 text-white overflow-hidden">

      {/* Animated Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full bottom-[-200px] right-[-200px] animate-pulse" />
      </div>

      {/* Vertical Email */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link
          href="mailto:yashgtech00@gmail.com"
          className="text-lg font-semibold tracking-widest [writing-mode:vertical-rl] rotate-180 opacity-70 hover:opacity-100 transition"
        >
          yashgtech00@gmail.com
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="w-1/2">

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg mb-6"
        >
          Hi! <span className="text-orange-400 font-semibold">Yash</span> here,
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl"
        >
          FULL-STACK DEVELOPER BUILDING IN{" "}
          <Highlighter action="underline" color="#FF9800">
            WEB2
          </Highlighter>{" "}
          &{" "}
          <Highlighter action="underline" color="#FF9800">
            WEB3
          </Highlighter>
        </motion.h1>

        {/* Tech Stack */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.6,
              },
            },
          }}
          className="flex flex-wrap gap-4 mt-10"
        >
          {["Next.js", "MongoDB", "Tailwind CSS", "Solidity"].map((tech) => (
            <motion.span
              key={tech}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.1 }}
              className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-orange-500/20 transition cursor-pointer"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-gray-300 text-lg leading-relaxed max-w-xl"
        >
          Full Stack Developer and Analyst at KPMG Advisory Services,
          specializing in scalable AI-powered digital solutions. I architect
          end-to-end MERN applications with a strong focus on performance,
          security, and cloud-native deployments.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex gap-6 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 transition font-semibold shadow-lg shadow-orange-600/40"
          >
            PROOF OF WORK
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl border border-orange-500 hover:bg-orange-500/10 transition font-semibold"
          >
            CHECK RESUME
          </motion.button>
        </motion.div>
      </div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6"
      >
        {[ 
          { icon: Linkedin, link: "https://www.linkedin.com" },
          { icon: Github, link: "https://github.com" },
          { icon: Twitter, link: "https://twitter.com" },
        ].map(({ icon: Icon, link }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <Link href={link} target="_blank">
              <Icon className="w-6 h-6 text-white hover:text-orange-400 transition" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};