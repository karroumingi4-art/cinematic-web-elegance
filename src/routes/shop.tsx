import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

function ShopPage() {
  const [cart, setCart] = useState(0);

  const products = [
    { id: "granata", name: "Home Granata", price: 89, img: "/shop/maglia-granata.png" },
    { id: "nera", name: "Away Nera", price: 89, img: "/shop/maglia-nera.png" },
    { id: "gialla", name: "Portiere Gialla", price: 79, img: "/shop/maglia-gialla.png" },
    { id: "verde", name: "Third Verde", price: 79, img: "/shop/maglia-verde.png" },
  ];

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>GASTON VILLA SHOP - {cart} articoli</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#111", padding: "10px", borderRadius: "10px" }}>
            <img src={p.img} alt={p.name} style={{ width: "100%", height: "300px", objectFit: "cover", background: "#222" }} />
            <h3>{p.name}</h3>
            <p>{p.price} euro</p>
            <button onClick={() => setCart(cart + 1)} style={{ background: "white", color: "black", padding: "8px", borderRadius: "20px", marginTop: "5px", width: "100%" }}>
              Aggiungi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
