"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
          }, 800); // Wait a bit at 100%
          return 100;
        }
        // Random increment for realistic feel
        const inc = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + inc, 100);
      });
    }, 150);
    
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Futuristic Loading Ring */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer blur glow */}
            <div className="absolute inset-0 rounded-full border-t border-[var(--color-neon-primary)] animate-spin-slow opacity-50 blur-md" />
            
            {/* Spinning rings */}
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-foreground/5" strokeWidth="1" />
              <motion.circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="var(--color-neon-primary)" 
                strokeWidth="1"
                initial={{ strokeDasharray: "0 300" }}
                animate={{ strokeDasharray: `${(progress / 100) * 300} 300` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </svg>
            
            <svg className="absolute w-3/4 h-3/4 animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-foreground/5" strokeWidth="1" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="var(--neon-secondary)" strokeWidth="1" strokeDasharray="50 300" />
            </svg>
            
            <div className="absolute flex flex-col items-center text-foreground">
              <span className="text-3xl font-black tabular-nums tracking-tighter">
                {progress}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-neon-primary)]">
                Initializing
              </span>
            </div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--color-neon-primary)] to-[var(--color-neon-secondary)] shadow-[0_0_10px_var(--color-neon-primary)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
