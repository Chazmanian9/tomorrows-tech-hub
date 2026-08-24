export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/mascot-hq.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/60" />

      <div className="container relative py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-glow">
          Tomorrow&apos;s Tech HQ
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Smart Solutions. Better Tomorrow. Built to grow — new apps land in
          this hub as they ship.
        </p>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tomorrow&apos;s Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
