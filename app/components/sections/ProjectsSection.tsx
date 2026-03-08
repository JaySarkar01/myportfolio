"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { ExternalLink, Github } from "lucide-react";
import React from 'react';

const projects = [
  {
    title: "J-aiChatBot",
    description: "AI-Powered Chatbot with Next.js & Gemini API",
    tags: ["Next.js", "Node.js", "MongoDB"],
    glow: "primary" as const,
    github: "https://github.com/JaySarkar01/J-aiChatBot.git",
    live: "#",
  },
  {
    title: "Chatify",
    description: "Full-Stack Chat App with Auth & Emails",
    tags: ["React", "Node.js", "MongoDB"],
    glow: "secondary" as const,
    github: "https://github.com/JaySarkar01/chatify-1.git",
    live: "#",
  },
  {
    title: "TaskFlow",
    description: "Task Management App with Next.js & Supabase",
    tags: ["Next.js", "Tailwind", "Express"],
    glow: "primary" as const,
    github: "https://github.com/JaySarkar01/TaskFlow.git",
    live: "#",
  }
];

export const ProjectsSection = ({ data }: { data?: any[] }) => {
  const finalProjects = data && data.length > 0 ? data : projects;
  return (
    <section id="projects" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="Featured Work" 
        subtitle="A selection of recent projects moving the web forward." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16">
        {finalProjects.map((project: any, idx: number) => (
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
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--neon-primary)] group-hover:to-foreground transition-all">
                    {project.title}
                  </h3>
                  <p className="text-foreground/60 font-light leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-xs font-mono px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-foreground/10">
                  {project.live && project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-[var(--neon-primary)] transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
