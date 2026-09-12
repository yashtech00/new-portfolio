"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/yashtech00" },
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech" },
  { icon: Twitter, href: "https://x.com/yashgtech00" },
];

export const ConnectWithMe = () => {
  return (
    <div className="relative bg-black text-white px-6 pb-8">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition" />

          <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 md:px-8 md:py-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-1">Connect with me</h3>
                <p className="text-neutral-400 text-sm">
                  Let&apos;s turn ideas into scalable digital products
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:yashgtech00@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-lg hover:shadow-purple-500/20 transition whitespace-nowrap"
                >
                  <Mail size={16} />
                  Drop me a message
                </motion.a>

                <div className="flex items-center gap-3">
                  {socialLinks.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 hover:text-purple-300 transition text-neutral-400"
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
