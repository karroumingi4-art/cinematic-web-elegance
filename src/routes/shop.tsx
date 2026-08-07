import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/shop")({
  component: ShopPage,
});


// METTI QUI IL TUO ID FORMSPREE - quello dopo /f/
const FORMSPREE_ID = "xgawovvo"; // <-- CAMBIA QUESTO con il tuo


type SizeOpt = { label: string; price: number; type: "adult" | "kid" };
type Product = { id: string; name: string; adultPrice: number; kidPrice: number; badge: string; img: string; };


const PRODUCTS: Product[] = [
  { id: "granata", name: "Home Granata", adultPrice: 89, kidPrice: 55, badge: "PRIMA MAGLIA", img: "/shop/maglia-granata.png" },
  { id: "nera", name: "Away Nera", adultPrice: 89, kidPrice: 55, badge: "SECONDA MAGLIA", img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere Gialla", adultPrice: 79, kidPrice: 49, badge: "PORTIERE", img: "/shop/maglia-gialla.png" },
  { id: "verde", name: "Third Verde", adultPrice: 79, kidPrice: 49, badge: "TERZA MAGLIA", img: "/shop/maglia-verde.png" },
];


function getSizes(p: Product): SizeOpt[] {
  return [
    { label: "4-5Y", price: p.kidPrice, type: "kid" },
    { label: "6-7Y", price: p.kidPrice, type: "kid" },
    { label: "8-9Y", price: p.kidPrice, type: "kid" },
    { label: "10-11Y", price: p.kidPrice, type: "kid" },
    { label: "12-14Y", price: p.kidPrice, type: "kid" },
    { label: "S", price: p.adultPrice, type: "adult" },
    { label: "M", price: p.adultPrice, type: "adult" },
    { label: "L", price: p.adultPrice + 5, type: "adult" },
    { label: "XL", price: p.adultPrice + 5, type: "adult" },
    { label: "XXL", price: p.adultPrice + 10, type: "adult" },
  ];
}


function ShopPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<Record<string, SizeOpt>>({
    granata: { label: "M", price: 89, type: "adult" },
    nera: { label: "M", price: 89, type: "adult" },
    gialla: { label: "M", price: 79, type: "adult" },
    verde: { label: "M", price: 79, type: "adult" },
  });
  const [form, setForm] = useState({ nome: "", email: "", telefono: "", indirizzo: "" });


  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);


  const add = (p: Product) => {
    const size = selected[p.id];
    const ex = cart.find((c) => c.id === p.id && c.size === size.label);
    if (ex) setCart(cart.map((c) => (c === ex? {...c, qty: c.qty + 1 } : c)));
    else setCart([...cart, { id: p.id, name: p.name, size: size.label, price: size.price, img: p.img, qty: 1, type: size.type }]);
    setOpen(true);
  };


  const sendOrder = async () => {
    if (!form.nome || !form.email || !form.telefono) { alert("Compila nome, email e telefono"); return; }
    setSending(true);
    const orderDetails = cart.map(c => `${c.name} [${c.size}] x${c.qty} = ${c.price * c.qty}€`).join("\n");
    const payload = {
      nome: form.nome,
      email: form.email,
      telefono: form.telefono,
      indirizzo: form.indirizzo,
      totale: total + "€",
      ordine: orderDetails,
      _subject: `NUOVO ORDINE Gaston Villa - ${total}€ da ${form.nome}`,
    };
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Ordine inviato! Ti contattiamo su WhatsApp per pagamento e spedizione.");
        setCart([]); setOpen(false); setCheckoutOpen(false);
        setForm({ nome: "", email: "", telefono: "", indirizzo: "" });
      } else { alert("Errore invio, riprova o scrivi su WhatsApp"); }
    } catch { alert("Errore rete, riprova"); }
    setSending(false);
  };


  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-5 py-5 flex justify-between items-center border-b border-white/10">
        <h1 className="font-black tracking-widest">GASTON VILLA SHOP</h1>
        <button onClick={() => setOpen(true)} className="bg-white text-black rounded-full px-5 py-2 text-xs font-bold">CARRELLO ({
