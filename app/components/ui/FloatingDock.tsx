"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, FileCode2, Mail, Home, GraduationCap, Clock } from "lucide-react";
import { cn } from "@/app/lib/utils";

const items = [
  { name: "Home", icon: Home, href: "#home" },
  { name: "About", icon: User, href: "#about" },
  { name: "Education", icon: GraduationCap, href: "#education" },
  { name: "Skills", icon: Briefcase, href: "#skills" },
  { name: "Experience", icon: Clock, href: "#experience" },
  { name: "Projects", icon: FileCode2, href: "#projects" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export const FloatingSidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => item.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href.substring(1));
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed z-50 glass transition-all duration-300 flex items-center justify-center gap-2",
        // Mobile: Bottom dock
        "bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-3 flex-row",
        // Desktop: Right floating sidebar
        "md:flex-col md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:right-6 md:translate-x-0 md:px-3 md:py-4"
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {items.map((item, idx) => {
        const isActive = activeSection === item.href.substring(1);
        const Icon = item.icon;
        
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => scrollTo(e, item.href)}
            className="relative p-3 rounded-full flex flex-col md:flex-row items-center justify-center text-foreground/50 hover:text-foreground transition-colors group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Active Background Indicator */}
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="absolute inset-0 bg-foreground/10 rounded-full border border-foreground/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Hover Tooltip (Mobile Only) */}
            <AnimatePresence>
              {hoveredIndex === idx && !isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                  className="absolute md:hidden -top-12 px-3 py-1 bg-background/80 backdrop-blur-md rounded-md text-xs font-medium border border-foreground/10 whitespace-nowrap text-foreground text-neon shadow-[0_4px_20px_rgba(0,240,255,0.4)]"
                >
                  {item.name}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-3 relative z-10 whitespace-nowrap">
              <Icon 
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "text-[var(--neon-primary)] scale-110" : "group-hover:scale-110 group-hover:text-foreground"
                )} 
              />
              {/* Expanded Text (Desktop Only) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    className="hidden md:block overflow-hidden text-sm font-medium pr-2"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </a>
        );
      })}
    </motion.div>
  );
};

