import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgawolng";
const MATCHES = [
 {id:1, date:"11 SET", time:"18:30", competition:"Campionato · G1", home:"Gaston Villa", away:"KUNG FU PANDEV", venue:"Gaston Villa Park"},
 {id:2, date:"18 SET", time:"18:30", competition:"Campionato · G2", home:"Tottingham Forest", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:3, date:"10 OTT", time:"21:00", competition:"Campionato · G3", home:"Gaston Villa", away:"Forza PCI", venue:"Gaston Villa Park"},
 {id:4, date:"17 OTT", time:"15:00", competition:"Campionato · G4", home:"Gaston Villa", away:"Aura Jacquet", venue:"Gaston Villa Park"},
 {id:5, date:"24 OTT", time:"20:45", competition:"Campionato · G5", home:"Como Stai", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:6, date:"27 OTT", time:"20:45", competition:"Campionato · G6", home:"Deportivo Aperitivo", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:7, date:"31 OTT", time:"20:45", competition:"Campionato · G7", home:"Urbe Eterna", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:8, date:"07 NOV", time:"20:45", competition:"Campionato · G8", home:"Team Crack", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:9, date:"21 NOV", time:"20:45", competition:"Campionato · G9", home:"BORUSSIA PORCMUND", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:10, date:"28 NOV", time:"20:45", competition:"Campionato · G10", home:"BORUSSIA PORCMUND", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:11, date:"05 DIC", time:"20:45", competition:"Campionato · G11", home:"Team Crack", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:12, date:"12 DIC", time:"20:45", competition:"Campionato · G12", home:"Urbe Eterna", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:13, date:"09 GEN", time:"20:45", competition:"Campionato · G16", home:"Forza PCI", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:14, date:"16 GEN", time:"20:45", competition:"Campionato · G17", home:"Tottingham Forest", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:15, date:"23 GEN", time:"20:45", competition:"Campionato · G18", home:"KUNG FU PANDEV", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:16, date:"30 GEN", time:"20:45", competition:"Campionato · G19", home:"KUNG FU PANDEV", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:17, date:"6 FEB", time:"20:45", competition:"Campionato · G20", home:"Tottingham Forest", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:18, date:"13 FEB", time:"20:45", competition:"Campionato · G21", home:"Forza PCI", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:19, date:"20 FEB", time:"20:45", competition:"Campionato · G22", home:"Aura Jacquet", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:20, date:"27 FEB", time:"20:45", competition:"Campionato · G23", home:"Como Stai", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:21, date:"6 MAR", time:"20:45", competition:"Campionato · G24", home:"Deportivo Aperitivo", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:22, date:"13 MAR", time:"20:45", competition:"Campionato · G25", home:"Urbe Eterna", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:23, date:"20 MAR", time:"20:45", competition:"Campionato · G26", home:"Team Crack", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:24, date:"03 APR", time:"20:45", competition:"Campionato · G27", home:"BORUSSIA PORCMUND", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:25, date:"10 APR", time:"20:45", competition:"Campionato · G28", home:"BORUSSIA PORCMUND", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:26, date:"17 APR", time:"20:45", competition:"Campionato · G29", home:"Team Crack", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:27, date:"24 APR", time:"20:45", competition:"Campionato · G30", home:"Urbe Eterna", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:28, date:"1 MAG", time:"20:45", competition:"Campionato · G31", home:"Deportivo Aperitivo", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:29, date:"8 MAG", time:"20:45", competition:"Campionato · G33", home:"Aura Jacquet", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:30, date:"15 MAG", time:"20:45", competition:"Campionato · G34", home:"Forza PCI", away:"Gaston Villa", venue:"Gaston Villa Park"},
 {id:31, date:"22 MAG", time:"20:45", competition:"Campionato · G35", home:"Tottingham Forest", away:"Gaston Villa", venue:"Gaston Villa Park"}
];
const TRIBUNE = [
 { id:"rossa", nome:"ROSSA", base:320 },
 { id:"blu", nome:"BLU", base:240 },
 { id:"verde", nome:"VERDE", base:150 },
 { id:"arancio", nome:"CURVA", base:80 },
];
function calcPrice(base:number, fila:number, centrale:boolean){
 const m=[1,0.92,0.84,0.76,0.68,0.61,0.55][fila-1];
 return Math.round(base*m*(centrale?1.25:1));
}
function MatchdayPage(){
 const [selectedMatch,setSelectedMatch]=useState(MATCHES[0]);
 const [selected,setSelected]=useState<{tribuna:string,sez:"ALTO"|"CENTRALE"|"BASSO",fila:number,price:number}|null>(null);
 const [qty,setQty]=useState(2);
 const [showPay,setShowPay]=useState(false);
 const [showTicket,setShowTicket]=useState(false);
 const [ticketCode,setTicketCode]=useState("");
 const [form,setForm]=useState({nome:"",email:"",card:"4242 4242 4242 4242"});
 const [loading,setLoading]=useState(false);
 const canvasRef=useRef<HTMLCanvasElement>(null);
 function selectSector(trib:any, sez:"ALTO"|"CENTRALE"|"BASSO", fila:number){
  setSelected({tribuna:trib.nome, sez, fila, price:calcPrice(trib.base,fila,sez==="CENTRALE")});
 }
 async function handlePay(){
  if(!selected||!form.nome||!form.email) return alert("Inserisci nome ed email");
  setLoading(true);
  const code=`GV-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  setTicketCode(code);
  try{
   await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({partita:`${selectedMatch.home} vs ${selectedMatch.away} - ${selectedMatch.date} ${selectedMatch.time} - ${selectedMatch.competition}`,tribuna:selected.tribuna,sezione:selected.sez,fila:selected.fila,quantita:qty,prezzo_singolo:selected.price,totale:selected.price*qty,codice_biglietto:code,nome:form.nome,email:form.email,venue:selectedMatch.venue})});
  }catch(e){console.log(e);}
  setTimeout(()=>{setLoading(false);setShowPay(false);setShowTicket(true);},1200);
 }
 function downloadTicket(){
  const canvas=canvasRef.current; if(!canvas||!selected) return;
  const ctx=canvas.getContext("2d"); if(!ctx) return;
  canvas.width=1200; canvas.height=500;
  ctx.fillStyle="#0a0a0a"; ctx.fillRect(0,0,1200,500);
  ctx.fillStyle="#C8102E"; ctx.fillRect(0,0,40,500);
  ctx.fillStyle="#C8102E"; ctx.fillRect(40,0,1160,50);
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(`${selectedMatch.competition} - ${selectedMatch.venue.toUpperCase()}`,60,30);
  ctx.fillText("GASTON VILLA",1000,30);
  ctx.fillStyle="white"; ctx.font="900 36px sans-serif"; ctx.fillText(`${selectedMatch.home} vs ${selectedMatch.away}`,60,110);
  ctx.fillStyle="#888"; ctx.font="12px monospace"; ctx.fillText(`${selectedMatch.date} - ${selectedMatch.time}`,60,135);
  ctx.strokeStyle="rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.moveTo(60,150); ctx.lineTo(800,150); ctx.stroke();
  const infos=[["TRIBUNA",selected.tribuna],["SETTORE",selected.sez],["FILA",`F${selected.fila}`],["POSTI",`${qty}x`],["TOTALE",`${selected.price*qty}€`]];
  let x=60; infos.forEach(([k,v])=>{ctx.fillStyle="#666";ctx.font="10px monospace";ctx.fillText(k,x,180);ctx.fillStyle="white";ctx.font="bold 20px sans-serif";ctx.fillText(v,x,210);x+=150;});
  ctx.fillStyle="#0a0a0a"; for(let y=60;y<500;y+=20){ctx.beginPath();ctx.arc(850,y,6,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle="white"; ctx.fillRect(900,80,200,200); ctx.fillStyle="black"; for(let i=0;i<100;i++){if(Math.random()>0.5) ctx.fillRect(910+(i%10)*18,90+Math.floor(i/10)*18,14,14);}
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(ticketCode,900,310);
  ctx.fillStyle="#666"; ctx.font="9px monospace"; ctx.fillText("NON CEDIBILE - 1 INGRESSO",900,330);
  const link=document.createElement("a"); link.download=`biglietto-${ticketCode}.png`; link.href=canvas.toDataURL(); link.click();
 }
 return(
  <div className="min-h-screen bg-[#080808] text-white pt-20">
   <div className="mx-auto max-w-[1600px] px-4 py-6 grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-3 bg-[#111] border border-white/10 rounded-2xl p-3 h-[85vh] overflow-y-auto">
     <h3 className="text-[10px] tracking-widest opacity-50 font-bold mb-3">SELEZIONA PARTITA</h3>
     {MATCHES.map(m=>(
      <button key={m.id} onClick={()=>setSelectedMatch(m)} className={`w-full text-left p-3 rounded-xl mb-2 border transition ${selectedMatch.id===m.id?"bg-white text-black border-white":"bg-black border-white/10 hover:border-white/20"}`}>
       <div className="text-[10px] opacity-60">{m.date} {m.time} · {m.competition}</div>
       <div className="text-xs font-black mt-1">{m.home} vs {m.away}</div>
       <div className="text-[10px] opacity-50">{m.venue}</div>
      </button>
     ))}
    </div>
    <div className="col-span-12 lg:col-span-6 bg-[#111] border border-white/10 rounded-2xl p-6">
     <div className="text-center mb-6">
      <div className="text-[10px] tracking-widest opacity-40">SAN SIRO - 84 SETTORI - ANELLO COMPLETO</div>
      <div className="font-black text-lg mt-1">{selectedMatch.home} vs {selectedMatch.away}</div>
      <div className="text-[10px] opacity-50">{selectedMatch.date} {selectedMatch.time}</div>
     </div>
     <div className="relative mx-auto w-full max-w-[750px] h-[720px] bg-[#0f0f0f] rounded-[24px] border border-white/10 p-2">
      <div className="absolute inset-[90px] bg-[#1a6b1a] rounded-xl border border-white/10 flex items-center justify-center">
       <div className="absolute w-[70%] h-[70%] border border-white/20"></div>
       <div className="w-28 h-28 border border-white/20 rounded-full"></div>
       <div className="absolute w-1 h-full bg-white/10"></div>
       <span className="font-black text-white/20 tracking-[0.4em] text-xs">CAMPO</span>
      </div>
      <div className="absolute top-2 left-[90px] right-[90px]">
       <div className="text-center text-[10px] font-black text-red-400 tracking-widest mb-2">TRIBUNA ROSSA</div>
       <div className="space-y-1">
        {Array.from({length:7}).map((_,idx)=>{
         const fila=7-idx;
         return(
          <div key={fila} className="grid grid-cols-3 gap-1.5">
           {(["ALTO","CENTRALE","BASSO"] as const).map(sez=>{
            const trib=TRIBUNE[0]; const price=calcPrice(trib.base,fila,sez==="CENTRALE"); const isSel=selected?.tribuna===trib.nome&&selected?.sez===sez&&selected?.fila===fila;
            return <button key={sez} onClick={()=>selectSector(trib,sez,fila)} className={`h-8 rounded-lg text-[10px] font-black border transition ${isSel?"bg-white text-black border-white scale-105":"bg-[#1e1e1e] text-white border-white/10 hover:border-white/30"}`}>{sez[0]}-F{fila} {price}€</button>
           })}
          </div>
         )
        })}
       </div>
      </div>
      <div className="absolute bottom-2 left-[90px] right-[90px]">
       <div className="space-y-1">
        {Array.from({length:7}).map((_,idx)=>{
         const fila=idx+1;
         return(
          <div key={fila} className="grid grid-cols-3 gap-1.5">
           {(["ALTO","CENTRALE","BASSO"] as const).map(sez=>{
            const trib=TRIBUNE[1]; const price=calcPrice(trib.base,fila,sez==="CENTRALE"); const isSel=selected?.tribuna===trib.nome&&selected?.sez===sez&&selected?.fila===fila;
            return <button key={sez} onClick={()=>selectSector(trib,sez,fila)} className={`h-8 rounded-lg text-[10px] font-black border transition ${isSel?"bg-white text-black border-white scale-105":"bg-[#1e1e1e] text-white border-white/10 hover:border-white/30"}`}>{sez[0]}-F{fila} {price}€</button>
           })}
          </div>
         )
        })}
       </div>
       <div className="text-center text-[10px] font-black text-blue-400 tracking-widest mt-2">TRIBUNA BLU</div>
      </div>
      <div className="absolute left-2 top-[90px] bottom-[90px] w-[80px]">
       <div className="h-full flex flex-col gap-1.5">
        {Array.from({length:7}).map((_,idx)=>{
         const fila=7-idx;
         return(
          <div key={fila} className="grid grid-rows-3 gap-1 flex-1">
           {(["ALTO","CENTRALE","BASSO"] as const).map(sez=>{
            const trib=TRIBUNE[2]; const price=calcPrice(trib.base,fila,sez==="CENTRALE"); const isSel=selected?.tribuna===trib.nome&&selected?.sez===sez&&selected?.fila===fila;
            return <button key={sez} onClick={()=>selectSector(trib,sez,fila)} className={`rounded-lg text-[9px] font-black border ${isSel?"bg-white text-black":"bg-[#1e1e1e] text-white border-white/10"}`}>{price}€</button>
           })}
          </div>
         )
        })}
       </div>
      </div>
      <div className="absolute right-2 top-[90px] bottom-[90px] w-[80px]">
       <div className="h-full flex flex-col gap-1.5">
        {Array.from({length:7}).map((_,idx)=>{
         const fila=idx+1;
         return(
          <div key={fila} className="grid grid-rows-3 gap-1 flex-1">
           {(["ALTO","CENTRALE","BASSO"] as const).map(sez=>{
            const trib=TRIBUNE[3]; const price=calcPrice(trib.base,fila,sez==="CENTRALE"); const isSel=selected?.tribuna===trib.nome&&selected?.sez===sez&&selected?.fila===fila;
            return <button key={sez} onClick={()=>selectSector(trib,sez,fila)} className={`rounded-lg text-[9px] font-black border ${isSel?"bg-white text-black":"bg-[#1e1e1e] text-white border-white/10"}`}>{price}€</button>
           })}
          </div>
         )
        })}
       </div>
      </div>
     </div>
    </div>
    <div className="col-span-12 lg:col-span-3 bg-[#111] border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
     <h3 className="font-black">RIEPILOGO</h3>
     <div className="mt-4 text-xs space-y-2">
      <div className="opacity-60">{selectedMatch.date} {selectedMatch.time} - {selectedMatch.competition}</div>
      <div className="font-black text-sm">{selectedMatch.home} vs {selectedMatch.away}</div>
      <div className="h-px bg-white/10 my-3"></div>
      {selected?(
       <>
        <div className="bg-black rounded-xl p-3 space-y-2">
         <div className="flex justify-between"><span className="opacity-60">Tribuna</span><span className="font-bold">{selected.tribuna} {selected.sez}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Fila</span><span className="font-bold">F{selected.fila}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Prezzo</span><span className="font-bold">{selected.price}€</span></div>
        </div>
        <div className="flex items-center gap-3 mt-4">
         <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-10 h-10 rounded-full bg-white/10">-</button>
         <span className="font-black text-lg w-6 text-center">{qty}</span>
         <button onClick={()=>setQty(q=>Math.min(4,q+1))} className="w-10 h-10 rounded-full bg-white text-black font-black">+</button>
         <span className="ml-auto font-black text-2xl">{selected.price*qty}€</span>
        </div>
        <button onClick={()=>setShowPay(true)} className="mt-6 w-full bg-white text-black rounded-full py-4 font-black text-xs tracking-widest">PAGA {selected.price*qty}€</button>
       </>
      ):<div className="opacity-40 text-xs py-10 text-center">Seleziona un settore</div>}
     </div>
    </div>
   </div>
   {showPay&&(
    <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4">
     <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <h3 className="font-black text-xl">PAGAMENTO</h3>
      <p className="text-xs opacity-60 mt-1">Formspree xgawolng ATTIVO</p>
      <div className="mt-4 space-y-3">
       <input placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"/>
       <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"/>
       <input placeholder="Carta" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"/>
      </div>
      <div className="flex gap-3 mt-6">
       <button onClick={()=>setShowPay(false)} className="flex-1 bg-white/10 rounded-full py-3 text-xs font-bold">ANNULLA</button>
       <button onClick={handlePay} disabled={loading} className="flex-1 bg-white text-black rounded-full py-3 text-xs font-black">{loading?"ELABORO...":`CONFERMA ${selected?selected.price*qty:0}€`}</button>
      </div>
     </div>
    </div>
   )}
   {showTicket&&selected&&(
    <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4">
     <div className="w-full max-w-[900px]">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row">
       <div className="w-10 bg-[#C8102E] hidden md:flex items-center justify-center"><span className="text-white font-black text-[10px] -rotate-90 whitespace-nowrap">GASTON VILLA PARK</span></div>
       <div className="flex-1">
        <div className="bg-[#C8102E] h-12 flex items-center justify-between px-6">
         <span className="font-mono text-xs text-white">{selectedMatch.competition}</span>
         <span className="font-black text-white text-xs">GASTON VILLA</span>
        </div>
        <div className="p-6">
         <div className="text-3xl font-black leading-none">{selectedMatch.home} <span className="text-[#C8102E]">vs</span> {selectedMatch.away}</div>
         <div className="text-xs opacity-60 mt-2 font-mono">{selectedMatch.date} · {selectedMatch.time} · {selectedMatch.venue}</div>
         <div className="h-px bg-white/10 my-4"></div>
         <div className="grid grid-cols-5 gap-4">
          <div><div className="text-[9px] opacity-50">TRIBUNA</div><div className="font-black">{selected.tribuna}</div></div>
          <div><div className="text-[9px] opacity-50">SETTORE</div><div className="font-black">{selected.sez}</div></div>
          <div><div className="text-[9px] opacity-50">FILA</div><div className="font-black">F{selected.fila}</div></div>
          <div><div className="text-[9px] opacity-50">POSTI</div><div className="font-black">{qty}x</div></div>
          <div><div className="text-[9px] opacity-50">TOTALE</div><div className="font-black text-[#C8102E]">{selected.price*qty}€</div></div>
         </div>
        </div>
       </div>
       <div className="w-full md:w-[220px] bg-[#151515] border-t md:border-t-0 md:border-l border-dashed border-white/20 p-6 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center"><div className="grid grid-cols-10 gap-[2px]">{Array.from({length:100}).map((_,i)=><div key={i} className={`w-2 h-2 ${Math.random()>0.5?"bg-black":"bg-white"}`}></div>)}</div></div>
        <div className="font-mono text-xs font-black mt-3">{ticketCode}</div>
        <div className="text-[8px] opacity-40 mt-1 text-center">NON CEDIBILE</div>
       </div>
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="flex gap-3 mt-4">
       <button onClick={downloadTicket} className="flex-1 bg-white text-black rounded-full py-4 font-black text-xs">⬇ SCARICA BIGLIETTO</button>
       <button onClick={()=>setShowTicket(false)} className="bg-white/10 text-white rounded-full px-8 py-4 font-bold text-xs">CHIUDI</button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
