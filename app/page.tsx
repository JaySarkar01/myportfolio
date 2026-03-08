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
import connectToDatabase from "@/app/lib/db";
import { Portfolio } from "@/app/models/Portfolio";

// We revalidate occasionally so updates show up without needing a rebuild,
// but since this relies on a DB query, we'll keep it dynamic or use Next.js caching.
export const dynamic = "force-dynamic";

export default async function Home() {
  let portfolioData: any = null;
  try {
    await connectToDatabase();
    const doc = await Portfolio.findOne().sort({ createdAt: -1 }).lean();
    if (doc) {
      // lean() returns a plain JS object, safely stringify to remove ObjectIds
      portfolioData = JSON.parse(JSON.stringify(doc));
    }
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
  }

  const data = portfolioData || {};

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-foreground selection:bg-[var(--color-neon-primary)]/30 overflow-x-hidden md:cursor-none">
      <Preloader />
      <CustomCursor />
      
      <TopNavbar />
      <HeroSection data={data.hero} />
      
      <div className="relative z-10 bg-background/80 backdrop-blur-3xl">
        <AboutSection data={data.about} />
        <EducationSection data={data.education} />
        <SkillsSection data={data.skills} />
        <ExperienceSection data={data.experience} />
        <ProjectsSection data={data.projects} />
        <ContactSection data={data.contact} />
      </div>
      
      <FloatingSidebar />
      <Footer />
    </main>
  );
}


