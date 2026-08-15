import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/stadium")({
  component: StadiumTourPage,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgawolng";

const TOUR_STOPS = [
  {
    id: 1,
    title: "Sala Trofei",
    subtitle: "Un solo trofeo, tutta la nostra storia",
    desc: "Il Campionato 26/27 è l'unico trofeo della nostra storia. Esposto al centro della sala con teca in vetro, luce naturale e pareti chiare. Il logo Gaston Villa domina la sala.",
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=1200&h=800&fit=crop",
    tag: "Iconico",
    mapPos: { top: "8%", left: "38%", label: "SALA TROFEI - PIANO 1" },
  },
  {
    id: 2,
    title: "Il Tunnel",
    subtitle: "Dal logo alla luce del campo",
    desc: "Dal logo Gaston Villa al campo, la scritta WIN vi accompagna nel tunnel. L'uscita verso il campo con luce naturale del giorno. L'emozione di entrare in campo.",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=800&fit=crop",
    tag: "Emozione",
    mapPos: { top: "42%", left: "12%", label: "TUNNEL - LATO OVEST" },
  },
  {
    id: 3,
    title: "Stanze da Letto",
    subtitle: "Ritiro pre-partita, realistico e luminoso",
    desc: "REALISTICHE, non futuristiche, di giorno con vista campo. Legno naturale, due letti singoli, logo appeso al muro. Ritiro pre-partita per i giocatori.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop",
    tag: "Realistico",
    mapPos: { top: "8%", left: "62%", label: "RITIRO - PIANO 2" },
  },
  {
    id: 4,
    title: "Spogliatoio",
    subtitle: "Mattoni, legno e azzurro",
    desc: "Spogliatoio prima squadra: panche in legno naturale chiaro, armadietti con numero e nome, pavimento chiaro. Profumo di erba e di giorno.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&h=800&fit=crop",
    tag: "Squadra",
    mapPos: { top: "42%", left: "78%", label: "SPOGLIATOIO - LATO EST" },
  },
  {
    id: 5,
    title: "Sala Stampa",
    subtitle: "Le parole dopo i 90'",
    desc: "Tavolo lungo in legno chiaro, backdrop con logo Gaston Villa ripetuto, sedute chiare. Luce naturale dalle vetrate.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop",
    tag: "Media",
    mapPos: { top: "72%", left: "38%", label: "SALA STAMPA - PIANO TERRA" },
  },
  {
    id: 6,
    title: "Palestra / Mensa",
    subtitle: "Dove si costruisce il risultato",
    desc: "Palestra vista campo con attrezzi, mensa con tavoli in legno e infermeria luminosa. Tutto collegato, tutto di giorno.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    tag: "Performance",
    mapPos: { top: "72%", left: "62%", label: "PALESTRA - PIANO TERRA" },
  },
];

