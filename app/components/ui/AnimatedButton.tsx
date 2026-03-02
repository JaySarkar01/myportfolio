"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import React from "react";
import { HTMLMotionProps } from "framer-motion";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ variant = "primary", children, className, icon, ...props }, forwardedRef) => {
    const localRef = React.useRef<HTMLButtonElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    
    // Merge refs securely
    React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLButtonElement);

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!localRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = localRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x, y });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors overflow-hidden";
    
    const variants = {
      primary: "bg-white text-black hover:bg-white/90",
      secondary: "bg-[var(--color-neon-primary)] text-black hover:bg-[var(--color-neon-primary)]/90",
      outline: "border border-white/20 hover:border-white/40 hover:bg-white/5",
      ghost: "hover:bg-white/10",
    };

    return (
      <motion.button
        ref={localRef}
        className={cn(baseStyles, variants[variant], className)}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x * 0.15, y: position.y * 0.15 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        {...props}
      >
        {/* Glow effect for primary/secondary */}
        {(variant === "primary" || variant === "secondary") && (
          <div className="absolute inset-0 -z-10 bg-inherit blur-md opacity-60 pointer-events-none" />
        )}
        
        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
          {children}
          {icon && (
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: position.x !== 0 ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";
