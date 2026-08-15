import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/journal/archivio")({ component: ArchivioPage });
const posts = (newsData as any[]).map((n: any) => ({...n, src: imageMap[n.image] }));
function parseDate(d: string){ const [day, month, year] = d.split(".").map(Number); return new Date(year, month-1, day); }

function ArchivioPage(){
  const archived = posts.filter((p:any)=> (new Date().getTime() - parseDate(p.date).getTime())/(1000*60*60*24) > 7 );
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Link to="/" hash="journal" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#95BFE5]"><ArrowLeft className="size-4"/> Home</Link>
        <h1 className="display mt-10 text-5xl">Archivio <span className="text-[#95BFE5]">Storie</span> ({archived.length})</h1>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {archived.map((p:any)=>(
            <Link key={p.id} to="/journal/$postId" params={{postId:p.id}} className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden hover:bg-white/[0.08] transition">
              <img src={p.src} className="aspect-4/3 w-full object-cover group-hover:scale-105 transition duration-700"/>
              <div className="p-6"><div className="text-[0.6rem] uppercase text-white/40">{p.tag} • {p.date}</div><div className="mt-2 font-bold">{p.title}</div></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
