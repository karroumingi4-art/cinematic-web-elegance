import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/matchday")({
  component: MatchdayPage,
});

function MatchdayPage() {
  const [settore, setSettore] = useState("centrale-medio");
  const [qty, setQty] = useState(2);

  const tribune = [
    { base: "onore", name: "Tribuna Onore", color: "#FF6B2B" },
    { base: "centrale", name: "Tribuna Centrale", color: "#FF8A3D" },
    { base: "distinti", name: "Distinti", color: "#60B7E8" },
    { base: "curva", name: "Curva Nord", color: "#8FB996" },
  ];

  const livelli = [
    { id: "alto", label: "ALTO", mod: -20 },
    { id: "medio", label: "MEDIO", mod: 0 },
    { id: "basso", label: "BASSO", mod: -40 },
  ];

  const allSettori: any[] = [];
  tribune.forEach(t=>{
    livelli.forEach(l=>{
      const basePrice = t.base==="onore"?249: t.base==="centrale"?149: t.base==="distinti"?89:49;
      allSettori.push({
        id: t.base + "-" + l.id,
        base: t.base,
        livello: l.id,
        name: t.name + " " + l.label,
        price: basePrice + l.mod,
        left: Math.floor(Math.random()*20)+5,
        color: t.color,
      });
    });
  });

  const sel = allSettori.find(s=>s.id===settore)!;

  const seats: any[] = [];
  const rings = [
    { off: 30, liv: "basso" },
    { off: 48, liv: "medio" },
    { off: 66, liv: "alto" },
  ];

  rings.forEach(ring=>{
    for(let i=0;i<100;i++){
      const angle = (i/100)*Math.PI*2 - Math.PI/2;
      const rx = 120 + ring.off;
      const ry = 75 + ring.off*0.65;
      const x = 250 + Math.cos(angle)*rx;
      const y = 165 + Math.sin(angle)*ry;
      let base = "curva";
      if(y < 85) base = "onore";
      else if(y > 245) base = "centrale";
      else if(x < 130) base = "distinti";
      seats.push({ x, y, angle, base, livello: ring.liv, id: base + "-" + ring.liv });
    }
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text- font-black tracking-widest text-[#95BFE5] uppercase">MAPPA STADIO - 12 SETTORI - 3 LIVELLI</h2>
          <div className="mt-4 bg-[#111] border border-white/10 rounded- p-4">
            <div className="bg-[#0a0a0a] rounded- border border-white/5 aspect-[1.6/1] overflow-hidden">
              <svg viewBox="0 0 500 330" className="w-full h-full">
                <ellipse cx="250" cy="165" rx="90" ry="60" fill="#4CAF50" />
                <circle cx="250" cy="165" r="15" fill="none" stroke="white" strokeOpacity="0.3" />
                {seats.map((s,i)=>{
                  const trib = tribune.find(t=>t.base===s.base)!;
                  const isSel = s.id===settore;
                  return (
