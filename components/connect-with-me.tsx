"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export const ConnectWithMe = () => {
  return (
    <section className="relative bg-black text-white py-32 px-6 overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 blur-3xl" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h2 className="text-5xl font-bold mb-4 tracking-tight">
          Let’s Build Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Amazing
          </span>
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Whether it’s a project, idea, or collaboration — I’m always open to meaningful conversations.
        </p>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto relative group"
      >
        {/* Glow Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition" />

        {/* Glass Card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">

          {/* TEXT */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-semibold mb-3">
              Connect with me
            </h3>
            <p className="text-neutral-400 text-sm">
              Let’s turn ideas into scalable digital products 🚀
            </p>
          </div>

          {/* EMAIL CTA */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:yourmail@gmail.com"
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition"
          >
            <Mail size={18} />
            Drop me a message
          </motion.a>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-6 mt-10">
            {[
              { icon: Github, link: "#" },
              { icon: Linkedin, link: "#" },
              { icon: Twitter, link: "#" },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 transition"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ✨ Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};