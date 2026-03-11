"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-[var(--glass-border)] relative z-10 glass mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <div className="text-foreground/80 font-medium mb-2 cursor-default">
            © 2026 Jay Sarkar
          </div>
          <p className="text-foreground/40 text-sm font-light mt-2">
            Built with Next.js, Three.js, and Tailwind CSS
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/JaySarkar01" className="text-foreground/50 hover:text-[var(--neon-primary)] transition-colors hover:glow">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/jay-sarkar-724669249/" className="text-foreground/50 hover:text-[var(--neon-secondary)] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:jaisarkar200@gmail.com" className="text-foreground/50 hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};
