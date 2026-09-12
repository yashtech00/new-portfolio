"use client";

const STICKY_TOP_BASE = 96;
const CARD_STACK_OFFSET = 80;

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
    <div className="px-6 pb-10">
      <section className="text-white">
        <div
          className="relative"
          style={{ height: `${services.length * 100}vh` }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="sticky w-full"
              style={{
                top: STICKY_TOP_BASE + index * CARD_STACK_OFFSET,
                zIndex: 10 + index,
              }}
            >
              <div className="min-h-[calc(100dvh-96px)] bg-black border-t border-neutral-800 shadow-[0_-12px_40px_rgba(0,0,0,0.9)]">
                <div
                  className="flex items-center justify-between gap-6 px-6 md:px-12 border-b border-neutral-800/60"
                  style={{ height: CARD_STACK_OFFSET }}
                >
                  <span className="text-orange-500 font-bold text-2xl md:text-3xl shrink-0">
                    ({service.id})
                  </span>
                  <h3 className="min-w-0 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight line-clamp-2 text-right md:text-left">
                    {service.title}
                  </h3>
                </div>

                <div className="flex justify-end px-6 md:px-12 py-10 md:py-14">
                  <div className="flex flex-col gap-8 md:w-2/4 w-full">
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-xl">
                      {service.description}
                    </p>

                    <div className="space-y-0">
                      {service.skills.map((skill, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-4 py-4">
                            <p className="text-xs text-neutral-500 shrink-0">
                              0{i + 1}
                            </p>
                            <p className="text-lg md:text-xl font-bold">
                              {skill}
                            </p>
                          </div>
                          <div className="h-px bg-neutral-800" />
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
