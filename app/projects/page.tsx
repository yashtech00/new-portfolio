"use client";

import { projectsData } from "@/components/projects";


export default function AllProjects() {
  return (
    <div className="bg-black text-white min-h-screen py-32 px-6">
      
      <h1 className="text-5xl font-bold text-center mb-20">
        All Projects 🚀
      </h1>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        {projectsData.map((project, index) => (
          <div key={project.id}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-neutral-400 mb-4">{project.longDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}