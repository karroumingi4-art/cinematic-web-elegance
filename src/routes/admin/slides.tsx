import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import slidesDataInitial from "@/data/slides-ritorno.json";
export const Route = createFileRoute("/admin/slides")({ component: AdminSlides });

function AdminSlides(){
  const [slides,setSlides]=useState(slidesDataInitial as any[]); const [sel,setSel]=useState(0);
  const [token,setToken]=useState(""); const [saving,setSaving]=useState(false); const [msg,setMsg]=useState(""); const [dragIdx,setDragIdx]=useState<number|null>(null);
  useEffect(()=>{ const t=localStorage.getItem("gh_token"); if(t) setToken(t); },[]);
  const s=slides[sel]; const imgs=s.immagini||(s.immagine?[s.immagine]:[]);
  if(!s.posizioni) s.posizioni=imgs.map(()=>({x:0,y:0,scale:1}));
  if(!s.styles) s.styles={ titolo:{size:36,font:"Anton"}, sottotitolo:{size:10,font:"Inter"}, testo:{size:12,font:"Inter"} };
  const upd=(f:string,v:any)=>{ const ns=[...slides]; (ns as any)[sel][f]=v; setSlides(ns); };
  const updStyle=(k:string,f:string,v:any)=>{ const ns=[...slides]; if(!ns[sel].styles) ns[sel].styles={}; if(!ns[sel].styles[k]) ns[sel].styles[k]={}; ns[sel].styles[k][f]=v; setSlides(ns); };
  const setImgs=(ni:string[])=>{ const ns=[...slides]; ns[sel].immagini=ni; while(ns[sel].posizioni.length<ni.length) ns[sel].posizioni.push({x:0,y:0,scale:1}); ns[sel].posizioni=ns[sel].posizioni.slice(0,ni.length); setSlides(ns); };
  const setPos=(i:number,p:any)=>{ const ns=[...slides]; ns[sel].posizioni[i]={...ns[sel].posizioni[i],...p}; setSlides(ns); };
  const saveOnline=async()=>{
    if(!token){setMsg("token");return;} localStorage.setItem("gh_token",token); setSaving(true);
    const repo="karroumingi4-art/cinematic-web-elegance"; const path="src/data/slides-ritorno.json";
    try{
      const getRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{headers:{Authorization:`Bearer ${token}`}});
      const fd=await getRes.json(); const content=btoa(unescape(encodeURIComponent(JSON.stringify(slides,null,2))));
      const putRes=await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({message:"admin full",content,sha:fd.sha,branch:"main"})});
      if(!putRes.ok) throw new Error((await putRes.json()).message); setMsg("✅ SALVATO");
    }catch(e:any){setMsg("❌ "+e.message);} setSaving(false);
  };
  const fonts=["Anton","Inter","Oswald","Bebas Neue","Montserrat","Space Grotesk"];

  return(
    <div className="min-h-screen bg-[#080808] text-white flex">
      <div className="w- border-r border-white/10 p-2 flex flex-col gap-2">
        <div className="text- opacity-30 text-center">SLIDE</div>
        {slides.map((_:any,i:number)=><button key={i} onClick={()=>setSel(i)} className={`w- h- rounded-xl font-black ${i===sel?"bg-white text-black":"bg-white/10"}`}>{i+1}</button>)}
        <div className="mt-auto"><input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="ghp_" className="w-full bg-black border border-white/10 rounded p-1 text-" /><button onClick={saveOnline} className="w-full mt-2 bg-[#7DD3E0] text-black font-black py-2 rounded-full text-">{saving?"...":"SALVA"}</button>{msg&&<div className="text- bg-white/10 p-1 rounded mt-1">{msg}</div>}</div>
      </div>

      <div className="w- bg-[#111] border-r border-white/10 p-3 h- overflow-auto space-y-3">

        <div className="bg-black/50 p-3 rounded-xl border border-white/10"><div className="text- font-black opacity-50 mb-2">SFONDO SLIDE {sel+1}</div><div className="flex gap-2"><input type="color" value={s.bgColor||"#1a0a0f"} onChange={e=>upd("bgColor",e.target.value)} className="w- h-8 rounded bg-black" /><input value={s.bgImage||""} onChange={e=>upd("bgImage",e.target.value)} placeholder="/pattern.png o vuoto" className="flex-1 bg-black border border-white/10 rounded p-2 text-" /></div></div>

        <div className="bg-black/50 p-3 rounded-xl border border-white/10"><div className="text- font-black text-[#7DD3E0] mb-2">SOTTOTITOLO</div><input value={s.sottotitolo} onChange={e=>upd("sottotitolo",e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs mb-2" /><div className="grid grid-cols-2 gap-2"><select value={s.styles?.sottotitolo?.font||"Inter"} onChange={e=>updStyle("sottotitolo","font",e.target.value)} className="bg-black border border-white/10 rounded p-1 text-">{fonts.map(f=><option key={f}>{f}</option>)}</select><input type="range" min="8" max="30" value={s.styles?.sottotitolo?.size||10} onChange={e=>updStyle("sottotitolo","size",parseInt(e.target.value))} /></div><div className="flex gap-2 mt-2 items-center"><input type="color" value={s.subColor||"#7DD3E0"} onChange={e=>upd("subColor",e.target.value)} className="h-6 w-10 rounded bg-black" /><span className="text- opacity-50">{s.styles?.sottotitolo?.size||10}px {s.styles?.sottotitolo?.font}</span></div></div>

        <div className="bg-black/50 p-3 rounded-xl border border-white/10"><div className="text- font-black text-white mb-2">TITOLO</div><textarea value={s.titolo} onChange={e=>upd("titolo",e.target.value)} rows={2} className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm font-black mb-2" /><div className="grid grid-cols-2 gap-2"><select value={s.styles?.titolo?.font||"Anton"} onChange={e=>updStyle("titolo","font",e.target.value)} className="bg-black border border-white/10 rounded p-1 text-">{fonts.map(f=><option key={f}>{f}</option>)}</select><input type="range" min="20" max="90" value={s.styles?.titolo?.size||36} onChange={e=>updStyle("titolo","size",parseInt(e.target.value))} /></div><div className="flex gap-2 mt-2 items-center"><input type="color" value={s.textColor||"#ffffff"} onChange={e=>upd("textColor",e.target.value)} className="h-6 w-10 rounded bg-black" /><span className="text- opacity-50">{s.styles?.titolo?.size||36}px</span></div></div>

        <div className="bg-black/50 p-3 rounded-xl border border-white/10"><div className="text- font-black text-white/60 mb-2">TESTO</div><textarea value={s.testo} onChange={e=>upd("testo",e.target.value)} rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs mb-2" /><div className="grid grid-cols-2 gap-2"><select value={s.styles?.testo?.font||"Inter"} onChange={e=>updStyle("testo","font",e.target.value)} className="bg-black border border-white/10 rounded p-1 text-">{fonts.map(f=><option key={f}>{f}</option>)}</select><input type="range" min="10" max="28" value={s.styles?.testo?.size||12} onChange={e=>updStyle("testo","size",parseInt(e.target.value))} /></div><div className="text- opacity-50 mt-1">{s.styles?.testo?.size||12}px</div></div>

        <div className="bg-black/50 p-3 rounded-xl border border-white/10"><div className="text- font-black mb-2">FOTO ({imgs.length}) - DRAG + ZOOM</div>
          {imgs.map((img:string,i:number)=>(
            <div key={i} className="mb-2 pb-2 border-b border-white/10"><div className="flex gap-1"><input value={img} onChange={e=>{const ni=[...imgs]; ni[i]=e.target.value; setImgs(ni);}} className="flex-1 bg-[#111] border border-white/10 rounded p-1 text-" /><button onClick={()=>setImgs(imgs.filter((_:any,idx:number)=>idx!==i))} className="px-2 bg-red-500/20 rounded text-">X</button></div><input type="range" min="0.2" max="4" step="0.1" value={s.posizioni[i]?.scale||1} onChange={e=>setPos(i,{scale:parseFloat(e.target.value)})} className="w-full mt-1" /><div className="text- opacity-40">ZOOM {s.posizioni[i]?.scale?.toFixed(1)}</div></div>
          ))}<button onClick={()=>setImgs([...imgs,"/stella-gaston.png"])} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text- font-black">+ FOTO</button></div>

      </div>

      <div className="flex-1 p-4 bg-[#0a0a0a] flex flex-col">
        <div className="text- opacity-30 font-black tracking-widest mb-2">ANTEPRIMA SLIDE {sel+1}</div>
        <div className="flex-1 rounded- overflow-hidden relative border border-white/10" style={{ backgroundColor: s.bgColor||"#1a0a0f", backgroundImage: s.bgImage? `url(${s.bgImage})`:undefined, backgroundSize:"cover", backgroundPosition:"center" }} onMouseMove={e=>{ if(dragIdx===null) return; const r=e.currentTarget.getBoundingClientRect(); setPos(dragIdx,{x:e.clientX-r.left-r.width/2, y:e.clientY-r.top-r.height/2}); }} onMouseUp={()=>setDragIdx(null)} onMouseLeave={()=>setDragIdx(null)}>
          <div className="absolute top-8 left-8 max-w- z-10 pointer-events-none space-y-3">
            <div style={{ fontSize:`${s.styles?.sottotitolo?.size||10}px`, fontFamily:s.styles?.sottotitolo?.font||"Inter", backgroundColor:s.subColor||"#7DD3E0", color:"#000" }} className="font-black tracking-widest px-3 py-1 rounded-full inline-block">{s.sottotitolo}</div>
            <h2 style={{ fontSize:`${s.styles?.titolo?.size||36}px`, fontFamily:s.styles?.titolo?.font||"Anton", color:s.textColor||"white" }} className="font-black leading-[0.85] whitespace-pre-wrap">{s.titolo}</h2>
            <p style={{ fontSize:`${s.styles?.testo?.size||12}px`, fontFamily:s.styles?.testo?.font||"Inter", color:s.textColor||"white" }} className="opacity-70 whitespace-pre-wrap leading-relaxed">{s.testo}</p>
          </div>
          {imgs.map((img:string,i:number)=>(<img key={i} src={img} onMouseDown={()=>setDragIdx(i)} style={{ left:`calc(65% + ${s.posizioni[i]?.x||0}px)`, top:`calc(50% + ${s.posizioni[i]?.y||0}px)`, transform:`translate(-50%,-50%) scale(${s.posizioni[i]?.scale||1})` }} className="absolute w- object-contain drop-shadow-[0_30px_60px_black] cursor-grab" alt="" />))}
        </div>
      </div>
    </div>
  );
}
