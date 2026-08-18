import { useState, useEffect } from "react";
import { Gavel, Users, Archive, Trophy } from "lucide-react";

const FORMSPREE_VOTI = "https://formspree.io/f/mnpaobkr";
const FORMSPREE_PROPOSTE = "https://formspree.io/f/maewldgr";

type Caso = {
  id: string;
  titolo: string;
  imgs?: string[];
  opzioni: string[];
  voti: Record<string, number>;
  createdAt: number;
};

const CASI_INIZIALI: Caso[] = [
  {
    id: "24-07",
    titolo: "Terza maglia 24/25: ORO PURO o NERO OPACO?",
    imgs: ["/hero-tunnel-oro.jpg"],
    opzioni: ["ORO PURO", "NERO OPACO"],
    voti: { "ORO PURO": 1847, "NERO OPACO": 693 },
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

function generaVoti(opzioni: string[]) {
  const v: Record<string, number> = {};
  opzioni.forEach(o => v[o] = Math.floor(Math.random()*1800)+800);
  return v;
}

export function TribunaleTifoso() {
  const [casi, setCasi] = useState<Caso[]>(CASI_INIZIALI);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [showArchivio, setShowArchivio] = useState(false);
  const [form, setForm] = useState({ titolo: "", opzioni: "", nome: "", email: "" });
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  useEffect(() => {
    const s = localStorage.getItem("gv-tribunale-v2");
    const v = localStorage.getItem("gv-tribunale-voted");
    if (s) setCasi(JSON.parse(s));
    if (v) setVotedIds(JSON.parse(v));
  }, []);
  useEffect(() => { localStorage.setItem("gv-tribunale-v2", JSON.stringify(casi)); }, [casi]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0,2);
    Promise.all(files.map(f => new Promise<string>((res)=>{
      const r = new FileReader(); r.onload=()=>res(r.result as string); r.readAsDataURL(f);
    }))).then(setPreviewImgs);
  };

  const handleVote = (id: string, op: string) => {
    if (votedIds.includes(id)) return;
    const nuovi = casi.map(c => c.id!==id? c : {...c, voti: {...c.voti, [op]: c.voti[op]+1}});
    setCasi(nuovi);
    const nv = [...votedIds, id]; setVotedIds(nv);
    localStorage.setItem("gv-tribunale-voted", JSON.stringify(nv));
    fetch(FORMSPREE_VOTI, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ caso:id, voto:op })});
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const opzioni = form.opzioni.split(",").map(s=>s.trim().toUpperCase()).filter(Boolean).slice(0,4);
    if(opzioni.length<2) return alert("Min 2 opzioni");

    const nuovo: Caso = {
      id: Date.now().toString(),
      titolo: form.titolo,
      imgs: previewImgs,
      opzioni,
      voti: generaVoti(opzioni),
      createdAt: Date.now(),
    };
    setCasi([nuovo,...casi]);

    const fd = new FormData(e.currentTarget);
    fetch(FORMSPREE_PROPOSTE, { method:"POST", body: fd });

    setForm({ titolo:"", opzioni:"", nome:"", email:"" });
    setPreviewImgs([]);
    (e.target as HTMLFormElement).reset();
  };

  const getTotale = (v: Record<string,number>) => Object.values(v).reduce((a,b)=>a+b,0);
  const attivi = casi.slice(0,2);
  const archivio = casi.slice(2);

  return (
    <section id="tribunale" className="bg-[#080600] py-24 border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[#d6b45a] text-[0.7rem] tracking-[0.25em] uppercase flex gap-2 items-center"><Gavel className="size-4"/> TRIBUNALE DEL TIFOSO</p>
        <h2 className="display text-white text-[clamp(2rem,6vw,4rem)] mt-4">La voce del <span className="text-[#d6b45a]">popolo.</span></h2>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {attivi.map(c=>{
            const tot = getTotale(c.voti);
            return(
              <div key={c.id} className="rounded- border border-white/10 bg-white/[0.03] p-7">
                {c.imgs && c.imgs.length>0 && (
                  <div className={`grid gap-2 mb-6 ${c.imgs.length>1? "grid-cols-2":"grid-cols-1"}`}>
                    {c.imgs.map((src,i)=><img key={i} src={src} className="h-40 w-full object-cover rounded-xl" alt=""/>)}
                  </div>
                )}
                <h3 className="text-white font-bold text-xl">{c.titolo}</h3>
                <div className="mt-6 space-y-3">
                  {c.opzioni.map(op=>{
                    const perc = Math.round((c.voti[op]/tot)*100);
                    return <div key={op}><div className="flex justify-between text-[0.7rem] text-white/60 mb-1"><span>{op}</span><span>{c.voti[op]} · {perc}%</span></div><div className="h-2 bg-white/10 rounded-full"><div className="h-full bg-[#d6b45a]" style={{width:`${perc}%`}}/></div></div>
                  })}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {c.opzioni.map(op=>(
                    <button key={op} disabled={votedIds.includes(c.id)} onClick={()=>handleVote(c.id,op)} className={`rounded-full py-3 text-[0.75rem] font-bold uppercase ${votedIds.includes(c.id)?"bg-white/10 text-white/30":"bg-white text-black hover:bg-[#d6b45a]"}`}>{votedIds.includes(c.id)?"Votato ✓":`Vota ${op}`}</button>
                  ))}
                </div>
                <div className="mt-3 text-[0.7rem] text-white/30 flex gap-2 items-center"><Users className="size-3.5"/> {tot.toLocaleString()} votanti</div>
              </div>
            )
          })}
        </div>

        <button onClick={()=>setShowArchivio(!showArchivio)} className="mt-12 mx-auto flex gap-2 rounded-full border border-white/20 px-6 py-3 text-[0.75rem] uppercase text-white"><Archive className="size-4"/>{showArchivio? "Chiudi":"Archivio"} ({archivio.length})</button>
        {showArchivio && <div className="mt-8 grid md:grid-cols-3 gap-4">{archivio.map(c=><div key={c.id} className="rounded-2xl border border-white/10 p-5"><div className="grid grid-cols-2 gap-2 mb-3">{c.imgs?.map((s,i)=><img key={i} src={s} className="h-20 object-cover rounded-lg"/>)}</div><h4 className="text-white text-sm font-bold">{c.titolo}</h4><p className="text-[0.65rem] text-[#d6b45a] mt-1 flex gap-1"><Trophy className="size-3"/> {Object.entries(c.voti).sort((a,b)=>b[1]-a[1])[0][0]}</p></div>)}</div>}

        <form onSubmit={handleAdd} encType="multipart/form-data" className="mt-20 rounded- border border-[#d6b45a]/20 p-8 bg-[#d6b45a]/5">
          <h3 className="text-white text-2xl font-bold">Proponi un caso con 2 immagini</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input name="nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} required placeholder="Nome" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm"/>
            <input name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required type="email" placeholder="Email" className="rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm"/>
          </div>
          <input name="titolo" value={form.titolo} onChange={e=>setForm({...form,titolo:e.target.value})} required placeholder="Titolo caso" className="mt-4 w-full rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm"/>
          <input name="opzioni" value={form.opzioni} onChange={e=>setForm({...form,opzioni:e.target.value})} required placeholder="Opzioni separate da virgola: ORO, NERO" className="mt-4 w-full rounded-full bg-black/40 border border-white/10 px-6 py-3 text-white text-sm"/>
          <div className="mt-4">
            <label className="text-[0.7rem] uppercase tracking-widest text-white/50">Carica 2 immagini</label>
            <input name="immagini" type="file" accept="image/*" multiple required onChange={handleFiles} className="mt-2 w-full text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-black"/>
          </div>
          {previewImgs.length>0 && (
            <div className="mt-4 grid grid-cols-
