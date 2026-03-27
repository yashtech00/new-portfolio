"use client";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Full-Stack Development",
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    skills: [
      "React, Node.js, Express.js",
      "REST APIs, Firebase, Docker",
      "Git, GitHub, Postman",
    ],
  },
  {
    id: "02",
    title: "UI/UX & Frontend",
    description:
      "Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.",
    skills: [
      "NextJs, TailwindCSS, GSAP",
      "Figma → Pixel-perfect code",
      "HTML, CSS, JavaScript",
    ],
  },
  {
    id: "03",
    title: "Optimization",
    description:
      "I focus on building systems that stay reliable as things scale. From handling data efficiently to designing clean architecture, I apply core computer science principles.",
    skills: [
      "Data Structures & Algorithms",
      "DBMS, OOP, OS Fundamentals",
      "Scalable systems & data pipelines",
    ],
  },
];

export const WhatIDo = () => {
  return (
    <div className="p-5">
      <div className=" mb-10 md:mb-0 ">
        <div className="sticky top-24">
          <span className="text-white/70 font-semibold text-[120px]">
            WHAT I DO /
          </span>
          {/* Main Wrapper: Full width, using flex to push content */}
<div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 px-6 md:px-12 py-20 border-t border-neutral-800">
  
  {/* Left Side: Label */}
  <div className="md:w-1/3">
    <h2 className="text-sm text-neutral-400 mt-2 tracking-widest uppercase">
      (SERVICES)
    </h2>
  </div>

  {/* Right Side: Description text */}
  <div className="md:w-2/3 lg:w-1/2">
    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
      I specialize in building fast, reliable, and user-friendly
      full-stack web applications. I help small businesses and startups
      turn ideas into high-quality websites and products that actually
      work and scale.
    </p>
  </div>
</div>
        </div>
      </div>
      <section className=" text-white px-6   ">
        {/* RIGHT SIDE: Stacking Cards */}

        <div
          className="relative"
          style={{ height: `${services.length * 100}vh` }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="sticky top-30 w-full"
              style={{
                zIndex: 50 + index * 10,
              }}
            >
              <div className="h-screen bg-black flex  border-b border-neutral-800 mt-4">
                <div className="flex justify-between px-6 w-full  ">
                  <span className="text-orange-500 font-bold text-3xl">
                    ({service.id})
                  </span>
                  <div className="flex flex-col gap-6 md:w-2/4 border-t border-neutral-800">
                    

                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter">
                      {service.title}
                    </h3>

                    <p className="text-neutral-400 text-lg max-w-xl">
                      {service.description}
                    </p>

                    <div className="mt-12">
                      {service.skills.map((skill, i) => (
                        <div key={i} className=" space-y-2">
                          <div className="flex items-center   gap-4">
                            <p className="text-xs text-neutral-500">0{i + 1}</p>
                            <p className="text-xl font-bold">{skill}</p>
                          </div>
                          <div className="h-px bg-neutral-800 mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
