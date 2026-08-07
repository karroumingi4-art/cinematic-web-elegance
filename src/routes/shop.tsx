import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

type Product = {
  id: string;
  name: string;
  price: number;
  badge: string;
  img: string;
};

const PRODUCTS: Product[] = [
  { id: "granata", name: "Home 26/27 - Granata", price: 89, badge: "PRIMA MAGLIA", img: "/shop/maglia-granata.png" },
  { id: "nera", name: "Away 26/27 - Nera", price: 89, badge: "SECONDA MAGLIA", img: "/shop/maglia-nera.png" },
  { id: "gialla", name: "Portiere 26/27 - Gialla", price: 79, badge: "PORTIERE", img: "/shop/maglia-gialla.png" },
  { id: "verde", name: "Third 26/27 - Verde", price: 79, badge: "TERZA MAGLIA", img: "/shop/maglia-verde.png" },
];

function ShopPage() {
  const [cart, setCart] = useState<{ id: string; size: string; qty: number; name: string; price: number; img: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState<Record<string, string>>({ granata: "M", nera: "M", gialla: "M", verde: "M" });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p: Product) => {
    const size = sizes[p.id] || "M";
    const existing = cart.find((c) => c.id === p.id && c.size === size);
    if (existing) {
      setCart(cart.map((c) => (c === existing? {...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { id: p.id, size, qty: 1, name: p.name, price: p.price, img: p.img }]);
    }
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-5 py-5 flex justify-between items-center border-b border-white/10">
        <h1 className="text-lg font-black tracking-widest">GASTON VILLA SHOP</h1>
        <button onClick={() => setOpen(true)} className="bg-white text-black rounded-full px-5 py-2 text-xs font-bold">
          CARRELLO ({count})
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="bg-[#111113] border border-white/10 rounded-2xl p-3">
            <div className="aspect-[4/5] bg-[#0f0f0f] rounded-xl overflow-hidden relative">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/80 text- px-2 py-1 rounded-full tracking-widest">{p.badge}</div>
            </div>
            <h3 className="font-bold text-sm mt-3">{p.name}</h3>
            <p className="text-[#95BFE5] font-black mt-1">{p.price},00 EUR</p>
            <div className="flex gap-1 mt-3">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSizes({...sizes, [p.id]: s })}
                  className={`w-8 h-8 rounded-full border text- ${sizes[p.id] === s? "bg-white text-black" : "border-white/20"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => addToCart(p)} className="w-full mt-3 bg-white text-black rounded-full py-2.5 text- font-bold uppercase tracking-widest">
              Aggiungi
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#151515] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm uppercase">Carrello</h2>
              <button onClick={() => setOpen(false)} className="border border-white/20 rounded-full w-8 h-8">X</button>
            </div>
            {cart.length === 0? (
              <p className="text-sm text-zinc-500 mt-10 text-center">Carrello vuoto</p>
            ) : (
              <>
                <div className="mt-6 space-y-3">
                  {cart.map((i, idx) => (
                    <div key={idx} className="flex gap-3 text-xs border-b border-white/10 pb-3">
                      <img src={i.img} alt={i.name} className="w-12 h-16 object-cover rounded bg-black" />
                      <div className="flex-1">
                        <p className="font-bold">{i.name}</p>
                        <p className="text-white/50">{i.size} x {i.qty}</p>
                      </div>
                      <p>{i.price * i.qty} EUR</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between font-black"><span>Totale</span><span>{total},00 EUR</span></div>
                  <button onClick={() => { alert("Ordine inviato su WhatsApp!"); setCart([]); setOpen(false); }} className="w-full mt-4 bg-[#95BFE5] text-black rounded-full py-3 font-bold text-xs uppercase">Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
