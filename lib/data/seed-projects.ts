import type { ProjectInput } from "@/lib/types/project";

export const seedProjects: ProjectInput[] = [
  {
    title: "CodePlus — Code Execution & Problem-Solving Platform",
    description:
      "Full-stack coding platform with multi-language sandboxed code execution, test runner, and submission analytics.",
    longDescription:
      "Full-stack application built with Next.js, Node.js, PostgreSQL, and Prisma. Integrates the Judge0 API for sandboxed code execution across multiple languages, featuring user authentication, submission tracking, test validation workflows, and structured problem difficulty levels.",
    images: [
      "https://media.licdn.com/dms/image/v2/D562DAQEn2kiOb_mgdg/profile-treasury-image-shrink_800_800/B56ZWtCt3XGUAY-/0/1742364926826?e=1774792800&v=beta&t=u5fgjokx3asqSVsmEkmwsCj1WvB9ZVSjwZQOzVbxheM",
      "https://media.licdn.com/dms/image/v2/D562DAQFsszVAwKU2zg/profile-treasury-image-shrink_800_800/B56ZWs_32XGUAk-/0/1742364180673?e=1774792800&v=beta&t=ZagFUVsmi7u9ahqhQgrfkCNlvXe4_ipuOC19kvq_4_o",
      "https://media.licdn.com/dms/image/v2/D562DAQHpfPAI-ATRwA/profile-treasury-image-shrink_800_800/B56ZWs_zIJHQAo-/0/1742364161608?e=1774792800&v=beta&t=aGlG_Mz7mezdZQ96oq-ByPps3pgBnfCppNd4T5gEBDY",
      "https://media.licdn.com/dms/image/v2/D562DAQG1paSeyUx-AQ/profile-treasury-image-shrink_800_800/B56ZWs_vUcGsAY-/0/1742364145912?e=1774792800&v=beta&t=aYUlgyxTixLFQeEY2sKlhBVAX8jC23W-37FfmASZNSo",
    ],
    github: "#",
    demo: "#",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "Judge0 API", "Tailwind CSS"],
    featured: true,
    order: 0,
    featuredOrder: 1,
  },
  {
    title: "AI Workflow Builder",
    description:
      "Node-based orchestration engine for composing LLM chains, retrieval pipelines, and automated tasks.",
    longDescription:
      "Interactive workflow builder built with Next.js, LangChain, and LLM APIs. Enables developers to visually assemble prompt sequences, vector retrieval chains, and automated multi-step AI execution pipelines with typed outputs.",
    images: ["/project2.png"],
    github: "#",
    demo: "#",
    tech: ["Next.js", "LangChain", "OpenAI API", "TypeScript"],
    featured: true,
    order: 1,
    featuredOrder: 2,
  },
  {
    title: "Real-time Telemetry & Streaming Analytics",
    description:
      "Event-driven telemetry ingestion engine and real-time dashboard powered by WebSockets.",
    longDescription:
      "High-throughput streaming analytics system engineered with Node.js, Kafka, WebSockets, and React. Delivers real-time data ingestion, asynchronous message processing, and live metric visualization with minimal latency.",
    images: ["/project3.png"],
    github: "#",
    demo: "#",
    tech: ["Node.js", "Kafka", "WebSockets", "React", "TypeScript"],
    featured: true,
    order: 2,
    featuredOrder: 3,
  },
];
