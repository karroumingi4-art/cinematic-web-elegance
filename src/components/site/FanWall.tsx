import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { z } from "zod";
import { Globe2, MessageSquareQuote, PenLine } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

type FanMessage = {
  id: string;
  name: string;
  country: string;
  message: string;
  created_at: string;
};

const schema = z.object({
  name: z.string().trim().min(2, "prego inserire nome e cognome").max(60),
  country: z.string().trim().min(2, "Prego inserire paese di residenza").max(60),
  message: z.string().trim().min(4, "parlaci un po'").max(180, "max. 180 caratteri"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const ARCHIVE_MESSAGES = 12855;
const ARCHIVE_COUNTRIES = 92;

const field =
  "mt-2 w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-primary focus:outline-none";
const labelClass = "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground";

// Messaggi dimostrativi fissi da far scorrere sul muro, dato che non c'è il database
const MOCK_MESSAGES: FanMessage[] = [
  { id: "1", name: "Marco", country: "Italia", message: "Forza Gaston Villa! Sempre con voi!", created_at: "" },
  { id: "2", name: "Alex", country: "Italia", message: "Quest'anno si vince il campionato!", created_at: "" },
  { id: "3", name: "Matteo", country: "Italia", message: "Il dodicesimo uomo in campo siamo noi.", created_at: "" },
];

function FanCard({ entry }: { entry: FanMessage }) {
  return (
    <article className="glass mx-3 flex w-[19rem] shrink-0 flex-col rounded-lg p-6 sm:w-[22rem]">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="display flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 text-lg text-primary"
        >
          {entry.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{entry.name}</p>
          <p className="mt-0.5 truncate text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
            {entry.country}
          </p>
        </div>
      </div>
      <p className="mt-5 font-serif text-base italic leading-relaxed text-foreground/80">“{entry.message}”</p>
    </article>
  );
}

function MarqueeRow({ entries, reverse }: { entries: FanMessage[]; reverse?: boolean }) {
  if (entries.length === 0) return null;
  const loop = [...entries, ...entries];

  return (
    <div className="group relative flex overflow-hidden py-3" aria-hidden="true">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-right" : "animate-marquee-left"} group-hover:[animation-play-state:paused]`}
      >
        {loop.map((entry, i) => (
          <FanCard key={`${entry.id}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export function FanWall() {
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    // Raccogliamo i dati inseriti nei campi corretti
    const formDataRaw = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const parsed = schema.safeParse(formDataRaw);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Controlla i campi evidenziati.");
      return;
    }

    setErrors({});
    setIsPending(true);

    const formData = new FormData();
    formData.append("Nome Tifoso", parsed.data.name);
    formData.append("Paese", parsed.data.country);
    formData.append("Messaggio per il Muro", parsed.data.message);

    try {
      const res = await fetch("https://formspree.io/f/mvkpglgl", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.success("Il tuo nome è sul Muro. Grazie per tutto.");
        form.reset();
      } else {
        throw new Error("Impossibile inviare");
      }
    } catch (error) {
      toast.error("Impossibile salvare il messaggio. Riprova più tardi.");
    } finally {
      setIsPending(false);
    }
  };

  const totalMessages = ARCHIVE_MESSAGES + 3;
  const totalCountries = ARCHIVE_COUNTRIES;

  const stats = [
    { icon: MessageSquareQuote, value: totalMessages.toLocaleString("en-US"), label: "Messaggi Inviati" },
    { icon: Globe2, value: `${totalCountries}`, label: "Paesi rappresentati" },
  ];

  return (
    <section id="fanwall" className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Fan wall"
          title={
            <>
              Firmato da <span className="text-[#95BFE5]">VOI</span>
            </>
          }
          intro="ogni messaggio lasciato qui rimarrà qui. Aggiungi il tuo in un muro di tifosi da tutto il mondo."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <Reveal>
            <div className="rounded-lg border border-border bg-surface p-8 shadow-elegant sm:p-10">
              <div className="grid gap-8 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <stat.icon className="size-6 text-primary" aria-hidden="true" />
                    <p className="display mt-5 text-4xl text-gradient-gold sm:text-5xl">{stat.value}</p>
                    <p className={`mt-3 ${labelClass}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-serif text-base italic leading-relaxed text-foreground/75">
                “Il dodicesimo uomo, il primo cuore.”
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-lg border border-border bg-surface p-8 shadow-elegant sm:p-10"
            >
              <div className="flex items-center gap-3">
                <PenLine className="size-5 text-primary" aria-hidden="true" />
                <h3 className="display text-2xl"> Firma sul Muro</h3>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="wall-name">
                    Name
                  </label>
                  <input id="wall-name" name="name" className={field} placeholder="Il tuo Nome" maxLength={60} />
                  {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="wall-country">
                    Country
                  </label>
                  <input id="wall-country" name="country" className={field} placeholder="Italia" maxLength={60} />
                  {errors.country && <p className="mt-2 text-xs text-destructive">{errors.country}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className={labelClass} htmlFor="wall-message">
                  Your message
                </label>
                <textarea
                  id="wall-message"
                  name="message"
                  rows={4}
                  className={field}
                  placeholder="Scrivi qui il tuo messaggio..."
                  maxLength={180}
                />
                {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-6 w-full rounded-full bg-primary py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isPending ? "Invio in corso…" : "Invia messaggio"}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Riga scorrevole animata con messaggi fissi nel codice */}
        <div className="mt-20">
          <MarqueeRow entries={MOCK_MESSAGES} />
        </div>
      </div>
    </section>
  );
}
