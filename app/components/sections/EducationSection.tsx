"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { GraduationCap, BookOpen } from "lucide-react";

export const EducationSection = () => {
  return (
    <section id="education" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="Education" 
        subtitle="My academic foundation and continuous learning journey." 
      />
      
      <div className="mt-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard glowColor="primary" className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
              <GraduationCap className="w-64 h-64 text-[var(--color-neon-primary)]" />
            </div>
            
            <div className="relative z-10 p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Master of Computer Applications (MCA)
                  </h3>
                  <p className="text-white/60 text-lg">
                    Status: <span className="text-[var(--color-neon-primary)] font-medium">Pursuing</span>
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md self-start md:self-auto">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-neon-primary)] animate-pulse" />
                  <span className="text-sm font-medium text-white/80">Active Student</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-8 mt-4">
                <h4 className="text-sm uppercase tracking-widest text-white/40 font-medium mb-6 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Focus Areas
                </h4>
                <div className="flex flex-wrap gap-4">
                  {["Full Stack Development", "Software Engineering", "Web Development"].map((focus, idx) => (
                    <motion.div
                      key={focus}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                      className="px-5 py-3 rounded-xl bg-black/40 border border-white/5 text-white/80 font-medium hover:border-[var(--color-neon-primary)]/50 transition-colors"
                    >
                      {focus}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
