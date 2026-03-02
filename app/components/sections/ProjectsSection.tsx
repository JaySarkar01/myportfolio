"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { ExternalLink, Github } from "lucide-react";
import React from 'react';

const projects = [
  {
    title: "EduCore ERP System",
    description: "A complete student management and ERP system with authentication, dashboards, and academic tracking.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    glow: "primary" as const,
  },
  {
    title: "Billing System",
    description: "Full stack billing and client management system with authentication and dashboard routing.",
    tags: ["React", "Node.js", "MongoDB"],
    glow: "secondary" as const,
  },
  {
    title: "Client Dashboard",
    description: "Interactive dashboard with deep analytics, secure authentication, and a modern UI.",
    tags: ["Next.js", "Tailwind", "Express"],
    glow: "primary" as const,
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="Featured Work" 
        subtitle="A selection of recent projects moving the web forward." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group perspective-1000"
          >
            {/* 3D Tilt Effect Container */}
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -2, z: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full transform-style-3d cursor-pointer"
            >
              <GlassCard glowColor={project.glow} className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-neon-primary)] group-hover:to-white transition-all">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-white hover:text-[var(--color-neon-primary)] transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
