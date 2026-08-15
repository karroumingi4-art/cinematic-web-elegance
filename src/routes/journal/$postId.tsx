import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/journal/$postId")({
  component: JournalPost,
});

const posts = newsData.map((n: any) => ({
  ...n,
  src: imageMap[n.image],
}));

function JournalPost() {
  const { postId } = Route.useParams();
  const index = posts.findIndex((p: any) => p.id === postId);
  const post = posts[index];

  if (!post) return <div className="min-h-screen bg-ink text-white p-20">Articolo non trovato: {postId}</div>;

  const nextPost = posts[(index + 1) % posts.length];
  const prevPost = posts[(index - 1 + posts.length) % posts.length];

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-24">
        <Link to="/" hash="journal" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-primary">
          <ArrowLeft className="size-4" /> Torna al Journal
        </Link>

        <div className="mt-10 flex gap-3 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
          <span className="bg-white text-black px-3 py-1 rounded-full">{post.tag}</span>
          <span className="text-white/40 pt-1">{post.date}</span>
        </div>

        <h1 className="display mt-6 text-4xl sm:text-6xl leading-[0.9]">{post.title}</h1>
        <img src={post.src} className="mt-10 w-full rounded-2xl aspect-16/10 object-cover border border-white/10" />
        <p className="mt-10 text-[1.1rem] leading-[1.8] text-white/70">{post.fullBody}</p>
        <p className="mt-6 text-[1.1rem] leading-[1.8] text-white/70">{post.body}</p>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-10">
          <Link to="/journal/$postId" params={{ postId: prevPost.id }} className="group rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:bg-white/[0.08] transition">
            <div className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Precedente</div>
            <div className="mt-2 font-bold group-hover:text-[#95BFE5]">{prevPost.title}</div>
          </Link>
          <Link to="/journal/$postId" params={{ postId: nextPost.id }} className="group rounded-2xl bg-[#95BFE5] text-black p-6 hover:bg-white transition">
            <div className="text-[0.6rem] uppercase tracking-[0.2em] opacity-60">Prossimo articolo</div>
            <div className="mt-2 font-bold flex items-center gap-2">
              {nextPost.title} <ArrowUpRight className="size-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
