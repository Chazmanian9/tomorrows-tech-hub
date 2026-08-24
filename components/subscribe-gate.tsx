"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { apps } from "@/data/apps";

const STORAGE_KEY = "tt-hub-subscribed";

type Status = "checking" | "gated" | "loading" | "error" | "unlocked";

export function SubscribeGate() {
  const [status, setStatus] = useState<Status>("checking");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const alreadySubscribed = window.localStorage.getItem(STORAGE_KEY) === "true";
    setStatus(alreadySubscribed ? "unlocked" : "gated");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, "true");
      setStatus("unlocked");
    } catch {
      setErrorMsg("Network error. Try again.");
      setStatus("error");
    }
  }

  if (status === "checking") {
    return <div className="min-h-[60vh]" />;
  }

  if (status === "unlocked") {
    return (
      <section className="animate-fade-up py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-1.5 text-sm text-neon">
            <CheckCircle2 className="h-4 w-4" />
            You&apos;re in
          </span>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold text-glow">
            The apps are unlocked
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick a tool below to get started.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-6 transition hover:border-neon/50 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{app.name}</h3>
                <ArrowRight className="h-5 w-5 text-neon transition group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-up grid gap-12 py-12 md:py-20 md:grid-cols-2 md:items-center">
      <div className="relative mx-auto w-full max-w-sm animate-float">
        <div className="absolute inset-0 -z-10 rounded-full bg-neon/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-neon/30 shadow-glow-lg">
          <Image
            src="/images/mascot-welcome.jpg"
            alt="Tomorrow's Tech mascot waving hello"
            width={640}
            height={640}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2 text-neon">
          <Logo className="h-7 w-7" />
          <span className="font-display text-sm font-medium uppercase tracking-widest">
            Tomorrow&apos;s Tech
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-glow">
          Welcome — we&apos;re glad you&apos;re here!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Smart Solutions. Better Tomorrow. Subscribe to unlock the hub and get
          access to every tool we build.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon px-6 py-3 font-semibold text-black shadow-glow transition hover:bg-neon-400 disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Subscribe <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          No spam — just access to the apps in this hub.
        </p>
      </div>
    </section>
  );
}
