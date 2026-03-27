"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlowCard } from "./ui/spotlight-card";

const timelineData = [
  {
    date: "2026",
    title: "Analyst - Full Stack Developer",
    company: "KPMG India Advisory Services",
    description: [
      "Architecting enterprise-grade digital solutions utilizing the MERN stack to drive digital transformation for global clients.",
      "Designing resilient, distributed system architectures focused on high availability and seamless scalability.",
      "Optimizing full-stack performance through advanced backend refactoring and frontend rendering efficiency.",
      "Ensuring rigorous delivery of production-ready systems that align with stringent industry compliance and reliability standards.",
    ],
    location: "Gurgaon, Haryana, India",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXUZtP38YGUs-QFwavW8X8myS0voS8vtVEQ&s",
  },
  {
    date: "2025",
    title: "Full Stack Developer",
    company: "Independent Consultant / Project Lead",
    description: [
      "Engineered AI-integrated platforms, leveraging automated workflows to enhance operational efficiency and user engagement.",
      "Implemented modular microservices architectures to ensure system flexibility and maintainability.",
      "Streamlined deployment lifecycles by containerizing complex environments using Docker, reducing environment-related overhead.",
    ],
    location: "Remote / India",
    image: "/oneaim.jpeg",
  },
  {
    date: "2024",
    title: "Software Developer Intern",
    company: "LeopardRuns Innovation & Technology",
    description: [
      "Collaborated on the development of full-stack integrations, bridging React frontends with robust Node.js API services.",
      "Modernized legacy CRUD systems and executed performance tuning to improve application responsiveness.",
      "Contributed to agile development cycles, delivering functional prototypes for high-impact client requirements.",
    ],
    location: "Bhopal, India",
    image: "/leopard.jpeg",
  },
];

export default function ScrollTimeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="bg-black text-white py-32 px-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className=" mb-24 relative z-10">
        <h2 className="text-5xl font-bold mb-4 tracking-tight">My Journey</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          From learning fundamentals to delivering enterprise solutions — a
          journey of growth and impact.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-6xl mx-auto">
        {/* Static Line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-neutral-800 -translate-x-1/2" />

        {/* Animated Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-white via-purple-400 to-transparent -translate-x-1/2"
        />

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 mb-24"
            >
              {/* LEFT SIDE */}
              <div className="flex justify-end">
                {isLeft ? (
                  <TimelineCard item={item} direction="left" />
                ) : (
                  <span className="text-2xl text-neutral-400 text-right pr-4">
                    {item.date}
                  </span>
                )}
              </div>

              {/* CENTER DOT */}
              <div className="flex items-center justify-center z-10">
                <motion.div
                  whileInView={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.6 }}
                  className="w-5 h-5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] flex-shrink-0"
                />
              </div>

              {/* RIGHT SIDE */}
              <div className="flex justify-start">
                {!isLeft ? (
                  <TimelineCard item={item} direction="right" />
                ) : (
                  <span className="text-2xl text-neutral-400 pl-4">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function TimelineCard({
  item,
  direction,
}: {
  item: any;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -80 : 80, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full max-w-3xl"
    >
      <GlowCard customSize className="w-full rounded-2xl p-0">
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative group   rounded-2xl p-2 shadow-2xl overflow-hidden"
        >
          {/* EXTRA GLOW LAYER */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-2xl pointer-events-none" />

          {/* CONTENT */}
          <h3 className="text-xl font-semibold mb-1 text-white leading-snug">
            {item.title}
          </h3>

          <p className="text-purple-400 text-sm mb-1 font-medium">
            {item.company}
          </p>

          <p className="text-neutral-500 text-xs mb-4">📍 {item.location}</p>

          {/* DESCRIPTION */}
          <ul className="text-sm text-neutral-300 space-y-1.5 mb-4">
            {item.description.map((d: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                • {d}
              </motion.li>
            ))}
          </ul>

          {/* IMAGE */}
          {item.image && (
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.image}
                className="w-full h-80 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
        </motion.div>
      </GlowCard>
    </motion.div>
  );
}