import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
export const Route = createFileRoute("/matchday")({ component: MatchdayPage });

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgawolng";

const TEAM_LOGOS: Record<string, string> = {
  "Gaston Villa": "/GASTON_VILLA-removebg-preview.png",
  "KUNG FU PANDEV": "/logos/kungfupandev.png",
  "Young Girls": "/logos/youngirls.png",
  "Forza PCI": "/logos/forzapci.png",
  "Aura Jacquet": "/logos/aurajacquet.png",
  "Como Stai": "/logos/comostai.png",
  "Deportivo Aperitivo": "/logos/deportivo.png",
  "Urbe Eterna": "/logos/urbeeterna.png",
  "Blue Lock": "/logos/bluelock.png",
  "BORUSSIA PORCMUND": "/logos/borussia.png",
};

function getLogo(team: string) {
  const t = team.trim();
  return TEAM_LOGOS[t] || `https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=C8102E&color=fff&bold=true&size=128`;
}

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

const TRIBUNE = [
  { id: "rossa", nome: "TRIBUNA ONORE ROSSA", sottotitolo: "Tribuna Centrale - Vista Perfetta", prezzoBase: 134, colore: "bg-[#8B0000]", settori: 20, postiPerSettore: 100, totale: 2000 },
  { id: "arancio", nome: "TRIBUNA ARANCIO", sottotitolo: "Tribuna Laterale Est", prezzoBase: 104, colore: "bg-[#FF8C00]", settori: 20, postiPerSettore: 100, totale: 2000 },
  { id: "blu", nome: "TRIBUNA BLU", sottotitolo: "Tribuna Laterale Ovest - Famiglie", prezzoBase: 79, colore: "bg-[#1E40AF]", settori: 20, postiPerSettore: 100, totale: 2000 },
  { id: "curva", nome: "CURVA SUD GASTON", sottotitolo: "Curva Tifosi - Atmosfera Calda", prezzoBase: 59, colore: "bg-[#C8102E]", settori: 20, postiPerSettore: 100, totale: 2000 },
];

