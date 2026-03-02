import { TopNavbar } from "@/app/components/ui/TopNavbar";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { EducationSection } from "@/app/components/sections/EducationSection";
import { SkillsSection } from "@/app/components/sections/SkillsSection";
import { ExperienceSection } from "@/app/components/sections/ExperienceSection";
import { ProjectsSection } from "@/app/components/sections/ProjectsSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { FloatingSidebar } from "@/app/components/ui/FloatingDock";
import { Footer } from "@/app/components/ui/Footer";
import { Preloader } from "@/app/components/ui/Preloader";
import { CustomCursor } from "@/app/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-foreground selection:bg-[var(--color-neon-primary)]/30 overflow-x-hidden md:cursor-none">
      <Preloader />
      <CustomCursor />
      
      <TopNavbar />
      <HeroSection />
      
      <div className="relative z-10 bg-background/80 backdrop-blur-3xl">
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
      
      <FloatingSidebar />
      <Footer />
    </main>
  );
}


