"use client";

import { cn } from "@/app/lib/utils";
import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "none";
}

export const GlassCard = ({
  children,
  className,
  glowColor = "none",
  ...props
}: GlassCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl overflow-hidden group",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {/* Dynamic Cursor Glare Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${glowColor === "primary" ? "rgba(0,240,255,0.15)" : glowColor === "secondary" ? "rgba(112,0,255,0.15)" : "rgba(255,255,255,0.1)"},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Optional Inner Glow Effect on hover or static depending on usage, let's add a subtle ambient glow */}
      {glowColor !== "none" && (
        <div
          className={cn(
            "absolute -inset-[1px] opacity-20 blur-xl rounded-2xl pointer-events-none transition-opacity duration-500",
            glowColor === "primary" ? "bg-[var(--neon-primary)]" : "bg-[var(--neon-secondary)]"
          )}
        />
      )}
      
      {/* Content wrapper to keep it above the glow */}
      <div className="relative z-10 p-6 md:p-8">
        {children}
      </div>
    </motion.div>
  );
};
