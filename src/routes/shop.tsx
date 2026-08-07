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
  {
    id: "granata",
    name: "Home 26/27 - Granata",
    price: 79,
    badge: "PRIMA MAGLIA",
    img: "/shop/maglia-granata.png"
  },
  {
    id: "nera",
    name: "Away 26/27 - Nera",
    price: 99,
    badge: "SECONDA MAGLIA",
    img: "/shop/maglia-nera.png"
  },
  {
    id: "gialla",
    name: "Portiere 26/27 - Gialla",
    price: 110,
    badge: "PORTIERE",
    img: "/shop/maglia-gialla.png"
  },
  {
    id: "verde",
    name: "Third 26/27 - Verde",
    price: 90,
    badge: "TERZA MAGLIA",
    img: "/shop/maglia-verde.png"
  },
];

type CartItem = Product & { size: string; qty: number };

function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState<Record<string,string>>({
    granata: "M",
    nera: "M",
    gialla: "M",
    verde: "M"
  });

  const add = (p: Product) => {
    const size = sizes[p.id] || "M";
    setCart(prev => {
      const found = prev.find(i => i.id === p.id && i.size === size);
      if (found) {
        return prev.map(i => i === found ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...p, size, qty: 1 }];
    });
    setOpen(true);
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-5 py-6 flex justify-between items-center border-b border-white/10">
        <h1 className="text-xl font-black uppercase
