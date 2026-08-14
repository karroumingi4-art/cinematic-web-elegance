import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
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
  { id: 2, date: "18 SET", time: "18:30", competition: "Campionato · G2", home: "Young Girls", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2026-09-18T18:30:00" },
  { id: 3, date: "10 OTT", time: "21:00", competition: "Campionato · G3", home: "Gaston Villa", away: "Forza PCI", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-10T21:00:00" },
  { id: 4, date: "17 OTT", time: "15:00", competition: "Campionato · G4", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-17T15:00:00" },
  { id: 5, date: "24 OTT", time: "20:45", competition: "Campionato · G5", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-24T20:45:00" },
  { id: 6, date: "27 OTT", time: "20:45", competition: "Campionato · G6", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "MARTEDI", fullDate: "2026-10-27T20:45:00" },
  { id: 7, date: "31 OTT", time: "20:45", competition: "Campionato · G7", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-10-31T20:45:00" },
  { id: 8, date: "07 NOV", time: "20:45", competition: "Campionato · G8", home: "Blue Lock", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-07T20:45:00" },
  { id: 9, date: "21 NOV", time: "20:45", competition: "Campionato · G9", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-21T20:45:00" },
  { id: 10, date: "28 NOV", time: "20:45", competition: "Campionato · G10", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-11-28T20:45:00" },
  { id: 11, date: "05 DIC", time: "20:45", competition: "Campionato · G11", home: "Blue Lock", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-05T20:45:00" },
  { id: 12, date: "12 DIC", time: "20:45", competition: "Campionato · G12", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-12T20:45:00" },
  { id: 13, date: "19 DIC", time: "20:45", competition: "Campionato · G13", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-19T20:45:00" },
  { id: 14, date: "26 DIC", time: "20:45", competition: "Campionato · G14", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2026-12-26T20:45:00" },
  { id: 15, date: "02 GEN", time: "15:00", competition: "Campionato · G15", home: "Gaston Villa", away: "Aura Jacquet", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-02T15:00:00" },
  { id: 16, date: "09 GEN", time: "20:45", competition: "Campionato · G16", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-09T20:45:00" },
  { id: 17, date: "16 GEN", time: "20:45", competition: "Campionato · G17", home: "Young Girls", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-16T20:45:00" },
  { id: 18, date: "23 GEN", time: "20:45", competition: "Campionato · G18", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-23T20:45:00" },
  { id: 19, date: "30 GEN", time: "20:45", competition: "Campionato · G19", home: "KUNG FU PANDEV", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-01-30T20:45:00" },
  { id: 20, date: "6 FEB", time: "20:45", competition: "Campionato · G20", home: "Young Girls", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-06T20:45:00" },
  { id: 21, date: "13 FEB", time: "20:45", competition: "Campionato · G21", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-13T20:45:00" },
  { id: 22, date: "20 FEB", time: "20:45", competition: "Campionato · G22", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-20T20:45:00" },
  { id: 23, date: "27 FEB", time: "20:45", competition: "Campionato · G23", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-02-27T20:45:00" },
  { id: 24, date: "6 MAR", time: "20:45", competition: "Campionato · G24", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-06T20:45:00" },
  { id: 25, date: "13 MAR", time: "20:45", competition: "Campionato · G25", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-13T20:45:00" },
  { id: 26, date: "20 MAR", time: "20:45", competition: "Campionato · G26", home: "Blue Lock", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-03-20T20:45:00" },
  { id: 27, date: "03 APR", time: "20:45", competition: "Campionato · G27", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-03T20:45:00" },
  { id: 28, date: "10 APR", time: "20:45", competition: "Campionato · G28", home: "BORUSSIA PORCMUND", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-10T20:45:00" },
  { id: 29, date: "17 APR", time: "20:45", competition: "Campionato · G29", home: "Blue Lock", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-17T20:45:00" },
  { id: 30, date: "24 APR", time: "20:45", competition: "Campionato · G30", home: "Urbe Eterna", away: "Gaston Villa", venue: "Gaston Villa Park", day: "VENERDI", fullDate: "2027-04-24T20:45:00" },
  { id: 31, date: "1 MAG", time: "20:45", competition: "Campionato · G31", home: "Deportivo Aperitivo", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-01T20:45:00" },
  { id: 32, date: "02 MAG", time: "20:45", competition: "Campionato · G32", home: "Como Stai", away: "Gaston Villa", venue: "Gaston Villa Park", day: "DOMENICA", fullDate: "2027-05-02T20:45:00" },
  { id: 33, date: "8 MAG", time: "20:45", competition: "Campionato · G33", home: "Aura Jacquet", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-08T20:45:00" },
  { id: 34, date: "15 MAG", time: "20:45", competition: "Campionato · G34", home: "Forza PCI", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-15T20:45:00" },
  { id: 35, date: "22 MAG", time: "20:45", competition: "Campionato · G35", home: "Young Girls", away: "Gaston Villa", venue: "Gaston Villa Park", day: "SABATO", fullDate: "2027-05-22T20:45:00" },
];

const TRIBUNE = [
  { id: "rossa", nome: "TRIBUNA ONORE ROSSA", short: "ROSSA", sottotitolo: "Nord - Centrale", prezzoBase: 134, colore: "bg-[#8B0000]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 1 },
  { id: "arancio", nome: "TRIBUNA ARANCIO", short: "ARANCIO", sottotitolo: "Est - Laterale", prezzoBase: 104, colore: "bg-[#FF8C00]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 2 },
  { id: "blu", nome: "TRIBUNA BLU", short: "BLU", sottotitolo: "Ovest - Famiglie", prezzoBase: 79, colore: "bg-[#1E40AF]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 3 },
  { id: "curva", nome: "CURVA SUD GASTON", short: "CURVA SUD", sottotitolo: "Sud - Tifosi", prezzoBase: 59, colore: "bg-[#C8102E]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 4 },
];

function getOccupancyRate(fullDate: string, matchId: number): number {
  const now = new Date().getTime();
  const target = new Date(fullDate).getTime();
  const diffDays = (target - now) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return 0.95;
  const maxDays = 180;
  const clampedDays = Math.min(diffDays, maxDays);
  const base = 0.15 + 0.70 * (1 - clampedDays / maxDays);
  return Math.min(0.90, Math.max(0.10, base));
}

function isSeatOccupied(matchId: number, tribunaNum: number, sectorNum: number, seatNum: number, occupancyRate: number): boolean {
  const seed = (matchId * 100000 + tribunaNum * 10000 + sectorNum * 100 + seatNum) * 9301;
  const pseudo = (seed * 49297) % 233280;
  const normalized = (pseudo % 100) / 100;
  return normalized < occupancyRate;
}

function MatchdayPage(){
 const [view, setView] = useState<"calendar"|"detail"|"tickets">("calendar");
 const [selectedMatch,setSelectedMatch]=useState(MATCHES[0]);
 const [tribunaStep, setTribunaStep] = useState<"stadiumOverview"|"chooseSector"|"chooseSeat">("stadiumOverview");
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
 const occupancyRate = useMemo(()=> getOccupancyRate(selectedMatch.fullDate, selectedMatch.id), [selectedMatch]);

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
 function openTickets(){ setView("tickets"); setTribunaStep("stadiumOverview"); setSelectedTribuna(null); setSelectedSector(null); setSelectedSeats([]); }
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
  ctx.fillStyle="white"; ctx.font="bold 11px monospace"; ctx.fillText(`${selectedMatch.competition} - ${selectedTribuna?.nome} - ${selectedSector?.nome}`,60,30);
  ctx.fillStyle="white"; ctx.font="900 28px sans-serif"; ctx.fillText(`${selectedMatch.home} vs ${selectedMatch.away}`,60,100);
  ctx.fillStyle="#888"; ctx.font="11px monospace"; ctx.fillText(`${selectedMatch.date} ${selectedMatch.time} - Posti: ${selectedSeats.join(", ")}`,60,125);
  const infos=[["TRIBUNA",selectedTribuna?.nome],["SETTORE",selectedSector?.nome],["POSTI",`${selectedSeats.length}x (${selectedSeats.join(", ")})`],["TOTALE",`${selectedTribuna.prezzoBase*selectedSeats.length}€`]];
  let x=60; infos.forEach(([k,v])=>{ctx.fillStyle="#666";ctx.font="10px monospace";ctx.fillText(k,x,170);ctx.fillStyle="white";ctx.font="bold 12px sans-serif";ctx.fillText(v.substring(0,28),x,190);x+=220;});
  ctx.fillStyle="#0a0a0a"; for(let y=60;y<500;y+=20){ctx.beginPath();ctx.arc(850,y,6,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle="white"; ctx.fillRect(900,80,200,200); ctx.fillStyle="black"; for(let i=0;i<100;i++){if(Math.random()>0.5) ctx.fillRect(910+(i%10)*18,90+Math.floor(i/10)*18,14,14);}
  ctx.fillStyle="white"; ctx.font="bold 14px monospace"; ctx.fillText(ticketCode,900,310);
  const link=document.createElement("a"); link.download=`biglietto-${ticketCode}.png`; link.href=canvas.toDataURL(); link.click();
 }

 if(view==="calendar"){
  return(
   <div className="min-h-screen bg-[#080808] text-white pt-20">
    <div className="mx-auto max-w-7xl px-4 py-10">
     <h1 className="text-5xl font-black tracking-tight">35 GIORNATE - YOUNG GIRLS & BLUE LOCK</h1>
     <p className="opacity-60 mt-2">Stadio intero → 4 tribune → 20 settori x 100 posti</p>
     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MATCHES.map(m=>{
        const occ = getOccupancyRate(m.fullDate, m.id);
        return (
         <button key={m.id} onClick={()=>openMatch(m)} className="text-left bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/30 hover:bg-[#161616] transition">
          <div className="flex justify-between items-center"><span className="text- tracking-widest opacity-60 font-bold">{m.competition}</span><span className="text- bg-white/10 rounded-full px-2 py-1">{Math.round(occ*100)}% occ.</span></div>
          <div className="mt-4 flex items-center gap-2">
            <img src={getLogo(m.home)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
            <span className="text- font-black">{m.home}</span>
            <span className="text-[#C8102E] mx-1 text-xs">vs</span>
            <span className="text- font-black">{m.away}</span>
            <img src={getLogo(m.away)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" />
          </div>
          <div className="mt-3 flex items-center gap-3"><div className="bg-white text-black rounded-lg px-3 py-1.5 text-center"><div className="text- font-bold leading-none">{m.date.split(" ")[1]}</div><div className="text-lg font-black leading-none">{m.date.split(" ")[0]}</div></div><div><div className="text-sm font-bold">{m.day} {m.date} {m.time}</div><div className="text-xs opacity-60">{Math.round((1-occ)*100)}% liberi</div></div></div>
         </button>
        )
      })}
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
      <div className="mx-auto text- tracking-widest opacity-60 font-bold">{selectedMatch.home.toUpperCase()} VS {selectedMatch.away.toUpperCase()} - {Math.round(occupancyRate*100)}% OCCUPATI</div>
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
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#C8102E] font-black text-xl">STADIO INTERO - 4 TRIBUNE</h3></div><div className="h- bg-black relative"><img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600" className="w-full h-full object-cover" alt="" /><div className="absolute bottom-2 left-2 bg-black/80 text-white text- px-2 py-1 rounded-full">{Math.round(occupancyRate*100)}% occupati</div></div><div className="p-5"><button onClick={openTickets} className="w-full bg-[#C8102E] text-white py-3 text-xs font-black">VEDI STADIO INTERO</button></div></div>
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#c9a86a] font-black text-xl">VIP - 199€</h3></div><div className="h- bg-black"><img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600" className="w-full h-full object-cover" alt="" /></div><div className="p-5"><button onClick={openTickets} className="mt-2 w-full bg-[#c9a86a] text-white py-3 text-xs font-black">VIP</button></div></div>
      <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col"><div className="p-4"><h3 className="text-[#c9a86a] font-black text-xl">BUSINESS - 349€</h3></div><div className="h- bg-black"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" className="w-full h-full object-cover" alt="" /></div><div className="p-5"><button onClick={openTickets} className="mt-2 w-full bg-black text-white py-3 text-xs font-black">BUSINESS</button></div></div>
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
      <button onClick={()=>{if(tribunaStep==="stadiumOverview") setView("detail"); else if(tribunaStep==="chooseSector") setTribunaStep("stadiumOverview"); else setTribunaStep("chooseSector");}} className="flex items-center gap-2 text-sm font-bold"><span className="text-[#C8102E]">◀</span> {tribunaStep==="stadiumOverview"? "Torna" : tribunaStep==="chooseSector"? "Torna a stadio" : "Torna a settori"}</button>
      <div className="text-center flex items-center gap-2"><img src={getLogo(selectedMatch.home)} className="h-6 w-6 rounded-full" alt=""/><span className="font-black text-sm">{selectedMatch.home} vs {selectedMatch.away}</span><img src={getLogo(selectedMatch.away)} className="h-6 w-6 rounded-full" alt=""/></div>
      <div className="text- bg-black text-white rounded-full px-3 py-1">{Math.round((1-occupancyRate)*100)}% LIBERI</div>
     </div>
    </div>

    {tribunaStep==="stadiumOverview" && (
     <div className="mx-auto max-w-6xl p-6">
      <h2 className="text-3xl font-black text-center">STADIO INTERO - 4 TRIBUNE - YOUNG GIRLS & BLUE LOCK</h2>
      <p className="text-center opacity-60 mt-2">{selectedMatch.date} = {Math.round(occupancyRate*100)}% occupati - Graduale fisso</p>
      <div className="mt-8 bg-white border border-black/10 rounded- p-4 md:p-8">
        <div className="relative w-full aspect-[1.6/1] bg-[#e8f5e8] rounded-2xl overflow-hidden border-2 border-black/10">
          <button onClick={()=>selectTribuna(TRIBUNE[0])} className="absolute left-[10%] right-[10%] top-[2%] h-[18%] bg-[#8B0000] hover:bg-[#a00000] rounded-xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-white">
            <div className="font-black text-sm md:text-lg">TRIBUNA ONORE ROSSA - NORD</div>
            <div className="text- opacity-80">20x100 = 2000 posti - 134€ - {Math.round((1-occupancyRate)*100)}% liberi</div>
          </button>
          <button onClick={()=>selectTribuna(TRIBUNE[1])} className="absolute right-[1%] top-[22%] bottom-[22%] w-[12%] bg-[#FF8C00] rounded-xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-white">
            <div className="font-black text-xs" style={{writingMode:"vertical-rl"}}>ARANCIO EST 20x100 104€</div>
          </button>
          <button onClick={()=>selectTribuna(TRIBUNE[2])} className="absolute left-[1%] top-[22%] bottom-[22%] w-[12%] bg-[#1E40AF] rounded-xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-white">
            <div className="font-black text-xs" style={{writingMode:"vertical-rl"}}>BLU OVEST 20x100 79€</div>
          </button>
          <div className="absolute left-[18%] right-[18%] top-[24%] bottom-[24%] bg-[#6bb86b] border-2 border-white rounded-xl flex items-center justify-center">
            <div className="w-full h-full border border-white/50 m-2 rounded-lg flex items-center justify-center">
              <div className="absolute w- h-full bg-white/70"></div>
              <div className="w-20 h-20 border border-white/70 rounded-full"></div>
              <div className="absolute text-white font-black text- bg-black/20 px-3 py-1 rounded-full">CAMPO - {selectedMatch.competition}</div>
            </div>
          </div>
          <button onClick={()=>selectTribuna(TRIBUNE[3])} className="absolute left-[10%] right-[10%] bottom-[2%] h-[18%] bg-[#C8102E] rounded-xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-white">
            <div className="font-black text-sm md:text-lg">CURVA SUD GASTON</div>
            <div className="text- opacity-80">20x100 = 2000 posti - 59€</div>
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
         {TRIBUNE.map(t=>{
           const liberi = Math.round((1-occupancyRate)*t.totale);
           return (
            <button key={t.id} onClick={()=>selectTribuna(t)} className="bg-[#f9f9f9] border-2 border-black/10 rounded-xl p-4 hover:border-black transition text-left">
             <div className="flex items-center gap-2"><div className={`w-3 h-8 ${t.colore} rounded-full`}></div><div><div className="font-black text-sm">{t.nome}</div><div className="text- opacity-60">{t.sottotitolo}</div></div></div>
             <div className="mt-3 text-"><span>Liberi {liberi} / {t.totale}</span></div>
             <div className="mt-3 w-full bg-black text-white rounded-full py-2 text- font-black text-center">SCEGLI →</div>
            </button>
           )
         })}
        </div>
      </div>
     </div>
    )}

    {tribunaStep==="chooseSector" && selectedTribuna && (
     <div className="mx-auto max-w-7xl p-6">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.nome} - 20 SETTORI</h2>
      <div className="mt-8 bg-white border border-black/10 rounded-2xl p-6">
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({length:20}).map((_,i)=>{
          const sectorNum = i+1;
          const nome = `${selectedTribuna.short}-${String(sectorNum).padStart(2,"0")}`;
          let occupatiCount = 0;
          for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, selectedTribuna.tribunaNum, sectorNum, s, occupancyRate)) occupatiCount++; }
          const liberi = 100-occupatiCount;
          return (
            <button key={i} onClick={()=>selectSector({id:sectorNum, nome, occupati: occupatiCount, liberi})} className="bg-[#f9f9f9] border-2 border-black/10 rounded-xl p-4 hover:border-[#C8102E] transition text-left">
             <div className="flex justify-between"><span className="font-black text-sm">{nome}</span><span className={`w-3 h-3 rounded-full ${selectedTribuna.colore}`}></span></div>
             <div className="mt-3 text-">Liberi {liberi} / 100 - Occupati {occupatiCount} / 100</div>
             <div className="mt-2 text- font-black text-center bg-black text-white rounded-full py-1">VEDI 100 POSTI →</div>
            </button>
          )
        })}
       </div>
      </div>
     </div>
    )}

    {tribunaStep==="chooseSeat" && selectedTribuna && selectedSector && (
     <div className="mx-auto max-w-6xl p-6">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.nome} - {selectedSector.nome} - 100 POSTI</h2>
      <div className="mt-8 grid grid-cols-12 gap-6">
       <div className="col-span-12 lg:col-span-8 bg-white border border-black/10 rounded-2xl p-6">
        <div className="flex justify-between text- opacity-60 mb-4"><span>⬜ Libero ({selectedSector.liberi})</span><span>🟥 Occupato ({selectedSector.occupati})</span><span>🟩 Selezionato</span></div>
        <div className="space-y-2">
         {Array.from({length:10}).map((_,fila)=>(
           <div key={fila} className="flex items-center gap-2">
            <div className="w-6 text- font-bold opacity-60">F{String.fromCharCode(65+fila)}</div>
            <div className="flex-1 grid grid-cols-10 gap-2">
             {Array.from({length:10}).map((_,col)=>{
               const seatNum = fila*10+col+1;
               const isOccupied = isSeatOccupied(selectedMatch.id, selectedTribuna.tribunaNum, selectedSector.id, seatNum, occupancyRate);
               const isSelected = selectedSeats.includes(seatNum);
               return (
                 <button key={col} disabled={isOccupied} onClick={()=>toggleSeat(seatNum)} className={`h-10 rounded-lg text- font-bold border-2 ${isOccupied? "bg-red-100 border-red-200 text-red-300" : isSelected? "bg-green-500 border-green-600 text-white" : "bg-white border-black/10 hover:border-[#C8102E]"}`}>
                  {seatNum}
                 </button>
               )
             })}
            </div>
           </div>
         ))}
        </div>
        <div className="mt-8 h-12 bg-[#6bb86b] rounded-xl flex items-center justify-center text-white font-black text-xs">CAMPO - {selectedTribuna.nome}</div>
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
        <button disabled={selectedSeats.length===
