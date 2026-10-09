import { About } from "@/components/about/about";
import { CurrentChapter } from "@/components/chapter/current-chapter";
import { Experiments } from "@/components/experiments/experiments";
import { Hero } from "@/components/hero/hero";
import { AiLab } from "@/components/lab/ai-lab";
import { Materials } from "@/components/materials/materials";
import { HowIWork } from "@/components/process/how-i-work";
import { Signal } from "@/components/signals/signal";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { getSignal } from "@/lib/data/signals";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CurrentChapter />
      <Signal signal={getSignal("001")} />
      <Experiments />
      <AiLab />
      <Materials />
      <HowIWork />
      <About />
      <RevealObserver />
    </main>
  );
}