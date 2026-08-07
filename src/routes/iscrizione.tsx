import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";


export const Route = createFileRoute("/iscrizione")({ component: IscrizionePage });


function IscrizionePage() {
  const [f, setF] = useState({ nome: "", cognome: "", nascita: "", luogo: "", residenza: "", via: "", genitoreNome: "", genitoreCognome: "", telefono: "", cf: "", email: "" });
  const s = (k: string, v: string) => setF(p => ({...p, [k]: v}));
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white text-black rounded-2xl p-8">
        <h1 className="text-center font-black uppercase text-sm">MODULO DI ISCRIZIONE GASTON VILLA FC 2023 SRL</h1>
        <p className="text-right text-[10px] font-bold mt-1">*COMPLETARE IN STAMPATELLO</p>
        <div className="grid gap-3 mt-8">
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Nome Atleta" value={f.nome} onChange={e=>s("nome", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
            <input placeholder="Cognome Atleta" value={f.cognome} onChange={e=>s("cognome", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Nato il (GG/MM/AAAA)" value={f.nascita} onChange={e=>s("nascita", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
            <input placeholder="Luogo di nascita" value={f.luogo} onChange={e=>s("luogo", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          </div>
          <input placeholder="Residente in" value={f.residenza} onChange={e=>s("residenza", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          <input placeholder="Via" value={f.via} onChange={e=>s("via", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          <p className="font-black italic mt-4">DATI GENITORE</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Nome Genitore" value={f.genitoreNome} onChange={e=>s("genitoreNome", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
            <input placeholder="Cognome Genitore" value={f.genitoreCognome} onChange={e=>s("genitoreCognome", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          </div>
          <input placeholder="Telefono" value={f.telefono} onChange={e=>s("telefono", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          <input placeholder="Codice Fiscale" value={f.cf} onChange={e=>s("cf", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          <input placeholder="Email" value={f.email} onChange={e=>s("email", e.target.value)} className="border-b border-black py-2 outline-none text-sm" />
          <button onClick={() => toast.success("Iscrizione inviata!")} className="mt-6 bg-black text-white py-3 rounded-full font-bold uppercase text-xs tracking-widest">Invia Iscrizione - 450€</button>
        </div>
      </div>
    </div>
  );
}
