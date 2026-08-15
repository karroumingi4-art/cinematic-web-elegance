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
    desc: "La nostra storia in un trofeo. Il Campionato 26/27 è l'unico trofeo, esposto al centro della sala con il logo Gaston Villa. Luce naturale, pareti chiare e teca in vetro.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
    tag: "Iconico",
    color: "bg-[#5D1F2E] text-white",
    accent: "#5D1F2E",
  },
  {
    id: 2,
    title: "Il Tunnel",
    subtitle: "Dal logo alla luce del campo",
    desc: "Dal logo Gaston Villa al campo, la scritta WIN vi accompagna. Luce naturale del giorno, mattoni maroon e dettagli in azzurro #A8D8EA.",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop",
    tag: "Emozione",
    color: "bg-[#A8D8EA] text-[#5D1F2E]",
    accent: "#A8D8EA",
  },
  {
    id: 3,
    title: "Stanze da Letto",
    subtitle: "Ritiro pre-partita, realistico e luminoso",
    desc: "REALISTICHE, non futuristiche, di giorno con vista campo, legno naturale, due letti singoli, logo appeso al muro. Ritiro pre-partita per i giocatori. Niente led, solo luce del sole.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    tag: "Realistico · Giorno",
    color: "bg-[#5D1F2E] text-white",
    accent: "#5D1F2E",
  },
  {
    id: 4,
    title: "Spogliatoio",
    subtitle: "Mattoni, legno e azzurro",
    desc: "Spogliatoio prima squadra: panche in legno naturale chiaro, armadietti maroon #5D1F2E con numero e nome, pavimento chiaro, dettagli in azzurro polvere. Profumo di erba e di giorno.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop",
    tag: "Squadra",
    color: "bg-[#5D1F2E] text-white",
    accent: "#5D1F2E",
  },
  {
    id: 5,
    title: "Sala Stampa",
    subtitle: "Le parole dopo i 90'",
    desc: "Tavolo lungo in legno chiaro, backdrop con logo Gaston Villa ripetuto, sedute grigie chiare. Luce naturale dalle vetrate, niente scenografia scura.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    tag: "Media",
    color: "bg-white text-[#5D1F2E] border border-[#5D1F2E]/20",
    accent: "#F7F5EF",
  },
  {
    id: 6,
    title: "Palestra / Mensa / Infermeria",
    subtitle: "Dove si costruisce il risultato",
    desc: "Palestra vista campo con attrezzi Technogym bianchi, mensa con tavoli in rovere e infermeria luminosa. Tutto collegato, tutto di giorno, tutto funzionale.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    tag: "Performance",
    color: "bg-[#A8D8EA] text-[#5D1F2E]",
    accent: "#A8D8EA",
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
    <div className="min-h-screen bg-[#FCFCF9] text-[#5D1F2E] selection:bg-[#5D1F2E] selection:text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#FCFCF9]/80 backdrop-blur border-b border-[#5D1F2E]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/GASTON_VILLA-removebg-preview.png" className="w-10 h-10 object-contain bg-white rounded-xl p-1 border" alt="logo" />
            <div>
              <div className="font-bold tracking-tight leading-none">GASTON VILLA PARK</div>
              <div className="text-[10px] tracking-[0.22em] opacity-60 uppercase">Stadium Tour · Daylight</div>
            </div>
          </div>
          <button onClick={() => setShowForm(true)} className="bg-[#5D1F2E] text-white rounded-full px-5 py-2.5 text-[12px] font-bold tracking-widest hover:bg-black transition">PRENOTA TOUR</button>
        </div>
      </div>

      {/* HERO */}
      <div className="mx-auto max-w-[1280px] px-6 pt-8">
        <div className="relative h-[52vh] min-h-[320px] rounded-[2.5rem] overflow-hidden bg-[#F7F5EF] border border-[#5D1F2E]/10">
          <img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1600&h=900&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="stadio aereo giorno" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/90"></div>
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-white/80 backdrop-blur rounded-full px-4 py-2 text-[11px] font-bold tracking-widest border">TOUR UFFICIALE · 6 TAPPE · LUCE NATURALE</div>
              <div className="bg-[#5D1F2E] text-white rounded-full px-4 py-2 text-[11px] font-bold">43.000 POSTI · VISTA GIORNO</div>
            </div>
            <div>
              <h1 className="text-[13vw] md:text-[72px] leading-[0.9] font-bold tracking-[-0.03em]">Gaston Villa<br/>Park Tour</h1>
              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.5] opacity-70">Mattoni maroon #5D1F2E, azzurro polvere #A8D8EA, legno naturale, luce del giorno. Nessuna scenografia scura. Solo il vero stadio dove si vince.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOUR NAV + CONTENT */}
      <div className="mx-auto max-w-[1280px] px-6 mt-10 grid grid-cols-12 gap-6 pb-20">
        {/* LISTA TAPPE - 4 colonne */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[2rem] border border-zinc-200 p-2 space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            {TOUR_STOPS.map((stop) => (
              <button
                key={stop.id}
                onClick={() => setActive(stop)}
                className={`w-full text-left rounded-[1.5rem] p-5 flex gap-4 items-start transition-all border ${active.id === stop.id ? "bg-[#5D1F2E] text-white border-[#5D1F2E] shadow-[0_12px_30px_rgba(93,31,46,0.25)]" : "bg-[#F7F5EF] border-transparent hover:border-[#5D1F2E]/20"}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${active.id === stop.id ? "bg-white text-[#5D1F2E]" : "bg-[#5D1F2E] text-white"}`}>{String(stop.id).padStart(2, "0")}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-[15px] leading-tight">{stop.title}</div>
                    <div className={`text-[10px] px-2 py-1 rounded-full font-bold tracking-widest ${active.id === stop.id ? "bg-white/20" : "bg-[#5D1F2E]/10"}`}>{stop.tag}</div>
                  </div>
                  <div className={`text-[12px] leading-[1.35] mt-1 ${active.id === stop.id ? "text-white/70" : "text-[#5D1F2E]/60"}`}>{stop.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-[#A8D8EA]/50 border border-[#A8D8EA] rounded-[1.6rem] p-6">
            <div className="text-[11px] tracking-widest font-bold">COSA VEDRAI</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
              <div className="bg-white rounded-xl p-3 border">☀️ Luce naturale giorno</div>
              <div className="bg-white rounded-xl p-3 border">🧱 Mattoni #5D1F2E</div>
              <div className="bg-white rounded-xl p-3 border">🩵 Azzurro #A8D8EA</div>
              <div className="bg-white rounded-xl p-3 border">🪵 Legno naturale</div>
              <div className="bg-white rounded-xl p-3 border">🏆 1 Trofeo 26/27</div>
              <div className="bg-white rounded-xl p-3 border">📸 Foto consentite</div>
            </div>
          </div>
        </div>

        {/* DETTAGLIO TAPPA - 8 colonne */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-[0_30px_80px_rgba(93,31,46,0.08)] min-h-[640px] flex flex-col">
            <div className="relative h-[320px] bg-[#F7F5EF]">
              <img key={active.id} src={active.image} className="w-full h-full object-cover" alt={active.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute left-6 right-6 bottom-6 flex justify-between items-end">
                <div>
                  <div className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest ${active.color}`}>{active.tag} · {active.id}/6</div>
                  <h2 className="mt-3 text-[34px] leading-[0.95] font-bold tracking-tight text-white drop-shadow-[0_8px_24px_rgba(93,31,46,0.25)]">{active.title}</h2>
                  <p className="text-white/80 text-[14px] mt-1">{active.subtitle}</p>
                </div>
                <img src="/GASTON_VILLA-removebg-preview.png" className="w-16 h-16 object-contain bg-white rounded-2xl p-2 border shadow" alt="logo" />
              </div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex items-start gap-6">
                <div className="hidden md:block w-[84px] h-[84px] rounded-[1.5rem] bg-[#F7F5EF] border border-[#5D1F2E]/20 grid place-items-center text-[28px] font-bold text-[#5D1F2E]">{String(active.id).padStart(2, "0")}</div>
                <div className="flex-1">
                  <div className="text-[11px] tracking-[0.2em] font-bold opacity-60 uppercase">Tappa {active.id} di 6 · Vista realistica di giorno</div>
                  <p className="mt-4 text-[17px] leading-[1.6] text-zinc-700">{active.desc}</p>
                  
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-[#F7F5EF] p-5 border">
                      <div className="text-[11px] tracking-widest font-bold opacity-60">MATERIALE</div>
                      <div className="mt-2 text-[14px] font-semibold leading-tight">Mattoni maroon, legno chiaro, azzurro polvere</div>
                    </div>
                    <div className="rounded-2xl bg-[#5D1F2E] text-white p-5">
                      <div className="text-[11px] tracking-widest font-bold opacity-70">LUCE</div>
                      <div className="mt-2 text-[14px] font-semibold leading-tight">Naturale di giorno, vetrate, niente led</div>
                    </div>
                    <div className="rounded-2xl bg-[#A8D8EA] p-5 border border-[#A8D8EA]">
                      <div className="text-[11px] tracking-widest font-bold opacity-60">SENSAZIONE</div>
                      <div className="mt-2 text-[14px] font-semibold leading-tight">Profumo erba, legno, giorno di partita</div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <button onClick={() => setShowForm(true)} className="bg-[#5D1F2E] text-white rounded-full px-6 py-3 text-[13px] font-bold tracking-widest hover:bg-black transition">PRENOTA QUESTA TAPPA · {active.title.toUpperCase()}</button>
                    <button onClick={() => setActive(TOUR_STOPS[(active.id % TOUR_STOPS.length)])} className="bg-zinc-100 rounded-full px-6 py-3 text-[13px] font-bold tracking-widest hover:bg-zinc-200 transition">PROSSIMA TAPPA →</button>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 flex items-center justify-between border-t border-zinc-200">
                <div className="text-[11px] tracking-widest opacity-60">GASTON VILLA PARK · 43.000 POSTI · TOUR UFFICIALE DI GIORNO</div>
                <div className="flex gap-2">
                  {TOUR_STOPS.map(s => <div key={s.id} className={`h-[2px] w-8 rounded-full transition-all ${s.id === active.id ? "bg-[#5D1F2E] w-16" : "bg-zinc-200"}`}></div>)}
                </div>
              </div>
            </div>
          </div>

          {/* MAPPA MINI STADIO COLLEGATO A SE STESSO */}
          <div className="mt-6 bg-white rounded-[2rem] border p-6">
            <div className="text-[11px] tracking-widest font-bold">DOVE SEI NELLO STADIO · OGNI TRIBUNA COLLEGATA A SE STESSA</div>
            <div className="mt-4 h-[90px] bg-[#F7F5EF] rounded-xl border relative overflow-hidden flex items-center justify-center">
              <div className="absolute left-[20%] right-[20%] top-[10%] h-[25%] bg-[#5D1F2E] rounded-[6px] flex"><div className="flex-1 border-r border-white/20"></div><div className="flex-1 border-r border-white/20"></div><div className="flex-1"></div></div>
              <div className="absolute left-[20%] right-[20%] bottom-[10%] h-[25%] bg-[#A8D8EA] rounded-[6px] flex"><div className="flex-1 border-r border-[#5D1F2E]/20"></div><div className="flex-1"></div></div>
              <div className="absolute left-[5%] top-[15%] bottom-[15%] w-[12%] bg-white border border-[#5D1F2E]/20 rounded-[6px]"></div>
              <div className="absolute right-[5%] top-[15%] bottom-[15%] w-[12%] bg-[#5D1F2E]/10 border border-[#5D1F2E]/20 rounded-[6px]"></div>
              <div className="w-[50%] h-[50%] bg-green-200/50 border border-green-600/20 rounded flex items-center justify-center text-[10px] font-bold">CAMPO · SEI QUI: {active.title.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM PRENOTAZIONE */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[6px] z-[100] grid place-items-center p-4">
          <div className="bg-[#FCFCF9] w-full max-w-[520px] rounded-[2rem] border shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] tracking-[0.2em] font-bold opacity-60">PRENOTAZIONE TOUR</div>
                  <h3 className="text-[28px] font-bold leading-tight tracking-tight mt-1">Prenota il tuo tour a {active.title}</h3>
                  <p className="text-[13px] opacity-60 mt-2">Luce naturale, 6 tappe, 43.000 posti, vista giorno. Risposta in 2h.</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-full bg-zinc-100 grid place-items-center font-bold">✕</button>
              </div>

              {status === "success" ? (
                <div className="mt-8 bg-[#5D1F2E] text-white rounded-[1.5rem] p-6 text-center">
                  <div className="text-[32px]">✓</div>
                  <div className="font-bold mt-2">Prenotazione inviata!</div>
                  <div className="text-[13px] opacity-80 mt-1">Ti rispondiamo via email per confermare data e tappa {active.title}.</div>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Nome e Cognome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5D1F2E]" />
                    <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5D1F2E]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} className="bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none" />
                    <select value={form.persone} onChange={e => setForm({ ...form, persone: e.target.value })} className="bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none">
                      <option>1 persona</option><option>2 persone</option><option>3 persone</option><option>4 persone</option><option>5+ persone</option>
                    </select>
                  </div>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none">
                    <option>Classico - 6 tappe luce naturale</option><option>VIP - Con pranzo e lounge</option><option>Business - Sky box privato</option><option>Squadra - Spogliatoio + campo</option>
                  </select>
                  <textarea placeholder="Messaggio (tappa preferita, esigenze...)" value={form.messaggio} onChange={e => setForm({ ...form, messaggio: e.target.value })} rows={3} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] outline-none resize-none" />
                  <button disabled={status === "sending"} className="w-full bg-[#5D1F2E] text-white rounded-full py-3 font-bold text-[13px] tracking-widest hover:bg-black transition disabled:opacity-50">{status === "sending" ? "INVIO..." : `PRENOTA TOUR · ${active.title.toUpperCase()}`}</button>
                  <div className="text-[11px] opacity-50 text-center">Tour di giorno, luce naturale, mattoni #5D1F2E e azzurro #A8D8EA. Foto consentite. 43.000 posti.</div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
