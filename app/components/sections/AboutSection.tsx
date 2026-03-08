"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { Layout, Server } from "lucide-react";

export const AboutSection = ({ data }: { data?: any }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} id="about" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading 
        title="About Me" 
        subtitle="Building the future of the web, one pixel and API endpoint at a time." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24">
        <GlassCard glowColor="primary" className="p-8 md:p-12">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">&lt; Hello World /&gt;</h3>
          {data?.description ? (
            <div 
              className="text-foreground/70 leading-relaxed text-lg font-light space-y-4 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: data.description }} 
            />
          ) : (
            <>
              <p className="text-foreground/70 leading-relaxed mb-6 text-lg font-light">
                I am a passionate <span className="text-foreground font-medium">Full Stack Developer</span> and <span className="text-foreground font-medium">MCA student</span> focused on building modern, scalable, and high-performance web applications.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6 text-lg font-light">
                I specialize in creating responsive, interactive, and visually immersive applications using modern technologies like Next.js, React, Node.js, and MongoDB. I enjoy solving complex problems, designing beautiful interfaces, and creating smooth user experiences.
              </p>
              <p className="text-foreground/70 leading-relaxed text-lg font-light">
                Currently, I am actively preparing for software developer roles and continuously improving my skills in full stack development and system design.
              </p>
            </>
          )}
        </GlassCard>
        
        {/* Abstract floating elements container */}
        <div className="relative h-full min-h-[400px] w-full flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-[var(--color-neon-primary)]/20 to-[var(--color-neon-secondary)]/20 rounded-full blur-[100px]"
            style={{ scale }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="w-48 h-48 rounded-3xl glass rotate-12 absolute z-10 border border-[var(--color-neon-primary)]/30 border-t-[var(--color-neon-primary)] flex items-center justify-center"
            style={{ y: y1 }}
            animate={{ rotate: [12, 15, 12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
             <Layout className="w-16 h-16 text-[var(--color-neon-primary)] opacity-50" />
          </motion.div>
          <motion.div 
            className="w-32 h-32 rounded-full glass -rotate-12 absolute z-20 left-10 md:left-20 bottom-10 border border-[var(--color-neon-secondary)]/30 backdrop-blur-2xl flex items-center justify-center"
            style={{ y: y2 }}
            animate={{ x: [0, 20, 0], rotate: [-12, -20, -12] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
             <Server className="w-10 h-10 text-[var(--color-neon-secondary)] opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

