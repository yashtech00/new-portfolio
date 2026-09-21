"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with COMPANY.",
    by: "Code. Build. Scale.",
    imgSrc: "/about-2.jpeg",
  },
  {
    tempId: 2,
    testimonial: "Turning ideas into reality.",
    by: "Turning ideas into reality.",
    imgSrc: "/about-3.jpeg",
  },
  {
    tempId: 3,
    testimonial: "Obsessed with clean architecture.",
    by: "Obsessed with clean architecture.",
    imgSrc: "/about-4.jpeg",
  },
  {
    tempId: 4,
    testimonial: "Shipping impactful products.",
    by: "Shipping impactful products.",
    imgSrc: "/about-5.jpeg",
  },
  {
    tempId: 5,
    testimonial: "Focused on growth.",
    by: "Focused on growth.",
    imgSrc: "/about-6.jpeg",
  },
  {
    tempId: 6,
    testimonial: "Late nights, big goals.",
    by: "Late nights, big goals.",
    imgSrc: "/about-7.jpeg",
  },
  {
    tempId: 7,
    testimonial: "Engineering simplicity.",
    by: "Engineering simplicity.",
    imgSrc: "/about-11.jpeg",
  },
  {
    tempId: 8,
    testimonial: "Consistency over hype.",
    by: "Consistency over hype.",
    imgSrc: "/about-9.jpeg",
  },
  {
    tempId: 9,
    testimonial: "Scaling ideas into systems.",
    by: "Scaling ideas into systems.",
    imgSrc: "/about-15.jpeg",
  },
  {
    tempId: 10,
    testimonial: "Design. Develop. Deliver.",
    by: "Design. Develop. Deliver.",
    imgSrc: "/about-8.jpeg",
  },
  {
    tempId: 11,
    testimonial: "Always building.",
    by: "Always building.",
    imgSrc: "/about-10.jpeg",
  },
  {
    tempId: 12,
    testimonial: "Driven by curiosity.",
    by: "Driven by curiosity.",
    imgSrc: "/about-13.jpeg",
  },
  {
    tempId: 13,
    testimonial: "From logic to product.",
    by: "From logic to product.",
    imgSrc: "/about-14.jpeg",
  },
  {
    tempId: 14,
    testimonial: "Minimal. Functional. Powerful.",
    by: "Minimal. Functional. Powerful.",
    imgSrc: "/about-12.jpeg",
  },
  {
    tempId: 15,
    testimonial: "Execution > Ideas.",
    by: "Execution > Ideas.",
    imgSrc: "/about-16.jpeg",
  },
  {
    tempId: 16,
    testimonial: "Thinking in systems.",
    by: "Thinking in systems.",
    imgSrc: "/about-17.jpeg",
  },
  {
    tempId: 17,
    testimonial: "Crafting digital products.",
    by: "Crafting digital products.",
    imgSrc: "/about-18.jpeg",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer overflow-hidden border-2 transition-all duration-500 ease-in-out rounded-2xl",
        isCenter
          ? "z-10 border-[var(--teal)] shadow-[0_12px_32px_rgba(14,143,139,0.18)]"
          : "z-0 border-[var(--glass-border)] opacity-60 hover:opacity-100 hover:border-[var(--teal)]/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      {/* Full Image Background */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom Editorial Strip */}
      <div className="absolute bottom-0 left-0 w-full bg-[var(--surface-container-lowest)]/95 backdrop-blur-sm border-t border-[var(--glass-border)] px-4 py-2.5">
        <p className="text-[var(--ink)] text-xs font-semibold tracking-wide truncate font-mono">
          {testimonial.by}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 560 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--ink)] hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)] transition-all shadow-xs"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--ink)] hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)] transition-all shadow-xs"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};