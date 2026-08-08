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
    if (!form.nome ||!form.email) return alert("Inserisci nome ed email");
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
        headers: { Accept: "application/json" }
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
      <div className="mx-auto max-w- px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text- tracking-widest font-bold mb-4">CIRCOLO GASTON VILLA</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">ENTRA NEL<br/><span className="text-[#C8102E]">CIRCOLO</span></h1>
          <p className="opacity-60 text-sm mt-4 max-w- mx-auto">Diventa socio Gaston Villa per la stagione 2026/2027. Scarica il modulo, compila i dati e invia la richiesta. Formspree attivo: xnpajgdn</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-[#111] border border-white/10 rounded- p-8 sticky top-24">
              <div className="w-16 h-16 rounded-2xl bg-[#C8102E] flex items-center justify-center text-2xl mb-6">📄</div>
              <h2 className="font-black text-2xl leading-tight">MODULO DI RICHIESTA<br/>ABBONAMENTO 2026/2027</h2>
              <p className="text-xs opacity-60 mt-3 leading-relaxed">Documento ufficiale per l'iscrizione al Circolo Gaston Villa. Valido per tutta la stagione 2026/2027.</p>

              <div className="mt-6 bg-black rounded-xl p-4 border border-white/10">
                <div className="flex justify-between text- opacity-50 mb-2"><span>FILE</span><span>PDF - 4.9 MB</span></div>
                <div className="font-bold text-sm">MODULO_ABBONAMENTO_2026_2027.pdf</div>
                <div className="text- opacity-40 mt-1">Dati Atleta + Patria Potestà + Liberatoria</div>
              </div>

              <a href="/modulo-abbonamento-2026-2027.pdf" download="MODULO_ABBONAMENTO_GASTON_VILLA_2026_2027.pdf" className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition">⬇ SCARICA MODULO PDF</a>
              <a href="/modulo-abbonamento-2026-2027.pdf" target="_blank" className="mt-3 w-full bg-white/10 text-white rounded-full py-4 font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition">👁 APRI ANTEPRIMA</a>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-bold text- tracking-widest opacity-50 mb-3">COME FUNZIONA</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text- font-black">1</span><span>Scarica il modulo PDF</span></div>
                  <div className="flex gap-3"><span
