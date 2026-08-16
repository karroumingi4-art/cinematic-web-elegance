import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";
export const Route = createFileRoute("/admin/slides")({ component: AdminSlides });

function AdminSlides() {
  const [slides, setSlides] = useState(slidesDataInitial as any[]);
  const [sel, setSel] = useState(0);
  const [token, setToken] = useState(""); const [saving,setSaving]=useState(false); const [msg,setMsg]=useState("");
  const [dragIdx,setDragIdx]=useState<number|null>(null);
  useEffect(()=>{ const t=localStorage.getItem("gh_token"); if(t) setToken(t); },[]);
  const s = slides[sel];
  const imgs = s.immagini || (s.immagine? [s.immagine] : []);
  if(!s.posizioni) s.posizioni = imgs.map(()=>({x:0,y:0,scale:1}));
  const update = (f:string,v:any)=>{ const ns=[...slides]; (ns as any)[sel][f]=v; setSlides(ns); };
  const setImgs = (ni:string[])=>{ const ns=[...slides]; ns[sel].immagini=ni; if(!ns[sel].posizioni) ns[sel].posizioni=[]; while(ns[sel].posizioni.length<ni.length) ns[sel].posizioni.push({x:0,y:0,scale:1}); ns[sel].posizioni=ns[sel].posizioni.slice(0,ni.length); setSlides(ns); };
  const setPos = (idx:number,p:any)=>{ const ns=[...slides]; ns[sel].posizioni[idx]={...ns[sel].posizioni[idx],...p}; setSlides(ns); };
  const saveOnline = async ()=>{
    if(!token){setMsg("token");return;} localStorage.setItem("gh_token",token); setSaving(true);
    const repo="karroumingi4-art/cinematic-web-elegance"; const path="src/data/slides-ritorno.json";
    try{
      const getRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{headers:{Authorization:`Bearer ${token}`}});
      const fd=await getRes.json(); const content=btoa(unescape(encodeURIComponent(JSON.stringify(slides,null,2))));
      const putRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({message:"admin mini",content,sha:fd.sha,branch:"main"})});
      if(!putRes.ok) throw new Error((await putRes.json()).message); setMsg("✅ SALVATO");
    }catch(e:any){setMsg("❌ "+e.message);} setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* ELENCO MINI - SOLO NUMERI */}
      <div className="w- shrink-0 border-r border-white/10 p-2 flex flex-col gap-2">
        <div className="text- font-black tracking-widest opacity-30 text-center mb-2">SLIDE</div>
        {slides.map((_:any,i:number)=><button key={i} onClick={()=>setSel(i)} className={`w- h- rounded-xl text- font-black ${i===sel?"bg-white text-black":"bg-white/10 text-white/50 hover:bg-white/20"}`}>{i+1}</button>)}
        <div className="mt-auto space-y-2">
          <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="ghp_" className="w-full bg-black border border-white/10 rounded-lg p-1.5 text-" />
          <button onClick={saveOnline} className="w-full bg-[#7DD3E0] text-black font-black py-2 rounded-full text-">{saving?"...":"SALVA"}</button>
          {msg&&<div className="text- bg-white/10 p-1 rounded text-center">{msg}</div>}
        </div>
      </div>

      <div className="w- shrink-0 bg-[#111] border-r border-white/10 p-3 h- overflow-auto">
        <div className="text- font-black mb-3">SLIDE {sel+1} - SFONDO</div>
        <div className="space-y-2 mb-4">
          <input type="color" value={s.bgColor||"#1a0a0f"} onChange={e=>update("bgColor",e.target.value)} className="w-full h-8 rounded-lg bg-black" />
          <input value={s.bgImage||""} onChange={e=>update("bgImage",e.target.value)} placeholder="sfondo: /pattern.png o vuoto" className="w-full bg-black border border-white/10 rounded-lg p-2 text-" />
        </div>
        <div className="text- font-black mb-2">FOTO ({imgs.length})</div>
        {imgs.map((img:string,i:number)=>(
          <div key={i} className="bg-black border border-white/10 rounded-xl p-2 mb-2">
            <div className="flex gap-1 mb-1"><input value={img} onChange={e=>{const ni=[...imgs]; ni[i]=e.target.value; setImgs(ni);}} className="flex-1 bg-[#111] border border-white/10 rounded p-1 text-" /><button onClick={()=>setImgs(imgs.filter((_:any,idx:number)=>idx!==i))} className="px-2 bg-red-500/20 rounded text-">X</button></div>
            <input type="range" min="0.3" max="3" step="0.1" value={s.posizioni[i]?.scale||1} onChange={e=>setPos(i,{scale:parseFloat(e.target.value)})} className="w-full h-1" />
          </div>
        ))}
        <button onClick={()=>setImgs([...imgs, "/gaston-villa-maglia-trasparente.png"])} className="w-full py-2 border border-dashed border-white/20 rounded-xl text- font-black">+ FOTO</button>
        <div className="mt-4 space-y-2"><input value={s.sottotitolo} onChange={e=>update("sottotitolo",e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-" placeholder="sottotitolo" /><textarea value={s.titolo} onChange={e=>update("titolo",e.target.value)} rows={2} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs font-black" placeholder="titolo" /></div>
      </div>

      <div className="flex-1 p-4 bg-[#0a0a0a] flex flex-col">
        <div className="text- opacity-30 font-black tracking-widest mb-3">ANTEPRIMA - TRASCINA LE FOTO • SLIDE {sel+1}</div>
        <div className="flex-1 rounded- overflow-hidden relative border border-white/10"
          style={{ backgroundColor: s.bgColor||s.bg||"#1a0a0f", backgroundImage: s.bgImage? `url(${s.bgImage})` : s.bg?.startsWith("linear")||s.bg?.startsWith("radial")? s.bg : undefined, backgroundSize:"cover", backgroundPosition:"center" }}
          onMouseMove={e=>{ if(dragIdx===null) return; const r=e.currentTarget.getBoundingClientRect(); setPos(dragIdx,{x:e.clientX-r.left-r.width/2, y:e.clientY-r.top-r.height/2}); }}
          onMouseUp={()=>setDragIdx(null)} onMouseLeave={()=>setDragIdx(null)}
        >
          {s.bgImage && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
          <div className="absolute top-6 left-6 z-10 pointer-events-none max-w-"><div className="text- font-black px-3 py-1 rounded-full bg-white text-black inline-block">{s.sottotitolo}</div><h2 className="text- font-black leading-[0.85] whitespace-pre-wrap mt-3" style={{color:s.textColor||"white"}}>{s.titolo}</h2></div>
          {imgs.map((img:string,i:number)=>(
            <img key={i} src={img} onMouseDown={()=>setDragIdx(i)} style={{ left:`calc(60% + ${s.posizioni[i]?.x||0}px)`, top:`calc(50% + ${s.posizioni[i]?.y||0}px)`, transform:`translate(-50%,-50%) scale(${s.posizioni[i]?.scale||1})` }} className="absolute w- object-contain drop-shadow-[0_20px_50px_black] cursor-grab select-none" alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}
