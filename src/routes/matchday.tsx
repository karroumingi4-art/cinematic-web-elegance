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
  { id: "rossa", nome: "TRIBUNA ONORE ROSSA", short: "ROSSA", sottotitolo: "Nord - Centrale - Vista Perfetta", prezzoBase: 134, colore: "from-[#8B0000] to-[#C8102E]", coloreSolid: "bg-[#8B0000]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 1, icon: "👑", vista: "Vista 10/10" },
  { id: "arancio", nome: "TRIBUNA ARANCIO", short: "ARANCIO", sottotitolo: "Est - Laterale", prezzoBase: 104, colore: "from-[#FF6B00] to-[#FF8C00]", coloreSolid: "bg-[#FF8C00]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 2, icon: "🌅", vista: "Vista 9/10" },
  { id: "blu", nome: "TRIBUNA BLU", short: "BLU", sottotitolo: "Ovest - Famiglie", prezzoBase: 79, colore: "from-[#1E3A8A] to-[#3B82F6]", coloreSolid: "bg-[#1E40AF]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 3, icon: "👨‍👩‍👧‍👦", vista: "Vista 8.5/10" },
  { id: "curva", nome: "CURVA SUD GASTON", short: "CURVA SUD", sottotitolo: "Sud - Tifosi", prezzoBase: 59, colore: "from-[#C8102E] to-[#FF1744]", coloreSolid: "bg-[#C8102E]", settori: 20, postiPerSettore: 100, totale: 2000, tribunaNum: 4, icon: "🔥", vista: "Vista 8/10" },
];

function getOccupancyRate(fullDate: string): number {
  const now = new Date().getTime();
  const target = new Date(fullDate).getTime();
  const diffDays = (target - now) / (1000*60*60*24);
  if (diffDays < 0) return 0.95;
  const maxDays = 180;
  const clampedDays = Math.min(diffDays, maxDays);
  return Math.min(0.90, Math.max(0.10, 0.15 + 0.70 * (1 - clampedDays / maxDays)));
}
function isSeatOccupied(matchId: number, tribunaNum: number, sectorNum: number, seatNum: number, occupancyRate: number): boolean {
  const seed = (matchId * 100000 + tribunaNum * 10000 + sectorNum * 100 + seatNum) * 9301;
  const pseudo = (seed * 49297) % 233280;
  return (pseudo % 100) / 100 < occupancyRate;
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
 const occupancyRate = useMemo(()=> getOccupancyRate(selectedMatch.fullDate), [selectedMatch]);

 useEffect(()=>{
   const interval = setInterval(()=>{
     const target = new Date(selectedMatch.fullDate).getTime();
     const now = new Date().getTime();
     const diff = target - now;
     if(diff>0){
       setTimer({ g: Math.floor(diff / (1000*60*60*24)), h: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)), m: Math.floor((diff % (1000*60*60)) / (1000*60)), s: Math.floor((diff % (1000*60)) / 1000), })
     }
   },1000);
   return ()=>clearInterval(interval);
 },[selectedMatch]);

 function openMatch(m:any){ setSelectedMatch(m); setView("detail"); }
 function openTickets(){ setView("tickets"); setTribunaStep("stadiumOverview"); setSelectedTribuna(null); setSelectedSector(null); setSelectedSeats([]); }
 function selectTribuna(t:any){ setSelectedTribuna(t); setTribunaStep("chooseSector"); }
 function selectSectorDirect(tribuna:any, sectorNum:number){
   setSelectedTribuna(tribuna);
   let occupatiCount = 0;
   for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, tribuna.tribunaNum, sectorNum, s, occupancyRate)) occupatiCount++; }
   setSelectedSector({id:sectorNum, nome:`${tribuna.short}-${String(sectorNum).padStart(2,"0")}`, occupati: occupatiCount, liberi: 100-occupatiCount});
   setTribunaStep("chooseSeat");
   setSelectedSeats([]);
 }
 function selectSector(sec:any){ setSelectedSector(sec); setTribunaStep("chooseSeat"); setSelectedSeats([]); }
 function toggleSeat(n:number){ setSelectedSeats(prev => prev.includes(n)? prev.filter(x=>x!==n) : [...prev, n].slice(0,8)); }

 async function handlePay(){
  if(!form.nome||!form.email) return alert("Inserisci nome ed email");
  if(selectedSeats.length===0) return alert("Scegli almeno un posto");
  setLoading(true);
  const code=`GV-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  setTicketCode(code);
  try{ await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({ partita:`${selectedMatch.home} vs ${selectedMatch.away}`, tribuna: selectedTribuna.nome, settore: selectedSector.nome, posti: selectedSeats.join(", "), totale: selectedTribuna.prezzoBase*selectedSeats.length, codice: code, nome: form.nome, email: form.email })});}catch(e){console.log(e);}
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
     <h1 className="text-5xl font-black tracking-tight">35 GIORNATE - YOUNG GIRLS & BLUE LOCK - 43.000 POSTI</h1>
     <p className="opacity-60 mt-2">Stadio intero con 4 tribune divise in 20 rettangoli - Occupazione graduale fissa</p>
     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MATCHES.map(m=>{
        const occ = getOccupancyRate(m.fullDate);
        return (
         <button key={m.id} onClick={()=>openMatch(m)} className="text-left bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/30 transition">
          <div className="flex justify-between items-center"><span className="text- tracking-widest opacity-60 font-bold">{m.competition}</span><span className="text- bg-white/10 rounded-full px-2 py-1">{Math.round(occ*100)}% occ.</span></div>
          <div className="mt-4 flex items-center gap-2"><img src={getLogo(m.home)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" /><span className="text- font-black">{m.home}</span><span className="text-[#C8102E] mx-1 text-xs">vs</span><span className="text- font-black">{m.away}</span><img src={getLogo(m.away)} className="h-8 w-8 rounded-full bg-white object-contain p-1" alt="" /></div>
          <div className="mt-3 flex items-center gap-3"><div className="bg-white text-black rounded-lg px-3 py-1.5 text-center"><div className="text- font-bold">{m.date.split(" ")[1]}</div><div className="text-lg font-black leading-none">{m.date.split(" ")[0]}</div></div><div><div className="text-sm font-bold">{m.day} {m.date} {m.time}</div><div className="text-xs opacity-60">{Math.round((1-occ)*100)}% liberi - graduale</div></div></div>
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
   <div className="min-h-screen bg-[#fafafa] text-black">
    <div className="bg-white border-b border-black/10"><div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2"><button onClick={()=>setView("calendar")} className="flex items-center gap-2 text-sm"><span className="text-[#C8102E]">◀</span> Torna a 35 giornate</button><div className="mx-auto text- tracking-widest opacity-60 font-bold">{selectedMatch.home.toUpperCase()} VS {selectedMatch.away.toUpperCase()} - {Math.round(occupancyRate*100)}% OCCUPATI</div><img src="/GASTON_VILLA-removebg-preview.png" className="h-6 w-6 object-contain" alt="" /></div></div>
    <div className="bg-gradient-to-b from-white to-[#f5f5f5] py-12 text-center">
     <div className="flex items-center justify-center gap-6 flex-wrap"><div className="flex items-center gap-3"><span className="text-3xl font-black">{selectedMatch.home.toUpperCase()}</span><img src={getLogo(selectedMatch.home)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1 shadow" alt="" /></div><span className="text-2xl font-black">VS</span><div className="flex items-center gap-3"><img src={getLogo(selectedMatch.away)} className="h-16 w-16 rounded-full bg-white border-2 border-black/10 object-contain p-1 shadow" alt="" /><span className="text-3xl font-black">{selectedMatch.away.toUpperCase()}</span></div></div>
     <div className="mt-6"><p className="text- tracking-widest opacity-60">CALCIO D'INIZIO - {selectedMatch.competition}</p><p className="text-xl font-black text-[#C8102E] mt-1">{selectedMatch.day} {selectedMatch.date} {selectedMatch.time} - 43.000 POSTI - {Math.round((1-occupancyRate)*100)}% LIBERI</p></div>
     <div className="mt-6"><div className="flex justify-center gap-6 mt-3"><div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.g}</div><div className="text- opacity-60">giorni</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black">{timer.h}</div><div className="text- opacity-60">ore</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black text-[#C8102E]">{timer.m}</div><div className="text- opacity-60">min</div></div><div>:</div><div className="text-center"><div className="text-3xl font-black">{timer.s}</div><div className="text- opacity-60">sec</div></div></div></div>
    </div>
    <div className="mx-auto max-w-7xl px-4 py-12">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      <div className="bg-white border border-black/10 rounded-2xl overflow-hidden flex flex-col shadow-sm">
       <div className="p-5 bg-gradient-to-r from-[#C8102E] to-[#8B0000] text-white"><h3 className="font-black text-xl">BIGLIETTI STANDARD</h3><p className="text-xs opacity-80 mt-1">Stadio intero → 4 tribune divise in 20 rettangoli → 100 posti</p><div className="mt-3 flex gap-2">{TRIBUNE.map(t=>(<div key={t.id} className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.colore} border-2 border-white/30 flex items-center justify-center text-`}>{t.icon}</div>))}</div></div>
       <div className="h- bg-black relative overflow-hidden"><img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600" className="w-full h-full object-cover opacity-80" alt="" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div><div className="absolute bottom-3 left-3 right-3"><div className="grid grid-cols-4 gap-1">{TRIBUNE.map(t=>(<div key={t.id} className={`h-6 rounded bg-gradient-to-r ${t.colore} flex items-center justify-center text- font-black text-white`}>{t.short}</div>))}</div><div className="mt-2 text- text-white bg-black/60 rounded-full px-2 py-1 inline-block">{Math.round(occupancyRate*100)}% occupati - 20 rettangoli x tribuna</div></div></div>
       <div className="p-5 flex-1 flex flex-col"><div className="space-y-2 text- flex-1"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-">1</span> Vedi stadio intero con 4 tribune divise in 20 rettangoli</div><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-">2</span> Clicca un rettangolo → 100 posti fissi</div><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-">3</span> Scegli i posti - occupazione graduale fissa</div></div><button onClick={openTickets} className="mt-5 w-full bg-[#C8102E] text-white py-4 rounded-full text-xs font-black">VEDI STADIO INTERO - 4 TRIBUNE - 20 RETTANGOLI</button></div>
      </div>
      <div className="bg-white border-2 border-[#c9a86a]/30 rounded-2xl overflow-hidden flex flex-col shadow-sm">
       <div className="p-5 bg-gradient-to-r from-[#c9a86a] to-[#8B7355] text-white"><div className="flex justify-between items-start"><div><h3 className="font-black text-xl">VIP HOSPITALITY</h3><p className="text-xs opacity-90 mt-1">Tribuna Rossa Centrale - Lusso Totale</p></div><div className="bg-white text-[#c9a86a] font-black text-xl px-3 py-1 rounded-full">199€</div></div></div>
       <div className="h- bg-black relative"><img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600" className="w-full h-full object-cover" alt="" /><div className="absolute top-2 right-2 bg-[#c9a86a] text-white text- font-black px-2 py-1 rounded-full">BEST SELLER</div></div>
       <div className="p-5 flex-1 flex flex-col"><div className="space-y-2.5 text- flex-1"><div className="font-bold text- tracking-widest opacity-60">INCLUSO NEL VIP - DETTAGLIO COMPLETO:</div><div className="flex gap-2"><span>👑</span><span><b>Posto Premium</b> - Tribuna Rossa fila 1-5, cuscino in pelle, vista centrocampo</span></div><div className="flex gap-2"><span>🍽️</span><span><b>Lounge VIP</b> - Accesso 2h prima e 1h dopo, buffet gourmet chef stellato</span></div><div className="flex gap-2"><span>🥂</span><span><b>Open Bar</b> - Champagne, vini pregiati, cocktail illimitati</span></div><div className="flex gap-2"><span>🅿️</span><span><b>Parcheggio Riservato</b> - Posto auto coperto a 50m ingresso VIP</span></div><div className="flex gap-2"><span>🎁</span><span><b>Kit Ospitalità</b> - Sciarpa, programma, gadget 43.000 posti</span></div><div className="flex gap-2"><span>🚪</span><span><b>Fast Track</b> - Ingresso prioritario no coda, hostess dedicata</span></div><div className="flex gap-2"><span>📶</span><span><b>WiFi Premium</b> + TV replay, statistiche live</span></div><div className="flex gap-2"><span>🤝</span><span><b>Meet & Greet</b> - Foto con ex giocatori a fine partita</span></div></div><button onClick={openTickets} className="mt-5 w-full bg-[#c9a86a] text-white py-4 rounded-full text-xs font-black">VIP HOSPITALITY - 199€ - TUTTO INCLUSO</button></div>
      </div>
      <div className="bg-[#0a0a0a] text-white border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-sm">
       <div className="p-5 bg-gradient-to-r from-black to-[#222]"><div className="flex justify-between items-start"><div><h3 className="font-black text-xl text-[#c9a86a]">BUSINESS LOUNGE</h3><p className="text-xs opacity-60 mt-1">Sky Box Privato - Aziende</p></div><div className="bg-[#c9a86a] text-black font-black text-xl px-3 py-1 rounded-full">349€</div></div></div>
       <div className="h- bg-black relative"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" className="w-full h-full object-cover opacity-80" alt="" /><div className="absolute top-2 right-2 bg-black text-white text- font-black px-2 py-1 rounded-full border border-[#c9a86a]">BUSINESS</div></div>
       <div className="p-5 flex-1 flex flex-col"><div className="space-y-2.5 text- flex-1"><div className="font-bold text- tracking-widest opacity-50">BUSINESS - DETTAGLIO COMPLETO:</div><div className="flex gap-2"><span>🏢</span><span><b>Sky Box Privato</b> - Box vetrato 8-12 posti, climatizzato, privacy</span></div><div className="flex gap-2"><span>🍱</span><span><b>Catering Aziendale</b> - Menu 3 portate, vini, open bar premium</span></div><div className="flex gap-2"><span>🧾</span><span><b>Fattura Detraibile</b> - Fattura immediata, 100% detraibile</span></div><div className="flex gap-2"><span>👤</span><span><b>Account Manager</b> - Assistente dedicato</span></div><div className="flex gap-2"><span>📺</span><span><b>Business Service</b> - 2 schermi 65" diretta, WiFi 1Gbps</span></div><div className="flex gap-2"><span>🤝</span><span><b>Networking</b> - Accesso Business Club, area CEO</span></div><div className="flex gap-2"><span>🅿️</span><span><b>Valet Parking</b> - 2 posti VIP + valet</span></div><div className="flex gap-2"><span>📸</span><span><b>Branding</b> - Logo su maxischermo, foto ufficiale</span></div></div><button onClick={openTickets} className="mt-5 w-full bg-white text-black py-4 rounded-full text-xs font-black">BUSINESS LOUNGE - 349€ - TUTTO BUSINESS</button></div>
      </div>
     </div>
    </div>
   </div>
  )
 }

 if(view==="tickets"){
  return(
   <div className="min-h-screen bg-[#f5f5f5] text-black">
    <div className="bg-white border-b border-black/10 sticky top-0 z-20"><div className="mx-auto max-w- px-4 py-3 flex items-center justify-between"><button onClick={()=>{if(tribunaStep==="stadiumOverview") setView("detail"); else if(tribunaStep==="chooseSector") setTribunaStep("stadiumOverview"); else setTribunaStep("chooseSector");}} className="flex items-center gap-2 text-sm font-bold"><span className="text-[#C8102E]">◀</span> {tribunaStep==="stadiumOverview"? "Torna a dettaglio" : tribunaStep==="chooseSector"? "Torna a stadio intero - 4 tribune - 20 rettangoli" : "Torna a 20 rettangoli"}</button><div className="text-center flex items-center gap-2"><img src={getLogo(selectedMatch.home)} className="h-6 w-6 rounded-full shadow" alt=""/><span className="font-black text-sm">{selectedMatch.home} vs {selectedMatch.away}</span><img src={getLogo(selectedMatch.away)} className="h-6 w-6 rounded-full shadow" alt=""/><span className="text- opacity-60 ml-2">- {tribunaStep==="stadiumOverview"? `STADIO INTERO - 4 TRIBUNE DIVISE IN 20 RETTANGOLI - ${Math.round(occupancyRate*100)}% OCC` : `${selectedTribuna?.nome} - ${selectedSector?.nome || "20 RETTANGOLI"}`}</span></div><div className="text- bg-black text-white rounded-full px-3 py-1">{Math.round((1-occupancyRate)*100)}% LIBERI</div></div></div>
    {tribunaStep==="stadiumOverview" && (
     <div className="mx-auto max-w- p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl font-black text-center tracking-tight">GASTON VILLA PARK - STADIO INTERO - 4 TRIBUNE DIVISE IN 20 RETTANGOLI</h2>
      <p className="text-center opacity-60 mt-2">Ogni tribuna è divisa in 20 rettangoli diversi - Clicca un rettangolo per vedere i 100 posti - Occupazione fissa graduale {selectedMatch.date} = {Math.round(occupancyRate*100)}% occupati</p>
      <div className="mt-8 bg-white border border-black/10 rounded- p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="relative w-full aspect-[1.7/1] bg-gradient-to-br from-[#e8f5e8] to-[#c8e6c9] rounded- overflow-hidden border-2 border-black/5">
          <div className="absolute left-[14%] right-[14%] top-[1%] h-[22%]">
            <div className="h-full bg-white border-2 border-[#8B0000] rounded-xl p-1 shadow flex flex-col">
              <div className="flex items-center justify-between px-2 pb-1"><span className="text- font-black text-[#8B0000]">TRIBUNA ROSSA NORD - 20 RETTANGOLI - 134€ - {Math.round((1-occupancyRate)*100)}% liberi</span><span className="text- bg-[#8B0000] text-white px-2 py-0.5 rounded-full">👑 Vista 10/10</span></div>
              <div className="flex-1 grid grid-cols-10 grid-rows-2 gap-">
                {Array.from({length:20}).map((_,i)=>{
                  const sectorNum = i+1;
                  let occCount = 0; for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, 1, sectorNum, s, occupancyRate)) occCount++; }
                  const liberi = 100-occCount;
                  return (
                    <button key={i} onClick={()=>selectSectorDirect(TRIBUNE[0], sectorNum)} className={`rounded- border text- font-black flex flex-col items-center justify-center hover:scale-110 hover:z-10 hover:shadow-lg transition-all ${liberi<20? "bg-red-100 border-red-300 text-red-700" : liberi<50? "bg-orange-100 border-orange-300 text-orange-700" : "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"}`}>
                      <span>R-{String(sectorNum).padStart(2,"0")}</span><span className="text-">{liberi} lib</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute right-[0.5%] top-[25%] bottom-[25%] w-[12%]">
            <div className="h-full bg-white border-2 border-[#FF8C00] rounded-xl p-1 shadow flex flex-col">
              <div className="text- font-black text-[#FF8C00] text-center leading-none pb-1">ARANCIO<br/>EST<br/>20 RETT<br/>104€</div>
              <div className="flex-1 grid grid-rows-10 grid-cols-2 gap-">
                {Array.from({length:20}).map((_,i)=>{
                  const sectorNum = i+1;
                  let occCount = 0; for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, 2, sectorNum, s, occupancyRate)) occCount++; }
                  const liberi = 100-occCount;
                  return (
                    <button key={i} onClick={()=>selectSectorDirect(TRIBUNE[1], sectorNum)} className={`rounded- border text- font-black flex items-center justify-center hover:scale-110 hover:z-10 transition-all ${liberi<20? "bg-red-100 border-red-300 text-red-700" : "bg-green-50 border-green-300 text-green-700"}`}>
                      {sectorNum}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute left-[0.5%] top-[25%] bottom-[25%] w-[12%]">
            <div className="h-full bg-white border-2 border-[#1E40AF] rounded-xl p-1 shadow flex flex-col">
              <div className="text- font-black text-[#1E40AF] text-center leading-none pb-1">BLU<br/>OVEST<br/>20 RETT<br/>79€</div>
              <div className="flex-1 grid grid-rows-10 grid-cols-2 gap-">
                {Array.from({length:20}).map((_,i)=>{
                  const sectorNum = i+1;
                  let occCount = 0; for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, 3, sectorNum, s, occupancyRate)) occCount++; }
                  const liberi = 100-occCount;
                  return (
                    <button key={i} onClick={()=>selectSectorDirect(TRIBUNE[2], sectorNum)} className={`rounded- border text- font-black flex items-center justify-center hover:scale-110 hover:z-10 transition-all ${liberi<20? "bg-red-100 border-red-300 text-red-700" : "bg-green-50 border-green-300 text-green-700"}`}>
                      {sectorNum}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute left-[15%] right-[15%] top-[26%] bottom-[26%] bg-gradient-to-br from-[#7CB87C] to-[#4CAF50] border-2 border-white rounded-xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
            <div className="w-full h-full relative border border-white/60 m-2 rounded-lg flex items-center justify-center">
              <div className="absolute w- h-full bg-white/80"></div>
              <div className="w-20 h-20 border-2 border-white/80 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>
              <div className="absolute left-0 w-12 h-24 border-2 border-white/60 border-l-0"></div>
              <div className="absolute right-0 w-12 h-24 border-2 border-white/60 border-r-0"></div>
              <div className="absolute bg-black/70 text-white font-black text- tracking-widest px-3 py-1.5 rounded-full shadow">CAMPO - {selectedMatch.competition} - 43.000 POSTI - {Math.round(occupancyRate*100)}% OCCUPATI</div>
            </div>
          </div>
          <div className="absolute left-[14%] right-[14%] bottom-[1%] h-[22%]">
            <div className="h-full bg-white border-2 border-[#C8102E] rounded-xl p-1 shadow flex flex-col">
              <div className="flex items-center justify-between px-2 pb-1"><span className="text- font-black text-[#C8102E]">CURVA SUD GASTON - 20 RETTANGOLI - 59€ - {Math.round((1-occupancyRate)*100)}% liberi</span><span className="text- bg-[#C8102E] text-white px-2 py-0.5 rounded-full">🔥 Tifosi</span></div>
              <div className="flex-1 grid grid-cols-10 grid-rows-2 gap-">
                {Array.from({length:20}).map((_,i)=>{
                  const sectorNum = i+1;
                  let occCount = 0; for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, 4, sectorNum, s, occupancyRate)) occCount++; }
                  const liberi = 100-occCount;
                  return (
                    <button key={i} onClick={()=>selectSectorDirect(TRIBUNE[3], sectorNum)} className={`rounded- border text- font-black flex flex-col items-center justify-center hover:scale-110 hover:z-10 hover:shadow-lg transition-all ${liberi<20? "bg-red-100 border-red-300 text-red-700" : liberi<50? "bg-orange-100 border-orange-300 text-orange-700" : "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"}`}>
                      <span>C-{String(sectorNum).padStart(2,"0")}</span><span className="text-">{liberi} lib</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
         {TRIBUNE.map(t=>{
           const liberi = Math.round((1-occupancyRate)*t.totale);
           const occ = Math.round(occupancyRate*100);
           return (
            <div key={t.id} className="bg-[#fcfcfc] border-2 border-black/5 rounded- p-4">
             <div className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.colore} shadow flex items-center justify-center text-white text-`}>{t.icon}</div><div><div className="font-black text-">{t.nome}</div><div className="text- opacity-60">{t.sottotitolo} - 20 rettangoli x 100 posti</div></div></div>
             <div className="mt-3"><div className="flex justify-between text- mb-1"><span>Occupati {occ}%</span><span className="font-bold text-green-600">Liberi {liberi}</span></div><div className="h-2 bg-black/5 rounded-full overflow-hidden flex"><div className="h-full bg-red-400" style={{width:`${occ}%`}}></div><div className="h-full bg-green-400" style={{width:`${100-occ}%`}}></div></div></div>
             <div className="mt-3 grid grid-cols-10 gap-">{Array.from({length:20}).map((_,i)=>(<div key={i} className={`h-1.5 rounded-full bg-gradient-to-r ${t.colore} opacity-60`}></div>))}</div>
             <div className="mt-3 w-full bg-black text-white rounded-full py-2 text- font-black text-center">{t.short} - {t.prezzoBase}€ - 20 RETTANGOLI</div>
            </div>
           )
         })}
        </div>
        <div className="mt-6 text-center text- opacity-60">Ogni tribuna ha 20 rettangoli diversi - Clicca direttamente un rettangolo per vedere i suoi 100 posti - Occupazione fissa graduale non cambia al refresh</div>
      </div>
     </div>
    )}
    {tribunaStep==="chooseSector" && selectedTribuna && (
     <div className="mx-auto max-w-7xl p-4 md:p-6">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.icon} {selectedTribuna.nome} - 20 RETTANGOLI DIVERSI</h2>
      <p className="text-center opacity-60 mt-2">{selectedTribuna.nome} divisa in 20 rettangoli diversi da 100 posti - Occupazione fissa {Math.round(occupancyRate*100)}% - Graduale {selectedMatch.date}</p>
      <div className="mt-8 bg-white border border-black/10 rounded- p-6 shadow-sm">
       <div className={`h-16 bg-gradient-to-r ${selectedTribuna.colore} rounded-2xl mb-6 flex items-center justify-center text-white font-black text-sm shadow`}>CAMPO - VISTA DA {selectedTribuna.nome} - 20 RETTANGOLI - {Math.round(occupancyRate*100)}% OCCUPATI</div>
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({length:20}).map((_,i)=>{
          const sectorNum = i+1;
          const nome = `${selectedTribuna.short}-${String(sectorNum).padStart(2,"0")}`;
          let occupatiCount = 0;
          for(let s=1;s<=100;s++){ if(isSeatOccupied(selectedMatch.id, selectedTribuna.tribunaNum, sectorNum, s, occupancyRate)) occupatiCount++; }
          const liberi = 100-occupatiCount;
          return (
            <button key={i} onClick={()=>selectSector({id:sectorNum, nome, occupati: occupatiCount, liberi})} className="group bg-white border-2 border-black/10 rounded-2xl p-4 hover:border-[#C8102E] hover:shadow-lg hover:-translate-y-0.5 transition-all text-left">
             <div className="flex justify-between items-start"><span className="font-black text-sm">{nome}</span><span className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedTribuna.colore} flex items-center justify-center text-white text-`}>{selectedTribuna.icon}</span></div>
             <div className="mt-3 h-1.5 bg-black/5 rounded-full overflow-hidden flex"><div className="h-full bg-red-400" style={{width:`${occupatiCount}%`}}></div><div className="h-full bg-green-400" style={{width:`${liberi}%`}}></div></div>
             <div className="mt-2 text-"><div className="flex justify-between"><span className="opacity-60">Rettangolo</span><span className="font-bold">{sectorNum}/20 diverso</span></div><div className="flex justify-between"><span className="text-green-600 font-bold">{liberi} liberi</span><span className="text-red-600">{occupatiCount} occupati</span></div><div className="text- opacity-60 mt-1">100 posti fissi - {selectedTribuna.prezzoBase}€ - Non cambia</div></div>
             <div className="mt-3 text- font-black text-center bg-black text-white rounded-full py-2 group-hover:bg-[#C8102E] transition">VEDI 100 POSTI →</div>
            </button>
          )
        })}
       </div>
       <button onClick={()=>setTribunaStep("stadiumOverview")} className="mt-6 mx-auto block bg-black/5 px-6 py-2 rounded-full text-xs font-bold">← TORNA A STADIO INTERO - 4 TRIBUNE - 20 RETTANGOLI DIVERSI</button>
      </div>
     </div>
    )}
    {tribunaStep==="chooseSeat" && selectedTribuna && selectedSector && (
     <div className="mx-auto max-w-6xl p-4 md:p-6">
      <h2 className="text-3xl font-black text-center">{selectedTribuna.icon} {selectedTribuna.nome} - {selectedSector.nome} - 100 POSTI - RETTANGOLO {selectedSector.id}/20</h2>
      <p className="text-center opacity-60 mt-2">Rettangolo diverso {selectedSector.id} su 20 - Occupazione fissa {Math.round(occupancyRate*100)}% - Non cambia - Max 8 posti</p>
      <div className="mt-8 grid grid-cols-12 gap-6">
       <div className="col-span-12 lg:col-span-8 bg-white border border-black/10 rounded- p-6 shadow-sm">
        <div className="flex justify-between text- opacity-60 mb-4"><span>⬜ Libero ({selectedSector.liberi})</span><span>🟥 Occupato ({selectedSector.occupati}) fisso graduale</span><span>🟩 Selezionato</span><span>Rettangolo {selectedSector.id}/20 diverso</span></div>
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
                 <button key={col} disabled={isOccupied} onClick={()=>toggleSeat(seatNum)} className={`h-11 rounded-xl text- font-bold border-2 transition-all ${isOccupied? "bg-red-50 border-red-200 text-red-300 cursor-not-allowed" : isSelected? "bg-green-500 border-green-600 text-white scale-110 shadow-[0_4px_12px_rgba(34,197,94,0.4)]" : "bg-white border-black/10 hover:border-[#C8102E] hover:shadow-md hover:-translate-y-0.5"}`}>
                  {seatNum}
                 </button>
               )
             })}
            </div>
           </div>
         ))}
        </div>
        <div className={`mt-8 h-14 bg-gradient-to-r ${selectedTribuna.colore} rounded-2xl flex items-center justify-center text-white font-black text-xs shadow`}>CAMPO - VISTA DA {selectedTribuna.nome} {selectedSector.nome} - RETTANGOLO {selectedSector.id}/20 DIVERSO - {selectedTribuna.vista}</div>
       </div>
       <div className="col-span-12 lg:col-span-4 bg-white border border-black/10 rounded- p-6 h-fit sticky top-20 shadow-sm">
        <h3 className="font-black flex items-center gap-2">{selectedTribuna.icon} RIEPILOGO - 20 RETTANGOLI DIVERSI</h3>
        <div className="mt-4 space-y-3 text-sm">
         <div className="flex justify-between"><span className="opacity-60">Partita</span><span className="font-bold text-xs">{selectedMatch.home} vs {selectedMatch.away} - G{selectedMatch.id}</span></div>
         <div className="flex justify-between"><span className="opacity-60">Tribuna</span><span className="font-bold">{selectedTribuna.nome} - 20 rettangoli diversi</span></div>
         <div className="flex justify-between"><span className="opacity-60">Rettangolo</span><span className="font-bold">{selectedSector.nome} - {selectedSector.id}/20 diverso - {selectedSector.liberi} liberi fissi</span></div>
         <div className="flex justify-between"><span className="opacity-60">Posti scelti</span><span className="font-bold">{selectedSeats.length>0? selectedSeats.join(", ") : "Nessuno"}</span></div>
         <div className="border-t border-black/10 pt-3 mt-3 flex justify-between font-black text-lg"><span>Totale</span><span className="text-[#C8102E]">{selectedTribuna.prezzoBase*selectedSeats.length}€</span></div>
         <div className="text- opacity-60 mt-2">Ogni tribuna ha 20 rettangoli diversi - Occupazione fissa graduale: più vicina = meno liberi - Non cambia al refresh.</div>
        </div>
        <button disabled={selectedSeats.length===0} onClick={()=>setShowPay(true)} className="mt-6 w-full bg-[#C8102E] disabled:bg-black/20 text-white py-4 rounded-full font-black text-xs tracking-widest shadow hover:shadow-lg transition">ACQUISTA {selectedSeats.length>0? `${selectedSeats.length} POSTI` : "SELEZIONA POSTI"}</button>
        <button onClick={()=>setTribunaStep("chooseSector")} className="mt-3 w-full bg-black/5 py-3 rounded-full font-bold text-xs">CAMBIA RETTANGOLO - 20 DIVERSI</button>
        <button onClick={()=>setTribunaStep("stadiumOverview")} className="mt-2 w-full bg-black/5 py-3 rounded-full font-bold text-xs">TORNA A STADIO INTERO - 4 TRIBUNE - 20 RETTANGOLI</button>
       </div>
      </div>
     </div>
    )}
    {showPay&&(<div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded- p-6 w-full max-w-md shadow-2xl"><h3 className="font-black text-xl">PAGAMENTO - {selectedTribuna.nome} - {selectedSector.nome}</h3><p className="text-xs opacity-60 mt-1">Rettangolo diverso {selectedSector.id}/20 - Posti {selectedSeats.join(", ")} - {selectedTribuna.prezzoBase}€ x {selectedSeats.length} = {selectedTribuna.prezzoBase*selectedSeats.length}€ - Fisso graduale</p><div className="mt-4 space-y-3"><input placeholder="Nome e Cognome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/><input placeholder="Carta 4242 4242 4242 4242" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} className="w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-4 py-3 text-sm"/></div><div className="flex gap-3 mt-6"><button onClick={()=>setShowPay(false)} className="flex-1 bg-black/10 rounded-full py-3 text-xs font-bold">ANNULLA</button><button onClick={handlePay} disabled={loading} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 text-xs font-black">{loading?"ELABORO...":`PAGA ${selectedTribuna.prezzoBase*selectedSeats.length}€`}</button></div></div></div>)}
    {showTicket&&(<div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"><div className="bg-white rounded- p-6 w-full max-w-lg text-center shadow-2xl"><div className="text-5xl">🎟️</div><h3 className="text-2xl font-black mt-4">BIGLIETTI CONFERMATI - 20 RETTANGOLI DIVERSI</h3><p className="text-sm opacity-60 mt-2">{selectedMatch.home} vs {selectedMatch.away} - {selectedTribuna.nome} {selectedSector.nome} - Rettangolo {selectedSector.id}/20 diverso - Posti {selectedSeats.join(", ")} - {Math.round(occupancyRate*100)}% occupati</p><div className="mt-4 bg-[#f5f5f5] rounded-xl p-4 font-mono text-sm font-bold">{ticketCode}</div><canvas ref={canvasRef} className="hidden"></canvas><div className="flex gap-3 mt-6"><button onClick={downloadTicket} className="flex-1 bg-[#C8102E] text-white rounded-full py-3 font-black text-xs">SCARICA PNG</button><button onClick={()=>{setShowTicket(false); setView("calendar"); setTribunaStep("stadiumOverview"); setSelectedSeats([]);}} className="flex-1 bg-black/10 rounded-full py-3 font-bold text-xs">TORNA A 35 GIORNATE</button></div></div></div>)}
   </div>
  )
 }
 return null;
}
