import { useState, useEffect } from "react";
import { Gavel, Users } from "lucide-react";

const FORMSPREE_VOTI = "https://formspree.io/f/mnpaobkr";
const FORMSPREE_PROPOSTE = "https://formspree.io/f/maewldgr";

type Caso = {
  id: string;
  titolo: string;
  img?: string;
  opzioni: string[];
  voti: Record<string, number>;
};

const CASI_INIZIALI: Caso[] = [
  {
    id: "24-07",
    titolo: "Terza maglia 24/25: ORO PURO o NERO OPACO?",
    img: "/hero-tunnel-oro.jpg",
    opzioni: ["ORO PURO", "NERO OPACO"],
    voti: { "ORO PURO": 1847, "NERO OPACO": 693 },
  },
  {
    id: "24-08",
    titolo: "Capitano per la prossima stagione?",
    img: "",
    opzioni: ["ROSSI #10", "BIANCHI #4", "ESPOSITO #9"],
    voti: { "ROSSI #10": 3120, "BIANCHI #4": 1455, "ESPOSITO #9": 890 },
  },
];

export function TribunaleTifoso() {
  const [casi, setCasi] = useState<Caso[]>(CASI_INIZIALI);
  const [votedIds, setVotedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("gv-tribunale-voti");
    const voted = localStorage.getItem("gv-tribunale-voted");
    if (saved) setCasi(JSON.parse(saved));
    if (voted) setVotedIds(JSON.parse(voted));
  }, []);

  useEffect(() => {
    localStorage.setItem("gv-tribunale-voti", JSON.stringify(casi));
  }, [casi]);

  const handleVote = async (casoId: string, opzione: string) => {
    if (votedIds.includes(casoId)) return;

    const nuoviCasi = casi.map(c => {
      if (c.id!== casoId) return c;
      return {...c, voti: {...c.voti, [opzione]: (c.voti[opzione] || 0) + 1 } };
    });
    setCasi(nuoviCasi);

    const newVoted = [...votedIds, casoId];
    setVotedIds(newVoted);
    localStorage.setItem("gv-tribunale-voted", JSON.stringify(newVoted));
    localStorage.setItem("gv-tribunale-voti", JSON.stringify(nuoviCasi));

    fetch(FORMSPREE_VOTI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caso: casoId,
        voto: opzione,
        totale_aggiornato: nuoviCasi.find(c => c.id === casoId)?.voti[opzione],
        _subject: `VOTO TRIBUNALE ${casoId} -> ${opzione}`,
      }),
    });
  };

  const getTotale = (voti: Record<string, number>) => Object.values(voti).reduce((a, b) => a + b, 0);
  const getPerc = (voti: Record<string, number>, op: string) => {
    const tot = getTotale(voti);
    return tot === 0? 0 : Math.round((voti[op] / tot) * 100);
  };

  return (
    <section id="tribunale" className="bg-[#080600] py-24 border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[#d6b45a] text-[0.7rem] tracking-[0.25em] uppercase flex gap-2 items-center">
          <Gavel className="size-4" /> TRIBUNALE DEL TIFOSO — LIVE
        </p>
        <h2 className="display text-white text-[clamp(2rem,6vw,4rem)] mt-4 leading-[0.9]">
          I numeri non <span className="text-[#d6b45a]">mentono.</span>
        </h2>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {casi.map(c => {
            const totale = getTotale(c.voti);
            const hasVoted = votedIds.includes(c.id);
            return (
              <div key={c.id} className="rounded- border border-white/10 bg-white/[0.03] p-7">
                {c.img && <img src={c.img} className="h-48 w-full object-cover rounded-xl mb-6" alt="" />}
                <h3 className="text-white font-bold text-xl">{c.titolo}</h3>

                <div className="mt-6 space-y-4">
                  {c.opzioni.map(op => {
                    const perc = getPerc(c.voti, op);
                    return (
                      <div key={op}>
                        <div className="flex justify-between text-[0.7rem] uppercase tracking-widest text-white/60 mb-1.5">
                          <span>{op}</span>
                          <span>{c.voti[op].toLocaleString()} voti · {perc}%</span>
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
                    <button
                      key={op}
                      disabled={hasVoted}
                      onClick={() => handleVote(c.id, op)}
                      className={`rounded-full py-3 text-[0.75rem] font-bold uppercase tracking-widest ${hasVoted? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-white text-black hover:bg-[#d6b45a]"}`}
                    >
                      {hasVoted? "Votato ✓" : `Vota ${op}`}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-[0.7rem] text-white/30">
                  <Users className="size-3.5" /> {totale.toLocaleString()} VOTANTI TOTALI
                  {hasVoted && <span className="ml-auto text-[#d6b45a]">+1 dal tuo voto</span>}
                </div>
              </div>
            );
          })}
        </div>

        <form action={FORMSPREE_PROPOSTE} method="POST" encType="multipart/form-data" className="mt-20 rounded- border border-[#d6b45a]/20 p-8 bg-[#d6b45a]/5">
          <h3 className="text-white text-2xl font-bold">Proponi un nuovo caso con foto</h3>
          <p className="text-white/50 text-sm mt-2">Le immagini arrivano direttamente nella tua mail Formspree.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input name="nome" required placeholder="Nome e Cognome" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm outline-none focus:border-[#d6b45a]" />
            <input name="email" type="email" required placeholder="Email Tesserato" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm outline-none focus:border-[#d6b45a]" />
          </div>
          <input name="titolo" required placeholder="Titolo proposta es: Nuovo inno curva" className="mt-4 w-full rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm outline-none focus:border-[#d6b45a]" />
          <textarea name="descrizione" required rows={4} placeholder="Descrivi la proposta..." className="mt-4 w-full rounded- bg-black/40 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#d6b45a]" />
          <input type="file" name="immagini" accept="image/*" multiple className="mt-4 w-full text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-black" />
          <input type="hidden" name="_subject" value="NUOVA PROPOSTA TRIBUNALE CON IMMAGINE" />
          <button type="submit" className="mt-4 w-full rounded-full bg-[#d6b45a] py-4 font-bold uppercase text-black hover:bg-white transition">
            Invia al Tribunale
          </button>
        </form>
      </div>
    </section>
  );
}
