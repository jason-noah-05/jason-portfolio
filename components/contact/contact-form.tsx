"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/lib/contact/actions";
import { LIMITS, emptyValues, initialContactState } from "@/lib/contact/schema";
import type { ContactState, FieldErrors } from "@/lib/contact/schema";
import { choices, contact, getChoice } from "@/lib/data/contact";
import type { ChoiceId } from "@/lib/data/contact";

const NO_ERRORS: FieldErrors = {};

const LABEL = "type-meta block text-(--tone-secondary)";

/* The underline is the only visible boundary of a field, so it uses
   --control-color (3:1 or better), not the decorative --rule-color. */
const INPUT =
  "mt-3 block w-full rounded-none border-0 border-b border-(--control-color) bg-transparent py-3 text-lead " +
  "placeholder:text-(--tone-secondary) transition-colors duration-(--duration-fast) " +
  "hover:border-paper focus:border-paper aria-invalid:border-signal";

const BUTTON =
  "type-meta inline-flex min-h-12 items-center gap-3 border border-paper px-6 transition-colors " +
  "duration-(--duration-fast) disabled:opacity-40";

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="text-small mt-2 text-signal">
      <span className="sr-only">Error: </span>
      {message}
    </p>
  );
}

/*
 * The contact form. Validation and delivery live in the server action, so the
 * form also works with JavaScript off. Inputs are controlled so a failed
 * submit never wipes what the visitor typed (React 19 resets uncontrolled
 * fields after an action). The topic is a native radio group: arrow keys work
 * and the choice changes the prompt, the placeholder and a one-line reply.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );

  const seed = state.status === "success" ? emptyValues : state.values;
  const [choice, setChoice] = useState<ChoiceId | "">(seed.choice);
  const [name, setName] = useState(seed.name);
  const [email, setEmail] = useState(seed.email);
  const [message, setMessage] = useState(seed.message);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const sent = state.status === "success" && dismissed !== state;
  const errors = state.status === "error" ? state.errors : NO_ERRORS;
  const formError = state.status === "error" ? state.formError : undefined;
  const active = choice ? getChoice(choice) : undefined;

  // Move focus to whatever the visitor needs to deal with next.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (invalid ?? alertRef.current)?.focus();
    }
  }, [state]);

  // After "Send another", put focus back at the start of the form.
  useEffect(() => {
    if (dismissed) nameRef.current?.focus();
  }, [dismissed]);

  const startAgain = () => {
    setMessage("");
    setDismissed(state);
  };

  return (
    <div data-reveal="group" className="relative pt-8">
      <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />

      <div className="reveal-fade">
        {sent ? (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h3 ref={successRef} tabIndex={-1} className="type-editorial">
                Message <span className="italic">sent.</span>
              </h3>
              <p className="text-lead mt-6 max-w-xl">Thank you. It has gone through, and I&apos;ll reply by email.</p>
              <button
                type="button"
                onClick={startAgain}
                className={`${BUTTON} mt-10 hover:bg-paper hover:text-ink`}
                data-cursor-label="Again"
              >
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} action={formAction} noValidate>
            <fieldset>
              <legend className="type-meta mb-6 text-(--tone-secondary)">{contact.legend}</legend>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {choices.map((item) => {
                  const checked = item.id === choice;

                  return (
                    <label
                      key={item.id}
                      className="relative block cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-paper"
                    >
                      <input
                        type="radio"
                        name="choice"
                        value={item.id}
                        checked={checked}
                        onChange={() => setChoice(item.id)}
                        className="peer sr-only"
                      />
                      <span
                        data-checked={checked}
                        className="group/tile flex h-full min-h-40 flex-col justify-between gap-8 border border-(--rule-color) p-4 transition-colors duration-(--duration-fast) hover:border-paper data-[checked=true]:border-paper data-[checked=true]:bg-paper data-[checked=true]:text-ink md:p-5"
                      >
                        <span className="type-meta flex items-center gap-3 text-(--tone-secondary) group-data-[checked=true]/tile:text-ink-muted">
                          <span aria-hidden="true">{item.index}</span>
                          <span
                            aria-hidden="true"
                            className={checked ? "text-signal-text" : undefined}
                          >
                            {checked ? "●" : "○"}
                          </span>
                        </span>
                        <span className="text-lead uppercase tracking-wide">{item.label}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p aria-live="polite" className="text-lead mt-8 max-w-xl text-(--tone-secondary)">
              {active ? active.reply : contact.noChoice}
            </p>

            <div className="mt-16 grid gap-x-6 gap-y-10 md:mt-20 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <label htmlFor="contact-name" className={LABEL}>
                  Name
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={INPUT}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>

              <div className="lg:col-span-6">
                <label htmlFor="contact-email" className={LABEL}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={LIMITS.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={INPUT}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>

              <div className="lg:col-span-12">
                <label htmlFor="contact-message" className={LABEL}>
                  {active ? active.prompt : contact.defaultPrompt}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  maxLength={LIMITS.messageMax}
                  placeholder={active ? active.placeholder : contact.defaultPlaceholder}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${INPUT} min-h-40 resize-y`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>

              {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label>
                  Leave this field empty
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                </label>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-12">
                {formError ? (
                  <div ref={alertRef} role="alert" tabIndex={-1} className="text-small max-w-prose text-signal">
                    <span className="sr-only">Error: </span>
                    {formError}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <button
                    type="submit"
                    disabled={pending}
                    className={`${BUTTON} bg-paper text-ink hover:bg-transparent hover:text-paper`}
                    data-cursor-label="Send"
                  >
                    {pending ? "Sending…" : "Send message"}
                    <span aria-hidden="true">↗</span>
                  </button>
                  <p className="text-small text-(--tone-secondary)">All three fields are required.</p>
                </div>

                <span role="status" className="sr-only">
                  {pending ? "Sending your message" : ""}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}