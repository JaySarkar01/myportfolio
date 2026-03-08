import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Admin CMS for Portfolio",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-foreground selection:bg-[var(--color-neon-primary)]/30">
      <nav className="w-full glass py-4 px-6 flex justify-between items-center border-b border-[var(--glass-border)] z-50 sticky top-0">
        <h1 className="text-xl font-bold text-neon">Portfolio Admin</h1>
        <div className="flex gap-4">
          <a href="/" className="text-sm text-foreground/70 hover:text-foreground">View Site</a>
        </div>
      </nav>
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
