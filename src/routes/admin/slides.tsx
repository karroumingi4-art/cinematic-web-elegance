import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";
export const Route = createFileRoute("/admin/slides")({ component: AdminSlides });

function Preview({ s, small }: { s: any, small?: boolean }) {
  const imgs = (s.immagini || (s.immagine? [s.immagine] : [])).filter(Boolean);
  return (
    <div className={`w-full rounded- overflow-hidden border border-white/10 ${small? "aspect-[16/9] p-3":"aspect-[16/9] p-8"}`} style={{ background: s.bg }}>
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1"><h2 className={`${small?"text-":"text-"} font-black leading-[0.9] whitespace-pre-wrap`} style={{color:s.textColor||"white"}}>{s.titolo}</h2>{!small && <p className="text- mt-2 opacity-60 whitespace-pre-wrap" style={{color:s.textColor||"white"}}>{s.testo}</p>}</div>
          <div className={`flex ${imgs.length>1?"gap-1 flex-wrap justify-end":""} w-[40%]`}>{imgs.map((img:string,i:number)=><img key={i} src={img} className={`${imgs.length>1?"w-[48%]":"w-full"} object-contain drop-shadow-xl`} alt="" />)}</div>
        </div>
      </div>
    </div>
  );
}

function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial as any[]);
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState(""); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState("");
  useEffect(()=>{ const t=localStorage.getItem("gh_token"); if(t) setToken(t); },[]);
  const update = (field:string,value:any)=>{ const ns=[...slides]; (ns as any)[selected][field]=value; setSlides(ns); };
  const s = slides[selected];
  const imgs = (s.immagini || (s.immagine?[s.immagine]:[])).filter(Boolean);

  const updateImgs = (newImgs:string[])=>{
    const ns=[...slides];
    if(newImgs.length<=1){ delete (ns as any)[selected].immagini; (ns as any)[selected].immagine = newImgs[0]||""; }
    else { (ns as any)[selected].immagini = newImgs; delete (ns as any)[selected].immagine; }
    setSlides(ns);
  };

  const saveOnline = async ()=>{
    if(!token){ setMsg("❌ token"); return; } localStorage.setItem("gh_token",token); setSaving(true); setMsg("");
    const repo="karroumingi4-art/cinematic-web-elegance"; const path="src/data/slides-ritorno.json";
    try{
      const getRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{headers:{Authorization:`Bearer ${token}`}});
      const fileData=await getRes.json(); if(!getRes.ok) throw new Error(fileData.message);
      const content=btoa(unescape(encodeURIComponent(JSON.stringify(slides,null,2))));
      const putRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({message:"admin slides",content,sha:fileData.sha,branch:"main"})});
      const pd=await putRes.json(); if(!putRes.ok) throw new Error(pd.message); setMsg("✅ SALVATO! 40s deploy");
    }catch(e:any){ setMsg("❌ "+e.message); } setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-3 flex gap-3">
      <div className="w- space-y-2"><h1 className="font-black">SLIDE</h1>{slides.map((sl:any,i:number)=><button key={sl.id} onClick={()=>setSelected(i)} className={`w-full text-left p-3 rounded-xl text-xs border ${i===selected?"bg-white text-black":"bg-white/5 border-white/10"}`}>{sl.id} {sl.titolo.slice(0,18)}</button>)}
        <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="ghp_..." className="w-full mt-4 bg-black border border-white/20 rounded-lg p-2 text-xs"/>
        <button onClick={saveOnline} disabled={saving} className="w-full bg-[#7DD3E0] text-black font-black py-3 rounded-full text-xs mt-2">{saving?"...":"SALVA ONLINE →"}</button>{msg&&<div className="text- p-2 rounded bg-white/10">{msg}</div>}
      </div>

      <div className="w- bg-[#111] rounded- p-5 border border-white/10 h-fit">
        <div className="font-black text-xs mb-4">MODIFICA SLIDE {s.id}</div>
        <div className="space-y-4">
          <div className="bg-black/50 p-3 rounded-xl border border-white/10">
            <label className="text- opacity-50 font-black tracking-widest">FOTO (PUOI METTERNE QUANTE VUOI)</label>
            {imgs.map((img:string,i:number)=>(
              <div key={i} className="flex gap-2 mt-2">
                <input value={img} onChange={e=>{ const ni=[...imgs]; ni[i]=e.target.value; updateImgs(ni); }} className="flex-1 bg-black border border-white/20 rounded-lg p-2 text-xs" placeholder="/gaston-villa-maglia-trasparente.png"/>
                <button onClick={()=>{ const ni=imgs.filter((_:any,idx:number)=>idx!==i); updateImgs(ni); }} className="px-2 bg-red-500/20 border border-red-500/30 rounded-lg text-xs">X</button>
              </div>
            ))}
            <button onClick={()=>updateImgs([...imgs, "/gaston-villa-maglia-trasparente.png"])} className="w-full mt-3 bg-white/10 border border-white/20 py-2 rounded-full text- font-black">+ AGGIUNGI FOTO</button>
            <div className="text- opacity-40 mt-2">Scrivi: /gaston-villa-maglia-trasparente.png oppure /altra.png - Tutte le foto devono essere in cartella public</div>
          </div>

          <div className="grid grid-cols-2 gap-2"><div><label className="text- opacity-50">COLORE TESTO</label><input type="color" value={s.textColor||"#ffffff"} onChange={e=>update("textColor",e.target.value)} className="w-full h-10 rounded-xl bg-black mt-1"/></div><div><label className="text- opacity-50">COLORE SOTTO</label><input type="color" value={s.subColor||"#7DD3E0"} onChange={e=>update("subColor",e.target.value)} className="w-full h-10 rounded-xl bg-black mt-1"/></div></div>
          <div><label className="text- opacity-50">TITOLO</label><textarea value={s.titolo} onChange={e=>update("titolo",e.target.value)} rows={3} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-sm font-black mt-1"/></div>
          <div><label className="text- opacity-50">TESTO</label><textarea value={s.testo} onChange={e=>update("testo",e.target.value)} rows={4} className="w-full bg-black border border-white/20 rounded-xl p-2.5 text-xs mt-1"/></div>
        </div>
      </div>

      <div className="flex-1 space-y-4"><div className="text- font-black tracking-widest opacity-40">ANTEPRIMA LIVE</div><Preview s={s} /><div className="grid grid-cols-2 gap-3 mt-6">{slides.map((sl:any,i:number)=><div key={sl.id} onClick={()=>setSelected(i)} className={`cursor-pointer border-2 rounded- overflow-hidden ${i===selected?"border-[#7DD3E0]":"border-transparent"}`}><div className="scale-[0.6] origin-top-left w-[166%] -mb-[66%]"><Preview s={sl} small/></div></div>)}</div></div>
    </div>
  );
}
