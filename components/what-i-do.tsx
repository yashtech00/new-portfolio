"use client";

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
    <div className="flex flex-col gap-8 md:gap-10 text-[var(--on-surface)]">
      {services.map((service) => (
        <div
          key={service.id}
          className="w-full bg-[var(--surface-container-lowest)] rounded-3xl border border-[var(--glass-border)] shadow-[0_12px_40px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:border-[var(--teal)]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
        >
          <div
            className="flex items-center justify-between gap-6 px-6 md:px-12 py-6 border-b border-[var(--glass-border)] bg-[var(--surface-container-low)]"
          >
            <span className="text-[var(--teal)] font-mono font-bold text-xl md:text-2xl shrink-0">
              ({service.id})
            </span>
            <h3 className="display-font min-w-0 text-xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--ink)] text-right md:text-left">
              {service.title}
            </h3>
          </div>

          <div className="flex justify-end px-6 md:px-12 py-8 md:py-12 bg-[var(--surface-container-lowest)]">
            <div className="flex flex-col gap-8 md:w-2/4 w-full">
              <p className="text-[var(--on-surface-variant)] text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                {service.description}
              </p>

              <div className="space-y-0">
                {service.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 py-3.5">
                      <span className="text-xs text-[var(--teal)] font-mono font-semibold shrink-0">
                        0{i + 1}
                      </span>
                      <p className="text-base md:text-lg font-medium text-[var(--ink)]">
                        {skill}
                      </p>
                    </div>
                    <div className="h-px bg-[var(--glass-border)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
