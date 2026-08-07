import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Prego inserire nome e cognome").max(100),
  email: z.string().trim().email("Prego inserire indirizzo email valido").max(255),
  subject: z.string().trim().min(2, "Prego inserire oggetto").max(120),
  message: z.string().trim().min(10, "raccontaci di più (min. 10 parole)").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const details = [
  { icon: MapPin, label: "Gaston Villa Park", value: "Loc.Centa,4 " },
  { icon: Phone, label: "uffci del CLub", value: "+39 055 0100 190" },
  { icon: Mail, label: "Membership", value: "members@ardentefc.com" },
];

const field =
  "mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-primary focus:outline-none";
const labelClass = "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      toast.error("Per favore controllare le zone sottolineate.");
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const res = await fetch("https://formspree.io/f/xyegzvwa", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        form.reset();
        toast.success("Messagio ricevuto. l'amministrazione le risponderà in un giorno lavorativo.");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Impossibile inviare il messaggio. Riprova più tardi.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Speak to <span className="text-[#95BFE5]">the club</span>
              </>
            }
            intro="Membership, hospitality, Provini o partnership — Scrivici e un membro dello staff le risponderà."
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
                <input id="contact-name" name="name" className={field} placeholder="Il tuo nome" maxLength={100} />
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
                id="contatto"
                name="subject"
                className={field}
                placeholder="richiesta di membership"
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
                placeholder="come possiamo aiutarti?"
                maxLength={1000}
              />
              {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:shadow-glow disabled:opacity-60 sm:w-auto"
            >
              {sending ? "Sending…" : "Invia"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
