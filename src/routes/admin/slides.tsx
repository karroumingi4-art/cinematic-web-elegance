import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";


export const Route = createFileRoute("/admin/slides")({
  component: AdminSlides,
});


function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial);
  const [selected, setSelected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");


  const update = (field: string, value: string) => {
    const newSlides = [...slides] as any;
    newSlides[selected][field] = value;
    setSlides(newSlides);
  };


  const saveOnline = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/save-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slides)
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("✅ Salvato! Vercel sta deployando (1 min)");
      } else {
        setMsg("❌ Errore: " + data.error);
      }
    } catch (e: any) {
      setMsg("❌ Errore: " + e.message);
    }
    setSaving(false);
  };


  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(slides, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slides-ritorno.json";
    a.click();
  };


  const s = slides[selected] as any;


  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 flex gap-6">
      <div className="w-[260px] space-y-2">
        <h1 className="font-black text-xl mb-4">MODIFICA SLIDE</h1>
        {slides.map((sl: any, i: number) => (
          <button key={sl.id} onClick={() => setSelected(i)} className={`w-full text-left p-3 rounded-xl text-sm border ${i === selected? "bg-white text-black border-white" : "bg-white/5 border-white/10"}`}>
            <div className="font-black">SLIDE {sl.id}</div>
            <div className="text-[11px] opacity-60 truncate">{sl.titolo.slice(0,30)}</div>
          </button>
        ))}
        <button onClick={saveOnline} disabled={saving} className="w-full mt-6 bg-[#7DD3E0] text-black font-black py-3 rounded-full text-sm disabled:opacity-50">
          {saving? "SALVANDO..." : "SALVA ONLINE →"}
        </button>
        <button onClick={downloadJson} className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-full text-sm">SCARICA JSON</button>
        {msg && <div className="text-[11px] mt-3 p-3 rounded-xl bg-white/10">{msg}</div>}
      </div>
      <div className="flex-1 bg-[#111] rounded-[24px] p-8 border border-white/10">
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-[10px] opacity-50">SOTTOTITOLO</label><input value={s.sottotitolo} onChange={(e) => update("sottotitolo", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text-[10px] opacity-50">BACKGROUND</label><input value={s.bg} onChange={(e) => update("bg", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div className="col-span-2"><label className="text-[10px] opacity-50">TITOLO</label><textarea value={s.titolo} onChange={(e) => update("titolo", e.target.value)} rows={3} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm font-black" /></div>
          <div className="col-span-2"><label className="text-[10px] opacity-50">TESTO</label><textarea value={s.testo} onChange={(e) => update("testo", e.target.value)} rows={4} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text-[10px] opacity-50">IMMAGINE</label><input value={s.immagine || ""} onChange={(e) => update("immagine", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text-[10px] opacity-50">HIGHLIGHT</label><input value={s.highlight || ""} onChange={(e) => update("highlight", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
        </div>
        <div className="mt-8 p-6 rounded-2xl border border-white/10" style={{ background: s.bg.startsWith("linear")? undefined : s.bg, backgroundImage: s.bg.startsWith("linear")? s.bg : undefined }}>
          <div className="text-[10px] text-[#7DD3E0] font-black">{s.sottotitolo}</div>
          <h2 className="font-black text-3xl mt-2 whitespace-pre-wrap">{s.titolo}</h2>
          <p className="text-sm opacity-70 mt-3 whitespace-pre-wrap">{s.testo}</p>
          {s.immagine && <img src={s.immagine} className="h-24 mt-4" alt="" />}
        </div>
      </div>
    </div>
  );
}
