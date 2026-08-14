import { useState } from "react";
import { players, staff } from "./squad-data";

type Player = typeof players[0];
type Mister = typeof staff[0];

export function Squad() {
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [showAllStaff, setShowAllStaff] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedMister, setSelectedMister] = useState<Mister | null>(null);

  const visiblePlayers = showAllPlayers? players : players.slice(0, 4);
  const visibleStaff = showAllStaff? staff : staff.slice(0, 2);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* GIOCATORI */}
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-bold">La Rosa</h2>
          <button onClick={() => setShowAllPlayers(!showAllPlayers)} className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition">
            {showAllPlayers? "Mostra meno" : `Vedi tutta la rosa (${players.length})`}
          </button>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visiblePlayers.map((p) => (
            <div key={p.id} onClick={() => setSelectedPlayer(p)} className="cursor-pointer overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 group hover:border-white/20 transition">
              <div className="aspect-[3/4] bg-white/5 overflow-hidden"><img src={p.photo} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" onError={(e) => (e.currentTarget.style.display='none')} /></div>
              <div className="p-4"><div className="flex gap-2 text- uppercase opacity-50"><span>#{p.number}</span><span>{p.role}</span></div><p className="mt-1 font-semibold">{p.name}</p></div>
            </div>
          ))}
        </div>

        {/* MISTER */}
        <div className="mt-20 flex items-end justify-between gap-4">
          <h2 className="text-4xl font-bold">Staff Tecnico</h2>
          <button onClick={() => setShowAllStaff(!showAllStaff)} className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition">
            {showAllStaff? "Mostra meno" : `Vedi tutto lo staff (${staff.length})`}
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl">
          {visibleStaff.map((m) => (
            <div key={m.id} onClick={() => setSelectedMister(m)} className="cursor-pointer overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 group hover:border-white/20 transition flex gap-4 p-4">
              <img src={m.photo} alt={m.name} className="h-24 w-20 object-cover rounded-xl bg-white/10" onError={(e) => (e.currentTarget.style.display='none')} />
              <div><p className="font-bold text-lg">{m.name}</p><p className="text-xs uppercase tracking-widest opacity-50 mt-1">{m.role}</p><p className="text-sm opacity-70 mt-2 line-clamp-2">{m.bio}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE GIOCATORE */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedPlayer(null)}>
          <div className="w-full max-w-2xl rounded- bg-zinc-900 border border-white/10 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between"><div className="flex gap-5"><img src={selectedPlayer.photo} alt={selectedPlayer.name} className="h-36 w-28 object-cover rounded-xl bg-white/10" /><div><h3 className="text-3xl font-bold">{selectedPlayer.name}</h3><p className="opacity-60">#{selectedPlayer.number} - {selectedPlayer.role}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedPlayer.altezza}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedPlayer.peso}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedPlayer.piede}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedPlayer.eta} anni</span></div></div></div><button onClick={() => setSelectedPlayer(null)} className="rounded-full bg-white/10 px-3 py-1">✕</button></div>
            <div className="mt-8 grid grid-cols-4 gap-3"><div className="rounded-2xl bg-white/5 p-4 text-center"><p className="text-2xl font-bold">{selectedPlayer.presenze}</p><p className="text- uppercase opacity-50">Presenze</p></div><div className="rounded-2xl bg-white/5 p-4 text-center"><p className="text-2xl font-bold">{selectedPlayer.gol}</p><p className="text- uppercase opacity-50">Gol</p></div><div className="rounded-2xl bg-white/5 p-4 text-center"><p className="text-2xl font-bold">{selectedPlayer.assist}</p><p className="text- uppercase opacity-50">Assist</p></div><div className="rounded-2xl bg-white/5 p-4 text-center"><p className="text-2xl font-bold">{selectedPlayer.minuti}</p><p className="text- uppercase opacity-50">Minuti</p></div></div>
          </div>
        </div>
      )}

      {/* MODALE MISTER */}
      {selectedMister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedMister(null)}>
          <div className="w-full max-w-xl rounded- bg-zinc-900 border border-white/10 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between"><div className="flex gap-5"><img src={selectedMister.photo} alt={selectedMister.name} className="h-36 w-28 object-cover rounded-xl bg-white/10" /><div><h3 className="text-3xl font-bold">{selectedMister.name}</h3><p className="opacity-60">{selectedMister.role}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedMister.eta} anni</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedMister.esperienza}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selectedMister.specialita}</span></div><p className="mt-4 text-sm opacity-70">{selectedMister.bio}</p></div></div><button onClick={() => setSelectedMister(null)} className="rounded-full bg-white/10 px-3 py-1">✕</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
