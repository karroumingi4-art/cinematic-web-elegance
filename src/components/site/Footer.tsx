import { useState } from "react";
import { toast } from "sonner";
import { Facebook, Instagram, Youtube } from "lucide-react";
import mark from "@/assets/mark.png";

const columns = [
  {
    heading: "Club",
    links: [
      { label: "Sul Club", href: "#about" },
      { label: "Programmi", href: "#programms" },
      { label: "Galleria", href: "#gallery" },
    ],
  },
  {
    heading: "I Tifosi",
    links: [
      { label: "Diario", href: "#journal" },
      { label: "Voci", href: "#voices" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "VIsita",
    links: [
      { label: "Contattaci", href: "#contact" },
      { label: "Tour dello Stadio", href: "#faq" },
      { label: "Partner", href: "#journal" },
    ],
  },
];

const socials = [
  { icon: Instagram, label: "Gaston Villa on Instagram" },
  { icon: Facebook, label: "Gaston Villa on Facebook" },
  { icon: Youtube, label: "Gaston Villa on YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || value.length > 255) {
      toast.error("prego inserire un indirizzo e-mail valido.");
      return;
    }
    setEmail("");
    toast.success("Sei nella lista... attendi per la newsletter di Lunedì.");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.6fr_1.2fr]">
          <div>
            <div className="flex min-w-0 items-center gap-3">
              <img src={mark} alt="" width={40} height={40} loading="lazy" className="h-9 w-9 shrink-0 object-contain" />
              <span className="display text-lg tracking-[0.18em]">Ardente</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Gaston Villa Football Club. Fondato nel 2023 a Trento. Posseduto in parte dai propri Tifosi.
            </p>
            <ul className="mt-7 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#hero"
                    aria-label={s.label}
                    className="grid min-h-11 min-w-11 place-items-center rounded-full border border-border text-foreground/70 transition-all duration-400 hover:scale-105 hover:border-primary hover:text-primary"
                  >
                    <s.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
                  {col.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
              Newsletter
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Una newsletter ogni lunedì: notizie sulla squadra, approfondimenti e informazioni sui biglietti. .
            </p>
            <form onSubmit={subscribe} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-md border border-input bg-surface px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-11 shrink-0 rounded-full bg-primary px-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gaston Villa Football Club. Tutti i diritti riservati.</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <a href="#faq" className="link-underline hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="#faq" className="link-underline hover:text-foreground">
                Termini
              </a>
            </li>
            <li>
              <a href="#faq" className="link-underline hover:text-foreground">
                Accessibilità
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
