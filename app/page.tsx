import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Experiments } from "@/components/experiments/experiments";
import { Hero } from "@/components/hero/hero";
import { Materials } from "@/components/materials/materials";
import { HowIWork } from "@/components/process/how-i-work";
import { Signal } from "@/components/signals/signal";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { getSignal } from "@/lib/data/signals";

/*
 * Story order: who (hero), one idea (signal), the work (links to four project
 * pages), how it's made (materials), how I work, who I am, how to reach me.
 * The detail lives on the experiment pages; this page stays short.
 */
export default function Home() {
  return (
    /* tabIndex -1 makes the skip link's target reliably focusable (Safari);
       the outline is suppressed because focus here is programmatic only. */
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <Signal signal={getSignal("001")} />
      <Experiments />
      <Materials />
      <HowIWork />
      <About />
      <Contact />
      <RevealObserver />
    </main>
  );
}
