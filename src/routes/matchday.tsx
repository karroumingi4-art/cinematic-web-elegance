import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgawolng";

const TEAM_LOGOS: Record<string, string> = {
  "Gaston Villa": "/GASTON_VILLA-removebg-preview.png",
  "KUNG FU PANDEV": "/logos/kungfupandev.png",
  "Tottingham Forest": "/logos/tottingham.png",
  "Forza PCI": "/logos/forzapci.png",
  "Aura Jacquet": "/logos/aurajacquet.png",
  "Como Stai": "/logos/comostai.png",
  "Deportivo Aperitivo": "/logos/deportivo.png",
  "Urbe Eterna": "/logos/urbeeterna.png",
  "Team Crack": "/logos/teamcrack.png",
  "BORUSSIA PORCMUND": "/logos/borussia.png",
};

function getLogo(team: string) {
  const t = team.trim();
  return TEAM_LOGOS[t] || `https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=C8102E&color=fff&bold=true&size=128`;
}

// CALENDARIO COMPLETO 35 GIORNATE - FORNITO DA TE - OGNI RIGA SEPARATA PER FIX BUILD VERCEL
const MATCHES = [
  { id: 1, date: "11 SET", time: "18:30", competition: "Campionato · G1", home: "Gaston Villa", away: "KUNG FU PANDEV", venue: "Gaston Villa Park", day: "GIOVEDI", fullDate: "2026-09-11T18:30:00" },
  { id: 2, date: "18 SET", time: "18:30", competition: "Campionato · G2", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2026-09-18T18:30:00" },
  { id: 3, date: "10 OTT", time: "21:00", competition: "Campionato · G3", home: "Gaston Villa", away: "Forza PCI", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-10T21:00:00" },
  { id: 4, date: "17 OTT", time: "15:00", competition: "Campionato · G4", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-17T15:00:00" },
  { id: 5, date: "24 OTT", time: "20:45", competition: "Campionato · G5", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-24T20:45:00" },
  { id: 6, date: "27 OTT", time: "20:45", competition: "Campionato · G6", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "MARTEDI", fullDate: "2026-10-27T20:45:00" },
  { id: 7, date: "31 OTT", time: "20:45", competition: "Campionato · G7", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-31T20:45:00" },
  { id: 8, date: "07 NOV", time: "20:45", competition: "Campionato · G8", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-07T20:45:00" },
  { id: 9, date: "21 NOV", time: "20:45", competition: "Campionato · G9", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-21T20:45:00" },
  { id: 10, date: "28 NOV", time: "20:45", competition: "Campionato · G10", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-28T20:45:00" },
  { id: 11, date: "05 DIC", time: "20:45", competition: "Campionato · G11", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-05T20:45:00" },
  { id: 12, date: "12 DIC", time: "20:45", competition: "Campionato · G12", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-12T20:45:00" },
  { id: 13, date: "19 DIC", time: "20:45", competition: "Campionato · G13", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-19T20:45:00" },
  { id: 14, date: "26 DIC", time: "20:45", competition: "Campionato · G14", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-26T20:45:00" },
  { id: 15, date: "02 GEN", time: "15:00", competition: "Campionato · G15", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-02T15:00:00" },
  { id: 16, date: "09 GEN", time: "20:45", competition: "Campionato · G16", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-09T20:45:00" },
  { id: 17, date: "16 GEN", time: "20:45", competition: "Campionato · G17", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-16T20:45:00" },
  { id: 18, date: "23 GEN", time: "20:45", competition: "Campionato · G18", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-23T20:45:00" },
  { id: 19, date: "30 GEN", time: "20:45", competition: "Campionato · G19", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-30T20:45:00" },
  { id: 20, date: "6 FEB", time: "20:45", competition: "Campionato · G20", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-06T20:45:00" },
  { id: 21, date: "13 FEB", time: "20:45", competition: "Campionato · G21", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-13T20:45:00" },
  { id: 22, date: "20 FEB", time: "20:45", competition: "Campionato · G22", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-20T20:45:00" },
  { id: 23, date: "27 FEB", time: "20:45", competition: "Campionato · G23", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-27T20:45:00" },
  { id: 24, date: "6 MAR", time: "20:45", competition: "Campionato · G24", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-06T20:45:00" },
  { id: 25, date: "13 MAR", time: "20:45", competition: "Campionato · G25", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-13T20:45:00" },
  { id: 26, date: "20 MAR", time: "20:45", competition: "Campionato · G26", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-20T20:45:00" },
  { id: 27, date: "03 APR", time: "20:45", competition: "Campionato · G27", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-03T20:45:00" },
  { id: 28, date: "10 APR", time: "20:45", competition: "Campionato · G28", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-10T20:45:00" },
  { id: 29, date: "17 APR", time: "20:45", competition: "Campionato · G29", home: "Team Crack", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-17T20:45:00" },
  { id: 30, date: "24 APR", time: "20:45", competition: "Campionato · G30", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-24T20:45:00" },
  { id: 31, date: "1 MAG", time: "20:45", competition: "Campionato · G31", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-01T20:45:00" },
  { id: 32, date: "02 MAG", time: "20:45", competition: "Campionato · G32", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "DOMENICA", fullDate: "2027-05-02T20:45:00" },
  { id: 33, date: "8 MAG", time: "20:45", competition: "Campionato · G33", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-08T20:45:00" },
  { id: 34, date: "15 MAG", time: "20:45", competition: "Campionato · G34", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-15T20:45:00" },
  { id: 35, date: "22 MAG", time: "20:45", competition: "Campionato · G35", home: "Tottingham Forest", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-22T20:45:00" },
];

const TICKET_TYPES = [
  { id: "onore_rossa", nome: "TRIBUNA ONORE ROSSA", prezzo: 134.00, color: "bg-[#8B0000]", desc: "Poltronissima centrale" },
  { id: "poltroncine_centrali", nome: "POLTRONCINE ROSSE CENTRALI", prezzo: 114.00, color: "bg-[#C8102E]", desc: "Vista perfetta centrale" },
  { id: "arancio_centrale", nome: "TRIBUNA ARANCIO CENTRALE", prezzo: 104.00, color: "bg-[#8B4513]", desc: "Tribuna laterale premium" },
  { id: "poltroncine_rosse", nome: "POLTRONCINE ROSSE", promo: "PROMO", prezzo: 94.00, color: "bg-[#A00000]", desc: "Offerta limitata" },
  { id: "primo_rosso_centrale", nome: "PRIMO ROSSO CENTRALE", prezzo: 79.00, color: "bg-[#CC0000]", desc: "Primo anello centrale" },
  { id: "primo_rosso", nome: "PRIMO ROSSO", prezzo: 69.00, color: "bg-[#FF4444]", desc: "Primo anello" },
  { id: "primo_arancio", nome: "PRIMO ARANCIO", prezzo: 64.00, color: "bg-[#FF8C00]", desc: "Curva coperta" },
  { id: "secondo_centrale", nome: "SECONDO ROSSO CENTRALE", prezzo: 64.00, color: "bg-[#FF0000]", desc: "Secondo anello centrale" },
  { id: "laterale_nord", nome: "PRIMO ROSSO LATERALE NORD", prezzo: 59.00, color: "bg-[#FF6666]", desc: "Laterale nord" },
];

function MatchdayPage(){
 const [view, setView] = useState<"calendar"|"detail"|"tickets"|"premium">("calendar");
 const [selectedMatch,setSelectedMatch]=useState(MATCHES[0]);
 const [selectedTicket, setSelectedTicket] = useState(TICKET_TYPES[0]);
 const [selectedSector, setSelectedSector] = useState<{id:number, fila:number, sez:string}|null>(null);
 const [qty,setQty]=useState(2);
 const [showPay,setShowPay]=useState(false);
 const [showTicket,setShowTicket]=useState(false);
 const [ticketCode,setTicketCode]=useState("");
 const [form,setForm]=useState({nome:"",email:"",card:"4242 4242 4242 4242"});
 const [loading,setLoading]=useState(false);
 const [timer, setTimer] = useState({ g:14, h:4, m:14, s:6 });
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

 useEffect(()=>{
   const interval = setInterval(()=>{
     const target = new Date(selectedMatch.fullDate).getTime();
     const now = new Date().getTime();
     const diff = target - now;
     if(diff>0){
       setTimer({
         g: Math.floor(diff / (1000*60*60*24)),
         h: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)),
         m: Math.floor((diff % (1000*60*60)) / (1000*60)),
         s: Math.floor((diff % (1000*60)) / 1000),
       })
     }
   },1000);
   return ()=>clearInterval(interval);
 },[selectedMatch]);

 function openMatch(m:any){
   setSelectedMatch(m);
   setView("detail");
 }

 async function handlePay(){
  if(!form.nome||!form.email) return alert("Inserisci nome ed email");
  setLoading(true);
  const code=`GV-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  setTicketCode(code);
  try{
   await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({partita:`${selectedMatch.home} vs ${selectedMatch.away} - ${selectedMatch.date} ${selectedMatch.time} - ${selectedMatch.competition}`, tribuna: selectedTicket.nome, settore: selectedSector? `${selectedSector.sez} F${selectedSector.fila}`: "N/A", quantita:qty, prezzo_singolo:selectedTicket.prezzo, totale:selectedTicket.prezzo*qty, codice_biglietto:code, nome:form.nome, email:form.email, venue:selectedMatch.venue, tipo: view})});
  }catch(e){console.log(e);}
  setTimeout(()=>{setLoading(false);setShowPay(false);setShowTicket(true);},1200);
 }

 function downloadTicket(){
  const canvas=canvasRef.current; if(!canvas) return;
  const ctx=canvas.getContext("2d"); if(!ctx) return;
  canvas.width=1200; canvas.height=500;
  ctx.fillStyle="#0a0a0a"; ctx.fillRect(0,0,1200,500);
  ctx.fillStyle="#C8102E"; ctx.fillRect(0,0,40,500);
  ctx.fillStyle="#C8102E"; ctx.fillRect(40,0,1160,50);
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(`${selectedMatch.competition} - ${selectedMatch.venue.toUpperCase()} - 43.000 POSTI - 35 GIORNATE`,60,30);
  ctx.fillText("GASTON VILLA",1000,30);
  ctx.fillStyle="white"; ctx.font="900 36px sans-serif"; ctx.fillText(`${selectedMatch.home} vs ${selectedMatch.away}`,60,110);
  ctx.fillStyle="#888"; ctx.font="12px monospace"; ctx.fillText(`${selectedMatch.date} - ${selectedMatch.time}`,60,135);
  ctx.strokeStyle="rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.moveTo(60,150); ctx.lineTo(800,150); ctx.stroke();
  const infos=[["TRIBUNA",selectedTicket.nome],["SETTORE",selectedSector? `${selectedSector.sez} F${selectedSector.fila}`:"GENERICO"],["POSTI",`${qty}x`],["TOTALE",`${selectedTicket.prezzo*qty}€`]];
  let x=60; infos.forEach(([k,v])=>{ctx.fillStyle="#666";ctx.font="10px monospace";ctx.fillText(k,x,180);ctx.fillStyle="white";ctx.font="bold 16px sans-serif";ctx.fillText(v,x,210);x+=200;});
  ctx.fillStyle="#0a0a0a"; for(let y=60;y<500;y+=20){ctx.beginPath();ctx.arc(850,y,6,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle="white"; ctx.fillRect(900,80,200,200); ctx.fillStyle="black"; for(let i=0;i<100;i++){if(Math.random()>0.5) ctx.fillRect(910+(i%10)*18,90+Math.floor(i/10)*18,14,14);}
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(ticketCode,900,310);
  ctx.fillStyle="#666"; ctx.font="9px monospace"; ctx.fillText("GASTON VILLA PARK - 43.000 - 35 GIORNATE",900,330);
  const link=document.createElement("a"); link.download=`biglietto-${ticketCode}.png`; link.href=canvas.toDataURL(); link.click();
 }

 if(view==="calendar"){
  return(
   <div className="min-h-screen bg-[#080808] text-white pt-20">
    <div className="mx-auto max-w-7xl px-4 py-10">
     <h1 className="text-5xl font-black tracking-tight">CALENDARIO COMPLETO - 35 GIORNATE</h1>
     <p className="opacity-60 mt-2">Gaston Villa Park - 43.000 posti - G1-G35 incluse G13-G15 e G32</p>
     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MATCHES.map(m=>(
       <button key={m.id} onClick={()=>openMatch(m)} className="text-left bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/30 hover:bg-[#161616] transition group">
        <div className="flex justify-between items-center"><span className="text-[10px] tracking-widest opacity-60 font-bold">{m.competition}</span><span className="text-[10px] bg-white/10 rounded-full px-2 py-1">G{m.id}</span></div>
        <div className="mt-4 flex items-center gap-2">
          <img src={getLogo(m.home)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
          <span className="text-[15px] font-black">{m.home}</span>
          <span className="text-[#C8102E] mx-1 text-xs">vs</span>
          <span className="text-[15px] font-black">{m.away}</span>
          <img src={getLogo(m.away)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
        </div>
        <div className="mt-3 flex items-center gap-3"><div className="bg-white text-black rounded-lg px-3 py-1.5 text-center"><div className="text-[10px] font-bold leading-none">{m.date.split(" ")[1]}</div><div className="text-lg font-black leading-none">{m.date.split(" ")[0]}</div></div><div><div className="text-sm font-bold">{m.day} {m.date} {m.time}</div><div className="text-xs opacity-60">{m.venue}</div></div></div>
       </button>
      ))}
     </div>
    </div>
   </div>
  )
 }

 if(view==="detail"){
  return(
   <div className="min-h-screen bg-white text-black">
    <div className="bg-[#f5f5f5] border-b border-black/10">
     <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2">
      <button onClick={()=>setView("calendar")} className="flex items-center gap-2 text-sm hover:opacity-60 transition"><span className="text-[#C8102E]">◀</span> Torna indietro - 35 giornate</button>
      <div className="mx-auto text-[11px] tracking-widest opacity-60 font-bold">BIGLIETTI {selectedMatch.home.toUpperCase()} VS {selectedMatch.away.toUpperCase()} - {selectedMatch.competition}</div>
      <img src="/GASTON_VILLA-removebg-preview.png" className="h-6 w-6 object-contain" alt="" />
     </div>
    </div>

    <div className="bg-gradient-to-b from-[#f5f5f5] to-white py-12 text-center relative overflow-hidden">
     <div className="relative">
      <div className="flex items-center justify-center gap-8 flex-wrap">
       <div className="flex items-center gap-4">
         <span className="text-3xl font-black tracking-tight">{selectedMatch.home.toUpperCase()}</span>
         <img src={getLogo(selectedMatch.home)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1 shadow-sm" alt={selectedMatch.home} />
       </div>
       <span className="text-2xl font-black">VS</span>
       <div className="flex items-center gap-4">
         <img src={getLogo(selectedMatch.away)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1 shadow-sm" alt={selectedMatch.away} />
         <span className="text-3xl font-black tracking-tight">{selectedMatch.away.toUpperCase()}</span>
       </div>
      </div>

      <div className="mt-8">
       <p className="text-[11px] tracking-widest opacity-60">CALCIO D'INIZIO - {selectedMatch.competition}</p>
       <p className="text-xl font-black tracking-wide text-[#C8102E] mt-1">{selectedMatch.day} {selectedMatch.date} {selectedMatch.time} - {selectedMatch.venue} - 43.000 POSTI</p>
      </div>

      <div className="mt-8">
       <p className="text-[10px] tracking-widest opacity-60">IL MATCH INIZIERA TRA:</p>
       <div className="flex justify-center gap-6 mt-3">
        <div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.g}</div><div className="text-[10px] opacity-60">giorni</div></div>
        <div className="text-2xl font-light">:</div>
        <div className="text-center"><div className="text-3xl font-black">{timer.h}</div><div className="text-[10px] opacity-60">ore</div></div>
        <div className="text-2xl font-light">:</div>
        <div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.m}</div><div className="text-[10px] opacity-60">minuti</div></div>
        <div className="text-2xl font-light">:</div>
        <div className="text-center"><div className="text-3xl font-black">{timer.s}</div><div className="text-[10px] opacity-60">secondi</div></div>
       </div>
      </div>
     </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 py-12">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col">
       <div className="p-4"><h3 className="text-[#C8102E] font-black text-xl tracking-wide">BIGLIETTI</h3></div>
       <div className="h-[220px] bg-black relative overflow-hidden"><img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600" className="w-full h-full object-cover opacity-80" alt="" /></div>
       <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#C8102E] rounded-full flex items-center justify-center text-white text-[10px]">H</div><span className="text-sm">Posto Standard - 43.000 posti - 35 giornate</span></div>
        <button onClick={()=>setView("tickets")} className="mt-2 text-xs underline font-bold text-left">INFO & PREZZI</button>
        <div className="mt-auto pt-10"><button onClick={()=>setView("tickets")} className="w-full bg-[#C8102E] text-white py-3 text-xs font-black tracking-widest">ACQUISTA BIGLIETTO</button></div>
       </div>
      </div>

      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col">
       <div className="p-4 flex items-center gap-2"><div className="w-6 h-6 bg-[#c9a86a] rounded-full"></div><h3 className="text-[#c9a86a] font-black text-xl tracking-wide">VIP HOSPITALITY</h3></div>
       <div className="h-[220px] bg-black relative overflow-hidden"><img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600" className="w-full h-full object-cover" alt="" /></div>
       <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-2 text-sm">
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">★</div><span>Posto VIP</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">🍽</div><span>Food and Beverage</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">✦</div><span>Esperienze esclusive</span></div>
        </div>
        <div className="mt-auto pt-10"><button onClick={()=>setView("premium")} className="w-full bg-[#c9a86a] text-white py-3 text-xs font-black tracking-widest">ACQUISTA ORA</button></div>
       </div>
      </div>

      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col">
       <div className="p-4 flex items-center gap-2"><div className="w-6 h-6 bg-[#c9a86a] rounded-full"></div><h3 className="text-[#c9a86a] font-black text-xl tracking-wide">BUSINESS</h3></div>
       <div className="h-[220px] bg-black relative overflow-hidden"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" className="w-full h-full object-cover" alt="" /><div className="absolute inset-0 bg-red-900/40"></div></div>
       <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-2 text-sm">
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">★</div><span>Posto VIP</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">🍽</div><span>Food and Beverage</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">✦</div><span>Esperienze per aziende e partite IVA</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">🧾</div><span>Emissione Fattura</span></div>
         <div className="flex items-center gap-2"><div className="w-5 h-5 bg-[#c9a86a] rounded-full flex items-center justify-center text-white text-[10px]">👤</div><span>Account Manager Dedicato</span></div>
        </div>
        <div className="mt-auto pt-6"><button onClick={()=>setView("premium")} className="w-full bg-[#c9a86a] text-white py-3 text-xs font-black tracking-widest">SCOPRI DI PIU</button></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  )
 }

 if(view==="tickets"){
  return(
   <div className="min-h-screen bg-[#f5f5f5] text-black">
    <div className="bg-white border-b border-black/10 sticky top-0 z-20">
     <div className="mx-auto max-w-[1600px] px-4 py-3 flex items-center justify-between">
      <button onClick={()=>setView("detail")} className="flex items-center gap-2 text-sm"><span className="text-[#C8102E]">◀</span> Torna indietro</button>
      <div className="text-center flex items-center gap-3"><img src={getLogo(selectedMatch.home)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt=""/><div><div className="font-black">{selectedMatch.home} vs {selectedMatch.away} - {selectedMatch.competition}</div><div className="text-[11px] opacity-60">{selectedMatch.day} {selectedMatch.date} {selectedMatch.time} - 43.000 POSTI - 35 GIORNATE</div></div><img src={getLogo(selectedMatch.away)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt=""/></div>
      <div className="w-20"></div>
     </div>
    </div>
    <div className="mx-auto max-w-[1600px] p-4 grid grid-cols-12 gap-4 h-[calc(100vh-60px)]">
     <div className="col-span-12 lg:col-span-7 bg-white border border-black/10 rounded-sm p-2 overflow-auto">
      <div className="relative w-full min-w-[600px] aspect-[1.3/1] bg-[#f9f9f9] rounded">
       <div className="absolute left-[32%] right-[32%] top-[32%] bottom-[32%] bg-[#6bb86b] border border-white flex items-center justify-center"><div className="w-full h-full border border-white/50 m-2"></div><div className="absolute w-[1px] h-full bg-white/50"></div><div className="absolute w-12 h-12 border border-white/50 rounded-full"></div></div>
       <div className="absolute inset-0">
        {Array.from({length:12}).map((_,i)=>{const num=320+i; const isSelected=selectedSector?.id===num; return <button key={num} onClick={()=>{setSelectedSector({id:num,fila:1,sez:"ROSSA"}); setSelectedTicket(TICKET_TYPES[0]);}} className={`absolute text-[7px] font-bold border rounded-[2px] px-1 py-0.5 ${isSelected?"bg-[#C8102E] text-white border-[#C8102E] z-10 scale-125":"bg-[#ff9999] border-black/10"}`} style={{left:`${22+i*3.8}%`, top:`${8}%`}}>{num}</button>})}
        {Array.from({length:16}).map((_,i)=>{const num=304+i; const isSelected=selectedSector?.id===num; return <button key={num} onClick={()=>{setSelectedSector({id:num,fila:2,sez:"BLU"}); setSelectedTicket(TICKET_TYPES[5]);}} className={`absolute text-[7px] font-bold border rounded-[2px] px-1 py-0.5 ${isSelected?"bg-blue-600 text-white z-10 scale-125":"bg-[#6b9bd1] border-black/10 text-white"}`} style={{left:`${4}%`, top:`${22+i*3.2}%`}}>{num}</button>})}
        {Array.from({length:10}).map((_,i)=>{const num=258+i; const isSelected=selectedSector?.id===num; return <button key={num} onClick={()=>{setSelectedSector({id:num,fila:3,sez:"ARANCIO"}); setSelectedTicket(TICKET_TYPES[6]);}} className={`absolute text-[7px] font-bold border rounded-[2px] px-1 py-0.5 ${isSelected?"bg-orange-500 text-white z-10 scale-125":"bg-[#ffcc66] border-black/10"}`} style={{left:`${28+i*4}%`, top:`${78}%`}}>{num}</button>})}
       </div>
      </div>
     </div>
     <div className="col-span-12 lg:col-span-5 bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col">
      <div className="bg-[#c44] text-white text-center py-3 font-black tracking-widest text-sm">BIGLIETTI - 35 GIORNATE - MAPPA + LISTA</div>
      <div className="flex-1 overflow-y-auto divide-y divide-black/10">
       {TICKET_TYPES.map(t=>(
        <div key={t.id} className={`p-0 ${selectedTicket.id===t.id?"bg-[#fff5f5]":""}`}>
         <button onClick={()=>{setSelectedTicket(t); setExpandedTicket(expandedTicket===t.id?null:t.id)}} className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition text-left">
          <div className="flex items-center gap-3"><div className={`w-1 self-stretch ${t.color} min-h-[40px]`}></div><div><div className="font-bold text-[13px] leading-tight">{t.nome}</div>{t.promo&&<span className="text-[10px] underline italic">PROMO</span>}<div className="text-[11px] opacity-60">{t.desc}</div></div></div>
          <div className="flex items-center gap-3"><span className="font-bold text-sm">{t.prezzo.toFixed(2)} €</span><span className={`text-[10px] transition ${expandedTicket===t.id?"rotate-180":""}`}>▼</span></div>
         </button>
         {expandedTicket===t.id&&(
          <div className="px-4 pb-4 bg-[#fafafa] border-t border-black/5">
           <div className="pt-3 grid gap-2">
            <div className="flex justify-between text-xs"><span>Quantita</span><div className="flex items-center gap-2"><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-6 h-6 rounded-full bg-black/10">-</button><span className="font-bold w-4 text-center">{qty}</span><button onClick={()=>setQty(q=>Math.min(8,q+1))} className="w-6 h-6 rounded-full bg-black text-white">+</button></div></div>
            <div className="flex justify-between text-xs font-bold"><span>Totale</span><span className="text-[#C8102E]">{(t.prezzo*qty).toFixed(2)} €</span></div>
            <button onClick={()=>{setSelectedTicket(t); setShowPay(true);}} className="mt-2 w-full bg-[#C8102E] text-white py-2.5 rounded text-xs font-black tracking-widest">ACQUISTA - {(t.prezzo*qty).toFixed(2)} €</button>
           </div>
          </div>
         )}
        </div>
       ))}
      </div>
     </div>
    </div>
    {showPay&&(<div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl p-6 w-full max-w-md"><h3 className="font-black text-xl">PAGAMENTO - 43.000 POSTI - 35 GIORNATE</h3><p className="text-xs opacity-60 mt-1">{selectedTicket.nome} - {selectedTicket.prezzo}€ x {qty} = {selectedTicket.prezzo*qty}€ - {selectedMatch.competition}</p><div className="mt-4 space-y-3"><input placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Carta" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/></div><div className="flex gap-3 mt-6"><button onClick={()=>setShowPay(false)} className="flex-1 bg-black/10 rounded-full py-3 text-xs font-bold">ANNULLA</button><button onClick={handlePay} disabled={loading} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 text-xs font-black">{loading?"ELABORO...":`PAGA ${selectedTicket.prezzo*qty}€`}</button></div></div></div>)}
    {showTicket&&(<div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl p-6 w-full max-w-lg text-center"><div className="text-5xl">🎟️</div><h3 className="text-2xl font-black mt-4">BIGLIETTO CONFERMATO</h3><p className="text-sm opacity-60 mt-2">{selectedMatch.home} vs {selectedMatch.away} - {selectedMatch.competition} - {selectedTicket.nome}</p><div className="mt-4 bg-[#f5f5f5] rounded-xl p-4 font-mono text-sm font-bold">{ticketCode}</div><canvas ref={canvasRef} className="hidden"></canvas><div className="flex gap-3 mt-6"><button onClick={downloadTicket} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 font-black text-xs">SCARICA PNG</button><button onClick={()=>{setShowTicket(false); setView("calendar");}} className="flex-1 bg-black/10 rounded-full py-3 font-bold text-xs">CHIUDI - TORNA A 35 GIORNATE</button></div></div></div>)}
   </div>
  )
 }

 if(view==="premium"){
  return(
   <div className="min-h-screen bg-white text-black">
    <div className="bg-white border-b border-black/10 sticky top-0 z-20"><div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between"><button onClick={()=>setView("detail")} className="flex items-center gap-2 text-sm"><span className="text-[#C8102E]">◀</span> Torna indietro</button><div className="font-black tracking-widest text-sm flex items-center gap-2"><img src={getLogo(selectedMatch.home)} className="h-6 w-6 rounded-full" alt=""/><span>VIP HOSPITALITY & BUSINESS - {selectedMatch.competition}</span><img src={getLogo(selectedMatch.away)} className="h-6 w-6 rounded-full" alt=""/></div><div className="w-20"></div></div></div>
    <div className="mx-auto max-w-7xl px-4 py-16">
     <div className="text-center max-w-3xl mx-auto"><h1 className="text-5xl font-black">VIP HOSPITALITY - 35 GIORNATE</h1><p className="mt-4 opacity-70">Vivi {selectedMatch.home} vs {selectedMatch.away} - {selectedMatch.competition} come un professionista.</p></div>
     <div className="mt-12 grid md:grid-cols-2 gap-10">
      <div className="bg-[#fdf6e9] border border-[#c9a86a]/30 rounded-xl p-8"><h3 className="text-2xl font-black text-[#c9a86a]">VIP HOSPITALITY - 199€</h3><ul className="mt-6 space-y-3 text-sm"><li className="flex gap-3"><span className="w-6 h-6 bg-[#c9a86a] text-white rounded-full flex items-center justify-center text-[10px]">★</span> Posto VIP Tribuna Onore Rossa - fila 1-2</li><li className="flex gap-3"><span className="w-6 h-6 bg-[#c9a86a] text-white rounded-full flex items-center justify-center text-[10px]">🍽</span> Food and Beverage illimitato</li><li className="flex gap-3"><span className="w-6 h-6 bg-[#c9a86a] text-white rounded-full flex items-center justify-center text-[10px]">✦</span> Esperienze esclusive con trofeo Campionato</li></ul><button onClick={()=>{setSelectedTicket(TICKET_TYPES[0]); setShowPay(true);}} className="mt-8 w-full bg-[#c9a86a] text-white py-4 rounded-full font-black tracking-widest">ACQUISTA VIP - 199€</button></div>
      <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-8"><h3 className="text-2xl font-black">BUSINESS - 349€</h3><ul className="mt-6 space-y-3 text-sm"><li className="flex gap-3"><span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px]">★</span> Sky Box privato 43.000 posti - 35 giornate</li><li className="flex gap-3"><span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px]">🧾</span> Emissione Fattura</li><li className="flex gap-3"><span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px]">👤</span> Account Manager Dedicato</li></ul><button onClick={()=>setView("tickets")} className="mt-8 w-full bg-black text-white py-4 rounded-full font-black tracking-widest">SCOPRI POSTI BUSINESS</button></div>
     </div>
    </div>
    {showPay&&(<div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl p-6 w-full max-w-md"><h3 className="font-black text-xl">PAGAMENTO VIP - {selectedMatch.competition}</h3><div className="mt-4 space-y-3"><input placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Email Aziendale" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Carta" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/></div><div className="flex gap-3 mt-6"><button onClick={()=>setShowPay(false)} className="flex-1 bg-black/10 rounded-full py-3 text-xs font-bold">ANNULLA</button><button onClick={handlePay} disabled={loading} className="flex-1 bg-[#c9a86a] text-white rounded-full py-3 text-xs font-black">{loading?"ELABORO...":`PAGA 199€`}</button></div></div></div>)}
   </div>
  )
 }
 return null;
}
