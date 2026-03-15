"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlickeringGrid } from "./ui/flickering-grid";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});
export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-between px-10 py-12 text-white overflow-hidden ">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <FlickeringGrid
          className="bg-black relative inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.7}
          flickerChance={0.1}
          height={2000}
          width={2000}
        />
      </div>

      {/* Fade Gradient Overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

      {/* Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] bg-purple-600/30 blur-[150px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full bottom-[-200px] right-[-200px] animate-pulse" />
      </div>
      

      {/* Center Content */}
      <div className="relative w-full flex flex-row  items-center">
        {/* SCROLLING HEADING */}
        <div className="absolute w-full  z-0">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "-600%"] }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex whitespace-nowrap"
          >
            <h1
              className={`${bebas.className} text-[120px] md:text-[400px] font-extrabold text-white/60 `}
            >
              FULL STACK DEVELOPER • FULL STACK DEVELOPER • FULL STACK DEVELOPER
              • FULL STACK DEVELOPER • FULL STACK DEVELOPER • FULL STACK
              DEVELOPER
            </h1>
            <h1
              className={`${bebas.className} text-[120px] md:text-[400px] font-extrabold text-white/60 tracking-widest`}
            >
              FULL STACK DEVELOPER • FULL STACK DEVELOPER • FULL STACK DEVELOPER
              • FULL STACK DEVELOPER • FULL STACK DEVELOPER • FULL STACK
              DEVELOPER
            </h1>
          </motion.div>
        </div>

        {/* Email */}
        <Link
          href="mailto:yashgtech00@gmail.com"
          className=" bg-white/40 rounded-3xl p-2 mt-[600px]"
        >
          <p className="text-lg text-white font-semibold tracking-widest    opacity-70 hover:opacity-100  transition hover:text-orange-400 ">
            yashgtech00@gmail.com
          </p>
        </Link>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-40 ml-40 mr-48"
        >
          <div className="relative">
            <img
              src="/yash.png"
              alt="Yash"
              className="w-[550px] md:w-[600px] rounded-2xl"
            />
            {/* Image Fade Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          </div>
        </motion.div>
        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex mt-[600px] gap-6"
        >
          {[
            { icon: Linkedin, link: "https://www.linkedin.com" },
            { icon: Github, link: "https://github.com" },
            { icon: Twitter, link: "https://twitter.com" },
          ].map(({ icon: Icon, link }, i) => (
            <motion.div key={i} whileHover={{ scale: 1.2, rotate: 5 }}>
              <Link href={link} target="_blank">
                <Icon className="w-6 h-6 text-white hover:text-orange-400 transition" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-40 
bg-gradient-to-b from-transparent to-black z-50"
      />
    </section>
  );
};
