import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";


export const Route = createFileRoute("/admin/slides")({ component: AdminSlides });


function Preview({ s, small }: { s: any, small?: boolean }) {
  return (
    <div className={`w-full ${small? "aspect-[16/9]" : "aspect-[16/9]"} rounded-[20px] overflow-hidden border border-white/10 relative`} style={{ background: s.bg.startsWith("linear")||s.bg.startsWith("radial")? undefined : s.bg, backgroundImage: s.bg.startsWith("linear")||s.bg.startsWith("radial")? s.bg : undefined }}>
      <div className={`h-full w-full ${small? "p-3" : "p-8"} flex flex-col justify-between`}>
        <span className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full bg-white text-black w-fit" style={{ color: s.subColor? s.subColor : undefined }}>{s.sottotitolo}</span>
        <div className="flex-1 flex items-center gap-4 mt-3">
          <div className="flex-1">
            <h2 className={`${small? "text-[14px]" : "text-[28px]"} font-black leading-[0.85] whitespace-pre-wrap`} style={{ color: s.textColor || "white" }}>{s.titolo}</h2>
            {!small && <p className="text-[11px] mt-3 max-w-[280px] whitespace-pre-wrap leading-relaxed opacity-60" style={{ color: s.textColor || "white" }}>{s.testo}</p>}
            {s.highlight &&!small && <div className="mt-3 bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700] text-[8px] font-black tracking-widest px-3 py-1 rounded-full inline-block">{s.highlight}</div>}
          </div>
          {s.immagine && <img src={s.immagine} className="w-[30%] drop-shadow-[0_10px_20px_black] -rotate-2 object-contain" alt="" />}
        </div>
      </div>
    </div>
  );
}


function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial as any[]);
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => { const t = localStorage.getItem("gh_token"); if (t) setToken(t); }, []);
  const update = (field: string, value: string) => { const ns = [...slides]; (ns as any)[selected][field] = value; setSlides(ns); };
  const saveOnline = async () => {
    if (!token) { setMsg("❌ Inserisci token GitHub"); return; }
    localStorage.setItem("gh_token", token); setSaving(true); setMsg("");
    const repo = "karroumingi4-art/cinematic-web-elegance"; const path = "src/data/slides-ritorno.json";
    try {
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { headers: { Authorization: `Bearer ${token}` } });
      const fileData = await getRes.json(); if (!getRes.ok) throw new Error(fileData.message);
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(slides, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ message: "admin: slides", content, sha: fileData.sha, branch: "main" }) });
      const putData = await putRes.json(); if (!putRes.ok) throw new Error(putData.message); setMsg("✅ SALVATO! Deploy 40s");
    } catch (e: any) { setMsg("❌ " + e.message); } setSaving(false);
  };
  const s = slides[selected];


  return (
    <div className="min-h-screen bg-[#080808] text-white p-3 flex gap-3">
      <div className="w-[190px] shrink-0 space-y-2">
        <h1 className="font-black">SLIDE</h1>
        {slides.map((sl: any, i: number) => <button key={sl.id} onClick={() => setSelected(i)} className={`w-full text-left p-3 rounded-xl text-xs border ${i===selected?"bg-white text-black":"bg-white/5 border-white/10"}`}><b>{sl.id}</b> {sl.titolo.slice(0,18)}</button>)}
        <input type="password" value={token} onChange={(e)=>setToken(e.target.value)} placeholder="ghp_..." className="w-full mt-4 bg-black border border-white/20 rounded-lg p-2 text-xs" />
        <button onClick={saveOnline} disabled={saving} className="w-full bg-[#7DD3E0] text-black font-black py-3 rounded-full text-xs mt-2">{saving?"...":"SALVA ONLINE →"}</button>
        {msg && <div className="text-[10px] p-2 rounded bg-white/10">{msg}</div>}
      </div>


      <div className="w-[360px] shrink-0 bg-[#111] rounded-[20px] p-5 border border-white/10 h-fit">
        <div className="font-black text-xs mb-4">MODIFICA SLIDE {s.id}</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div><label className="text-[9px] opacity-50">COLORE TESTO</label><input type="color" value={s.textColor || "#ffffff"} onChange={(e)=>update("textColor", e.target.value)} className="w-full h-10 rounded-xl bg-black" /></div>
          <div><label className="text-[9px] opacity-50">COLORE SOTTO</label><input type="color" value={s.subColor || "#7DD3E0"} onChange={(e)=>update("subColor", e.target.value)} className="w-full h-10 rounded-xl bg-black" /></div>
        </div>
        <div className="space-y-3">
          <div><label className="text-[9px] opacity-50">SOTTOTITOLO</label><input value={s.sottotitolo} onChange={(e)=>update("sottotitolo", e.target.value)} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-xs mt-1" /></div>
          <div><label className="text-[9px] opacity-50">TITOLO</label><textarea value={s.titolo} onChange={(e)=>update("titolo", e.target.value)} rows={3} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-sm font-black mt-1" /></div>
          <div><label className="text-[9px] opacity-50">TESTO</label><textarea value={s.testo} onChange={(e)=>update("testo", e.target.value)} rows={4} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-xs mt-1" /></div>
          <div><label className="text-[9px] opacity-50">BACKGROUND</label><input value={s.bg} onChange={(e)=>update("bg", e.target.value)} className="w-full bg-black border border-white/20 rounded-xl p-2 text-xs mt-1" /></div>
          <div><label className="text-[9px] opacity-50">IMMAGINE</label><input value={s.immagine || ""} onChange={(e)=>update("immagine", e.target.value)} className="w-full bg-black border border-white/20 rounded-xl p-2 text-xs mt-1" /></div>
        </div>
      </div>


      <div className="flex-1 space-y-4 overflow-auto">
        <div className="text-[10px] font-black tracking-widest opacity-40">ANTEPRIMA LIVE - SLIDE {s.id}</div>
        <Preview s={s} />
        <div className="text-[10px] font-black tracking-widest opacity-40 mt-6">TUTTE LE 7 SLIDE (clicca per modificare)</div>
        <div className="grid grid-cols-2 gap-3">
          {slides.map((sl:any,i:number)=><div key={sl.id} onClick={()=>setSelected(i)} className={`cursor-pointer rounded-[16px] border-2 overflow-hidden ${i===selected?"border-[#7DD3E0]":"border-transparent"}`}><div className="scale-[0.6] origin-top-left w-[166%] -mb-[66%]"><Preview s={sl} small /></div></div>)}
        </div>
      </div>
    </div>
  );
}
