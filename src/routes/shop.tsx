import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shop")({ component: ShopPage });

const FORMSPREE = "xgawovvo"; // metti il tuo ID qui

const PROD = [
  { id: "granata", name: "Home Granata", a: 89, k: 55, img: "/shop/maglia-granata.png" },
  { id: "nera", name: "Away Nera", a: 89, k: 55, img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere Gialla", a: 79, k: 49, img: "/shop/maglia-gialla.png" },
  { id: "verde", name: "Third Verde", a: 79, k: 49, img: "/shop/maglia-verde.png" },
];

export function ShopPage() {
  const [sel, setSel] = useState<any>({ granata: { l: "M", p: 89, t: "adult" }, nera: { l: "M", p: 89, t: "adult" }, gialla: { l: "M", p: 79, t: "adult" }, verde: { l: "M", p: 79, t: "adult" } });
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "", addr: "" });
  const [load, setLoad] = useState(false);
  const total = cart.reduce((s, i) => s + i.p * i.q, 0);

  const add = (p: any) => {
    const s = sel[p.id];
    const ex = cart.find((c) => c.id === p.id && c.size === s.l);
    if (ex) setCart(cart.map((c) => (c === ex? {...c, q: c.q + 1 } : c)));
    else setCart([...cart, { id: p.id, name: p.name, size: s.l, p: s.p, q: 1, t: s.t, img: p.img }]);
    setOpen(true);
  };

  const send = async () => {
    if (!form.nome ||!form.email) { alert("Metti nome ed email"); return; }
    setLoad(true);
    const det = cart.map((c) => `${c.name} ${c.size} x${c.q} = ${c.p * c.q}e`).join("\n");
    await fetch("https://formspree.io/f/xgawovvo" + FORMSPREE, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ nome: form.nome, email: form.email, telefono: form.tel, indirizzo: form.addr, ordine: det, totale: total + "e" }),
    });
    alert("Ordine inviato! Ti scriviamo su WhatsApp");
    setCart([]); setOpen(false); setCheck(false); setLoad(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-5 py-5 flex justify-between border-b border-white/10">
        <h1 className="font-black tracking-widest text-sm">GASTON VILLA SHOP</h1>
        <button onClick={() => setOpen(true)} className="bg-white text-black rounded-full px-5 py-2 text-xs font-bold">CARRELLO ({cart.length})</button>
      </div>

      <div className="max-w-7xl mx-auto p-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {PROD.map((p) => (
          <div key={p.id} className="bg-[#111] border border-white/10 rounded-2xl p-3">
            <div className="aspect-[4/5] bg-[#0f0f0f] rounded-xl overflow-hidden relative">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/80 text- px-2 py-1 rounded-full">{sel[p.id].t === "kid"? "BAMBINO" : "ADULTO"}</div>
            </div>
            <h3 className="font-bold text-sm mt-3">{p.name}</h3>
            <p className="text-[#95BFE5] font-black">{sel[p.id].p},00e</p>
            <p className="text- text-white/40">{sel[p.id].l} - {sel[p.id].t === "kid"? p.k + "e base" : "da " + p.a + "e"}</p>

            <div className="mt-3 flex flex-wrap gap-1">
              {[{ l: "4-5Y", p: p.k, t: "kid" }, { l: "8-9Y", p: p.k, t: "kid" }, { l: "12-14Y", p: p.k, t: "kid" }, { l: "M", p: p.a, t: "adult" }, { l: "L", p: p.a + 5, t: "adult" }, { l: "XXL", p: p.a + 10, t: "adult" }].map((s) => (
                <button key={s.l} onClick={() => setSel({...sel, [p.id]: s })} className={`px-2 py-1 rounded-full border text- ${sel[p.id].l === s.l? "bg-white text-black" : "border-white/20"}`}>{s.l}</button>
              ))}
            </div>
            <button onClick={() => add(p)} className="w-full mt-3 bg-white text-black rounded-full py-2 text-xs font-bold">AGGIUNGI - {sel[p.id].p}e</button>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#151515] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between"><h2 className="font-bold">CARRELLO</h2><button onClick={() => setOpen(false)} className="border border-white/20 w-8 h-8 rounded-full">X</button></div>
            <div className="mt-5 space-y-2">{cart.map((c, i) => <div key={i} className="flex justify-between text-xs border-b border-white/10 py-2"><span>{c.name} {c.size} x{c.q}</span><span>{c.p * c.q}e</span></div>)}</div>
            <div className="mt-5 flex justify-between font-black"><span>Totale</span><span>{total}e</span></div>
            <button onClick={() => setCheck(true)} className="w-full mt-5 bg-[#95BFE5] text-black rounded-full py-3 font-bold text-xs">CHECKOUT</button>
          </div>
        </div>
      )}

      {check && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h2 className="font-black mb-4">Dati spedizione</h2>
            <input className="w-full bg-black border border-white/10 rounded-full px-4 py-2 text-sm mb-2 text-white" placeholder="Nome*" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value })} />
            <input className="w-full bg-black border border-white/10 rounded-full px-4 py-2 text-sm mb-2 text-white" placeholder="Email*" value={form.email} onChange={(e) => setForm({...form, email: e.target.value })} />
            <input
