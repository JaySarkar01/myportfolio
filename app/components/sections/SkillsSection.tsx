"use client";

import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";

const skillCategories = [
  {
    title: "Frontend",
    glow: "primary" as const,
    skills: ["Next.js", "React.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    glow: "secondary" as const,
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    glow: "none" as const,
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Languages",
    glow: "primary" as const,
    skills: ["Java", "JavaScript", "C", "C++"],
  },
  {
    title: "Tools",
    glow: "secondary" as const,
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  }
];

export const SkillsSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <section id="skills" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="Technical Arsenal" 
        subtitle="The languages, frameworks, and tools I use to build scalable systems." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <GlassCard glowColor={category.glow} className="h-full">
              <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[var(--color-neon-primary)] to-transparent" />
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.span 
                    key={skill}
                    variants={itemVariants}
                    className="px-4 py-2 rounded-full glass text-sm font-medium text-white/80 border-white/10 hover:border-[var(--color-neon-primary)] hover:text-white hover:bg-white/5 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
