"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting until mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // placeholder of same size
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full glass border hover:border-white/20 transition-all focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <Sun
          className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${
            theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-[var(--neon-primary)]"
          }`}
        />
        <Moon
          className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${
            theme === "dark" ? "opacity-100 rotate-0 scale-100 text-[var(--neon-secondary)]" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </div>
    </motion.button>
  );
}
