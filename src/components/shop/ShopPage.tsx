import { useState } from "react";
const PROD = [
  { id: "granata", name: "Home Granata", a: 89, k: 55, img: "/shop/maglia-granata.png" },
  { id: "nera", name: "Away Nera", a: 89, k: 55, img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere Gialla", a: 79, k: 49, img: "/shop/maglia-gialla.png" },
  { id: "verde", name: "Third Verde", a: 79, k: 49, img: "/shop/maglia-verde.png" },
];
export function ShopPage() {
  const [sel, setSel] = useState<any>({ granata: { l: "M", p: 89 }, nera: { l: "M", p: 89 }, gialla: { l: "M", p: 79 }, verde: { l: "M", p: 79 } });
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const total = cart.reduce((s: any, i: any) => s + i.p * i.q, 0);
  return (
    <div className="min-h-screen bg-[#080808] text-white p-5">
      <div className="flex justify-between"><h1 className="font-black">GASTON VILLA SHOP</h1><button onClick={() => setOpen(true)} className="bg-white text-black rounded-full px-4 py-2 text-xs font-bold">CARRELLO {total}€ ({cart.length})</button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {PROD.map((p) => (
          <div key={p.id} className="bg-[#111] border border-white/10 rounded-2xl p-3">
            <div className="bg-[#0f0f0f] rounded-xl overflow-hidden aspect-[4/5]"><img src={p.img} alt={p.name} className="w-full h-full object-contain" /></div>
            <h3 className="font-bold mt-3 text-sm">{p.name}</h3>
            <p className="text-[#95BFE5] font-black text-lg">{sel[p.id].p}€</p>
            <button onClick={() => { setCart([...cart, { name: p.name, size: sel[p.id].l, p: sel[p.id].p, q: 1 }]); setOpen(true); }} className="w-full bg-white text-black rounded-full py-2.5 mt-3 text-xs font-bold">AGGIUNGI {sel[p.id].p}€</button>
          </div>
        ))}
      </div>
      {open && <div className="fixed inset-0 bg-black/80 z-50 flex justify-end"><div className="bg-[#151515] w-full max-w-sm p-6 h-full"><button onClick={() => setOpen(false)}>CHIUDI</button><p className="mt-4">Totale {total}€</p></div></div>}
    </div>
  );
}
