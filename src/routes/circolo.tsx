import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/circolo")({
  component: CircoloPage,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnpajgdn";

function CircoloPage() {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    dataNascita: "",
    codiceFiscale: "",
    tipoAbbonamento: "STANDARD",
    messaggio: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email) return alert("Inserisci nome ed email");
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          modulo: "RICHIESTA ABBONAMENTO STAGIONE 2026/2027 - GASTON VILLA",
          data: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("Errore invio, riprova");
      }
    } catch (err) {
      console.log(err);
      alert("Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      {/* HEADER */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-[10px] tracking-widest font-bold mb-4">CIRCOLO GASTON VILLA</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">ENTRA NEL<br/><span className="text-[#C8102E]">CIRCOLO</span></h1>
          <p className="opacity-60 text-sm mt-4 max-w-[600px] mx-auto">Diventa socio Gaston Villa per la stagione 2026/2027. Scarica il modulo di abbonamento, compila i dati e invia la richiesta. Formspree attivo: xnpajgdn</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT - DOWNLOAD MODULO */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-[#111] border border-white/10 rounded-[24px] p-8 sticky top-24">
              <div className="w-16 h-16 rounded-2xl bg-[#C8102E] flex items-center justify-center text-2xl mb-6">📄</div>
              <h2 className="font-black text-2xl leading-tight">MODULO DI RICHIESTA<br/>ABBONAMENTO 2026/2027</h2>
              <p className="text-xs opacity-60 mt-3 leading-relaxed">
                Documento ufficiale per l'iscrizione al Circolo Gaston Villa. Valido per tutta la stagione sportiva 2026/2027. 
                Compilare in stampatello e consegnare in sede o inviare via form.
              </p>

              <div className="mt-6 bg-black rounded-xl p-4 border border-white/10">
                <div className="flex justify-between text-[10px] opacity-50 mb-2"><span>FILE</span><span>PDF - 4.9 MB</span></div>
                <div className="font-bold text-sm">MODULO_DI_ISCRIZIONE_2026_2027.pdf</div>
                <div className="text-[10px] opacity-40 mt-1">Include: Dati Atleta, Dati Esercente Patria Potestà, Liberatoria</div>
              </div>

              <a 
                href="/modulo-abbonamento-2026-2027.pdf" 
                download="MODULO_ABBONAMENTO_GASTON_VILLA_2026_2027.pdf"
                className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
              >
                ⬇ SCARICA MODULO PDF
              </a>

              <a 
                href="/modulo-abbonamento-2026-2027.pdf" 
                target="_blank"
                className="mt-3 w-full bg-white/10 text-white rounded-full py-4 font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition"
              >
                👁 APRI ANTEPRIMA
              </a>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-bold text-[11px] tracking-widest opacity-50 mb-3">COME FUNZIONA</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">1</span><span>Scarica il modulo PDF</span></div>
                  <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">2</span><span>Compila in stampatello e firma</span></div>
                  <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">3</span><span>Invia richiesta dal form qui a fianco</span></div>
                  <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-[#C8102E] flex items-center justify-center text-[10px] font-black">4</span><span>Ti confermiamo via email</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - FORMSPREE FORM */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-[#111] border border-white/10 rounded-[24px] p-8">
              <h3 className="font-black text-xl">RICHIESTA ABBONAMENTO ONLINE</h3>
              <p className="text-xs opacity-60 mt-2">Compila il form, arriva diretto su Formspree ID: <span className="text-white font-mono font-bold">xnpajgdn</span>. Allegherai il modulo firmato in sede.</p>

              {sent ? (
                <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <div className="font-black text-xl">RICHIESTA INVIATA!</div>
                  <div className="text-xs opacity-60 mt-2">Abbiamo ricevuto la tua richiesta abbonamento 2026/2027. Ti rispondiamo via email entro 24h. Controlla anche lo spam.</div>
                  <button onClick={()=>setSent(false)} className="mt-6 bg-white text-black rounded-full px-6 py-3 font-bold text-xs">INVIA UN'ALTRA RICHIESTA</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">NOME *</label>
                      <input value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} placeholder="Mario" required className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">COGNOME *</label>
                      <input value={form.cognome} onChange={e=>setForm({...form, cognome:e.target.value})} placeholder="Rossi" required className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">EMAIL *</label>
                      <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="mario@email.com" required className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">TELEFONO</label>
                      <input value={form.telefono} onChange={e=>setForm({...form, telefono:e.target.value})} placeholder="+39 ..." className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">DATA DI NASCITA</label>
                      <input type="date" value={form.dataNascita} onChange={e=>setForm({...form, dataNascita:e.target.value})} className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest opacity-50 font-bold">CODICE FISCALE</label>
                      <input value={form.codiceFiscale} onChange={e=>setForm({...form, codiceFiscale:e.target.value})} placeholder="RSSMRA..." className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest opacity-50 font-bold">TIPO ABBONAMENTO</label>
                    <select value={form.tipoAbbonamento} onChange={e=>setForm({...form, tipoAbbonamento:e.target.value})} className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none">
                      <option value="STANDARD">STANDARD - 80€ (Curva)</option>
                      <option value="VERDE">VERDE - 150€</option>
                      <option value="BLU">BLU - 240€</option>
                      <option value="ROSSA">ROSSA - 320€</option>
                      <option value="VIP">VIP CENTRALE - 400€</option>
                      <option value="FAMILY">FAMILY PACK</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest opacity-50 font-bold">NOTE / MESSAGGIO</label>
                    <textarea value={form.messaggio} onChange={e=>setForm({...form, messaggio:e.target.value})} placeholder="Scrivi qui eventuali note, allergie, richieste particolari..." rows={4} className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none resize-none" />
                  </div>

                  <div className="bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-xl p-4 text-[11px] leading-relaxed">
                    <div className="font-bold text-[#C8102E]">INFORMATIVA PRIVACY E CONSENSO</div>
                    <div className="opacity-70 mt-1">Con l'invio accetti il trattamento dati per finalità di tesseramento al Circolo Gaston Villa stagione 2026/2027. I dati verranno inviati a Formspree ID xnpajgdn e gestiti dal circolo.</div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest hover:bg-zinc-200 transition disabled:opacity-50">
                    {loading ? "INVIO IN CORSO..." : "INVIA RICHIESTA ABBONAMENTO →"}
                  </button>

                  <p className="text-[9px] opacity-30 text-center">Form protetto via Formspree - ID: xnpajgdn - Riceverai conferma via email</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
