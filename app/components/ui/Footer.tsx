"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/10 relative z-10 glass mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-white/80 font-medium mb-2">© 2026 Jay Sarkar</p>
          <p className="text-white/40 text-sm font-light">
            Built with Next.js, Three.js, and Tailwind CSS
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/50 hover:text-[var(--color-neon-primary)] transition-colors hover:glow">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/50 hover:text-[var(--color-neon-secondary)] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#contact" className="text-white/50 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};
