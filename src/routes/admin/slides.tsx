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
  // posizioni
  if(!s.posizioni) s.posizioni = imgs.map(()=>({x:0,y:0,scale:1}));

  const update = (f:string,v:any)=>{ const ns=[...slides]; (ns as any)[sel][f]=v; setSlides(ns); };
  const setImgs = (newImgs:string[])=>{ const ns=[...slides]; ns[sel].immagini=newImgs; if(!ns[sel].posizioni) ns[sel].posizioni=[]; while(ns[sel].posizioni.length<newImgs.length) ns[sel].posizioni.push({x:0,y:0,scale:1}); ns[sel].posizioni = ns[sel].posizioni.slice(0,newImgs.length); setSlides(ns); };
  const setPos = (idx:number, p:any)=>{ const ns=[...slides]; ns[sel].posizioni[idx]={...ns[sel].posizioni[idx],...p}; setSlides(ns); };

  const saveOnline = async ()=>{
    if(!token){setMsg("❌ token");return;} localStorage.setItem("gh_token",token); setSaving(true);
    const repo="karroumingi4-art/cinematic-web-elegance"; const path="src/data/slides-ritorno.json";
    try{
      const getRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{headers:{Authorization:`Bearer ${token}`}});
      const fd=await getRes.json(); const content=btoa(unescape(encodeURIComponent(JSON.stringify(slides,null,2))));
      const putRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({message:"admin drag bg",content,sha:fd.sha,branch:"main"})});
      if(!putRes.ok) throw new Error((await putRes.json()).message); setMsg("✅ SALVATO!");
    }catch(e:any){setMsg("❌ "+e.message);} setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-3 flex gap-3">
      <div className="w- shrink-0 space-y-2">
        <h1 className="font-black text-sm">SLIDE</h1>
        {slides.map((sl:any,i:number)=><button key={sl.id} onClick={()=>setSel(i)} className={`w-full text-left p-3 rounded-xl text-xs border ${i===sel?"bg-white text-black":"bg-white/5 border-white/10"}`}>{sl.id} {sl.titolo.slice(0,18)}</button>)}
        <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="ghp_..." className="w-full mt-4 bg-black border border-white/20 rounded-lg p-2 text-xs" />
        <button onClick={saveOnline} className="w-full bg-[#7DD3E0] text-black font-black py-3 rounded-full text-xs mt-2">{saving?"...":"SALVA ONLINE →"}</button>{msg&&<div className="text- p-2 bg-white/10 rounded">{msg}</div>}
      </div>

      <div className="w- shrink-0 bg-[#111] rounded- p-4 border border-white/10 h- overflow-auto">
        <div className="font-black text-xs mb-3">SFONDO SLIDE {s.id}</div>
        <div className="bg-black/50 p-3 rounded-xl border border-white/10 mb-4 space-y-2">
          <div><label className="text- opacity-50">COLORE SFONDO</label><input type="color" value={s.bgColor||"#1a0a0f"} onChange={e=>update("bgColor",e.target.value)} className="w-full h-10 rounded-xl bg-black mt-1" /></div>
          <div><label className="text- opacity-50">IMMAGINE SFONDO (opzionale)</label><input value={s.bgImage||""} onChange={e=>update("bgImage",e.target.value)} placeholder="/sfondo.jpg o lascia vuoto" className="w-full bg-[#111] border border-white/20 rounded-lg p-2 text- mt-1" /></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text- opacity-50">COLORE TESTO</label><input type="color" value={s.textColor||"#ffffff"} onChange={e=>update("textColor",e.target.value)} className="w-full h-8 rounded-lg bg-black mt-1" /></div><div><label className="text- opacity-50">SOTTO</label><input type="color" value={s.subColor||"#7DD3E0"} onChange={e=>update("subColor",e.target.value)} className="w-full h-8 rounded-lg bg-black mt-1" /></div></div>
        </div>

        <div className="font-black text-xs mb-2">FOTO - TRASCINA NELL'ANTEPRIMA</div>
        {imgs.map((img:string,i:number)=>(
          <div key={i} className="bg-black border border-white/10 p-3 rounded-xl mb-2">
            <div className="flex justify-between mb-2"><span className="text-">FOTO {i+1}</span><button onClick={()=>setImgs(imgs.filter((_:any,idx:number)=>idx!==i))} className="text- bg-red-500/20 px-2 py-1 rounded">ELIMINA</button></div>
            <input value={img} onChange={e=>{const ni=[...imgs]; ni[i]=e.target.value; setImgs(ni);}} className="w-full bg-[#111] border border-white/20 rounded-lg p-2 text- mb-2" />
            <div className="grid grid-cols-3 gap-2"><div><label className="text- opacity-50">X</label><input type="range" min="-200" max="200" value={s.posizioni[i]?.x||0} onChange={e=>setPos(i,{x:parseInt(e.target.value)})} className="w-full" /></div><div><label className="text- opacity-50">Y</label><input type="range" min="-200" max="200" value={s.posizioni[i]?.y||0} onChange={e=>setPos(i,{y:parseInt(e.target.value)})} className="w-full" /></div><div><label className="text- opacity-50">ZOOM</label><input type="range" min="0.5" max="3" step="0.1" value={s.posizioni[i]?.scale||1} onChange={e=>setPos(i,{scale:parseFloat(e.target.value)})} className="w-full" /></div></div>
          </div>
        ))}
        <button onClick={()=>setImgs([...imgs, "/gaston-villa-maglia-trasparente.png"])} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-xs font-black">+ AGGIUNGI FOTO</button>
      </div>

      <div className="flex-1">
        <div className="text- opacity-40 font-black tracking-widest mb-3">ANTEPRIMA - TRASCINA LE FOTO CON IL MOUSE</div>
        <div className="rounded- overflow-hidden aspect-[16/9] relative border border-white/10 select-none"
          style={{ backgroundColor: s.bgColor||s.bg||"#1a0a0f", backgroundImage: s.bgImage? `url(${s.bgImage})` : s.bg?.startsWith("linear")? s.bg : undefined, backgroundSize:"cover", backgroundPosition:"center" }}
          onMouseMove={e=>{
            if(dragIdx===null) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            setPos(dragIdx,{x,y});
          }}
          onMouseUp={()=>setDragIdx(null)}
          onMouseLeave={()=>setDragIdx(null)}
        >
          {s.bgImage && <div className="absolute inset-0 bg-black/30" />}
          <div className="relative z-10 p-8 pointer-events-none"><span className="text- font-black px-3 py-1 rounded-full bg-white text-black">{s.sottotitolo}</span><h2 className="text- font-black leading-[0.85] whitespace-pre-wrap mt-4 max-w-" style={{color:s.textColor||"white"}}>{s.titolo}</h2></div>
          {imgs.map((img:string,i:number)=>(
            <img key={i} src={img} draggable={false}
              onMouseDown={()=>setDragIdx(i)}
              style={{ position:"absolute", left:`calc(60% + ${s.posizioni[i]?.x||0}px)`, top:`calc(50% + ${s.posizioni[i]?.y||0}px)`, transform:`translate(-50%,-50%) scale(${s.posizioni[i]?.scale||1})`, cursor:"grab" }}
              className={`w- object-contain drop-shadow-[0_20px_40px_black] select-none ${dragIdx===i?"ring-2 ring-[#7DD3E0]":""}`} alt=""
            />
          ))}
        </div>
        <div className="text- opacity-30 mt-2">💡 Trascina le maglie con il mouse nell'anteprima, usa gli slider per zoom. Lo sfondo può essere colore o immagine in /public</div>
      </div>
    </div>
  );
}
