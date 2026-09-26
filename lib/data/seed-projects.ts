import type { ProjectInput } from "@/lib/types/project";

export const seedProjects: ProjectInput[] = [
  {
    title: "🚀 CodePlus – Elevate Your Coding Skills!",
    description:
      "Platform to practice DSA with real-time code execution and analytics.",
    longDescription:
      "A full-stack coding platform with Judge0 integration, authentication, and real-time submissions. Designed to improve problem-solving skills with structured difficulty levels and analytics tracking.",
    images: [
      "https://media.licdn.com/dms/image/v2/D562DAQEn2kiOb_mgdg/profile-treasury-image-shrink_800_800/B56ZWtCt3XGUAY-/0/1742364926826?e=1774792800&v=beta&t=u5fgjokx3asqSVsmEkmwsCj1WvB9ZVSjwZQOzVbxheM",
      "https://media.licdn.com/dms/image/v2/D562DAQFsszVAwKU2zg/profile-treasury-image-shrink_800_800/B56ZWs_32XGUAk-/0/1742364180673?e=1774792800&v=beta&t=ZagFUVsmi7u9ahqhQgrfkCNlvXe4_ipuOC19kvq_4_o",
      "https://media.licdn.com/dms/image/v2/D562DAQHpfPAI-ATRwA/profile-treasury-image-shrink_800_800/B56ZWs_zIJHQAo-/0/1742364161608?e=1774792800&v=beta&t=aGlG_Mz7mezdZQ96oq-ByPps3pgBnfCppNd4T5gEBDY",
      "https://media.licdn.com/dms/image/v2/D562DAQG1paSeyUx-AQ/profile-treasury-image-shrink_800_800/B56ZWs_vUcGsAY-/0/1742364145912?e=1774792800&v=beta&t=aYUlgyxTixLFQeEY2sKlhBVAX8jC23W-37FfmASZNSo",
    ],
    github: "#",
    demo: "#",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "Judge0 API", "Tailwind"],
    featured: true,
    order: 0,
    featuredOrder: 1,
  },
  {
    title: "AI Workflow Builder",
    description: "Drag & drop AI automation pipelines.",
    longDescription:
      "A visual builder to create AI workflows using LangChain and APIs. Enables automation pipelines without coding.",
    images: ["/project2.png"],
    github: "#",
    demo: "#",
    tech: ["Next.js", "Langchain", "OpenAI"],
    featured: true,
    order: 1,
    featuredOrder: 2,
  },
  {
    title: "Realtime Analytics",
    description: "Live dashboards with streaming data.",
    longDescription:
      "Kafka + WebSocket based analytics system providing real-time insights with high throughput.",
    images: ["/project3.png"],
    github: "#",
    demo: "#",
    tech: ["Kafka", "Node.js", "React"],
    featured: true,
    order: 2,
    featuredOrder: 3,
  },
];
