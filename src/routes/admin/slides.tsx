import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";

export const Route = createFileRoute("/admin/slides")({
  component: AdminSlides,
});

function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial);
  const [selected, setSelected] = useState(0);

  const update = (field: string, value: string) => {
    const newSlides = [...slides] as any;
    newSlides[selected][field] = value;
    setSlides(newSlides);
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
      <div className="w- space-y-2">
        <h1 className="font-black text-xl mb-4">MODIFICA SLIDE</h1>
        {slides.map((sl: any, i: number) => (
          <button key={sl.id} onClick={() => setSelected(i)} className={`w-full text-left p-3 rounded-xl text-sm border ${i === selected? "bg-white text-black border-white" : "bg-white/5 border-white/10"}`}>
            <div className="font-black">SLIDE {sl.id}</div>
            <div className="text- opacity-60 truncate">{sl.titolo.slice(0,30)}</div>
          </button>
        ))}
        <button onClick={downloadJson} className="w-full mt-6 bg-[#7DD3E0] text-black font-black py-3 rounded-full text-sm">SCARICA JSON AGGIORNATO</button>
        <div className="text- opacity-40 mt-4">1. Modifica qui<br/>2. Scarica JSON<br/>3. Sostituisci src/data/slides-ritorno.json<br/>4. git push</div>
      </div>
      <div className="flex-1 bg-[#111] rounded- p-8 border border-white/10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text- opacity-50">SOTTOTITOLO</label>
            <input value={s.sottotitolo} onChange={(e) => update("sottotitolo", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" />
          </div>
          <div>
            <label className="text- opacity-50">BACKGROUND</label>
            <input value={s.bg} onChange={(e) => update("bg", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="text- opacity-50">TITOLO</label>
            <textarea value={s.titolo} onChange={(e) => update("titolo", e.target.value)} rows={3} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm font-black" />
          </div>
          <div className="col-span-2">
            <label className="text- opacity-50">TESTO</label>
            <textarea value={s.testo} onChange={(e) => update("testo", e.target.value)} rows={4} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" />
          </div>
          <div>
            <label className="text- opacity-50">IMMAGINE</label>
            <input value={s.immagine || ""} onChange={(e) => update("immagine", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" placeholder="/maglia-gaston-2026.png" />
          </div>
          <div>
            <label className="text- opacity-50">HIGHLIGHT</label>
            <input value={s.highlight || ""} onChange={(e) => update("highlight", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" />
          </div>
        </div>
        <div className="mt-8 p-6 rounded-2xl border border-white/10" style={{ background: s.bg.startsWith("linear")? undefined : s.bg, backgroundImage: s.bg.startsWith("linear")? s.bg : undefined }}>
          <div className="text- text-[#7DD3E0] font-black">{s.sottotitolo}</div>
          <h2 className="font-black text-3xl mt-2 whitespace-pre-wrap">{s.titolo}</h2>
          <p className="text-sm opacity-70 mt-3 whitespace-pre-wrap">{s.testo}</p>
          {s.immagine && <img src={s.immagine} className="h-24 mt-4" alt="" />}
        </div>
      </div>
    </div>
  );
}
