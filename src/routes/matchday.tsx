import { useState } from "react";

export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

const SETTORI = [
  { id: "onore", name: "Tribuna d'Onore", price: 249, left: 6, type: "Long Side", desc: "Seduta pelle, bar privato, vista centrale" },
  { id: "centrale", name: "Tribuna Centrale", price: 149, left: 18, type: "Long Side", desc: "Il cuore dello stadio, cuscino incluso" },
  { id: "distinti", name: "Distinti", price: 89, left: 42, type: "Short Side", desc: "Atmosfera calda, vicino alla Curva" },
  { id: "curva", name: "Curva Nord", price: 49, left: 97, type: "Corners", desc: "Canta 90 minuti con noi" },
];

function MatchdayPage() {
  const [settore, setSettore] = useState("centrale");
  const [qty, setQty] = useState(1);
  const sel = SETTORI.find(s => s.id === settore)!;
  const total = sel.price * qty;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

        {/* SINISTRA - STADIO */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text- font-bold tracking-[0.3em] text-[#95BFE5] uppercase">MAPPA STADIO - 26/27</h2>
            <span className="text- bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full font-black border border-red-500/20">{sel.left} POSTI RIMASTI IN {sel.name.toUpperCase()}</span>
          </div>

          <div className="mt-4 bg-[#111] border border-white/10 rounded- p-4 sm:p-5">
            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 aspect-[1.5/1] p-2 flex flex-col justify-between">
              <div className="flex gap-1 justify-center">{["322","323","324","325","326","327","328"].map(n=><button key={n} onClick={()=>setSettore("onore")} className={`w-8 h-6 rounded text- font-black ${settore==="onore"?"bg-[#95BFE5] text-black":"bg-[#FF6B2B]/70 text-black"}`}>{n}</button>)}</div>
              <div className="flex justify-between items-center flex-1 my-2">
                <div className="flex flex-col gap-1">{["101","102","103","104"].map(n=><button key={n} onClick={()=>setSettore("distinti")} className={`w-10 h-6 rounded text- font-black ${settore==="distinti"?"bg-[#95BFE5] text-black":"bg-[#5EB6E4]/70 text-black"}`}>{n}</button>)}</div>
                <div className="flex-1 mx-3 h-full bg-[#5FAF4B]/80 rounded flex items-center justify-center"><span className="text- font-black tracking-widest text-black/30">CAMPO</span></div>
                <div className="flex flex-col gap-1">{["137","138","140","141"].map(n=><button key={n} onClick={()=>setSettore("curva")} className={`w-10 h-6 rounded text- font-black ${settore==="curva"?"bg-[#95BFE5] text-black":"bg-[#8FA68E]/70 text-black"}`}>{n}</button>)}</div>
              </div>
              <div className="flex gap-1 justify-center">{["155","157","159","161","163","165"].map(n=><button key={n} onClick={()=>setSettore("centrale")} className={`w-8 h-6 rounded text- font-black ${settore==="centrale"?"bg-[#95BFE5] text-black":"bg-[#FF8A3D]/70 text-black"}`}>{n}</button>)}</div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {SETTORI.map(s=>(
                <button key={s.id} onClick={()=>setSettore(s.id)} className={`p-2.5 rounded-xl border text-left ${settore===s.id?"bg-white text-black border-white":"bg-black border-white/10 text-white/60"}`}>
                  <div className="text- uppercase">{s.type}</div><div className="font-black text-">{s.name}</div><div className="text-xs font-bold">{s.price}€ • {s.left} rimasti</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text- font-bold tracking-[0.3em] uppercase text-[#95BFE5]">IL TUO MATCHDAY INCLUDE</h3>
            <div className="mt-5 border-l border-white/10 ml-3 space-y-6 pl-6 relative">
              {[
                {h:"14:00", t:"Tour Privato Tunnel & Spogliatoio", d:"Entri dove entrano i giocatori. Foto nel tunnel."},
                {h:"15:30", t:"Pranzo con Ex-Legenda", d:"Pranzo a tema 90 minuti con aneddoti."},
                {h:"17:00", t:`Partita dal tuo posto: ${sel.name}`, d:`Seduta ${sel.type}, cuscino Gaston, radio mister.`},
                {h:"19:00", t:"Cena con i Giocatori + Maglia", d:"Cena riservata con 2 titolari, maglia autografata inclusa."},
              ].map(s=>(
                <div key={s.h} className="relative"><div className="absolute -left- top-1 w-2.5 h-2.5 bg-[#95BFE5] rounded-full" /><p className="text-[#95BFE5] font-black text-xs">{s.h}</p><p className="font-bold text-sm mt-1">{s.t}</p><p className="text-xs text-white/50 mt-1">{s.d}</p></div>
              ))}
            </div>
          </div>
        </div>

        {/* DESTRA - COMPLETA */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="bg-[#111] border border-white/10 rounded- p-6">
            <div className="flex justify-between items-start">
              <div><p className="text- uppercase tracking-widest text-white/40">RIEPILOGO</p><h3 className="text-xl font-black mt-1">{sel.name}</h3><p className="text-xs text-white/60 mt-1">{sel.desc}</p></div>
              <div className="bg-[#95BFE5]/20 text-[#95BFE5] px-2.5 py-1 rounded-full text- font-black">ULTIMI {sel.left}</div>
            </div>

            <div className="mt-5 bg-black rounded-xl p-4 border border-white/10 flex justify-between items-center">
              <div><p className="text- text-white/40 uppercase">Prezzo Matchday</p><p className="text-2xl font-black">{sel.price}€</p></div>
              <div className="text-right">
                <p className="text- text-white/40 uppercase">Posti</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20">-</button>
                  <span className="font-black w-4 text-center">{qty}</span>
                  <button onClick={()=>setQty(q=>Math.min(4,q+1))} className="w-8 h-8 rounded-full bg-white text-black">+</button>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-white/60"><span>Biglietto {sel.name} x{qty}</span><span>{sel.price * qty}€</span></div>
              <div className="flex justify-between text-white/60"><span>Tour + Pranzo + Cena + Maglia</span><span className="text-[#95BFE5] font-bold">Incluso</span></div>
              <div className="flex justify-between text-white/60"><span>Cuscino + Radio + Parcheggio VIP</span><span className="text-[#95BFE5] font-bold">Incluso</span></div>
              <div className="flex justify-between font-black text- pt-3 mt-3 border-t border-white/10"><span>Totale</span><span>{total}€</span></div>
            </div>

            <form onSubmit={(e)=>{e.preventDefault(); window.open(`https://wa.me/393000000000?text=Voglio%20Matchday%20${sel.name}%20x${qty}%20Totale%20${total}€`)}} className="mt-5 space-y-3">
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm"><option>Sab 16 Ago vs Crotone - 17:00</option><option>Sab 23 Ago vs Catanzaro - 17:00</option></select>
              <input required placeholder="Nome e Cognome" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <input required placeholder="WhatsApp per invio biglietto" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm" />
              <button className="w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest hover:bg-[#95BFE5] transition">PRENOTA ORA - {total}€ →</button>
              <p className="text- text-center text-white/40 leading-relaxed">Ricevi QR biglietto su WhatsApp in 5 min<br/>Posto numerato: Fila {Math.floor(Math.random()*10)+1} Posto {Math.floor(Math.random()*20)+5}</p>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 flex gap-3">
              <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full" alt="" />
              <p className="text-xs text-white/60 leading-relaxed">"Esperienza pazzesca, mio figlio è entrato con i giocatori. Vale ogni euro." <span className="text-white font-bold">— Marco, Socio dal 2024</span></p>
            </div>
          </div>

          <div className="bg-[#95BFE5] text-black rounded- p-4 text-center">
            <p className="text- font-black uppercase tracking-widest">Hai già Il Circolo?</p>
            <p className="text-xs mt-1">Sconto 20% automatico su Matchday per Soci Premium</p>
          </div>
        </div>

      </div>
    </div>
  );
}
