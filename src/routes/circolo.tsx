import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/circolo")({ component: CircoloPage });

function CircoloPage() {
  const [isMinor, setIsMinor] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-5">
        {/* Header */}
        <div className="text-center border-b border-white/10 pb-10">
          <p className="text-[0.7rem] tracking-[0.3em] text-[#95BFE5] uppercase font-bold">Gaston Villa - Stagione 26/27</p>
          <h1 className="display text-4xl sm:text-6xl font-black mt-4">IL CIRCOLO</h1>
          <p className="mt-3 text-muted-foreground">Modulo di Richiesta Abbonamento - Compila online o scarica il PDF</p>
          <a href="/modulo-abbonamento-2026-27.pdf" download className="inline-block mt-6 border border-white/20 rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition">
            Scarica PDF Originale ↓
          </a>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert("Modulo inviato! Ti contatteremo via email per finalizzare. Forza Gaston Villa!"); }} className="mt-12 space-y-12">

          {/* 1. DATI PERSONALI */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">1. Dati Personali dell'Abbonato (stampatello)</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Input label="Cognome" required />
              <Input label="Nome" required />
              <Input label="Luogo di Nascita" required />
              <Input label="Data di Nascita (GG/MM/AAAA)" type="date" required />
              <Input label="Codice Fiscale" required />
              <Input label="Cittadinanza" />
              <Select label="Sesso" options={["M", "F"]} />
              <Input label="Numero Tessera del Tifoso / Card Club (se richiesta)" colSpan />
            </div>
          </section>

          {/* 2. CONTATTO E RESIDENZA */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">2. Dati di Contatto e Residenza</h2>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <Input label="Indirizzo Via/Piazza" colSpan2 />
              <Input label="N." />
              <Input label="Città" required />
              <Input label="CAP" />
              <Input label="Provincia" />
              <Input label="Telefono Cellulare" required />
              <Input label="Telefono Fisso" />
              <Input label="Indirizzo E-mail" type="email" colSpan required />
            </div>
          </section>

          {/* 3. MINORENNI */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">3. Sezione Minorenni (solo se meno di 18 anni)</h2>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={isMinor} onChange={(e) => setIsMinor(e.target.checked)} /> Sono minorenne</label>
            </div>
            {isMinor && (
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <Input label="Cognome e Nome del Genitore/Tutore" colSpan required />
                <Input label="Codice Fiscale del Genitore/Tutore" colSpan required />
                <p className="text- text-white/50 col-span-2">Il sottoscritto esercente la potestà genitoriale/tutore legale dichiara di autorizzare la richiesta.</p>
              </div>
            )}
          </section>

          {/* 4. SCELTA SETTORE */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">4. Scelta del Settore e Tariffa</h2>
            <p className="text-xs text-white/60 mt-2">Selezionare il settore dello stadio e la tipologia di prezzo desiderata:</p>
            <div className="mt-6 space-y-3">
              <RadioGroup name="settore" options={[
                "Tribuna d'Onore ( Intero / Ridotto )",
                "Tribuna Centrale ( Intero / Ridotto )",
                "Distinti ( Intero / Ridotto )",
                "Curva Nord / Sud ( Intero / Ridotto )"
              ]} />
            </div>
            <div className="mt-6">
              <Input label="Specificare eventuale categoria per tariffa ridotta: Under 18 / Over 65 / Donna / Disabilità" />
            </div>
          </section>

          {/* 5. DICHIARAZIONE */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">5. Dichiarazione di Accettazione e Consenso</h2>
            <p className="text-xs leading-relaxed text-white/70">Il sottoscritto richiedente dichiara di: Aver preso visione e di accettare integralmente i Termini e le Condizioni Generali di Abbonamento del Club. Accettare il Regolamento d'Uso dello Stadio e il Codice di Condotta della società. Essere a conoscenza che l'abbonamento dà diritto esclusivamente ad assistere alle gare interne del Campionato.</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <Input label="Luogo" required />
              <Input label="Data" defaultValue={new Date().toLocaleDateString("it-IT")} />
            </div>
            <Input label="Firma del Richiedente (o del genitore se minorenne) - Scrivi nome e cognome per firma digitale" colSpan required />
          </section>

          {/* 6. GDPR */}
          <section className="bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#95BFE5]">6. Consenso Trattamento Dati (GDPR)</h2>
            <Check label="Acconsento al trattamento dei dati personali per l'esecuzione del contratto di abbonamento e per finalità organizzative." required />
            <div className="flex gap-6 text-xs">
              <label className="flex gap-2"><input type="radio" name="gdpr1" required /> ACCONSENTO</label>
              <label className="flex gap-2"><input type="radio" name="gdpr1" /> NON ACCONSENTO</label>
            </div>
            <Check label="Acconsento all'invio di comunicazioni commerciali e di marketing da parte del Club." />
            <div className="flex gap-6 text-xs">
              <label className="flex gap-2"><input type="radio" name="gdpr2" /> ACCONSENTO</label>
              <label className="flex gap-2"><input type="radio" name="gdpr2" /> NON ACCONSENTO</label>
            </div>
            <Input label="Firma per il Trattamento Dati" colSpan />
          </section>

          <button type="submit" className="w-full bg-white text-black rounded-full py-5 font-black tracking-widest uppercase hover:bg-[#95BFE5] transition">
            Invia Richiesta Abbonamento →
          </button>
          <p className="text-center text- text-white/40">Spazi riservati alla società: Codice Abbonamento, Settore, Fila, Posto, Importo, Metodo Pagamento verranno compilati in sede.</p>
        </form>
      </div>
    </div>
  );
}

function Input({ label, colSpan, colSpan2,...props }: any) {
  return (
    <div className={`${colSpan? "sm:col-span-2 col-span-3" : ""} ${colSpan2? "sm:col-span-2" : ""}`}>
      <label className="text- tracking-widest uppercase text-white/50">{label}</label>
      <input {...props} className="mt-1.5 w-full bg-[#0c0c0c] border border-white/10 rounded-lg px-3 py-3 text-sm focus:border-[#95BFE5] outline-none" />
    </div>
  );
}
function Select({ label, options }: any) {
  return (
    <div>
      <label className="text- tracking-widest uppercase text-white/50">{label}</label>
      <select className="mt-1.5 w-full bg-[#0c0c0c] border border-white/10 rounded-lg px-3 py-3 text-sm">
        {options.map((o: string) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function RadioGroup({ name, options }: any) {
  return <div className="space-y-2">{options.map((o: string) => <label key={o} className="flex gap-3 text-sm bg-[#0c0c0c] p-3 rounded-lg border border-white/5 cursor-pointer hover:border-white/20"><input type="radio" name={name} /> {o}</label>)}</div>;
}
function Check({ label,...props }: any) {
  return <label className="flex gap-3 text-xs leading-relaxed"><input type="checkbox" {...props} /> {label}</label>;
}
