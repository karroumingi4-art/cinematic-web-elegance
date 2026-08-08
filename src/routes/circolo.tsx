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

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email) return alert("Inserisci nome ed email");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("nome", form.nome);
      fd.append("cognome", form.cognome);
      fd.append("email", form.email);
      fd.append("telefono", form.telefono);
      fd.append("dataNascita", form.dataNascita);
      fd.append("codiceFiscale", form.codiceFiscale);
      fd.append("tipoAbbonamento", form.tipoAbbonamento);
      fd.append("messaggio", form.messaggio);
      fd.append("_subject", "NUOVA RICHIESTA ABBONAMENTO 2026/2027 - GASTON VILLA");
      fd.append("_replyto", form.email);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        alert("Errore: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs tracking-widest font-bold mb-4">
            CIRCOLO GASTON VILLA
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            ENTRA NEL<br /><span className="text-[#C8102E]">CIRCOLO</span>
          </h1>
          <p className="opacity-60 text-sm mt-4 max-w-xl mx-auto">
            Diventa socio Gaston Villa per la stagione 2026/2027. Scarica il modulo, compila i dati e invia la richiesta. Formspree attivo: xnpajgdn
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Colonna sinistra: modulo PDF */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 sticky top-24">
              <div className="w-16 h-16 rounded-2xl bg-[#C8102E] flex items-center justify-center text-2xl mb-6">
                📄
              </div>
              <h2 className="font-black text-2xl leading-tight">
                MODULO DI RICHIESTA<br />ABBONAMENTO 2026/2027
              </h2>
              <p className="text-xs opacity-60 mt-3 leading-relaxed">
                Documento ufficiale per l'iscrizione al Circolo Gaston Villa. Valido per tutta la stagione 2026/2027.
              </p>

              <div className="mt-6 bg-black rounded-xl p-4 border border-white/10">
                <div className="flex justify-between text-xs opacity-50 mb-2">
                  <span>FILE</span><span>PDF - 4.9 MB</span>
                </div>
                <div className="font-bold text-sm">MODULO_ABBONAMENTO_2026_2027.pdf</div>
                <div className="text-xs opacity-40 mt-1">Dati Atleta + Patria Potestà + Liberatoria</div>
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
                rel="noopener noreferrer"
                className="mt-3 w-full bg-white/10 text-white rounded-full py-4 font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition"
              >
                👁 APRI ANTEPRIMA
              </a>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-bold text-xs tracking-widest opacity-50 mb-3">COME FUNZIONA</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black">1</span>
                    <span>Scarica il modulo PDF</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black">2</span>
                    <span>Compila i tuoi dati e stampalo, oppure tienilo pronto in digitale</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black">3</span>
                    <span>Invia la richiesta qui a fianco: ti contatteremo per completare l'iscrizione</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonna destra: form richiesta */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#C8102E] flex items-center justify-center text-3xl mx-auto mb-6">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black mb-2">RICHIESTA INVIATA</h3>
                  <p className="opacity-60 text-sm max-w-sm mx-auto">
                    Grazie {form.nome}! Abbiamo ricevuto la tua richiesta di abbonamento. Ti contatteremo a breve via email per completare l'iscrizione.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h4 className="font-bold text-xs tracking-widest opacity-50 mb-2">DATI RICHIEDENTE</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Nome *</label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => updateField("nome", e.target.value)}
                        required
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Cognome</label>
                      <input
                        type="text"
                        value={form.cognome}
                        onChange={(e) => updateField("cognome", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Telefono</label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={(e) => updateField("telefono", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Data di nascita</label>
                      <input
                        type="date"
                        value={form.dataNascita}
                        onChange={(e) => updateField("dataNascita", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-60 block mb-1">Codice Fiscale</label>
                      <input
                        type="text"
                        value={form.codiceFiscale}
                        onChange={(e) => updateField("codiceFiscale", e.target.value.toUpperCase())}
                        maxLength={16}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm uppercase focus:border-[#C8102E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs opacity-60 block mb-1">Tipo di Abbonamento</label>
                    <select
                      value={form.tipoAbbonamento}
                      onChange={(e) => updateField("tipoAbbonamento", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C8102E] focus:outline-none"
                    >
                      <option value="STANDARD">Standard</option>
                      <option value="JUNIOR">Junior (under 18)</option>
                      <option value="SENIOR">Senior (over 65)</option>
                      <option value="FAMIGLIA">Famiglia</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs opacity-60 block mb-1">Messaggio (opzionale)</label>
                    <textarea
                      value={form.messaggio}
                      onChange={(e) => updateField("messaggio", e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm resize-none focus:border-[#C8102E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C8102E] text-white rounded-full py-4 font-black text-xs tracking-widest hover:bg-[#a80d26] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "INVIO IN CORSO..." : "INVIA RICHIESTA"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
