import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";


const links = [
  { label: "Club", href: "#about" },
  { label: "Fondo Eredita", href: "/legacy" },
  { label: "Biglietti", href: "/matchday" },
  { label: "Tour Stadio", href: "/stadium" },
  { label: "Accademia", href: "/academy" },
  { label: "Il Circolo", href: "/club" },
  { label: "La Squadra", href: "#squad" },
  { label: "Calendario", href: "#matches" },
  { label: "Pronostici", href: "#predictions" },
  { label: "Pagelle", href: "#mvp" },
  { label: "Fan wall", href: "#fanwall" },
  { label: "Tribunale", href: "#tribunale" },
  { label: "Shop", href: "/shop" },
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
    document.body.style.overflow = open? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);


  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid? "glass shadow-elegant" : "bg-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        
        {/* Il testo Gaston Villa è stato rimosso. Rimane solo l'immagine del logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img src="/GASTON_VILLA-removebg-preview.png" alt="Logo" width={40} height={40} className="h-9 w-9 object-contain" />
        </a>


        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => {
            const isShop = l.href === "/shop";
            return (
              <a key={l.href} href={l.href} className={isShop? "rounded-full bg-white text-black px-4 py-1.5 text-xs font-black uppercase tracking-widest hover:bg-zinc-200" : "text-xs font-semibold uppercase tracking-widest text-foreground/75 hover:text-foreground"}>
                {l.label}
              </a>
            );
          })}
        </nav>


        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground sm:inline-flex">
            Membership
          </a>
          <button type="button" onClick={() => setOpen((v) =>!v)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-border lg:hidden">
            {open? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>


      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="glass overflow-hidden lg:hidden">
            <nav className="flex flex-col px-5 pb-8 pt-2">
              {links.map((l, i) => {
                const isShop = l.href === "/shop";
                return (
                  <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }} className={isShop? "mt-2 rounded-full bg-white text-black py-3 text-sm font-black uppercase text-center" : "display border-b border-border py-4 text-xl"}>
                    {l.label}
                  </motion.a>
                );
              })}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-xs font-bold uppercase">
                Iscrizioni
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
