import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Analyst — KPMG India (Full-time)
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
            Jan 2026 – Present · Gurugram, Haryana · On-site
          </p>

          <div className="mb-8 space-y-2">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Developing enterprise-grade full-stack solutions to support
              large-scale business operations.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Translating complex business requirements into scalable
              technical architectures.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Enhancing system performance and reliability through optimized
              backend services and efficient frontend rendering.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Driving quality through structured testing, clean code
              practices, and production-ready deployments.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Collaborating with stakeholders to deliver measurable business
              value through technology.
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Full Stack Developer — OneAim IT Solutions
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
            Aug 2025 – 2026 · New Delhi, India
          </p>

          <div className="mb-6 space-y-2">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Worked across 4 real-world projects delivering production-ready
              backend systems.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Built a Vendor Management System with authentication, admin
              controls, and workflow automation.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Developed backend for an AI Medical platform that processes
              doctor–patient conversations and generates summaries.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Implemented microservices architecture using Kafka, Docker, and
              PostgreSQL.
            </p>
          </div>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Project — CodePlus
          </p>

          <div className="space-y-2">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Built a SaaS platform for solving DSA problems with real-time
              code execution.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Integrated Judge0 API improving code submission accuracy by
              35%.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Added solution sharing and discussion features for collaborative
              learning.
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-4">
            Project — Tweetify (MERN Stack)
          </p>

          <div className="mb-6 space-y-2">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Built a full-stack social media platform with tweeting, liking,
              and user interactions.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Designed REST APIs using Node.js and Express.js.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Developed responsive UI with React.js and TailwindCSS.
            </p>
          </div>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Education
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm mb-4">
            B.Tech in Information Technology — Jabalpur Engineering College
            (CGPA: 7.35)
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Achievements
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm mb-4">
            • Solved 300+ DSA problems across LeetCode, GFG, and CodingNinjas.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-2">
            Certifications
          </p>
          <div className="space-y-1">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Full Stack Developer — 100xDev
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Java Programming Fundamentals Certification
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • SQL Specialization — YBI Foundation
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              • Advanced React.js — NamasteDev
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "2020",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-4">
            Started B.Tech in Information Technology
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Began my engineering journey at Jabalpur Engineering College,
            focusing on computer science fundamentals including Data
            Structures, Algorithms, Operating Systems, and Database Management.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}