import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
export const Route = createFileRoute("/journal/archivio")({ component: ArchivioPage });
const posts = (newsData as any[]).map((n: any) => ({ ...n, src: imageMap[n.image] }));
function parseDate(d: string){ const [day, month, year] = d.split(".").map(Number); return new Date(year, month-1, day); }
function ArchivioPage() {
  const archived = posts.filter((p: any) => (new Date().getTime() - parseDate(p.date).getTime()) / (1000*60*60*24) > 7);
  return <div className="min-h-screen bg-black text-white p-10"><h1 className="text-4xl">Archivio</h1><div className="mt-10 grid gap-4">{archived.map((p:any)=><Link key={p.id} to="/journal/$postId" params={{postId:p.id}} className="block border border-white/10 p-4 rounded-xl">{p.title} - {p.date}</Link>)}</div></div>;
}
