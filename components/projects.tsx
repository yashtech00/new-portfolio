"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export const projectsData = [
  {
    id: 1,
    title: "🚀 CodePlus – Elevate Your Coding Skills!",
    description:
      "Platform to practice DSA with real-time code execution and analytics.",
    longDescription:
      "A full-stack coding platform with Judge0 integration, authentication, and real-time submissions. Designed to improve problem-solving skills with structured difficulty levels and analytics tracking.",
    image: [
      "https://media.licdn.com/dms/image/v2/D562DAQEn2kiOb_mgdg/profile-treasury-image-shrink_800_800/B56ZWtCt3XGUAY-/0/1742364926826?e=1774792800&v=beta&t=u5fgjokx3asqSVsmEkmwsCj1WvB9ZVSjwZQOzVbxheM",
      "https://media.licdn.com/dms/image/v2/D562DAQFsszVAwKU2zg/profile-treasury-image-shrink_800_800/B56ZWs_32XGUAk-/0/1742364180673?e=1774792800&v=beta&t=ZagFUVsmi7u9ahqhQgrfkCNlvXe4_ipuOC19kvq_4_o",
      "https://media.licdn.com/dms/image/v2/D562DAQHpfPAI-ATRwA/profile-treasury-image-shrink_800_800/B56ZWs_zIJHQAo-/0/1742364161608?e=1774792800&v=beta&t=aGlG_Mz7mezdZQ96oq-ByPps3pgBnfCppNd4T5gEBDY",
      "https://media.licdn.com/dms/image/v2/D562DAQG1paSeyUx-AQ/profile-treasury-image-shrink_800_800/B56ZWs_vUcGsAY-/0/1742364145912?e=1774792800&v=beta&t=aYUlgyxTixLFQeEY2sKlhBVAX8jC23W-37FfmASZNSo",
    ],
    github: "#",
    demo: "#",
    tech: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "Judge0 API",
      "Tailwind",
    ],
  },

  {
    id: 2,
    title: "AI Workflow Builder",
    description: "Drag & drop AI automation pipelines.",
    longDescription:
      "A visual builder to create AI workflows using LangChain and APIs. Enables automation pipelines without coding.",
    image: ["/project2.png"],
    github: "#",
    demo: "#",
    tech: ["Next.js", "Langchain", "OpenAI"],
  },

  {
    id: 3,
    title: "Realtime Analytics",
    description: "Live dashboards with streaming data.",
    longDescription:
      "Kafka + WebSocket based analytics system providing real-time insights with high throughput.",
    image: ["/project3.png"],
    github: "#",
    demo: "#",
    tech: ["Kafka", "Node.js", "React"],
  },
];

export const Projects = () => {
  return (
    <section className=" text-white py-3 px-6 ">
      <div className="pb-8">
        <span className="text-[100px] text-white/70 font-semibold mb-4">
          SELECTED WORKS /{" "}
        </span>
        <span className="text-blue-500 text-3xl">~ Those late night grind</span>
      </div>
      <div className="max-w-7xl mx-auto space-y-32">
        {projectsData.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

function ProjectRow({ project, reverse }: any) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-16 items-center bg-neutral-900 p-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={reverse ? "md:order-2" : ""}
        >
          <h2 className="text-4xl font-bold mb-4">{project.title}</h2>

          {/* BUTTONS */}
          <div className="flex gap-3 mb-4">
            <a href={project.github}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                <Github size={16} /> GitHub
              </button>
            </a>

            <a href={project.demo}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                <ExternalLink size={16} /> Demo
              </button>
            </a>
          </div>

          <p className="text-neutral-400 mb-6">{project.description}</p>

          {/* CARD */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl shadow-xl">
            <p className="text-neutral-300 text-sm leading-relaxed">
              {project.longDescription}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tech.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-purple-500/40 text-purple-300 bg-purple-500/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={reverse ? "md:order-1" : ""}
        >
          <InfiniteScroller images={project.image} />
        </motion.div>
      </div>
    </div>
  );
}

function InfiniteScroller({ images }: { images: string[] }) {
  const imgs = Array.isArray(images)
    ? images.filter((img) => img && img.trim() !== "")
    : [];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...imgs, ...imgs].map((img, index) => (
          <div
            key={index}
            className="min-w-[300px] h-[200px] rounded-xl overflow-hidden border border-white/10 group"
          >
            <img
              src={img}
              alt="project"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </motion.div>

      {/* LEFT FADE */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />

      {/* RIGHT FADE */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
