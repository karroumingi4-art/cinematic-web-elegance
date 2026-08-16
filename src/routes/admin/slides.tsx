import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";

export const Route = createFileRoute("/admin/slides")({
  component: AdminSlides,
});

function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial);
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

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
    if (!token) {
      setMsg("❌ Inserisci il token GitHub sotto");
      return;
    }
    localStorage.setItem("gh_token", token);
    setSaving(true);
    setMsg("");

    const repo = "karroumingi4-art/cinematic-web-elegance";
    const path = "src/data/slides-ritorno.json";

    try {
      // prendi SHA
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fileData = await getRes.json();
      if (!getRes.ok) throw new Error(fileData.message);
      const sha = fileData.sha;

      const content = btoa(unescape(encodeURIComponent(JSON.stringify(slides, null, 2))));

      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "admin: aggiornato slide maglia ritorno",
          content: content,
          sha: sha,
          branch: "main"
        })
      });

      const putData = await putRes.json();
      if (!putRes.ok) throw new Error(putData.message);

      setMsg("✅ SALVATO! Vercel deploya in 40s. Ricarica il sito tra 1 min.");
    } catch (e: any) {
      setMsg("❌ Errore: " + e.message);
    }
    setSaving(false);
  };

  const s = slides[selected] as any;

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 flex gap-6">
      <div className="w- space-y-2">
        <h1 className="font-black text-xl">MODIFICA SLIDE</h1>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 mb-4">
          <div className="text- opacity-60 mb-1">GITHUB TOKEN (solo 1 volta)</div>
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_..." className="w-full bg-black border border-white/20 rounded-lg p-2 text-xs" />
          <div className="text- opacity-40 mt-1">GitHub → Settings → Developer → Tokens → Generate (spunta repo)</div>
        </div>

        {slides.map((sl: any, i: number) => (
          <button key={sl.id} onClick={() => setSelected(i)} className={`w-full text-left p-3 rounded-xl text-sm border ${i === selected? "bg-white text-black" : "bg-white/5 border-white/10"}`}>
            <div className="font-black">SLIDE {sl.id}</div>
            <div className="text- opacity-60 truncate">{sl.titolo.slice(0,30)}</div>
          </button>
        ))}

        <button onClick={saveOnline} disabled={saving} className="w-full mt-6 bg-[#7DD3E0] text-black font-black py-3 rounded-full text-sm disabled:opacity-50">
          {saving? "SALVANDO..." : "SALVA ONLINE →"}
        </button>
        {msg && <div className="text- mt-3 p-3 rounded-xl bg-white/10 whitespace-pre-wrap">{msg}</div>}
      </div>

      <div className="flex-1 bg-[#111] rounded- p-8 border border-white/10">
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text- opacity-50">SOTTOTITOLO</label><input value={s.sottotitolo} onChange={(e) => update("sottotitolo", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text- opacity-50">BACKGROUND</label><input value={s.bg} onChange={(e) => update("bg", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div className="col-span-2"><label className="text- opacity-50">TITOLO</label><textarea value={s.titolo} onChange={(e) => update("titolo", e.target.value)} rows={3} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm font-black" /></div>
          <div className="col-span-2"><label className="text- opacity-50">TESTO</label><textarea value={s.testo} onChange={(e) => update("testo", e.target.value)} rows={4} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text- opacity-50">IMMAGINE</label><input value={s.immagine || ""} onChange={(e) => update("immagine", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
          <div><label className="text- opacity-50">HIGHLIGHT</label><input value={s.highlight || ""} onChange={(e) => update("highlight", e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded-xl p-3 text-sm" /></div>
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
