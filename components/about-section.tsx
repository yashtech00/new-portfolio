"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col text-[var(--on-surface)]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pb-14">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col text-left max-w-2xl">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--on-surface-variant)] text-base md:text-lg leading-relaxed mb-6"
          >
            <span className="text-[var(--ink)] font-semibold">
              Full-Stack Developer &amp; Analyst
            </span>{" "}
            focused on engineering scalable, high-performance, and AI-driven
            solutions. I hold a B.Tech in Information Technology and specialize
            in developing systems that solve real-world business problems with
            clean architecture, efficiency, and engineering precision.
          </motion.div>

          {/* Experience */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--on-surface-variant)] text-base md:text-lg leading-relaxed mb-6"
          >
            I have hands-on experience designing and developing
            AI-integrated platforms, building microservices-based
            architectures, and deploying containerized systems using Docker.
            My work spans across the full stack, leveraging technologies such as
            React.js, Next.js, Node.js, TypeScript, PostgreSQL, and modern
            backend frameworks to deliver reliable, production-ready
            applications.
          </motion.p>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--on-surface-variant)] text-base md:text-lg leading-relaxed mb-6"
          >
            <p className="text-[var(--ink)] font-semibold mb-1">
              My engineering philosophy:
            </p>
            <p>
              I focus on building solutions that create measurable business impact
              — not just feature count. I translate complex requirements into clean,
              scalable, and maintainable systems with a strong emphasis on system design,
              performance optimization, and thoughtful user interaction.
            </p>
          </motion.div>

          {/* Core Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 p-6 rounded-2xl bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] shadow-xs"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h4 className="text-sm uppercase tracking-wider font-mono font-bold text-[var(--teal-strong)] mb-4">
              Core Capabilities
            </h4>

            <ul className="text-[var(--on-surface-variant)] space-y-2.5 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                Full-Stack Architecture (MERN / Next.js / TypeScript)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                API Design &amp; Scalable Backend Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                Microservices &amp; Containerization (Docker)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                AI-Driven Application &amp; LLM Workflow Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                Database Design &amp; Query Optimization
              </li>
            </ul>
          </motion.div>

          {/* Closing */}
          <div className="text-[var(--on-surface-variant)] text-base">
            <p>
              Open to collaborating on high-impact projects, product architecture,
              and engineering leadership.
            </p>
            <Link
              href="https://www.linkedin.com/in/yash00tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--teal)] text-white font-medium px-6 py-3 my-4 rounded-full hover:bg-[var(--teal-strong)] transition-all shadow-sm"
            >
              Let&apos;s connect on LinkedIn
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (Visual Carousel) */}
        <div className="flex w-full lg:w-[45%] justify-center items-center">
          <StaggerTestimonials />
        </div>
      </div>

      {/* STATS & GITHUB CALENDAR */}
      <div className="flex flex-col items-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full"
        >
          <div
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-[var(--teal)] transition-colors shadow-xs"
            style={{ backgroundColor: "#ffffff" }}
          >
            <p className="display-font text-4xl font-bold text-[var(--ink)]">
              {stats ? `${stats.repos}+` : "25+"}
            </p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-wider mt-1">
              Repositories
            </p>
          </div>

          <div
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-[var(--teal)] transition-colors shadow-xs"
            style={{ backgroundColor: "#ffffff" }}
          >
            <p className="display-font text-4xl font-bold text-[var(--ink)]">
              {stats ? `${stats.followers}+` : "50+"}
            </p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-wider mt-1">
              Followers
            </p>
          </div>

          <div
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-[var(--teal)] transition-colors shadow-xs"
            style={{ backgroundColor: "#ffffff" }}
          >
            <p className="display-font text-4xl font-bold text-[var(--ink)]">3+</p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-wider mt-1">
              Years Engineering
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 md:p-8 w-full shadow-xs overflow-x-auto"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h3 className="text-base font-semibold text-[var(--ink)] mb-6 text-center font-mono">
            GitHub Contribution Activity
          </h3>

          <div className="flex justify-center overflow-x-auto">
            <GitHubCalendar
              username="yashtech00"
              blockSize={13}
              blockMargin={4}
              fontSize={13}
              colorScheme="light"
              theme={{
                light: ["#ebe8e2", "#8cf4ee", "#20b2aa", "#0e8f8b", "#006a67"],
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}