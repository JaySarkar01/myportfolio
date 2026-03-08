"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { GraduationCap, BookOpen } from "lucide-react";

export const EducationSection = ({ data }: { data?: any[] }) => {
  const finalEducation = data && data.length > 0 ? data : [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Active Student",
      period: "Pursuing",
      description: "Full Stack Development, Software Engineering, Web Development"
    }
  ];
  return (
    <section id="education" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="Education" 
        subtitle="My academic foundation and continuous learning journey." 
      />
      
      <div className="mt-16 max-w-4xl mx-auto space-y-8">
        {finalEducation.map((edu: any, idx: number) => {
          const focusAreas = edu.description ? edu.description.split(",").map((s: string) => s.trim()) : [];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <GlassCard glowColor="primary" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                  <GraduationCap className="w-64 h-64 text-[var(--color-neon-primary)]" />
                </div>
                
                <div className="relative z-10 p-4 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-foreground/60 text-lg">
                        Status / Period: <span className="text-[var(--neon-primary)] font-medium">{edu.period}</span>
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md self-start md:self-auto">
                      <span className="w-2 h-2 rounded-full bg-[var(--neon-primary)] animate-pulse" />
                      <span className="text-sm font-medium text-foreground/80">{edu.institution}</span>
                    </div>
                  </div>
                  
                  {focusAreas.length > 0 && (
                    <div className="border-t border-foreground/10 pt-8 mt-4">
                      <h4 className="text-sm uppercase tracking-widest text-foreground/40 font-medium mb-6 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {focusAreas.map((focus: string, fIdx: number) => (
                          <motion.div
                            key={focus}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + (fIdx * 0.1) }}
                            className="px-5 py-3 rounded-xl bg-background/40 border border-foreground/5 text-foreground/80 font-medium hover:border-[var(--neon-primary)]/50 transition-colors"
                          >
                            {focus}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
