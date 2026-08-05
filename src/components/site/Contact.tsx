import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(2, "Please add a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more (10 characters minimum)").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const details = [
  { icon: MapPin, label: "Stadio dell'Ardente", value: "Viale Corso 12, Marina District" },
  { icon: Phone, label: "Club office", value: "+39 055 0100 190" },
  { icon: Mail, label: "Membership", value: "members@ardentefc.example" },
];

const field =
  "mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-primary focus:outline-none";
const labelClass = "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Message received. The club office will reply within one working day.");
    }, 700);
  };

  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Speak to <span className="text-gradient-gold">the club</span>
              </>
            }
            intro="Membership, hospitality, academy trials or partnership — write to us and a named member of staff will answer."
          />
          <ul className="mt-12 space-y-7">
            {details.map((d, i) => (
              <Reveal as="li" key={d.label} delay={0.08 * i} className="flex items-start gap-5">
                <d.icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <p className={labelClass}>{d.label}</p>
                  <p className="mt-1 text-sm text-foreground/85">{d.value}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-lg border border-border bg-surface p-7 shadow-elegant sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="contact-name">
                  Name
                </label>
                <input id="contact-name" name="name" className={field} placeholder="Your name" maxLength={100} />
                {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={field}
                  placeholder="you@example.com"
                  maxLength={255}
                />
                {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className={labelClass} htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                className={field}
                placeholder="Membership enquiry"
                maxLength={120}
              />
              {errors.subject && <p className="mt-2 text-xs text-destructive">{errors.subject}</p>}
            </div>

            <div className="mt-6">
              <label className={labelClass} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className={`${field} resize-none`}
                placeholder="How can we help?"
                maxLength={1000}
              />
              {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:shadow-glow disabled:opacity-60 sm:w-auto"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
