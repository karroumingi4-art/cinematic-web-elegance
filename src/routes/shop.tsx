import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

const PROD = [
  { id: "granata", name: "Home Granata", a: 89, k: 55, img: "/shop/maglia-gialla.png" },
  { id: "nera", name: "Away Nera", a: 89, k: 55, img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere Gialla", a: 79, k: 49, img: "/shop/maglia-granata.png" },
  { id: "verde", name: "Third Verde", a: 79, k: 49, img: "/shop/maglia-verde.png" },
];

export function ShopPage() {
  const [sel, setSel] = useState<any>({ granata: { l: "M", p: 89 }, nera: { l: "M", p: 89 }, gialla: { l: "M", p: 79 }, verde: { l: "M", p: 79 } });
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((s, i) => s + i.p * i.q, 0);
  const pay = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart, email }) });
    const data = await res.json();
    window.location.href = data.url;
  };
  return (
    <div className="min-h-screen bg-[#080808] text-white p-5 pt-20">
      <div className="flex justify-between max-w-7xl mx-auto"><h1 className="font-black text-xl">GASTON VILLA SHOP</h1><button onClick={() => setOpen(true)} className="bg-white text-black rounded-full px-4 py-2 text-xs font-bold">CARRELLO {total}€ ({cart.length})</button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-7xl mx-auto">
        {PROD.map((p) => (
          <div key={p.id} className="bg-[#111] border border-white/10 rounded-2xl p-3">
            <div className="bg-[#0f0f0f] rounded-xl overflow-hidden aspect-[4/5]"><img src={p.img} alt={p.name} className="w-full h-full object-contain" /></div>
            <h3 className="font-bold mt-3 text-sm">{p.name}</h3>
            <p className="text-[#95BFE5] font-black text-lg">{sel[p.id].p}€ <span className="text-white/30 text-xs">{sel[p.id].l}</span></p>
            <div className="flex flex-wrap gap-1 mt-2">
              {(["4-5Y","8-9Y","12-14Y","M","L","XXL"] as const).map(sz => {
                const price = sz==="M"?p.a : sz==="L"?p.a+5 : sz==="XXL"?p.a+10 : p.k;
                return <button key={sz} onClick={() => setSel({...sel, [p.id]: { l: sz, p: price } })} className={`px-2 py-1 rounded-full border text- ${sel[p.id].l===sz?"bg-white text-black border-white":"border-white/20 text-white/70"}`}>{sz} {price}€</button>
              })}
            </div>
            <button onClick={() => { setCart([...cart, { name: p.name, size: sel[p.id].l, p: sel[p.id].p, q: 1 }]); setOpen(true); }} className="w-full bg-white text-black rounded-full py-2.5 mt-3 text-xs font-bold">AGGIUNGI - {sel[p.id].p}€</button>
          </div>
        ))}
      </div>
      {open && <div className="fixed inset-0 bg-black/80 z-50 flex justify-end"><div className="bg-[#151515] w-full max-w-sm p-6 h-full"><div className="flex justify-between"><h2 className="font-bold">Carrello {total}€</h2><button onClick={() => setOpen(false)} className="border border-white/20 w-8 h-8 rounded-full">X</button></div><div className="mt-5 space-y-2">{cart.map((c:any,i:number)=><p key={i} className="text-sm flex justify-between"><span>{c.name} {c.size}</span><span>{c.p}€</span></p>)}</div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email per ricevuta" className="w-full mt-6 p-3 rounded-full bg-black border border-white/10 text-white text-sm" /><button onClick={pay} disabled={loading||!cart.length} className="w-full bg-[#95BFE5] text-black py-3 rounded-full font-black mt-3">{loading?"CARICO...":`PAGA ${total}€ CON STRIPE`}</button><p className="text-white/30 text- mt-2 text-center">Pagamento sicuro con Stripe • 2€ spedizione inclusa dopo</p></div></div>}
    </div>
  );
}
