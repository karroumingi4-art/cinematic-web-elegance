import { useState, useEffect } from "react";
import { Gavel, Users, Archive, Trophy } from "lucide-react";

const FORMSPREE_VOTI = "https://formspree.io/f/mnpaobkr";
const FORMSPREE_PROPOSTE = "https://formspree.io/f/maewldgr";

type Caso = {
  id: string;
  titolo: string;
  img?: string;
  opzioni: string[];
  voti: Record<string, number>;
  createdAt: number;
  chiuso?: boolean;
};

const CASI_INIZIALI: Caso[] = [
  {
    id: "24-07",
    titolo: "Terza maglia 24/25: ORO PURO o NERO OPACO?",
    img: "/hero-tunnel-oro.jpg",
    opzioni: ["ORO PURO", "NERO OPACO"],
    voti: { "ORO PURO": 1847, "NERO OPACO": 693 },
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "24-08",
    titolo: "Capitano per la prossima stagione?",
    opzioni: ["ROSSI #10", "BIANCHI #4", "ESPOSITO #9"],
    voti: { "ROSSI #10": 3120, "BIANCHI #4": 1455, "ESPOSITO #9": 890 },
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
];

function generaVotiFinti(opzioni: string[]) {
  const voti: Record<string, number> = {};
  opzioni.forEach(op => {
    voti[op] = Math.floor(Math.random() * 1800) + 800; // 800 - 2600 per opzione
  });
  return voti;
}

export function TribunaleTifoso() {
  const [casi, setCasi] = useState<Caso[]>(CASI_INIZIALI);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [showArchivio, setShowArchivio] = useState(false);
  const [form, setForm] = useState({ titolo: "", opzioni: "", nome: "", email: "" });

  useEffect(() => {
    const saved = localStorage.getItem("gv-tribunale-v2");
    const voted = localStorage.getItem("gv-tribunale-voted");
    if (saved) setCasi(JSON.parse(saved));
    if (voted) setVotedIds(JSON.parse(voted));
  }, []);

  useEffect(() => {
    localStorage.setItem("gv-tribunale-v2", JSON.stringify(casi));
  }, [casi]);

  const handleVote = (casoId: string, opzione: string) => {
    if (votedIds.includes(casoId)) return;
    const nuovi = casi.map(c => c.id!== casoId? c : {...c, voti: {...c.voti, [opzione]: c.voti[opzione] + 1 } });
    setCasi(nuovi);
    const newVoted = [...votedIds, casoId];
    setVotedIds(newVoted);
    localStorage.setItem("gv-tribunale-voted", JSON.stringify(newVoted));
    fetch(FORMSPREE_VOTI, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caso: casoId, voto: opzione })
    });
  };

  const handleAddCaso = (e: React.FormEvent) => {
    e.preventDefault();
    const opzioni = form.opzioni.split(",").map(s => s.trim().toUpperCase()).filter(Boolean).slice(0,4);
    if (opzioni.length < 2) return alert("Minimo 2 opzioni separate da virgola");

    const nuovo: Caso = {
      id: Date.now().toString(),
      titolo: form.titolo,
      opzioni,
      voti: generaVotiFinti(opzioni),
      createdAt: Date.now(),
    };

    // chiudi i vecchi e metti nuovo in cima
    const aggiornati = [nuovo,...casi.map(c => ({...c, chiuso: true}))];
    setCasi(aggiornati);

    // manda anche a formspree
    const fd = new FormData();
    fd.append("titolo", form.titolo);
    fd.append("opzioni", form.opzioni);
    fd.append("nome", form.nome);
    fd.append("email", form.email);
    fetch(FORMSPREE_PROPOSTE, { method: "POST", body: fd });

    setForm({ titolo: "", opzioni: "", nome: "", email: "" });
    setShowArchivio(false);
    document.getElementById("tribunale")?.scrollIntoView({ behavior: "smooth" });
  };

  const getTotale = (v: Record<string, number>) => Object.values(v).reduce((a,b)=>a+b,0);
  const getVincitore = (v: Record<string, number>) => Object.entries(v).sort((a,b)=>b[1]-a[1])[0]?.[0];

  const attivi = casi.slice(0,2);
  const archivio = casi.slice(2);

  return (
    <section id="tribunale" className="bg-[#080600] py-24 border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[#d6b45a] text-[0.7rem] tracking-[0.25em] uppercase flex gap-2 items-center"><Gavel className="size-4"/> TRIBUNALE DEL TIFOSO</p>
        <h2 className="display text-white text-[clamp(2rem,6vw,4rem)] mt-4 leading-[0.9]">La voce del <span className="text-[#d6b45a]">popolo.</span></h2>

        {/* CASI ATTIVI */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {attivi.map(c => {
            const tot = getTotale(c.voti);
            const hasVoted = votedIds.includes(c.id);
            return (
              <div key={c.id} className="rounded- border border-white/10 bg-white/[0.03] p-7">
                <div className="flex justify-between">
                  <span className="text-[0.65rem] text-white/30">#{c.id.slice(-4)} · LIVE</span>
                  {c.chiuso && <span className="text-[0.65rem] bg-[#d6b45a] text-black px-2 py-0.5 rounded-full">IN ARCHIVIO</span>}
                </div>
                <h3 className="text-white font-bold text-xl mt-3">{c.titolo}</h3>
                <div className="mt-6 space-y-4">
                  {c.opzioni.map(op => {
                    const perc = Math.round((c.voti[op]/tot)*100);
                    return (
                      <div key={op}>
                        <div className="flex justify-between text-[0.7rem] uppercase tracking-widest text-white/60 mb-1.5">
                          <span>{op}</span><span>{c.voti[op].toLocaleString()} · {perc}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#d6b45a] transition-all duration-700" style={{ width: `${perc}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {c.opzioni.map(op => (
                    <button key={op} disabled={votedIds.includes(c.id)} onClick={()=>handleVote(c.id, op)}
                      className={`rounded-full py-3 text-[0.75rem] font-bold uppercase ${votedIds.includes(c.id)? "bg-white/10 text-white/30" : "bg-white text-black hover:bg-[#d6b45a]"}`}>
                      {votedIds.includes(c.id)? "Votato ✓" : `Vota ${op}`}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[0.7rem] text-white/30"><Users className="size-3.5"/> {tot.toLocaleString()} VOTANTI</div>
              </div>
            );
          })}
        </div>

        {/* ARCHIVIO */}
        <button onClick={()=>setShowArchivio(!showArchivio)} className="mt-12 mx-auto flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[0.75rem] uppercase tracking-widest text-white hover:bg-white hover:text-black">
          <Archive className="size-4"/> {showArchivio? "Chiudi Archivio" : `Apri Archivio (${archivio.length} casi)`}
        </button>

        {showArchivio && (
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {archivio.map(c => {
              const vincitore = getVincitore(c.voti);
              return (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h4 className="text-white font-bold text-sm">{c.titolo}</h4>
                  <p className="mt-2 text-[0.7rem] text-white/40 flex items-center gap-1"><Trophy className="size-3 text-[#d6b45a]"/> VINCITORE: {vincitore}</p>
                  <p className="text-[0.65rem] text-white/30 mt-2">{getTotale(c.voti).toLocaleString()} voti totali · esito definitivo</p>
                  <div className="mt-3 space-y-1">
                    {Object.entries(c.voti).sort((a,b)=>b[1]-a[1]).map(([op,v])=>(
                      <div key={op} className="flex justify-between text-[0.7rem] text-white/50"><span>{op}</span><span>{v.toLocaleString()}</span></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FORM CREAZIONE AUTOMATICA */}
        <form onSubmit={handleAddCaso} className="mt-20 rounded- border border-[#d6b45a]/20 p-8 bg-[#d6b45a]/5">
          <h3 className="text-white text-2xl font-bold">Proponi un nuovo caso</h3>
          <p className="text-white/50 text-sm mt-1">Appare subito con migliaia di voti fake e i vecchi finiscono in archivio.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} required placeholder="Nome" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required type="email" placeholder="Email" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm" />
          </div>
          <input value={form.titolo} onChange={e=>setForm({...form, titolo:e.target.value})} required placeholder="Titolo caso es: Cori nuovo stadio?" className="mt-4 w-full rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm" />
          <input value={form.opzioni} onChange={e=>setForm({...form, opzioni:e.target.value})} required placeholder="Opzioni separate da virgola es: SI, NO, FORSE" className="mt-4 w-full rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm" />
          <button type="submit" className="mt-4 w-full rounded-full bg-[#d6b45a] py-4 font-bold uppercase text-black">Crea Caso Live</button>
        </form>
      </div>
    </section>
  );
}
