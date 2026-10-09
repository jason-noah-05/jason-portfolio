"use client";

import { useState } from "react";
import { LabButton, LabPanel } from "./lab-panel";

type StageId = "trigger" | "read" | "decide" | "review" | "act";

type Stage = {
  readonly label: string;
  readonly detail: string;
};

const stages: Record<StageId, Stage> = {
  trigger: { label: "Trigger", detail: "An enquiry arrives through a contact form." },
  read: { label: "Read", detail: "The message is split into who is asking, what they want and how urgent it is." },
  decide: { label: "Decide", detail: "A model proposes a category and drafts a reply." },
  review: { label: "Review", detail: "A person reads the draft, then approves it, edits it or throws it away." },
  act: { label: "Act", detail: "The approved reply is sent and the decision is logged." },
};

const UNREVIEWED_ACT = "The draft is sent exactly as written. Nothing checked it first.";

const order: readonly StageId[] = ["trigger", "read", "decide", "review", "act"];

/** The stage after `current` in the active flow, or null at the end. */
function stepAfter(current: StageId, reviewOn: boolean): StageId | null {
  const flow = reviewOn ? order : order.filter((id) => id !== "review");
  return flow[flow.indexOf(current) + 1] ?? null;
}

/*
 * Study 02. An imagined enquiry, walked through five stages. Switching the
 * human review off removes one stage and changes what the last one means.
 */
export function AutomationFlow() {
  const [current, setCurrent] = useState<StageId>("trigger");
  const [reviewOn, setReviewOn] = useState(true);

  const position = order.indexOf(current);
  const next = stepAfter(current, reviewOn);
  const detail = current === "act" && !reviewOn ? UNREVIEWED_ACT : stages[current].detail;

  const toggleReview = () => {
    if (reviewOn && current === "review") setCurrent("act");
    setReviewOn((value) => !value);
  };

  return (
    <LabPanel label="Where the human goes">
      <p className="text-small text-(--tone-secondary)">
        An imagined enquiry, followed from arrival to reply. Step through it, or turn the review off.
      </p>

      <ol className="mt-6 grid md:grid-cols-5">
        {order.map((id, index) => {
          const skipped = !reviewOn && id === "review";
          const reached = index <= position && !skipped;
          const isCurrent = id === current;

          return (
            <li key={id} className="relative">
              <span className="absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-signal transition-transform duration-(--duration-slow) ease-(--ease-in-out-quart)"
                style={{ transform: `scaleX(${reached ? 1 : 0})` }}
                aria-hidden="true"
              />
              <button
                type="button"
                disabled={skipped}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => setCurrent(id)}
                className="flex min-h-11 w-full flex-col items-start gap-2 pb-4 pt-4 text-left disabled:opacity-40 md:pr-4"
              >
                <span className="type-meta text-(--tone-secondary)" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-small font-medium uppercase tracking-wide ${
                    isCurrent ? "text-paper" : "text-(--tone-secondary)"
                  } ${skipped ? "line-through" : ""}`}
                >
                  {stages[id].label}
                  {skipped ? <span className="sr-only"> (skipped)</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 border-t border-(--rule-color) pt-6" aria-live="polite">
        <p className="type-meta text-(--tone-secondary)">
          {String(position + 1).padStart(2, "0")} · {stages[current].label}
        </p>
        <p className="mt-2 max-w-prose text-lead">{detail}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <LabButton onClick={() => setCurrent(next ?? "trigger")}>{next ? "Next step" : "Start again"}</LabButton>
        <LabButton pressed={reviewOn} onClick={toggleReview} label="Human review">
          Human review: {reviewOn ? "On" : "Off"}
        </LabButton>
      </div>
    </LabPanel>
  );
}