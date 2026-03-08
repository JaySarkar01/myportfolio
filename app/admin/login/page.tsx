"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { AnimatedButton } from "@/app/components/ui/AnimatedButton";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-[var(--glass-border)] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-neon-primary)] to-[var(--color-neon-secondary)]" />
        
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-[var(--color-neon-primary)]/10 rounded-full border border-[var(--color-neon-primary)]/20 shadow-[0_0_15px_var(--color-neon-primary)]">
            <Lock className="w-8 h-8 text-[var(--color-neon-primary)]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
          Admin Access
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] focus:ring-1 focus:ring-[var(--color-neon-primary)] outline-none transition-all placeholder:text-foreground/30 text-foreground"
              placeholder="Username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-[var(--glass-border)] focus:border-[var(--color-neon-primary)] focus:ring-1 focus:ring-[var(--color-neon-primary)] outline-none transition-all placeholder:text-foreground/30 text-foreground"
              placeholder="••••••••"
            />
          </div>

          <AnimatedButton
            variant="primary"
            className="w-full mt-4 justify-center"
            onClick={handleLogin}
          >
            {loading ? "Authenticating..." : "Login"}
          </AnimatedButton>
        </form>
      </div>
    </div>
  );
}