function MatchdayPage(){
 const [view, setView] = useState<"calendar"|"detail"|"tickets">("calendar");
 const [selectedMatch,setSelectedMatch]=useState(MATCHES[0]);
 const [tribunaStep, setTribunaStep] = useState<"chooseTribune"|"chooseSector"|"chooseSeat">("chooseTribune");
 const [selectedTribuna, setSelectedTribuna] = useState<any>(null);
 const [selectedSector, setSelectedSector] = useState<any>(null);
 const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
 const [showPay,setShowPay]=useState(false);
 const [showTicket,setShowTicket]=useState(false);
 const [ticketCode,setTicketCode]=useState("");
 const [form,setForm]=useState({nome:"",email:"",card:"4242 4242 4242 4242"});
 const [loading,setLoading]=useState(false);
 const [timer, setTimer] = useState({ g:14, h:4, m:14, s:6 });
 const canvasRef=useRef<HTMLCanvasElement>(null);

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

 function openMatch(m:any){ setSelectedMatch(m); setView("detail"); }
 function openTickets(){ setView("tickets"); setTribunaStep("chooseTribune"); setSelectedTribuna(null); setSelectedSector(null); setSelectedSeats([]); }
 function selectTribuna(t:any){ setSelectedTribuna(t); setTribunaStep("chooseSector"); }
 function selectSector(sec:any){ setSelectedSector(sec); setTribunaStep("chooseSeat"); setSelectedSeats([]); }
 function toggleSeat(n:number){ setSelectedSeats(prev => prev.includes(n)? prev.filter(x=>x!==n) : [...prev, n].slice(0,8)); }

 async function handlePay(){
  if(!form.nome||!form.email) return alert("Inserisci nome ed email");
  if(selectedSeats.length===0) return alert("Scegli almeno un posto");
  setLoading(true);
  const code=`GV-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  setTicketCode(code);
  try{
   await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({
     partita:`${selectedMatch.home} vs ${selectedMatch.away} - ${selectedMatch.competition}`,
     tribuna: selectedTribuna.nome,
     settore: selectedSector.nome,
     posti: selectedSeats.join(", "),
     quantita: selectedSeats.length,
     prezzo_singolo: selectedTribuna.prezzoBase,
     totale: selectedTribuna.prezzoBase*selectedSeats.length,
     codice_biglietto: code,
     nome: form.nome,
     email: form.email
   })});
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
  ctx.fillStyle="white"; ctx.font="bold 12px monospace"; ctx.fillText(`${selectedMatch.competition} - ${selectedTribuna?.nome} - ${selectedSector?.nome} - 43.000 POSTI`,60,30);
  ctx.fillStyle="white"; ctx.font="900 32px sans-serif"; ctx.fillText(`${selectedMatch.home} vs ${selectedMatch.away}`,60,100);
  ctx.fillStyle="#888"; ctx.font="12px monospace"; ctx.fillText(`${selectedMatch.date} ${selectedMatch.time} - Posti: ${selectedSeats.join(", ")}`,60,125);
  const infos=[["TRIBUNA",selectedTribuna?.nome],["SETTORE",selectedSector?.nome],["POSTI",`${selectedSeats.length}x (${selectedSeats.join(", ")})`],["TOTALE",`${selectedTribuna.prezzoBase*selectedSeats.length}€`]];
  let x=60; infos.forEach(([k,v])=>{ctx.fillStyle="#666";ctx.font="10px monospace";ctx.fillText(k,x,170);ctx.fillStyle="white";ctx.font="bold 13px sans-serif";ctx.fillText(v.substring(0,30),x,190);x+=220;});
  ctx.fillStyle="#0a0a0a"; for(let y=60;y<500;y+=20){ctx.beginPath();ctx.arc(850,y,6,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle="white"; ctx.fillRect(900,80,200,200); ctx.fillStyle="black"; for(let i=0;i<100;i++){if(Math.random()>0.5) ctx.fillRect(910+(i%10)*18,90+Math.floor(i/10)*18,14,14);}
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(ticketCode,900,310);
  const link=document.createElement("a"); link.download=`biglietto-${ticketCode}.png`; link.href=canvas.toDataURL(); link.click();
 }

 if(view==="calendar"){
  return(
   <div className="min-h-screen bg-[#080808] text-white pt-20">
    <div className="mx-auto max-w-7xl px-4 py-10">
     <h1 className="text-5xl font-black tracking-tight">35 GIORNATE - 43.000 POSTI</h1>
     <p className="opacity-60 mt-2">Scegli la partita - poi 4 tribune - 20 settori x 100 posti</p>
     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MATCHES.map(m=>(
       <button key={m.id} onClick={()=>openMatch(m)} className="text-left bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/30 hover:bg-[#161616] transition">
        <div className="flex justify-between items-center"><span className="text- tracking-widest opacity-60 font-bold">{m.competition}</span><span className="text- bg-white/10 rounded-full px-2 py-1">G{m.id}</span></div>
        <div className="mt-4 flex items-center gap-2">
          <img src={getLogo(m.home)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
          <span className="text- font-black">{m.home}</span>
          <span className="text-[#C8102E] mx-1 text-xs">vs</span>
          <span className="text- font-black">{m.away}</span>
          <img src={getLogo(m.away)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
        </div>
        <div className="mt-3 flex items-center gap-3"><div className="bg-white text-black rounded-lg px-3 py-1.5 text-center"><div className="text- font-bold leading-none">{m.date.split(" ")[1]}</div><div className="text-lg font-black leading-none">{m.date.split(" ")[0]}</div></div><div><div className="text-sm font-bold">{m.day} {m.date} {m.time}</div><div className="text-xs opacity-60">{m.venue}</div></div></div>
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
      <button onClick={()=>setView("calendar")} className="flex items-center gap-2 text-sm"><span className="text-[#C8102E]">◀</span> Torna a 35 giornate</button>
      <div className="mx-auto text- tracking-widest opacity-60 font-bold">BIGLIETTI {selectedMatch.home.toUpperCase()} VS {selectedMatch.away.toUpperCase()}</div>
      <img src="/GASTON_VILLA-removebg-preview.png" className="h-6 w-6 object-contain" alt="" />
     </div>
    </div>
    <div className="bg-gradient-to-b from-[#f5f5f5] to-white py-12 text-center">
     <div className="flex items-center justify-center gap-6 flex-wrap">
       <div className="flex items-center gap-3"><span className="text-3xl font-black">{selectedMatch.home.toUpperCase()}</span><img src={getLogo(selectedMatch.home)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1" alt="" /></div>
       <span className="text-2xl font-black">VS</span>
       <div className="flex items-center gap-3"><img src={getLogo(selectedMatch.away)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1" alt="" /><span className="text-3xl font-black">{selectedMatch.away.toUpperCase()}</span></div>
     </div>
     <div className="mt-6"><p className="text- tracking-widest opacity-60">CALCIO D'INIZIO - {selectedMatch.competition}</p><p className="text-xl font-black text-[#C8102E] mt-1">{selectedMatch.day} {selectedMatch.date} {selectedMatch.time} - 43.000 POSTI</p></div>
     <div className="mt-6"><p className="text- tracking-widest opacity-60">IL MATCH INIZIERA TRA:</p><div className="flex justify-center gap-6 mt-3"><div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.g}</div><div className="text- opacity-60">giorni</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black">{timer.h}</div><div className="text- opacity-60">ore</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.m}</div><div className="text- opacity-60">min</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black">{timer.s}</div><div className="text- opacity-60">sec</div></div></div></div>
    </div>
    <div className="mx-auto max-w-7xl px-4 py-12">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#C8102E] font-black text-xl">BIGLIETTI STANDARD</h3><p className="text-xs opacity-60">4 tribune → 20 settori → 100 posti</p></div><div className="h- bg-black"><img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600" className="w-full h-full object-cover" alt="" /></div><div className="p-5"><button onClick={openTickets} className="w-full bg-[#C8102E] text-white py-3 text-xs font-black">SCEGLI TRIBUNA - 43.000 POSTI</button></div></div>
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#c9a86a] font-black text-xl">VIP HOSPITALITY - 199€</h3></div><div className="h- bg-black"><img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600" className="w-full h-full object-cover" alt="" /></div><div className="p-5 text-sm space-y-1"><p>★ Posto VIP Tribuna Rossa</p><p>🍽 Food and Beverage</p><p>✦ Esperienze esclusive</p><button onClick={openTickets} className="mt-4 w-full bg-[#c9a86a] text-white py-3 text-xs font-black">VIP - 199€</button></div></div>
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#c9a86a] font-black text-xl">BUSINESS - 349€</h3></div><div className="h- bg-black"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" className="w-full h-full object-cover" alt="" /></div><div className="p-5 text-sm"><p>★ Sky Box 43.000 posti</p><p>🧾 Fattura</p><p>👤 Account Manager</p><button onClick={openTickets} className="mt-4 w-full bg-black text-white py-3 text-xs font-black">BUSINESS - 349€</button></div></div>
     </div>
    </div>
   </div>
  )
 }

 if(view==="tickets"){
  return(
   <div className="min-h-screen bg-[#f5f5f5] text-black">
    <div className="bg-white border-b border-black/10 sticky top-0 z-20">
     <div className="mx-auto max-w- px-4 py-3 flex items-center justify-between">
      <button onClick={()=>{if(tribunaStep==="chooseTribune") setView("detail"); else if(tribunaStep==="chooseSector") setTribunaStep("chooseTribune"); else setTribunaStep("chooseSector");}} className="flex items-center gap-2 text-sm font-bold"><span className="text-[#C8102E]">◀</span> {tribunaStep==="chooseTribune"? "Torna a dettaglio" : tribunaStep==="chooseSector"? "Torna a 4 tribune" : "Torna a settori"}</button>
      <div className="text-center flex items-center gap-2"><img src={getLogo(selectedMatch.home)} className="h-6 w-6 rounded-full" alt=""/><span className="font-black text-sm">{selectedMatch.home} vs {selectedMatch.away}</span><img src={getLogo(selectedMatch.away)} className="h-6 w-6 rounded-full" alt=""/><span className="text- opacity-60 ml-2">- {tribunaStep==="chooseTribune"? "SCEGLI 1 DELLE 4 TRIBUNE" : tribunaStep==="chooseSector"? `${selectedTribuna?.nome} - 20 SETTORI` : `${selectedTribuna?.nome} ${selectedSector?.nome} - 100 POSTI`}</span></div>
      <div className="text- bg-black text-white rounded-full px-3 py-1">{selectedSeats.length>0? `${selectedSeats.length} posti - ${selectedTribuna?.prezzoBase*selectedSeats.length}€` : "43.000 POSTI"}</div>
     </div>
    </div>

    {tribunaStep==="chooseTribune" && (
     <div className="mx-auto max-w-7xl p-8">
      <h2 className="text-3xl font-black text-center">SCEGLI LA TRIBUNA - GASTON VILLA PARK - 43.000 POSTI</h2>
      <p className="text-center opacity-60 mt-2">4 tribune - ognuna con 20 settori da 100 posti (2.000 posti per tribuna)</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
       {TRIBUNE.map(t=>(
        <button key={t.id} onClick={()=>selectTribuna(t)} className="text-left bg-white border-2 border-black/10 rounded-2xl p-6 hover:border-[#C8102E] hover:shadow-xl transition group">
         <div className="flex items-start justify-between">
          <div><div className="flex items-center gap-3"><div className={`w-4 h-12 ${t.colore} rounded-full`}></div><div><h3 className="font-black text-xl leading-tight">{t.nome}</h3><p className="text-xs opacity-60 mt-1">{t.sottotitolo}</p></div></div><div className="mt-4 flex gap-4 text-"><span className="bg-black/5 rounded-full px-3 py-1">{t.settori} settori</span><span className="bg-black/5 rounded-full px-3 py-1">{t.postiPerSettore} posti/settore</span><span className="bg-black/5 rounded-full px-3 py-1">{t.totale} posti totali</span></div></div>
          <div className="text-right"><div className="font-black text-2xl">{t.prezzoBase}€</div><div className="text- opacity-60">a posto</div><div className="mt-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#C8102E] transition">→</div></div>
         </div>
         <div className="mt-6 h-24 bg-[#f5f5f5] rounded-xl grid grid-cols-10 gap-1 p-2">{Array.from({length:20}).map((_,i)=>(<div key={i} className={`rounded-sm ${t.colore} opacity-60`}></div>))}</div>
        </button>
       ))}
      </div>
     </div>
    )}

    {tribunaStep==="chooseSector" && selectedTribuna && (
     <div className="mx-auto max-w-7xl p-8">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.nome} - SCEGLI IL SETTORE</h2>
      <p className="text-center opacity-60 mt-2">{selectedTribuna.nome} - 20 rettangoli, ognuno 100 posti</p>
      <div className="mt-10 bg-white border border-black/10 rounded-2xl p-6">
       <div className="h-20 bg-[#6bb86b] rounded-xl mb-8 flex items-center justify-center text-white font-black tracking-widest">CAMPO - GASTON VILLA PARK</div>
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({length:20}).map((_,i)=>{
          const sectorNum = i+1;
          const nome = `${selectedTribuna.id.toUpperCase()}-${String(sectorNum).padStart(2,"0")}`;
          const occupati = Math.floor(Math.random()*30)+10;
          return (
            <button key={i} onClick={()=>selectSector({id:sectorNum, nome, occupati, liberi:100-occupati})} className="bg-[#f9f9f9] border-2 border-black/10 rounded-xl p-4 hover:border-[#C8102E] hover:bg-white hover:shadow-lg transition text-left group">
             <div className="flex justify-between items-start"><span className="font-black text-sm">{nome}</span><span className={`w-3 h-3 rounded-full ${selectedTribuna.colore}`}></span></div>
             <div className="mt-3 grid grid-cols-10 gap-">{Array.from({length:20}).map((_,j)=>(<div key={j} className={`h-1.5 rounded-full ${j<occupati/5? "bg-red-300" : "bg-green-400"}`}></div>))}</div>
             <div className="mt-3 text- flex justify-between"><span className="opacity-60">{100-occupati} liberi / 100</span><span className="font-bold group-hover:text-[#C8102E]">{selectedTribuna.prezzoBase}€</span></div>
            </button>
          )
        })}
       </div>
      </div>
     </div>
    )}

    {tribunaStep==="chooseSeat" && selectedTribuna && selectedSector && (
     <div className="mx-auto max-w-6xl p-8">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.nome} - {selectedSector.nome} - 100 POSTI</h2>
      <p className="text-center opacity-60 mt-2">Scegli i tuoi posti - max 8 - {selectedTribuna.prezzoBase}€ cadauno</p>
      <div className="mt-8 grid grid-cols-12 gap-6">
       <div className="col-span-12 lg:col-span-8 bg-white border border-black/10 rounded-2xl p-6">
        <div className="flex justify-between text- opacity-60 mb-4"><span>⬜ Libero</span><span>🟥 Occupato</span><span>🟩 Selezionato</span></div>
        <div className="space-y-3">
         {Array.from({length:10}).map((_,fila)=>(
           <div key={fila} className="flex items-center gap-2">
            <div className="w-6 text- font-bold opacity-60">F{String.fromCharCode(65+fila)}</div>
            <div className="flex-1 grid grid-cols-10 gap-2">
             {Array.from({length:10}).map((_,col)=>{
               const seatNum = fila*10+col+1;
               const isOccupied = Math.random()<0.25;
               const isSelected = selectedSeats.includes(seatNum);
               return (
                 <button key={col} disabled={isOccupied} onClick={()=>toggleSeat(seatNum)} className={`h-10 rounded-lg text- font-bold border-2 transition ${isOccupied? "bg-red-100 border-red-200 text-red-300 cursor-not-allowed" : isSelected? "bg-green-500 border-green-600 text-white scale-110 shadow-lg" : "bg-white border-black/10 hover:border-[#C8102E]"}`}>
                  {seatNum}
                 </button>
               )
             })}
            </div>
           </div>
         ))}
        </div>
        <div className="mt-8 h-12 bg-[#6bb86b] rounded-xl flex items-center justify-center text-white font-black text-xs">CAMPO - VISTA DA {selectedTribuna.nome}</div>
       </div>
       <div className="col-span-12 lg:col-span-4 bg-white border border-black/10 rounded-2xl p-6 h-fit">
        <h3 className="font-black">RIEPILOGO</h3>
        <div className="mt-4 space-y-3 text-sm">
         <div className="flex justify-between"><span className="opacity-60">Partita</span><span className="font-bold text-xs">{selectedMatch.home} vs {selectedMatch.away}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Tribuna</span><span className="font-bold">{selectedTribuna.nome}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Settore</span><span className="font-bold">{selectedSector.nome}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Posti</span><span className="font-bold">{selectedSeats.length>0? selectedSeats.join(", ") : "Nessuno"}</span></div>
         <div className="border-t border-black/10 pt-3 mt-3 flex justify-between font-black text-lg"><span>Totale</span><span className="text-[#C8102E]">{selectedTribuna.prezzoBase*selectedSeats.length}€</span></div>
        </div>
        <button disabled={selectedSeats.length===0} onClick={()=>setShowPay(true)} className="mt-6 w-full bg-[#C8102E] disabled:bg-black/20 text-white py-4 rounded-full font-black text-xs">ACQUISTA {selectedSeats.length>0? `${selectedSeats.length} POSTI - ${selectedTribuna.prezzoBase*selectedSeats.length}€` : "SELEZIONA POSTI"}</button>
        <button onClick={()=>setTribunaStep("chooseSector")} className="mt-3 w-full bg-black/5 py-3 rounded-full font-bold text-xs">CAMBIA SETTORE</button>
       </div>
      </div>
     </div>
    )}

    {showPay&&(<div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl p-6 w-full max-w-md"><h3 className="font-black text-xl">PAGAMENTO</h3><p className="text-xs opacity-60 mt-1">{selectedTribuna.nome} {selectedSector.nome} - Posti {selectedSeats.join(", ")}</p><div className="mt-4 space-y-3"><input placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Carta" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/></div><div className="flex gap-3 mt-6"><button onClick={()=>setShowPay(false)} className="flex-1 bg-black/10 rounded-full py-3 text-xs font-bold">ANNULLA</button><button onClick={handlePay} disabled={loading} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 text-xs font-black">{loading?"ELABORO...":`PAGA ${selectedTribuna.prezzoBase*selectedSeats.length}€`}</button></div></div></div>)}
    {showTicket&&(<div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl p-6 w-full max-w-lg text-center"><div className="text-5xl">🎟️</div><h3 className="text-2xl font-black mt-4">BIGLIETTI CONFERMATI</h3><p className="text-sm opacity-60 mt-2">{selectedMatch.home} vs {selectedMatch.away} - {selectedTribuna.nome} {selectedSector.nome}</p><div className="mt-4 bg-[#f5f5f5] rounded-xl p-4 font-mono text-sm font-bold">{ticketCode}</div><canvas ref={canvasRef} className="hidden"></canvas><div className="flex gap-3 mt-6"><button onClick={downloadTicket} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 font-black text-xs">SCARICA PNG</button><button onClick={()=>{setShowTicket(false); setView("calendar"); setTribunaStep("chooseTribune"); setSelectedSeats([]);}} className="flex-1 bg-black/10 rounded-full py-3 font-bold text-xs">TORNA A 35 GIORNATE</button></div></div></div>)}
   </div>
  )
 }
 return null;
}
