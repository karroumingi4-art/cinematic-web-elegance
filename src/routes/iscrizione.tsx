import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";


export const Route = createFileRoute("/iscrizione")({
  component: IscrizionePage,
});


function IscrizionePage() {
  const [pending, setPending] = useState(false);
  const [f, setF] = useState({
    nomeAtleta: "", cognomeAtleta: "", giorno: "", mese: "", anno: "", luogoNascita: "", residenzaAtleta: "", viaAtleta: "",
    nomeGenitore: "", cognomeGenitore: "", residenzaGen: "", viaGen: "", telefono: "", altroTelefono: "", cf: "", email: ""
  });


  const onChange = (k: string, v: string) => setF(p => ({...p, [k]: v }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.nomeAtleta ||!f.cognomeAtleta ||!f.email) {
      return toast.error("Compila Nome, Cognome ed Email");
    }
    setPending(true);


    const formData = new FormData();
    formData.append("_subject", `Nuova Iscrizione: ${f.nomeAtleta} ${f.cognomeAtleta}`);
    formData.append("ATLETA_Nome", f.nomeAtleta);
    formData.append("ATLETA_Cognome", f.cognomeAtleta);
    formData.append("ATLETA_Nato_il", `${f.giorno}/${f.mese}/${f.anno}`);
    formData.append("ATLETA_Luogo", f.luogoNascita);
    formData.append("ATLETA_Residenza", `${f.residenzaAtleta} - ${f.viaAtleta}`);
    formData.append("GENITORE_Nome", f.nomeGenitore);
    formData.append("GENITORE_Cognome", f.cognomeGenitore);
    formData.append("GENITORE_Residenza", `${f.residenzaGen} - ${f.viaGen}`);
    formData.append("GENITORE_Telefono", f.telefono);
    formData.append("GENITORE_Altro_Tel", f.altroTelefono);
    formData.append("GENITORE_CF", f.cf);
    formData.append("GENITORE_Email", f.email);
    formData.append("Quota", "450,00 € - Allenamenti + Tesseramento FIGC + Assicurazione");
    formData.append("Consenso", "Il genitore dichiara di manlevare la società Gaston Villa FC 2023 Srl da ogni responsabilità e di corrispondere l'importo di 450€");


    try {
      // 👇 INCOLLA QUI IL TUO ID FORMSPREE
      const res = await fetch("https://formspree.io/f/xgawvjqa", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        toast.success("Iscrizione inviata! Ti arriverà via mail");
        setF({ nomeAtleta: "", cognomeAtleta: "", giorno: "", mese: "", anno: "", luogoNascita: "", residenzaAtleta: "", viaAtleta: "", nomeGenitore: "", cognomeGenitore: "", residenzaGen: "", viaGen: "", telefono: "", altroTelefono: "", cf: "", email: "" });
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Errore invio, riprova");
    } finally {
      setPending(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white text-black rounded-2xl p-6 sm:p-10">
        <h1 className="text-center font-black uppercase text-[15px]">MODULO DI ISCRIZIONE SCUOLA CALCIO GASTON VILLA FC 2023 SRL</h1>
        <p className="text-right text-[10px] font-bold mt-1">*COMPLETARE IN STAMPATELLO</p>


        <h2 className="font-black italic mt-8 mb-3">DATI ATLETA</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input required value={f.nomeAtleta} onChange={e=>onChange("nomeAtleta", e.target.value)} placeholder="Nome" className="border-b border-black py-2 text-sm outline-none" />
          <input required value={f.cognomeAtleta} onChange={e=>onChange("cognomeAtleta", e.target.value)} placeholder="Cognome" className="border-b border-black py-2 text-sm outline-none" />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          <input value={f.giorno} onChange={e=>onChange("giorno", e.target.value)} placeholder="GG" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.mese} onChange={e=>onChange("mese", e.target.value)} placeholder="MM" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.anno} onChange={e=>onChange("anno", e.target.value)} placeholder="AAAA" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.luogoNascita} onChange={e=>onChange("luogoNascita", e.target.value)} placeholder="Nato a" className="border-b border-black py-2 text-sm outline-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <input value={f.residenzaAtleta} onChange={e=>onChange("residenzaAtleta", e.target.value)} placeholder="Residente in" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.viaAtleta} onChange={e=>onChange("viaAtleta", e.target.value)} placeholder="Via" className="border-b border-black py-2 text-sm outline-none" />
        </div>


        <h2 className="font-black italic mt-8 mb-3">DATI ESERCENTE PATRIA POTESTA'</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={f.nomeGenitore} onChange={e=>onChange("nomeGenitore", e.target.value)} placeholder="Nome Genitore" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.cognomeGenitore} onChange={e=>onChange("cognomeGenitore", e.target.value)} placeholder="Cognome Genitore" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.residenzaGen} onChange={e=>onChange("residenzaGen", e.target.value)} placeholder="Residente in" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.viaGen} onChange={e=>onChange("viaGen", e.target.value)} placeholder="Via" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.telefono} onChange={e=>onChange("telefono", e.target.value)} placeholder="N.Telefono" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.altroTelefono} onChange={e=>onChange("altroTelefono", e.target.value)} placeholder="Altro recapito" className="border-b border-black py-2 text-sm outline-none" />
          <input value={f.cf} onChange={e=>onChange("cf", e.target.value)} placeholder="Codice Fiscale" className="col-span-2 border-b border-black py-2 text-sm outline-none" />
          <input required value={f.email} onChange={e=>onChange("email", e.target.value)} placeholder="E-Mail" type="email" className="col-span-2 border-b border-black py-2 text-sm outline-none" />
        </div>


        <p className="mt-8 text-[10px] italic text-justify leading-tight">
          L'ESERCENTE PATRIA POTESTA' DICHIARA di manlevare la società Gaston Villa FC 2023 Srl da ogni responsabilità e di corrispondere l'intero importo di euro 450,00 € comprensivo di allenamenti, tesseramento F.I.G.C. e copertura assicurativa.
        </p>


        <button disabled={pending} type="submit" className="w-full mt-8 bg-black text-white font-bold uppercase tracking-widest py-4 rounded-full text-xs hover:bg-zinc-800 disabled:opacity-50">
          {pending? "Invio in corso..." : "Invia Iscrizione - 450,00 €"}
        </button>
      </form>
    </div>
  );
}
