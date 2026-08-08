import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/circolo")({ component: CircoloPage });

const PLANS = [
  { id: "tifoso", name: "Tifoso", price: 99, rate: "33€ x 3 mesi", features: ["Accesso prioritario biglietti", "10% sconto Shop", "Newsletter segreta", "Nome sul muro digitale"], cta: "Tifoso" },
  { id: "socio", name: "Socio", price: 250, rate: "84€ x 3 mesi", popular: true, features: ["Tutto Tifoso +", "Accesso allenamenti a porte chiuse (2/mese)", "Entrata anticipata stadio", "Tessera digitale con QR + sciarpa ufficiale", "Invito cena di Natale"], cta: "Socio" },
  { id: "premium", name: "Premium", price: 600, rate: "200€ x 3 mesi", features: ["Tutto Socio +", "Posti Tribuna d'Onore per 5 gare", "Tour spogliatoio con giocatore", "Cena con staff tecnico", "Maglia gara autografata"], cta: "Premium" },
];

function CircoloPage() {
  const [posti, setPosti] = useState(124);
  const [plan, setPlan] = useState("socio");
  const [isRate, setIsRate] = useState(false);
  const selected = PLANS.find(p => p.id === plan)!;

  useEffect(() => {
    const i = setInterval(() => setPosti(p => p > 98? p - 1 : 124), 8000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24">
      {/* FOMO BAR */}
      <div className="bg-[#95BFE5] text-black text-center py-2.5 text- font-bold tracking-[0.2em] uppercase">
        ⚠️ Stagione 26/27 - Solo <span className="bg-black text-white px-2 py-0.5 rounded-full mx-1">{posti} posti rimasti su 200</span> per Il Circolo - Chiusura iscrizioni 31 Agosto
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center">
          <h1 className="display text-5xl sm:text-7xl font-black">IL CIRCOLO</h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">Non è un abbonamento. È entrare dentro al club. 200 persone. Zero turisti.</p>

          <div className="mt-8 inline-flex bg-[#111] border border-white/10 rounded-full p-1">
            <button onClick={()=>setIsRate(false)} className={`px-6 py-2 rounded-full text-xs font-bold transition ${!isRate? "bg-white text-black" : "text-white/50"}`}>Una Tantum</button>
            <button onClick={()=>setIsRate(true)} className={`px-6 py-2 rounded-full text-xs font-bold transition ${isRate? "bg-white text-black" : "text-white/50"}`}>A Rate (0% interessi)</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {PLANS.map(p => (
            <div key={p.id} onClick={()=>setPlan(p.id)} className={`relative rounded- border p-7 cursor-pointer transition-all ${plan===p.id? "bg-white text-black border-white scale-[1.02]" : "bg-[#111] border-white/10 hover:border-white/20"} ${p.popular? "shadow-[0_0_40px_rgba(149,191,229,0.2)]" : ""}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#95BFE5] text-black text- font-black px-3 py-1 rounded-full tracking-widest">PIÙ SCELTO</div>}
              <h3 className="font-black text-xl">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-2"><span className="text-4xl font-black">{isRate? p.rate : `${p.price}€`}</span><span className={`text-xs ${plan===p.id? "text-black/60" : "text-white/50"}`}>/anno</span></div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map(f => <li key={f} className={`text- flex gap-2 ${plan===p.id? "text-black/80" : "text-white/70"}`}><span>✓</span> {f}</li>)}
              </ul>
              <button className={`w-full mt-7 rounded-full py-3.5 text-xs font-black tracking-widest uppercase ${plan===p.id? "bg-black text-white" : "bg-white text-black"}`}>Seleziona {p.cta}</button>
            </div>
          ))}
        </div>

        {/* FORM + QR */}
        <div className="mt-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-[#111] border border-white/10 rounded- p-7 sm:p-8">
            <h3 className="font-bold">Completa l'iscrizione - {selected.name} {isRate? selected.rate : selected.price+"€"}</h3>
            <form onSubmit={(e)=>{e.preventDefault(); alert(`Grande! Hai scelto ${selected.name}. Ti apriamo WhatsApp per finalizzare con tessera QR.`); window.open(`https://wa.me/393000000000?text=Ciao%20Gaston%20Villa%20voglio%20iscrivermi%20a%20Il%20Circolo%20${selected.name}%20${isRate? selected.rate : selected.price+"€"}`)}} className="grid sm:grid-cols-2 gap-4 mt-6">
              <input required placeholder="Nome" className="bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm col-span-2 sm:col-span-1" />
              <input required placeholder="Cognome" className="bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm col-span-2 sm:col-span-1" />
              <input required placeholder="Email" type="email" className="bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm col-span-2" />
              <input required placeholder="Telefono / WhatsApp" className="bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm col-span-2" />
              <input placeholder="Codice Fiscale (per tessera)" className="bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm col-span-2" />
              <label className="col-span-2 flex gap-2 text- text-white/50 mt-2"><input type="checkbox" required /> Accetto regolamento circolo e privacy - Ho letto il modulo abbonamento</label>
              <button className="col-span-2 mt-3 bg-[#95BFE5] text-black rounded-full py-4 font-black text-xs tracking-widest uppercase">PAGA ORA E RICEVI QR →</button>
              <a href="/modulo-abbonamento-2026-27.pdf" download className="col-span-2 text-center text- text-white/40 underline">Scarica il PDF cartaceo per firma in sede</a>
            </form>
          </div>
          <div className="bg-white text-black rounded- p-7 text-center">
            <p className="text- font-black tracking-[0.2em] uppercase opacity-60">Anteprima Tessera Digitale</p>
            <div className="mt-6 bg-black text-white rounded-2xl p-5">
              <p className="text- tracking-widest">GASTON VILLA - IL CIRCOLO 26/27</p>
              <p className="font-black text-xl mt-2">{selected.name.toUpperCase()}</p>
              <div className="bg-white rounded-xl p-3 mt-4 mx-auto w-fit"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=GASTON-VILLA-${selected.id.toUpperCase()}-2026`} alt="QR" className="w- h-" /></div>
              <p className="text- mt-4 opacity-60">ID: GV-2026-{Math.floor(Math.random()*9000)+1000}</p>
            </div>
            <p className="text-xs mt-4 opacity-70">Mostra questo QR all'ingresso. Ingresso rapido + bar riservato.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