function StadiumTourPage() {
  const [active, setActive] = useState(TOUR_STOPS[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", data: "", persone: "2", tipo: "Classico", messaggio: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          data_tour: form.data,
          numero_persone: form.persone,
          tipo_tour: form.tipo,
          messaggio: form.messaggio,
          tour_stop: active.title,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", data: "", persone: "2", tipo: "Classico", messaggio: "" });
        setTimeout(() => { setShowForm(false); setStatus("idle"); }, 3000);
      } else setStatus("idle");
    } catch { setStatus("idle"); }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w- px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/GASTON_VILLA-removebg-preview.png" className="w-10 h-10 object-contain bg-white rounded-xl p-1" alt="logo" />
            <div>
              <div className="font-bold tracking-tight leading-none text-white">GASTON VILLA PARK</div>
              <div className="text- tracking-[0.22em] opacity-60 uppercase text-white">Stadium Tour · 6 Tappe · Mappa Live</div>
            </div>
          </div>
          <button onClick={() => setShowForm(true)} className="bg-white text-black rounded-full px-5 py-2.5 text- font-bold tracking-widest hover:bg-zinc-200 transition">PRENOTA TOUR</button>
        </div>
      </div>

      <div className="mx-auto max-w- px-6 pt-8">
        <div className="relative h- min-h- rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10">
          <img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1600&h=900&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="stadio" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90"></div>
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-white text-black rounded-full px-4 py-2 text- font-bold tracking-widest">TOUR UFFICIALE · 6 TAPPE</div>
              <div className="bg-white/10 backdrop-blur text-white border border-white/20 rounded-full px-4 py-2 text- font-bold">43.000 POSTI · SFONDO NERO</div>
            </div>
            <div>
              <h1 className="text- md:text- leading-[0.9] font-black tracking-[-0.03em] text-white">Gaston Villa<br/>Park Tour</h1>
              <p className="mt-4 max-w- text- leading-[1.5] text-white/70">Mappa live dello stadio sistemata - vedi dove sei in ogni tappa, ogni tribuna collegata a se stessa, 20 rettangoli di forma diversa.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w- px-6 mt-10 grid grid-cols-12 gap-6 pb-20">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-zinc-900 rounded- border border-white/10 p-2 space-y-2">
            {TOUR_STOPS.map((stop) => (
              <button
                key={stop.id}
                onClick={() => setActive(stop)}
                className={`w-full text-left rounded-[1.5rem] p-5 flex gap-4 items-start transition-all border ${active.id === stop.id? "bg-white text-black border-white" : "bg-black border-white/10 hover:border-white/30 text-white"}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text- shrink-0 ${active.id === stop.id? "bg-black text-white" : "bg-white text-black"}`}>{String(stop.id).padStart(2, "0")}</div>
                <div className="flex-1">
                  <div className="font-bold text- leading-tight">{stop.title}</div>
                  <div className={`text- leading-[1.35] mt-1 ${active.id === stop.id? "text-black/60" : "text-white/50"}`}>{stop.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/10 min-h- flex flex-col">
            <div className="relative h- bg-black">
              <img key={active.id} src={active.image} className="w-full h-full object-cover" alt={active.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute left-6 right-6 bottom-6 flex justify-between items-end">
                <div>
                  <div className="inline-block rounded-full bg-white text-black px-3 py-1 text- font-bold tracking-widest">{active.tag} · {active.id}/6</div>
                  <h2 className="mt-3 text- leading-[0.95] font-black tracking-tight text-white">{active.title}</h2>
                  <p className="text-white/60 text- mt-1">{active.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col">
              <p className="text- leading-[1.6] text-zinc-300">{active.desc}</p>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setShowForm(true)} className="bg-white text-black rounded-full px-6 py-3 text- font-bold tracking-widest hover:bg-zinc-200 transition">PRENOTA {active.title.toUpperCase()}</button>
                <button onClick={() => setActive(TOUR_STOPS[(active.id % TOUR_STOPS.length)])} className="bg-white/10 border border-white/20 text-white rounded-full px-6 py-3 text- font-bold tracking-widest hover:bg-white/20 transition">PROSSIMA →</button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded- border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="text- tracking-[0.2em] font-bold text-white">DOVE SEI NELLO STADIO · MAPPA LIVE · SFONDO NERO</div>
              <div className="text- bg-white text-black rounded-full px-3 py-1 font-bold">SEI QUI: {active.title.toUpperCase()} · {active.mapPos.label}</div>
            </div>

            <div className="mt-5 relative aspect-[2/1] bg-black rounded-[1.5rem] border border-white/10 overflow-hidden">
              <div className="absolute left-[22%] right-[22%] top-[28%] bottom-[28%] bg-[#0f3d0f] border border-white/20 rounded- flex items-center justify-center">
                <div className="absolute w-full h- bg-white/40 top-1/2"></div>
                <div className="w-14 h-14 border border-white/40 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 border border-white/30 border-l-0 rounded-r"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 border border-white/30 border-r-0 rounded-l"></div>
                <div className="text- font-black tracking-widest text-white/80 bg-black/60 px-2 py-1 rounded-full">CAMPO</div>
              </div>

              <div className="absolute left-[20%] right-[20%] top-[4%] h-[18%] bg-zinc-800 rounded- border border-white/20 flex overflow-hidden">
                {Array.from({length:20}).map((_,i)=>(
                  <div key={i} className={`flex-1 border-r last:border-r-0 border-white/10 ${i%3===0?"bg-zinc-700":"bg-zinc-800"} flex items-center justify-center text- font-bold text-white/40`}>{i+1}</div>
                ))}
              </div>
              <div className="absolute left-[20%] right-[20%] top-[1%] text-center text- font-bold tracking-widest text-white/30">TRIBUNA ROSSA NORD - 20 RETTANGOLI FORMA DIVERSA - COLLEGATA A SE STESSA</div>

              <div className="absolute left-[20%] right-[20%] bottom-[4%] h-[18%] bg-zinc-800 rounded- border border-white/20 flex overflow-hidden">
                {Array.from({length:20}).map((_,i)=>(
                  <div key={i} className={`flex-1 border-r last:border-r-0 border-white/10 ${i%4===0?"bg-zinc-700":"bg-zinc-800"} flex items-center justify-center text- font-bold text-white/40`}>{i+1}</div>
                ))}
              </div>
              <div className="absolute left-[20%] right-[20%] bottom-[1%] text-center text- font-bold tracking-widest text-white/30">CURVA SUD - 20 RETTANGOLI FORMA DIVERSA - COLLEGATA</div>

              <div className="absolute left-[2%] top-[26%] bottom-[26%] w-[16%] bg-zinc-800 rounded- border border-white/20 flex flex-col overflow-hidden">
                {Array.from({length:20}).map((_,i)=>(
                  <div key={i} className="flex-1 border-b last:border-b-0 border-white/10 flex items-center justify-center text- font-bold text-white/40">{i+1}</div>
                ))}
              </div>

              <div className="absolute right-[2%] top-[26%] bottom-[26%] w-[16%] bg-zinc-800 rounded- border border-white/20 flex flex-col overflow-hidden">
                {Array.from({length:20}).map((_,i)=>(
                  <div key={i} className="flex-1 border-b last:border-b-0 border-white/10 flex items-center justify-center text- font-bold text-white/40">{i+1}</div>
                ))}
              </div>

              <div
                className="absolute z-10 transition-all duration-500"
                style={{ top: active.mapPos.top, left: active.mapPos.left }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-white rounded-full border-2 border-black shadow-[0_0_20px_white] relative"></div>
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white text-black text- font-black px-2 py-1 rounded-full whitespace-nowrap shadow-xl">
                    📍 {active.title.toUpperCase()} - SEI QUI
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur border border-white/20 rounded-full px-2 py-1 text- font-bold text-white/60 flex gap-2">
                <span className="flex items-center gap-1"><span className="w-2 h-1 bg-zinc-700 block"></span>20 rettangoli</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full block"></span>SEI QUI</span>
                <span>Forma diversa</span>
              </div>
            </div>

            <div className="mt-3 text- text-white/40 text-center">Mappa sistemata - Sfondo nero - Ogni tribuna collegata a se stessa con 20 rettangoli di forma diversa - Indicatore live: {active.title} - {active.mapPos.label}</div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur- z-[100] grid place-items-center p-4">
          <div className="bg-zinc-900 w-full max-w- rounded- border border-white/20 overflow-hidden max-h- overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text- tracking-[0.2em] font-bold opacity-40 text-white">PRENOTAZIONE TOUR</div>
                  <h3 className="text- font-black leading-tight tracking-tight mt-1 text-white">Prenota {active.title}</h3>
                  <p className="text- text-white/50 mt-2">Mappa live sistemata, sfondo nero, immagini corrette.</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-bold">✕</button>
              </div>
              {status === "success"? (
                <div className="mt-8 bg-white text-black rounded-[1.5rem] p-6 text-center">
                  <div className="text-">✓</div>
                  <div className="font-bold mt-2">Prenotazione inviata!</div>
                  <div className="text- opacity-60 mt-1">Ti confermiamo {active.title} via email.</div>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value })} className="bg-black border border-white/20 rounded-xl px-4 py-3 text- text-white placeholder:text-white/40 outline-none focus:border-white" />
                    <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value })} className="bg-black border border-white/20 rounded-xl px-4 py-3 text- text-white placeholder:text-white/40 outline-none focus:border-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value })} className="bg-black border border-white/20 rounded-xl px-4 py-3 text- text-white outline-none" />
                    <select value={form.persone} onChange={e => setForm({...form, persone: e.target.value })} className="bg-black border border-white/20 rounded-xl px-4 py-3 text- text-white outline-none">
                      <option>1 persona</option><option>2 persone</option><option>3 persone</option><option>4 persone</option><option>5+ persone</option>
                    </select>
                  </div>
                  <button disabled={status === "sending"} className="w-full bg-white text-black rounded-full py-3 font-bold text- tracking-widest hover:bg-zinc-200 transition disabled:opacity-50">{status === "sending"? "INVIO..." : `PRENOTA TOUR · ${active.title.toUpperCase()}`}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
