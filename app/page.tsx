import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { CurrentChapter } from "@/components/chapter/current-chapter";
import { Hero } from "@/components/hero/hero";
import { AiLab } from "@/components/lab/ai-lab";
import { Materials } from "@/components/materials/materials";
import { HowIWork } from "@/components/process/how-i-work";
import { RevealObserver } from "@/components/ui/reveal-observer";

/*
 * Story order: introduction, current chapter, AI lab, materials and approach,
 * about, contact. Footer comes from the layout.
 */
export default function Home() {
  return (
    /* tabIndex -1 makes the skip link's target reliably focusable (Safari);
       the outline is suppressed because focus here is programmatic only. */
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <CurrentChapter />
      <AiLab />
      <Materials />
      <HowIWork />
      <About />
      <Contact />
      <RevealObserver />
    </main>
  );
}