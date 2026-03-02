"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading = ({ title, subtitle, className }: SectionHeadingProps) => {
  // Awwwards-style ultra smooth ease
  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div className={cn("flex flex-col items-center justify-center mb-16 md:mb-24", className)}>
      <motion.h2
        className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className="mt-4 text-lg md:text-xl text-foreground/60 text-center max-w-2xl font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: easeOutExpo }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Simple animated line accent */}
      <motion.div
        className="mt-6 h-[2px] w-24 bg-gradient-to-r from-[var(--color-neon-primary)] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: 0.3, ease: easeOutExpo }}
        style={{ originX: 0 }}
      />
    </div>
  );
};
