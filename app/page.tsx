import { About } from "@/components/about/about";
import { CurrentChapter } from "@/components/chapter/current-chapter";
import { Contact } from "@/components/contact/contact";
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
    /* tabIndex -1 makes the skip link's target reliably focusable (Safari);
       the outline is suppressed because focus here is programmatic only. */
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <CurrentChapter />
      <Signal signal={getSignal("001")} />
      <Experiments />
      <AiLab />
      <Materials />
      <HowIWork />
      <About />
      <Contact />
      <RevealObserver />
    </main>
  );
}