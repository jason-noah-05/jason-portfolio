import { FieldSketch } from "@/components/lab/field-sketch";
import { GenerativeUi } from "@/components/lab/generative-ui";
import { ImageToInterface } from "@/components/lab/image-to-interface";
import type { ExperimentSlug } from "@/lib/data/experiments";
import { RoughToRefined } from "./rough-to-refined";

/* Maps a slug to its real interactive. Exhaustive: adding a slug without a demo is a type error. */
export function ExperimentDemo({ slug }: { slug: ExperimentSlug }) {
  switch (slug) {
    case "generative-ui":
      return <GenerativeUi />;
    case "rough-to-refined":
      return <RoughToRefined />;
    case "image-to-interface":
      return <ImageToInterface />;
    case "creative-coding":
      return <FieldSketch />;
  }
}
