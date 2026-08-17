import { motion } from "motion/react";
import { Gavel, Check, X, Clock, Users } from "lucide-react";

const casi = [
  {
    id: "24-07",
    stato: "VOTAZIONE APERTA",
    titolo: "Terza maglia 24/25: ORO PURO o NERO OPACO?",
    descrizione: "La società propone 2 varianti. La scelta finale è dei Tesserati Oro. Il voto chiude Domenica.",
    voti: { oro: 73, nero: 27 },
    totale: 1247,
    chiusura: "3 GIORNI",
    colore: "oro",
  },
  {
    id: "24-06",
    stato: "VERDETTO",
    titolo: "Prezzo panino + birra allo stadio: da 8€ a 6.50€?",
    descrizione: "Proposta dei tifosi curva. Approvata con il 91%. In vigore dalla prossima in casa.",
    voti: { si: 91, no: 9 },
    totale: 2103,
    chiusura: "APPROVATO",
    colore: "verdetto",
  },
  {
    id: "24-05",
    stato: "RESPINTO",
    titolo: "Inno d'ingresso: mantenere Bella Ciao remix?",
    descrizione: "Proposta respinta. Si torna al classico Seven Nation Army fino a nuova votazione.",
    voti: { si: 34, no: 66 },
    totale: 1890,
    chiusura: "RESPINTO",
    colore: "respinto",
  },
];

export function TribunaleTifoso() {
  return (
    <section id="tribunale" className="relative bg-[#080600] py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-[#d6b45a]">
              <Gavel className="size-4" /> Tribunale Del Tifoso
            </p>
            <h2 className="display mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] text-white">
              Qui non comanda <br />
              <span className="text-[#d6b45a]">Gastone.</span> Comandate voi.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Ogni mese una decisione reale del club viene messa al voto. Solo i Tesserati Oro votano.
            Ogni verdetto viene pubblicato con verbale ufficiale. Niente fuffa.
          </p>
        </div>

        {/* Casi */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {casi.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative overflow-hidden rounded- border p-7 sm:p-8 ${
                c.stato === "VOTAZIONE APERTA"
                 ? "border-[#d6b45a]/30 bg-gradient-to-b from-[#d6b45a]/[0.08] to-transparent"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] tracking-[0.2em] text-white/40">CASO #{c.id}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] font-bold tracking-[0.15em] ${
                    c.stato === "VOTAZIONE APERTA"
                     ? "bg-[#d6b45a] text-black"
                      : c.stato === "VERDETTO"
                     ? "bg-emerald-400 text-black"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {c.stato === "VOTAZIONE APERTA"? <Clock className="size-3" /> : c.stato === "VERDETTO"? <Check className="size-3" /> : <X className="size-3" />}
                  {c.stato}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold leading-tight text-white">{c.titolo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{c.descrizione}</p>

              {/* Barra voto */}
              <div className="mt-8">
                <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full ${c.colore === "oro"? "bg-[#d6b45a]" : c.colore === "verdetto"? "bg-emerald-400" : "bg-white/40"}`}
                    style={{ width: `${Object.values(c.voti)[0]}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-[0.7rem] uppercase tracking-[0.15em] text-white/50">
                  <span>{Object.keys(c.voti)[0]} {Object.values(c.voti)[0]}%</span>
                  <span>{Object.keys(c.voti)[1]} {Object.values(c.voti)[1]}%</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5 text-[0.7rem] text-white/40">
                  <Users className="size-3.5" /> {c.totale} VOTANTI
                </span>
                <span className="text-[0.7rem] font-bold tracking-[0.15em] text-[#d6b45a]">{c.chiusura}</span>
              </div>

              {c.stato === "VOTAZIONE APERTA" && (
                <button className="mt-6 w-full rounded-full bg-white py-3 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-black transition hover:bg-[#d6b45a]">
                  Vota Ora
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#tesseramento" className="text-[0.7rem] uppercase tracking-[0.25em] text-white/30 hover:text-white/60 transition">
            Solo Tesserati Oro possono votare — Diventa Oro →
          </a>
        </div>
      </div>
    </section>
  );
}
