import { useState } from "react";
import { players, staff } from "./squad-data";

type Player = (typeof players)[0];
type Staff = (typeof staff)[0];

export function Squad() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Player | Staff | null>(null);

  const visiblePlayers = showAll? players : players.slice(0, 4);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-bold tracking-tight">La Rosa</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
          >
            {showAll? "Mostra meno" : `Vedi tutta la rosa (${players.length})`}
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visiblePlayers.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className="cursor-pointer overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 group hover:border-white/20 transition"
            >
              <div className="aspect-[3/4] bg-white/5 overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              </div>
              <div className="p-4">
                <div className="flex gap-2 text- uppercase tracking-widest opacity-50">
                  <span>#{p.number}</span>
                  <span>{p.role}</span>
                </div>
                <p className="mt-1 font-semibold leading-tight">{p.name}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-4xl font-bold tracking-tight">Staff Tecnico</h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              className="cursor-pointer rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-white/20 transition"
            >
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs opacity-50 uppercase tracking-widest mt-1">{s.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE SCHEDA GIOCATORE */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h- w-full max-w-2xl overflow-auto rounded- bg-zinc-900 border border-white/10 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-5">
                <img
                  src={(selected as any).photo}
                  alt={selected.name}
                  className="h-28 w-20 sm:h-36 sm:w-28 object-cover rounded-xl bg-white/10"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{selected.name}</h3>
                  <p className="mt-1 opacity-60 text-sm">
                    {(selected as any).role} {(selected as any).number? `#${(selected as any).number}` : ""}
                  </p>

                  {"altezza" in selected && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{(selected as Player).altezza}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{(selected as Player).peso}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{(selected as Player).piede}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{(selected as Player).eta} anni</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-sm transition"
              >
                ✕
              </button>
            </div>

            {"presenze" in selected && (
              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-[0.2em] opacity-40">Stagione in corso</h4>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  <div className="rounded-2xl bg-white/[0.05] border border-white/5 p-4 text-center">
                    <p className="text-2xl font-bold">{(selected as Player).presenze}</p>
                    <p className="text- uppercase tracking-widest opacity-50 mt-1">Presenze</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] border border-white/5 p-4 text-center">
                    <p className="text-2xl font-bold">{(selected as Player).gol}</p>
                    <p className="text- uppercase tracking-widest opacity-50 mt-1">Gol</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] border border-white/5 p-4 text-center">
                    <p className="text-2xl font-bold">{(selected as Player).assist}</p>
                    <p className="text- uppercase tracking-widest opacity-50 mt-1">Assist</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] border border-white/5 p-4 text-center">
                    <p className="text-2xl font-bold">{(selected as Player).minuti}</p>
                    <p className="text- uppercase tracking-widest opacity-50 mt-1">Minuti</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
