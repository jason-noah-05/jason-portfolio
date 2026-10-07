import { CurrentChapter } from "@/components/chapter/current-chapter";
import { Hero } from "@/components/hero/hero";
import { Signal } from "@/components/signals/signal";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { getSignal } from "@/lib/data/signals";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CurrentChapter />
      <Signal signal={getSignal("001")} />
      <RevealObserver />
    </main>
  );
}