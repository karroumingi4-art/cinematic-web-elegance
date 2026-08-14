import { useState } from "react";

const FORMSPREE_TOUR = "https://formspree.io/f/xgawolng";

export function Stadium() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [tourSent, setTourSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", data: "", persone: "2", tipo: "Classico", messaggio: "" });

  async function handleTour(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(FORMSPREE_TOUR, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, tour: "Gaston Villa Park", stadio: "Gaston Villa Park - 43.000" }),
      });
    } catch {}
    setTourSent(true);
  }

  const rooms = [
    {
      id: "trofei",
      title: "Sala Trofei",
      subtitle: "1 Campionato - Stagione 26/27",
      desc: "Il nostro unico, leggendario trofeo. Esposto al centro in teca di vetro con luce naturale diurna. Il logo Gaston Villa con il cane domina la sala bordeaux.",
      color: "border-[#5D1F2E]",
      icon: "🏆",
    },
    {
      id: "tunnel",
      title: "Il Tunnel",
      subtitle: "For Gaston Villa The Win",
      desc: "Mattoni a vista, due loghi giganti del cane, stendardi 'CHAMPIONS 26-27'. Uscita diretta sul campo con luce di giorno, non buio futuristico.",
      color: "border-[#A8D8EA]",
      icon: "🚇",
    },
    {
      id: "camere",
      title: "Stanze da Letto",
      subtitle: "Ritiro Pre-Partita - Vista Campo",
      desc: "REALISTICHE di giorno, non futuristiche. Legno naturale, 2 letti singoli, lenzuola bordeaux e azzurre, finestra gigante sul campo, logo appeso. Come un hotel vero.",
      color: "border-[#5D1F2E]",
      icon: "🛏️",
    },
    {
      id: "spogliatoio",
      title: "Spogliatoio",
      subtitle: "Claret & Blue - 28 posti",
      desc: "28 postazioni in legno scuro, sedute bordeaux, nome e numero di ogni giocatore, docce e vasche ghiaccio a vista, luce diurna.",
      color: "border-[#A8D9EA]",
      icon: "👕",
    },
    {
      id: "stampa",
      title: "Sala Stampa",
      subtitle: "Conferenze & Interviste",
      desc: "Tavolo lungo con microfoni, backdrop con logo Gaston Villa e sponsor, 40 sedute per giornalisti, luce naturale.",
      color: "border-white/20",
      icon: "🎙️",
    },
    {
      id: "palestra",
      title: "Palestra & Mensa",
      subtitle: "Preparazione & Recupero",
      desc: "Palestra con vista campo, attrezzi Technogym, mensa con cucina a vista e tavoli in legno per tutta la rosa.",
      color: "border-white/20",
      icon: "🏋️",
    },
  ];

  return (
    <section id="stadio" className="bg-[#F8F6F3] text-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <img src="/GASTON_VILLA-removebg-preview.png" alt="Gaston Villa" className="h-20 w-20 object-contain rounded-full border border-[#5D1F2E]/20" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase opacity-60">Est. 2023 · Villa Park Style</p>
                <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9]">GASTON<br/>VILLA PARK</h2>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-6 opacity-70">
              Identico allo stile di Villa Park, costruito nel 2023. 43.000 posti, tutto di giorno, mattoni a vista, sediolini bordeaux e azzurri. Casa del nostro unico Campionato.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[380px] w-full">
            <div className="rounded-2xl bg-white border border-black/10 p-5"><p className="text-[10px] uppercase tracking-widest opacity-50">Capienza</p><p className="text-2xl font-black mt-1">43.000</p><p className="text-xs opacity-60">posti a sedere</p></div>
            <div className="rounded-2xl bg-white border border-black/10 p-5"><p className="text-[10px] uppercase tracking-widest opacity-50">Costruito</p><p className="text-2xl font-black mt-1">2023</p><p className="text-xs opacity-60">Villa Park style</p></div>
            <div className="rounded-2xl bg-[#5D1F2E] text-white border border-[#5D1F2E] p-5"><p className="text-[10px] uppercase tracking-widest opacity-70">Trofei</p><p className="text-2xl font-black mt-1">1x</p><p className="text-xs opacity-80">Campionato 26/27</p></div>
            <div className="rounded-2xl bg-white border border-black/10 p-5"><p className="text-[10px] uppercase tracking-widest opacity-50">Manto</p><p className="text-2xl font-black mt-1">Ibrido</p><p className="text-xs opacity-60">erba naturale</p></div>
          </div>
        </div>

        {/* TOUR GRID */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <button key={r.id} onClick={() => setActiveRoom(r.id)} className={`text-left rounded-[24px] bg-white border-2 ${r.color} p-6 hover:shadow-xl hover:-translate-y-1 transition-all`}>
              <div className="flex justify-between items-start"><span className="text-2xl">{r.icon}</span><span className="text-[10px] uppercase tracking-widest opacity-50 border border-black/10 rounded-full px-2 py-1">Clicca per dettagli</span></div>
              <h3 className="mt-4 text-xl font-black">{r.title}</h3>
              <p className="text-xs uppercase tracking-widest opacity-60 mt-1">{r.subtitle}</p>
              <p className="text-sm opacity-70 mt-3 leading-5 line-clamp-3">{r.desc}</p>
            </button>
          ))}
        </div>

        {/* MODALE */}
        {activeRoom && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveRoom(null)}>
            <div className="bg-white rounded-[24px] max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
              {rooms.filter(x=>x.id===activeRoom).map(r=>(
                <div key={r.id}><h3 className="text-3xl font-black">{r.title}</h3><p className="opacity-60 mt-1">{r.subtitle}</p><p className="mt-6 leading-6">{r.desc}</p><p className="mt-4 text-xs opacity-50"> Arredamento realistico in legno, colori bordeaux #5D1F2E e azzurro #A8D8EA del logo.</p><button onClick={()=>setActiveRoom(null)} className="mt-8 w-full bg-black text-white rounded-full py-3 font-bold">Chiudi</button></div>
              ))}
            </div>
          </div>
        )}

        {/* PRENOTA TOUR */}
        <div className="mt-20 rounded-[32px] bg-black text-white p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-4xl font-black leading-none">PRENOTA IL<br/>TOUR DELLO STADIO</h3>
              <p className="mt-4 opacity-70 max-w-md">Visita diurna completa: Sala Trofei con l'unico Campionato, Tunnel, Stanze da letto realistiche con vista campo, Spogliatoio, Sala Stampa e Palestra. Con guida.</p>
              <div className="mt-6 flex items-center gap-3"><img src="/GASTON_VILLA-removebg-preview.png" alt="logo" className="h-12 w-12 rounded-full" /><p className="text-sm opacity-60">Tour tutti i giorni 10:00 - 17:00 · Durata 90 min · Formspree attivo</p></div>
            </div>
            <form onSubmit={handleTour} className="bg-white text-black rounded-[20px] p-6 grid gap-3">
              {!tourSent?(
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm" />
                    <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="date" value={form.data} onChange={e=>setForm({...form,data:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm" />
                    <select value={form.persone} onChange={e=>setForm({...form,persone:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm">
                      <option>1 persona</option><option>2 persone</option><option>3 persone</option><option>4 persone</option><option>5+ persone</option>
                    </select>
                  </div>
                  <select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm">
                    <option>Tour Classico - 15€</option><option>Tour VIP con spogliatoio - 30€</option><option>Tour Scuole - 8€</option>
                  </select>
                  <textarea placeholder="Messaggio / esigenze particolari" value={form.messaggio} onChange={e=>setForm({...form,messaggio:e.target.value})} className="bg-[#F8F6F3] border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[80px]" />
                  <button type="submit" className="bg-[#5D1F2E] text-white rounded-full py-4 font-black text-sm tracking-widest hover:bg-[#4a1925] transition">PRENOTA ORA</button>
                  <p className="text-[10px] opacity-50 text-center">Invio tramite Formspree xgawolng · Risposta in 24h</p>
                </>
              ):(
                <div className="py-12 text-center"><p className="text-3xl">✓</p><h4 className="text-xl font-black mt-2">Prenotazione inviata!</h4><p className="text-sm opacity-60 mt-2">Ti abbiamo inviato conferma a {form.email} per Gaston Villa Park.</p><button type="button" onClick={()=>setTourSent(false)} className="mt-6 bg-black text-white rounded-full px-6 py-2 text-sm">Nuova prenotazione</button></div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
