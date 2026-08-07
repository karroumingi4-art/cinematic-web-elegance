import { useState } from "react";
const FORMSPREE = "xgawovvo";
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
  const [check, setCheck] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "" });
  const total = cart.reduce((s, i) => s + i.p * i.q, 0);
  const add = (p: any) => { const s = sel[p.id]; setCart([...cart, { id: p.id, name: p.name, size: s.l, p: s.p, q: 1, img: p.img }]); setOpen(true); };
  const send = async () => {
    const det = cart.map((c: any) => c.name + " " + c.size + " " + c.p + "e").join(", ");
    await fetch("https://formspree.io/f/" + FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome: form.nome, email: form.email, tel: form.tel, ordine: det, totale: total }) });
    alert("Ordine inviato!"); setCart([]); setOpen(false); setCheck(false);
  };
  return (
    <div className="min-h-screen bg-[#080808] text-white p-5">
      <h1 className="font-black">SHOP - Tot {total}e</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {PROD.map((p) => (
          <div key={p.id} className="bg-[#111] border border-white/10 rounded-xl p-3">
            <img src={p.img} className="w-full h-60 object-cover rounded-lg bg-black" alt="" />
            <h3 className="font-bold mt-2 text-sm">{p.name} - {sel[p.id].p}e</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "4-5Y", p: p.k } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">4-5Y {p.k}e</button>
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "8-9Y", p: p.k } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">8-9Y {p.k}e</button>
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "12-14Y", p: p.k } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">12-14Y {p.k}e</button>
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "M", p: p.a } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">M {p.a}e</button>
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "L", p: p.a + 5 } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">L {p.a + 5}e</button>
              <button onClick={() => setSel({ ...sel, [p.id]: { l: "XXL", p: p.a + 10 } })} className="border border-white/20 px-2 py-1 rounded-full text-xs">XXL {p.a + 10}e</button>
            </div>
            <button onClick={() => add(p)} className="w-full bg-white text-black rounded-full py-2 mt-3 text-xs font-bold">AGGIUNGI {sel[p.id].p}e</button>
          </div>
        ))}
      </div>
      {open && (<div className="fixed inset-0 bg-black/70 z-50"><div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#151515] p-6"><button onClick={() => setOpen(false)}>Chiudi</button><h2 className="font-bold mt-4">Carrello {total}e</h2>{cart.map((c: any, i: number) => <p key={i} className="text-xs mt-2">{c.name} {c.size} {c.p}e</p>)}<button onClick={() => setCheck(true)} className="w-full bg-[#95BFE5] text-black rounded-full py-3 mt-5 font-bold">CHECKOUT</button></div></div>)}
      {check && (<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"><div className="bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-md"><input className="w-full bg-black border border-white/10 rounded-full px-4 py-2 mb-2 text-white" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /><input className="w-full bg-black border border-white/10 rounded-full px-4 py-2 mb-2 text-white" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input className="w-full bg-black border border-white/10 rounded-full px-4 py-2 mb-2 text-white" placeholder="Tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} /><div className="flex gap-2 mt-4"><button onClick={() => setCheck(false)} className="flex-1 border border-white/20 rounded-full py-3">Indietro</button><button onClick={send} className="flex-1 bg-white text-black rounded-full py-3 font-bold">INVIA {total}e</button></div></div></div>)}
    </div>
  );
}
