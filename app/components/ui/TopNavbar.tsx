"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const TopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 4 && !devMode) {
      setDevMode(true);
      setClickCount(0);
    }
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-300 px-6 py-4 flex items-center justify-between",
          scrolled ? "glass border-b border-[var(--glass-border)]" : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div 
          className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 hover:from-[var(--neon-primary)] hover:to-[var(--neon-secondary)] transition-all select-none"
          onClick={handleLogoClick}
        >
          Jay Sarkar
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className="text-sm font-medium text-foreground/50 hover:text-foreground hover:text-shadow-neon transition-all"
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </div>
        
        {/* Mobile toggle or ThemeToggle can sit here if needed, but keeping it simple */}
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </motion.nav>

      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setDevMode(false)}
          >
            <motion.div 
              className="glass p-8 md:p-12 max-w-lg text-center rounded-3xl border border-[var(--glass-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4 text-neon-secondary">
                Welcome to developer mode.
              </h2>
              <p className="text-foreground/70 mb-8 font-light">
                You've unlocked the hidden console. As a fellow developer, feel free to inspect the source, audit the performance, and explore the 3D scene architecture.
              </p>
              
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[var(--neon-primary)] to-[var(--neon-secondary)] animate-spin-slow blur-md" />
              
              <button 
                onClick={() => setDevMode(false)}
                className="mt-8 text-sm font-medium text-foreground/50 hover:text-foreground uppercase tracking-widest transition-colors"
              >
                Close Terminal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
