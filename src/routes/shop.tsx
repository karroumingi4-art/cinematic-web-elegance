import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({ component: ShopPage });

type Product = { id: string; name: string; price: number; color: string; img: string };
const PRODUCTS: Product[] = [
  { id: "home", name: "Maglia Home 24/25 - Rossa", price: 79, color: "bg-red-600", img: "HOME" },
  { id: "home", name: "Maglia away 26/27 - Nera", price: 79, color: "bg-red-600", img: "/shop/maglia-nera-unieuro.png", // <- la tua nuova fotoisImage: true },
  { id: "training", name: "Maglia Training - Nera", price: 55, color: "bg-black", img: "TRAINING" },
];,
  { id: "training", name: "Maglia Training - Nera", price: 55, color: "bg-black border-white/20", img: "TRAINING" },
  { id: "keeper", name: "Kit Portiere - Verde", price: 69, color: "bg-emerald-600", img: "KEEPER" },
];

type CartItem = Product & { size: string; qty: number };

function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState<Record<string,string>>({});

  const add = (p: Product) => {
    const size = sizes[p.id] || "M";
    setCart(prev => {
      const ex = prev.find(i => i.id===p.id && i.size===size);
      if (ex) return prev.map(i => i===ex? {...i, qty: i.qty+1}: i);
      return [...prev, {...p, size, qty: 1}];
    });
    setOpen(true);
    toast.success(`${p.name} - ${size} aggiunto`);
  };

  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-widest">Gaston Villa <span className="text-[#95BFE5]">Shop</span></h1>
          <button onClick={()=>setOpen(true)} className="relative bg-white text-black rounded-full px-5 py-2.5 font-bold text-xs flex gap-2 items-center">
            <ShoppingBag className="size-4" /> Carrello ({cart.reduce((s,i)=>s+i.qty,0)})
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(p=>(
            <div key={p.id} className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className={`aspect-[3/4] rounded-xl grid place-items-center font-black text-2xl ${p.color}`}>{p.img}</div>
              <h3 className="font-bold mt-4 text-sm">{p.name}</h3>
              <p className="text-[#95BFE5] font-black mt-1">{p.price} €</p>
              <div className="flex gap-1.5 mt-3">
                {["S","M","L","XL"].map(s=>(
                  <button key={s} onClick={()=>setSizes(prev=>({...prev,[p.id]:s}))} className={`size-8 rounded-full border text- font-bold ${sizes[p.id]===s? "bg-white text-black border-white": "border-white/20"}`}>{s}</button>
                ))}
              </div>
              <button onClick={()=>add(p)} className="w-full mt-4 bg-white text-black rounded-full py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200">Aggiungi</button>
            </div>
          ))}
        </div>

        {open && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={()=>setOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#111] border-l border-white/10 p-6 overflow-y-auto" onClick={e=>e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6"><h2 className="font-bold">Il tuo carrello</h2><button onClick={()=>setOpen(false)}><X className="size-5" /></button></div>
              {cart.length===0? <p className="text-sm text-zinc-500">Carrello vuoto</p> : <>
                {cart.map((i,idx)=>(
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10">
                    <div><p className="text-sm font-bold">{i.name}</p><p className="text-xs text-zinc-500">{i.size} • {i.price}€</p></div>
                    <div className="flex items-center gap-2"><button onClick={()=>setCart(c=>c.map(x=>x===i? {...x,qty:Math.max(1,x.qty-1)}:x))}><Minus className="size-3" /></button><span className="text-xs w-4 text-center">{i.qty}</span><button onClick={()=>setCart(c=>c.map(x=>x===i? {...x,qty:x.qty+1}:x))}><Plus className="size-3" /></button></div>
                  </div>
                ))}
                <div className="mt-6"><p className="flex justify-between font-black"><span>Totale</span><span>{total} €</span></p><p className="text- text-zinc-500 mt-1">{total>=120? "Spedizione gratis!": "Aggiungi "+(120-total)+"€ per spedizione gratis"}</p>
                <button onClick={()=>{toast.success("Ordine inviato! Ti scriviamo su WhatsApp"); setCart([]); setOpen(false)}} className="w-full mt-4 bg-[#95BFE5] text-black rounded-full py-3 font-bold uppercase text-xs">Checkout • {total}€</button></div>
              </>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
