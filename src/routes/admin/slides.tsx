import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";

export const Route = createFileRoute("/admin/slides")({
  component: AdminSlides,
});

function SlidePreview({ s }: { s: any }) {
  return (
    <div className="w-full aspect-[16/9] rounded- overflow-hidden border border-white/10 relative" style={{ background: s.bg.startsWith("linear")? undefined : s.bg, backgroundImage: s.bg.startsWith("linear")? s.bg : undefined }}>
      <div className="h-full w-full p-6 md:p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text- font-black tracking-[0.2em] px-3 py-1 rounded-full bg-white text-black">{s.sottotitolo}</span>
          <span className="text-white/30 text-">26 FC 27</span>
        </div>
        <div className="flex-1 flex items-center gap-4 mt-4">
          <div className="flex-1">
            <h2 className="font-black text- md:text- leading-[0.85] whitespace-pre-wrap text-white">{s.titolo}</h2>
            <p className="text-white/60 text- mt-3 max-w- whitespace-pre-wrap leading-relaxed">{s.testo}</p>
            {s.timeline && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {s.timeline.map((t: any) => (
                  <div key={t.anno} className="bg-white/5 border border-white/10 rounded-xl p-2">
                    <div className="text-[#7DD3E0] font-black text-">{t.anno}</div>
                    <div className="font-black text-">{t.titolo}</div>
                  </div>
                ))}
              </div>
            )}
            {s.highlight && <div className="mt-3 bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700] text- font-black tracking-widest px-3 py-1 rounded-full inline-block">{s.highlight}</div>}
          </div>
          {s.immagine && (
            <div className="w-[35%] flex items-center justify-center">
              <img src={s.immagine} className="w-full drop-shadow-[0_10px_20px_black] -rotate-2" alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-[#7DD3E0] w-[70%]" /></div>
    </div>
  );
}

function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial);
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("gh_token");
    if (t) setToken(t);
  }, []);

  const update = (field: string, value: string) => {
    const newSlides = [...slides] as any;
    newSlides[selected][field] = value;
    setSlides(newSlides);
  };

  const saveOnline = async () => {
    if (!token) { setMsg("❌ Inserisci token GitHub"); return; }
    localStorage.setItem("gh_token", token);
    setSaving(true); setMsg("");
    const repo = "karroumingi4-art/cinematic-web-elegance";
    const path = "src/data/slides-ritorno.json";
    try {
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { headers: { Authorization: `Bearer ${token}` } });
      const fileData = await getRes.json();
      if (!getRes.ok) throw new Error(fileData.message);
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(slides, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "admin: aggiornato slide", content, sha: fileData.sha, branch: "main" })
      });
      const putData = await putRes.json();
      if (!putRes.ok) throw new Error(putData.message);
      setMsg("✅ SALVATO! Deploy in 40s");
    } catch (e: any) { setMsg("❌ " + e.message); }
    setSaving(false);
  };

  const s = slides[selected] as any;

  return (
    <div className="min-h-screen bg-[#080808] text-white p-4 flex gap-4">
      {/* LISTA */}
      <div className="w- space-y-2 shrink-0">
        <h1 className="font-black text-lg mb-2">SLIDE</h1>
        {slides.map((sl: any, i: number) => (
          <button key={sl.id} onClick={() => setSelected(i)} className={`w-full text-left p-3 rounded-xl text-sm border flex gap-2 ${i === selected? "bg-white text-black border-white" : "bg-white/5 border-white/10"}`}>
            <span className="font-black">{sl.id}</span>
            <span className="text- truncate">{sl.titolo.slice(0,20)}</span>
          </button>
        ))}
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 mt-4">
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_..." className="w-full bg-black border border-white/20 rounded-lg p-2 text-xs" />
        </div>
        <button onClick={saveOnline} disabled={saving} className="w-full mt-3 bg-[#7DD3E0] text-black font-black py-3 rounded-full text-xs">{saving? "SALVANDO..." : "SALVA ONLINE →"}</button>
        {msg && <div className="text- mt-2 p-2 rounded-xl bg-white/10">{msg}</div>}
      </div>

      {/* FORM */}
      <div className="w- bg-[#111] rounded- p-6 border border-white/10 shrink-0 h-fit">
        <div className="flex justify-between items-center mb-4">
          <span className="font-black text-sm">MODIFICA SLIDE {s.id}</span>
          <button onClick={() => setPreviewMode(!previewMode)} className="text- bg-white/10 px-3 py-1 rounded-full">{previewMode? "FORM" : "PREVIEW"}</button>
        </div>
        <div className="space-y-4">
          <div><label className="text- opacity-50">SOTTOTITOLO</label><input value={s.sottotitolo} onChange={(e) => update("sottotitolo", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-xs" /></div>
          <div><label className="text- opacity-50">TITOLO (INVIO = a capo)</label><textarea value={s.titolo} onChange={(e) => update("titolo", e.target.value)} rows={3} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm font-black" /></div>
          <div><label className="text- opacity-50">TESTO</label><textarea value={s.testo} onChange={(e) => update("testo", e.target.value)} rows={4} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-xs" /></div>
          <div><label className="text- opacity-50">BACKGROUND</label><input value={s.bg} onChange={(e) => update("bg", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-2 text-xs" /></div>
          <div><label className="text- opacity-50">IMMAGINE</label><input value={s.immagine || ""} onChange={(e) => update("immagine", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-2 text-xs" /></div>
          <div><label className="text- opacity-50">BADGE GIALLO</label><input value={s.highlight || ""} onChange={(e) => update("highlight", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-2 text-xs" /></div>
        </div>
      </div>

      {/* ANTEPRIMA LIVE A FIANCO */}
      <div className="flex-1 space-y-4">
        <div className="text- font-black tracking-widest opacity-50">ANTEPRIMA LIVE → COME LA VEDE L'UTENTE</div>
        <SlidePreview s={s} />

        <div className="text- font-black tracking-widest opacity-50 mt-6">TUTTE LE 7 SLIDE - CAROSELLO COMPLETO</div>
        <div className="grid grid-cols-2 gap-3">
          {slides.map((slide: any) => (
            <div key={slide.id} onClick={() => setSelected(slides.indexOf(slide))} className={`cursor-pointer rounded-xl overflow-hidden border-2 ${slides.indexOf(slide) === selected? "border-[#7DD3E0]" : "border-transparent"} opacity-80 hover:opacity-100`}>
              <div className="scale-[0.5] origin-top-left w-[200%]">
                <SlidePreview s={slide} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
