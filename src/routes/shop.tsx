import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/shop")({ component: ShopPage });


const FORMSPREE = "xqakzwln";


const items = [
  { id: "granata", name: "Home Granata", adult: 89, kid: 55, img: "/shop/maglia-granata.png" },
  { id: "nera", name: "Away Nera", adult: 89, kid: 55, img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere Gialla", adult: 79, kid: 49, img: "/shop/maglia-gialla.png" },
  { id: "verde", name: "Third Verde", adult: 79, kid: 49, img: "/shop/maglia-verde.png" },
];


function ShopPage() {
  const [sel, setSel] = useState<any>({ granata: { l: "M", p: 89 }, nera: { l: "M", p: 89 }, gialla: { l: "M", p: 79 }, verde: { l: "M", p: 79 } });
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "" });


  const total = cart.reduce((a, b) => a + b.p * b.q, 0);


  const add = (it: any) => {
    const s = sel[it.id];
    setCart([...cart, { ...it, size: s.l, p: s.p, q: 1 }]);
    setOpen(true);
  };


  const send = async () => {
    const text = cart.map((c) => c.name + " " + c.size + " " + c.p + "e").join(", ");
    await fetch("https://formspree.io/f/xgawovvo" + FORMSPREE, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ nome: form.nome, email: form.email, tel: form.tel, ordine: text, totale: total }),
    });
    alert("Ordine inviato!");
    setCart([]); setOpen(false);
  };


  return (
    <div style={{ background: "#080808", color: "white", minHeight: "100vh", padding: 20 }}>
      <h1>GASTON VILLA SHOP - {cart.length}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        {items.map((it) => (
          <div key={it.id} style={{ background: "#111", padding: 10, borderRadius: 10 }}>
            <img src={it.img} style={{ width: "100%", height: 250, objectFit: "cover" }} />
            <h3>{it.name} - {sel[it.id].p}e</h3>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "4-5Y", p: it.kid } })}>4-5Y {it.kid}e</button>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "8-9Y", p: it.kid } })}>8-9Y {it.kid}e</button>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "12-14Y", p: it.kid } })}>12-14Y {it.kid}e</button>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "M", p: it.adult } })}>M {it.adult}e</button>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "L", p: it.adult + 5 } })}>L {it.adult + 5}e</button>
              <button onClick={() => setSel({ ...sel, [it.id]: { l: "XXL", p: it.adult + 10 } })}>XXL {it.adult + 10}e</button>
            </div>
            <p>Selezionato: {sel[it.id].l}</p>
            <button onClick={() => add(it)} style={{ background: "white", color: "black", width: "100%", marginTop: 10, padding: 8, borderRadius: 20 }}>Aggiungi</button>
          </div>
        ))}
      </div>


      {open && (
        <div style={{ position: "fixed", right: 0, top: 0, width: 350, height: "100%", background: "#222", padding: 20 }}>
          <button onClick={() => setOpen(false)}>Chiudi X</button>
          <h2>Carrello {total}e</h2>
          {cart.map((c, i) => <p key={i}>{c.name} {c.size} {c.p}e</p>)}
          <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={{ width: "100%", marginTop: 10, color: "black" }} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", marginTop: 10, color: "black" }} />
          <input placeholder="Tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} style={{ width: "100%", marginTop: 10, color: "black" }} />
          <button onClick={send} style={{ background: "#95BFE5", width: "100%", marginTop: 10, padding: 10 }}>INVIA ORDINE</button>
        </div>
      )}
    </div>
  );
}
