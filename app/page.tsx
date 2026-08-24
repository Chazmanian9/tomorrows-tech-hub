import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscribeGate } from "@/components/subscribe-gate";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-grid">
      <Header />
      <main className="container flex-1">
        <SubscribeGate />
      </main>
      <Footer />
    </div>
  );
}
