"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Self Projects",
    period: "Ongoing",
    description: [
      "Built multiple full stack applications using modern technologies including Next.js, Node.js, and MongoDB.",
      "Designed responsive UI architectures, robust backend APIs, and efficient database systems.",
      "Ensured high performance, accessibility, and modern aesthetic standards across personal ventures."
    ],
    glow: "secondary" as const,
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
      <SectionHeading 
        title="Experience" 
        subtitle="Practical application of skills through intensive self-driven development." 
      />
      
      <div className="mt-16 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-neon-primary)] via-[var(--color-neon-secondary)] to-transparent opacity-30 hidden md:block" />
        
        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative pl-0 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-[28px] top-8 w-4 h-4 rounded-full bg-[var(--color-neon-secondary)] shadow-[0_0_15px_var(--color-neon-secondary)] hidden md:block" />
              
              <GlassCard glowColor={exp.glow} className="relative z-10 transition-transform duration-500 hover:-translate-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 border-b border-foreground/5 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                    <p className="text-[var(--neon-primary)] font-medium text-lg">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50 text-sm font-medium self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-4 text-foreground/70 font-light leading-relaxed"
                    >
                      <span className="text-[var(--neon-secondary)] mt-1.5 opacity-50">▹</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
