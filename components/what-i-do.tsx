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
    <div className="flex flex-col gap-8 md:gap-10 text-[#1c1c18]">
      {services.map((service) => (
        <div
          key={service.id}
          className="w-full bg-white rounded-3xl border border-[rgba(11,28,44,0.08)] shadow-[0_12px_40px_rgba(11,28,44,0.05)] overflow-hidden transition-all duration-300 hover:border-[#0e8f8b]/40 hover:shadow-[0_16px_40px_rgba(11,28,44,0.06)]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div
            className="flex items-center justify-between gap-6 px-6 md:px-12 py-6 border-b border-[rgba(11,28,44,0.08)] bg-[#f6f3ed]"
            style={{ backgroundColor: "#f6f3ed" }}
          >
            <span className="text-[#0e8f8b] font-mono font-bold text-xl md:text-2xl shrink-0">
              ({service.id})
            </span>
            <h3 className="display-font min-w-0 text-xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0b1c2c] text-right md:text-left">
              {service.title}
            </h3>
          </div>

          <div className="flex justify-end px-6 md:px-12 py-8 md:py-12 bg-white" style={{ backgroundColor: "#ffffff" }}>
            <div className="flex flex-col gap-8 md:w-2/4 w-full">
              <p className="text-[#44474c] text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                {service.description}
              </p>

              <div className="space-y-0">
                {service.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 py-3.5">
                      <span className="text-xs text-[#0e8f8b] font-mono font-semibold shrink-0">
                        0{i + 1}
                      </span>
                      <p className="text-base md:text-lg font-medium text-[#0b1c2c]">
                        {skill}
                      </p>
                    </div>
                    <div className="h-px bg-[rgba(11,28,44,0.08)]" />
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
