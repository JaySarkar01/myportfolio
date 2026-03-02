"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { AnimatedButton } from "@/app/components/ui/AnimatedButton";
import { Send, CheckCircle2, Mail, Github, Linkedin } from "lucide-react";

export const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      
      // Reset after a while
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 px-4 md:px-8 max-w-5xl mx-auto mb-32">
      <SectionHeading 
        title="Contact Me" 
        subtitle="I am open to internship and full-time software developer opportunities." 
      />
      
      <GlassCard className="mt-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--color-neon-primary)]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[var(--color-neon-secondary)]/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Connect</h3>
              <p className="text-white/50 font-light text-sm mb-6">
                Feel free to reach out for collaborations or just a friendly hello.
              </p>
              
              <div className="flex flex-col gap-4">
                <a href="mailto:hello@jaysarkar.dev">
                  <AnimatedButton variant="outline" className="w-full justify-start" icon={<Mail className="w-4 h-4 ml-auto" />}>
                    Email Me
                  </AnimatedButton>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <AnimatedButton variant="outline" className="w-full justify-start" icon={<Github className="w-4 h-4 ml-auto" />}>
                    GitHub
                  </AnimatedButton>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <AnimatedButton variant="outline" className="w-full justify-start" icon={<Linkedin className="w-4 h-4 ml-auto" />}>
                    LinkedIn
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-white/60 uppercase tracking-widest">Name</label>
                  <input 
                    id="name"
                    type="text" 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-neon-primary)] focus:ring-1 focus:ring-[var(--color-neon-primary)] transition-all font-light"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-white/60 uppercase tracking-widest">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-neon-primary)] focus:ring-1 focus:ring-[var(--color-neon-primary)] transition-all font-light"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-white/60 uppercase tracking-widest">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-neon-primary)] focus:ring-1 focus:ring-[var(--color-neon-primary)] transition-all font-light resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <AnimatedButton 
                variant="primary" 
                className="w-full h-12"
                disabled={status === "submitting" || status === "success"}
                icon={status === "success" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Send className="w-4 h-4" />}
              >
                {status === "idle" && "Establish Connection"}
                {status === "submitting" && "Transmitting..."}
                {status === "success" && "Message Received"}
              </AnimatedButton>
            </form>
          </div>
          
        </div>
      </GlassCard>
    </section>
  );
};
