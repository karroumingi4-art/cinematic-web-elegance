import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";

export const Route = createFileRoute("/journal/archivio")({
  component: ArchivioPage,
});

const posts = newsData.map((n: any) => ({ ...n, src: imageMap[n.image] }));

function parseDate(d: string) {
  const [day, month, year] = d.split(".").map(Number);
  return new Date(year, month - 1, day);
}

function ArchivioPage() {
  const archived = posts.filter((p: any) => {
    const diff = (new Date().getTime() - parseDate(p.date).getTime()) / (1000*60*60*24);
    return diff > 7;
  });

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <h1 className="display text-5xl">Archivio <span className="text-[#95BFE5]">Storie</span></h1>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {archived.map((p: any) => (
            <Link key={p.id} to="/journal/$postId" params={{ postId: p.id }} className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:bg-white/[0.08] transition">
              <div className="text-[0.6rem] uppercase tracking-widest text-white/40">{p.tag} • {p.date}</div>
              <div className="mt-3 font-bold">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
