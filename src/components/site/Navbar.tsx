import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import mark from "@/assets/mark.png";

const links = [
  { label: "Club", href: "#about" },
  { label: "Fondo Eredità", href: "/legacy" },
  { label: "Biglietti", href: "/matchday" },
  { label: "Accademia", href: "/academy" },
  { label: "Il Circolo", href: "/club" },
  { label: "La Squadra", href: "#squad" },
  { label: "Calendario", href: "#matches" },
  { label: "Pronostici", href: "#predictions" },
  { label: "Pagelle", href: "#mvp" },
  { label: "Fan wall", href: "#fanwall" },
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid? "glass shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" className="flex min-w-0 items-center gap-3" aria-label="Gaston Villa, home">
          <img src="/GASTON_VILLA-removebg-preview.png" alt="Gaston Villa Logo" width={40} height={40} className="h-9 w-9 shrink-0 object-contain" />
          <span className="display truncate text-lg tracking-[0.18em] sm:text-xl">Gaston Villa</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {links.map((l) => {
            const isShop = l.href === "/shop";
            return (
              <a
                key={l.href}
                href={l.href}
                className={
                  isShop
                   ? "rounded-full bg-white text-black px-4 py-1.5 text-[0.75rem] font-black uppercase tracking-[0.12em] hover:bg-zinc-200 transition"
                    : "link-underline text-[0.8rem
