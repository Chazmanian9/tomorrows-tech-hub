import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="border-b border-border/60">
      <div className="container flex items-center justify-between py-5">
        <div className="flex items-center gap-2 text-neon">
          <Logo />
          <span className="font-display text-lg font-semibold text-foreground">
            Tomorrow&apos;s Tech
          </span>
        </div>
        <span className="hidden text-sm text-muted-foreground sm:block">
          Smart Solutions. Better Tomorrow.
        </span>
      </div>
    </header>
  );
}
