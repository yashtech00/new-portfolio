"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutSection() {

  const [stats, setStats] = useState<any>(null);

useEffect(() => {
  fetch("/api/github")
    .then((res) => res.json())
    .then((data) => setStats(data));
}, []);
  return (
    <section className="w-full flex flex-col text-center text-white">
      <div className="flex items-center justify-evenly p-6">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col text-left max-w-2xl">
          
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            About Me
          </motion.h2>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-neutral-400 mb-6"
          >
            🚀{" "}
            <span className="text-white font-semibold">
              Full-Stack Developer | Analyst
            </span>{" "}
            focused on building scalable, high-performance, and AI-driven
            solutions. I hold a B.Tech in Information Technology and specialize
            in developing systems that solve real-world business problems with
            efficiency and precision.
          </motion.p>

          {/* Experience */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-400 mb-6"
          >
            I have hands-on experience designing and developing
            AI-integrated applications, building microservices-based
            architectures, and deploying containerized systems using Docker.
            My work spans across the full stack, leveraging technologies such as
            React.js, Next.js, Node.js, TypeScript, PostgreSQL, and modern
            backend frameworks to deliver reliable, production-ready
            applications.
          </motion.p>

          {/* Approach */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 mb-6"
          >
            <span className="text-white font-semibold">
              My approach is simple:
            </span>
            <br />
            I focus on building solutions that create measurable business impact
            — not just features. I translate complex requirements into clean,
            scalable, and maintainable systems.
            <br />
            I’m particularly interested in system design, scalable architectures,
            product thinking, and performance optimization.
          </motion.p>

          {/* Core Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h4 className="text-lg font-semibold mb-3">💡 Core Strengths</h4>

            <ul className="text-neutral-400 space-y-2">
              <li>• Full-Stack Development (MERN / Next.js)</li>
              <li>• API Design & Backend Architecture</li>
              <li>• Microservices & Containerization (Docker)</li>
              <li>• AI-Driven Application Development</li>
              <li>• Database Design & Query Optimization</li>
            </ul>
          </motion.div>

          {/* Tech Stack */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              "JavaScript",
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "Express",
              "TypeScript",
              "AI Systems",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm bg-neutral-900 border border-neutral-800 rounded-lg hover:border-purple-500 transition"
              >
                {tech}
              </span>
            ))}
          </motion.div> */}

          {/* Closing */}
          <p className="text-neutral-400">
            I’m open to collaborating on impactful projects and discussing ideas
            around technology, product development, and scalable systems.
            <br />
            <Link
              href="https://www.linkedin.com/in/yash00tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black bg-white font-medium px-4 py-2 my-4 rounded-lg inline-block hover:bg-neutral-200 transition"
            >
              Let’s connect.
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE (Images Carousel) */}
        <div className="flex w-[40%] justify-center items-center">
          <StaggerTestimonials />
        </div>
      </div>

      {/* STATS */}
      {/* STATS */}
<div className="flex flex-col items-center">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-3 gap-6 mb-14"
  >
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
      <p className="text-2xl font-bold">
        {stats ? `${stats.repos}+` : "--"}
      </p>
      <p className="text-neutral-400 text-sm">Repositories</p>
    </div>

    <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
      <p className="text-2xl font-bold">
        {stats ? `${stats.followers}+` : "--"}
      </p>
      <p className="text-neutral-400 text-sm">Followers</p>
    </div>

    <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 hover:border-purple-500 transition">
      <p className="text-2xl font-bold">3+</p>
      <p className="text-neutral-400 text-sm">Years Coding</p>
    </div>
  </motion.div>
  <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-4xl"
>
  <h3 className="text-xl font-semibold mb-6 text-center">
    GitHub Contribution Activity
  </h3>

  <GitHubCalendar
    username="yashtech00"
    blockSize={14}
    blockMargin={5}
    fontSize={14}
  />
</motion.div>
</div>
    </section>
  );
}