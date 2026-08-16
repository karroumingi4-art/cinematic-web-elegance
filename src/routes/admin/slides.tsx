import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";
export const Route = createFileRoute("/admin/slides")({ component: AdminSlides });


function Preview({ s, small }: { s: any, small?: boolean }) {
  const imgs = (s.immagini || (s.immagine? [s.immagine] : [])).filter(Boolean);
  return (
    <div className={`w-full rounded-[20px] overflow-hidden border border-white/10 relative`} style={{ background: s.bg }}>
      <div className={`${small? "p-3" : "p-8"} h-full flex items-center gap-3`}>
        <div className="flex-1">
          <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white text-black inline-block">{s.sottotitolo}</span>
          <h2 className={`${small? "text-[12px]" : "text-[28px]"} font-black leading-[0.85] whitespace-pre-wrap mt-3`} style={{ color: s.textColor || "white" }}>{s.titolo}</h2>
          {!small && <p className="text-[11px] mt-3 max-w-[280px] whitespace-pre-wrap opacity-60" style={{ color: s.textColor || "white" }}>{s.testo}</p>}
        </div>
        <div className={`flex flex-wrap gap-2 justify-end ${small?"w-[45%]":"w-[40%]"}`}>
          {imgs.map((img:string,i:number)=>(
            <img key={i} src={img} className={`${imgs.length===1?"w-full": imgs.length===2?"w-[48%]":"w-[30%]"} object-contain drop-shadow-xl`} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}


function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial as any[]);
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState(""); const [saving,setSaving]=useState(false); const [msg,setMsg]=useState("");
  useEffect(()=>{ const t=localStorage.getItem("gh_token"); if(t) setToken(t); },[]);
  const s = slides[selected];
  const imgs = (s.immagini || (s.immagine? [s.immagine] : [])).filter(Boolean);


  const update = (f:string,v:any)=>{ const ns=[...slides]; (ns as any)[selected][f]=v; setSlides(ns); };
  const setImgs = (newImgs:string[])=>{ const ns=[...slides]; ns[selected].immagini=newImgs; delete ns[selected].immagine; delete ns[selected].immagine2; setSlides(ns); };


  const saveOnline = async ()=>{
    if(!token){setMsg("❌ token");return;} localStorage.setItem("gh_token",token); setSaving(true); setMsg("");
    const repo="karroumingi4-art/cinematic-web-elegance"; const path="src/data/slides-ritorno.json";
    try{
      const getRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{headers:{Authorization:`Bearer ${token}`}});
      const fd=await getRes.json(); if(!getRes.ok) throw new Error(fd.message);
      const content=btoa(unescape(encodeURIComponent(JSON.stringify(slides,null,2))));
      const putRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({message:"admin multi",content,sha:fd.sha,branch:"main"})});
      if(!putRes.ok) throw new Error((await putRes.json()).message); setMsg("✅ SALVATO!");
    }catch(e:any){setMsg("❌ "+e.message);} setSaving(false);
  };


  return (
    <div className="min-h-screen bg-[#080808] text-white p-3 flex gap-3">
      <div className="w-[190px] shrink-0 space-y-2">
        <h1 className="font-black text-sm">SLIDE</h1>
        {slides.map((sl:any,i:number)=><button key={sl.id} onClick={()=>setSelected(i)} className={`w-full text-left p-3 rounded-xl text-xs border ${i===selected?"bg-white text-black":"bg-white/5 border-white/10"}`}><b>{sl.id}</b> {sl.titolo.slice(0,18)}</button>)}
        <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="ghp_..." className="w-full mt-4 bg-black border border-white/20 rounded-lg p-2 text-xs" />
        <button onClick={saveOnline} disabled={saving} className="w-full bg-[#7DD3E0] text-black font-black py-3 rounded-full text-xs mt-2">{saving?"...":"SALVA ONLINE →"}</button>
        {msg && <div className="text-[10px] p-2 rounded bg-white/10">{msg}</div>}
      </div>


      <div className="w-[360px] shrink-0 bg-[#111] rounded-[20px] p-5 border border-white/10 h-fit max-h-[90vh] overflow-auto">
        <div className="font-black text-xs mb-4">SLIDE {s.id} - {imgs.length} FOTO</div>


        {/* LISTA FOTO INFINITE */}
        <div className="bg-black/50 p-3 rounded-xl border border-white/10 mb-4">
          {imgs.map((img:string,i:number)=>(
            <div key={i} className="flex gap-2 mb-2">
              <input value={img} onChange={e=>{ const ni=[...imgs]; ni[i]=e.target.value; setImgs(ni); }} className="flex-1 bg-[#111] border border-white/20 rounded-lg p-2 text-[11px]" />
              <button onClick={()=>setImgs(imgs.filter((_:any,idx:number)=>idx!==i))} className="px-2.5 bg-red-500/20 border border-red-500/30 rounded-lg text-xs">✕</button>
            </div>
          ))}
          <button onClick={()=>setImgs([...imgs, "/gaston-villa-maglia-trasparente.png"])} className="w-full mt-2 bg-white text-black font-black py-2.5 rounded-full text-[11px]">+ AGGIUNGI FOTO</button>
          <div className="text-[9px] opacity-30 mt-2">Puoi aggiungerne quante vuoi. Tutte in /public</div>
        </div>


        <div className="grid grid-cols-2 gap-2 mb-3"><div><label className="text-[9px] opacity-50">COLORE TESTO</label><input type="color" value={s.textColor||"#ffffff"} onChange={e=>update("textColor",e.target.value)} className="w-full h-10 rounded-xl bg-black mt-1" /></div><div><label className="text-[9px] opacity-50">COLORE SOTTO</label><input type="color" value={s.subColor||"#7DD3E0"} onChange={e=>update("subColor",e.target.value)} className="w-full h-10 rounded-xl bg-black mt-1" /></div></div>
        <div className="space-y-3"><div><label className="text-[9px] opacity-50">SOTTOTITOLO</label><input value={s.sottotitolo} onChange={e=>update("sottotitolo",e.target.value)} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-xs mt-1" /></div><div><label className="text-[9px] opacity-50">TITOLO</label><textarea value={s.titolo} onChange={e=>update("titolo",e.target.value)} rows={3} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-sm font-black mt-1" /></div><div><label className="text-[9px] opacity-50">TESTO</label><textarea value={s.testo} onChange={e=>update("testo",e.target.value)} rows={4} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-xs mt-1" /></div></div>
      </div>


      <div className="flex-1 space-y-4 overflow-auto">
        <div className="text-[10px] font-black tracking-widest opacity-40">ANTEPRIMA LIVE - {imgs.length} FOTO</div>
        <Preview s={s} />
        <div className="text-[10px] font-black tracking-widest opacity-40 mt-6">TUTTE LE 7 SLIDE</div>
        <div className="grid grid-cols-2 gap-3">{slides.map((sl:any,i:number)=><div key={sl.id} onClick={()=>setSelected(i)} className={`cursor-pointer rounded-[16px] border-2 overflow-hidden ${i===selected?"border-[#7DD3E0]":"border-transparent"}`}><div className="scale-[0.55] origin-top-left w-[181%] -mb-[81%]"><Preview s={sl} small /></div></div>)}</div>
      </div>
    </div>
  );
}
