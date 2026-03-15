"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { StaggerTestimonials } from "./ui/stagger-testimonials";

export default function AboutSection() {
  return (
    <section className="w-full  flex flex-col  text-center text-white">
      <div className="flex  items-center justify-between p-6 ">
        {/* Heading */}
        <div className="flex flex-col  ">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-bold mb-6"
        >
          About Me
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-400 max-w-2xl mb-12"
        >
          I'm a passionate{" "}
          <span className="text-white font-semibold">Full Stack Developer</span>
          who enjoys building modern web applications and experimenting with new
          technologies. My focus is on creating scalable backend systems and
          interactive frontend experiences using the MERN stack, Next.js, and AI
          tools. I love solving real-world problems with clean code and modern
          design.
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            {[
              "JavaScript",
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "Express",
              "TypeScript",
              "AI Integrations",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm bg-neutral-900 border border-neutral-800 rounded-lg hover:border-purple-500 transition"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.p>
        </div>
        <div className="flex w-[40%]  justify-center items-center">
      <StaggerTestimonials />
    </div>
      
      </div>
      <div className="flex flex-col items-center">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mb-14"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
            <p className="text-2xl font-bold">100+</p>
            <p className="text-neutral-400 text-sm">Repositories</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-neutral-400 text-sm">Commits</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
            <p className="text-2xl font-bold">3+</p>
            <p className="text-neutral-400 text-sm">Years Coding</p>
          </div>
        </motion.div>

        {/* Github Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">
            GitHub Contribution Activity
          </h3>

          <GitHubCalendar
            username="yashtech00"
            blockSize={14}
            blockMargin={5}
            fontSize={16}
          />
        </motion.div>
      </div>
    </section>
  );
}
