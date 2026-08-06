import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import mark from "@/assets/mark.png";

const links = [
  { label: "Club", href: "#about" },
  { label: "Programmi", href: "#programmes" },
  { label: "La Squadra", href: "#squad" },
  { label: "Galleria", href: "#gallery" },
  { label: "Diario", href: "#journal" },
  { label: "Voci", href: "#voices" },
  { label: "Fan wall", href: "#fanwall" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "glass shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" className="flex min-w-0 items-center gap-3" aria-label="Ardente FC, home">
          <img src={mark} alt="" width={40} height={40} className="h-9 w-9 shrink-0 object-contain" />
          <span className="display truncate text-lg tracking-[0.18em] sm:text-xl">Ardente</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-foreground/75 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-6 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
          >
            Membership
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid min-h-11 min-w-11 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 pb-8 pt-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="display border-b border-border py-4 text-2xl text-foreground/85"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-primary-foreground"
              >
                Iscrizioni
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
