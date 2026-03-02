"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { AnimatedButton } from "@/app/components/ui/AnimatedButton";
import { Code, Download, Send } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { TypingEffect } from "@/app/components/ui/TypingEffect";

// Lazy load the huge 3D scene to prevent blocking the main thread
const HeroScene = dynamic(
  () => import("@/app/components/canvas/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    "Full Stack Developer",
    "Java Full Stack Aspirant",
    "Next.js Developer",
    "Building immersive and scalable web applications"
  ];
  
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      {mounted && <HeroScene />}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030305] pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 mt-20 md:mt-0 text-center">
        
        <div className="mb-2">
          {mounted && (
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-primary)] to-[var(--color-neon-secondary)] text-neon drop-shadow-2xl py-2">
                Jay Sarkar
              </span>
            </motion.h1>
          )}
        </div>
        
        <motion.div
          className="h-8 md:h-10 text-lg md:text-2xl text-white/80 mb-10 font-light flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {mounted && <TypingEffect texts={roles} />}
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects">
            <AnimatedButton variant="primary" icon={<Code className="w-4 h-4" />}>
              View Projects
            </AnimatedButton>
          </a>
          <a href="#contact">
            <AnimatedButton variant="secondary" icon={<Send className="w-4 h-4" />}>
              Contact Me
            </AnimatedButton>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <AnimatedButton variant="outline" icon={<Download className="w-4 h-4" />}>
              Download Resume
            </AnimatedButton>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
          animate={{
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};
