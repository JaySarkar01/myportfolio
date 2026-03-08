"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedButton } from "@/app/components/ui/AnimatedButton";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // First check auth (this will return 401 if not logged in, but just to be sure)
      const authRes = await fetch("/api/auth/check");
      if (!authRes.ok) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/portfolio");
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
        } else {
          setError("Failed to save data");
        }
      } else {
        alert("Saved successfully!");
      }
    } catch (err) {
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Helper to handle nested object state updates
  const updateNestedState = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading) return <div className="text-center mt-20 text-[var(--color-neon-primary)] text-xl animate-pulse">Loading Dashboard...</div>;
  if (!data) return <div className="text-center mt-20 text-red-500">{error || "No data found"}</div>;

  return (
    <div className="flex flex-col gap-8 pb-32">
      <div className="flex justify-between items-center bg-background/50 border border-[var(--glass-border)] p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">Dashboard MVP</h2>
          <p className="text-foreground/50 mt-1">Manage your portfolio contents below.</p>
        </div>
        <div className="flex gap-4">
          <AnimatedButton variant="outline" onClick={handleLogout}>Logout</AnimatedButton>
          <AnimatedButton variant="primary" onClick={handleSave}>
            {saving ? "Saving..." : "Save Changes"}
          </AnimatedButton>
        </div>
      </div>

      {error && <div className="p-4 bg-red-500/10 text-red-500 rounded border border-red-500/50">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* HERO SECTION */}
        <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2 text-neon border-b border-foreground/10 pb-2">Hero Section</h3>
          
          <label className="text-sm text-foreground/70">Title</label>
          <input
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground"
            value={data.hero?.title || ""}
            onChange={(e) => updateNestedState("hero", "title", e.target.value)}
          />
          
          <label className="text-sm text-foreground/70">Roles (Comma separated)</label>
          <input
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground"
            value={data.hero?.roles?.join(", ") || ""}
            onChange={(e) => updateNestedState("hero", "roles", e.target.value.split(",").map(s => s.trim()))}
          />
        </div>

        {/* ABOUT SECTION */}
        <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2 text-neon border-b border-foreground/10 pb-2">About Section</h3>
          
          <label className="text-sm text-foreground/70">Description</label>
          <textarea
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground min-h-[120px]"
            value={data.about?.description || ""}
            onChange={(e) => updateNestedState("about", "description", e.target.value)}
          />
        </div>

        {/* CONTACT SECTION */}
        <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2 text-neon border-b border-foreground/10 pb-2">Contact Section</h3>
          
          <label className="text-sm text-foreground/70">Email</label>
          <input
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground"
            value={data.contact?.email || ""}
            onChange={(e) => updateNestedState("contact", "email", e.target.value)}
          />
          
          <label className="text-sm text-foreground/70">GitHub URL</label>
          <input
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground"
            value={data.contact?.github || ""}
            onChange={(e) => updateNestedState("contact", "github", e.target.value)}
          />

          <label className="text-sm text-foreground/70">LinkedIn URL</label>
          <input
            className="w-full px-4 py-2 rounded bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] outline-none text-foreground"
            value={data.contact?.linkedin || ""}
            onChange={(e) => updateNestedState("contact", "linkedin", e.target.value)}
          />
        </div>
      </div>

      {/* RAW JSON EDITORS for complex arrays */}
      <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-4">
        <h3 className="text-xl font-semibold mb-2 text-neon border-b border-foreground/10 pb-2">Advanced: Raw Array Editors</h3>
        <p className="text-sm text-yellow-500/80 mb-4">Edit the raw JSON for complex arrays directly below. Ensure strict JSON formatting.</p>
        
        {['skills', 'experience', 'projects', 'education'].map((arrayField) => (
          <div key={arrayField} className="flex flex-col gap-2">
            <label className="text-sm font-semibold capitalize text-foreground/90 mt-4">{arrayField} Data</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-black/40 border border-foreground/10 font-mono text-xs focus:border-[var(--color-neon-primary)] outline-none text-green-400 min-h-[200px]"
              value={JSON.stringify(data[arrayField] || [], null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setData((prev: any) => ({ ...prev, [arrayField]: parsed }));
                } catch(err) {
                  // ignore parse error while typing
                }
              }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
