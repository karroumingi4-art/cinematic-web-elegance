import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { posts } from "@/components/Journal";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const post: any = newsData.find(p => p.id === postId);
  if (!post) return <div className="p-20">Notizia non trovata</div>;

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="text-xs opacity-50">← Torna</Link>
      <h1 className="font-black text-4xl md:text-6xl mt-10">{post.title}</h1>

      <img src={imageMap[post.image]} className="w-full h-auto rounded-2xl mt-10 border border-white/10" />
      <p className="mt-10 text-lg opacity-80 whitespace-pre-wrap">{post.fullBody}</p>

      {post.gallery && (
        <div className="mt-12">
          {post.gallery.map((k: string) => (
            <img key={k} src={imageMap[k]} className="w-full h-auto rounded-2xl border border-white/10 mt-6" />
          ))}
        </div>
      )}

      {/* QUESTO È IL TASTO SCARICA */}
      {post.download && (
        <div className="mt-12 bg-[#111] border border-white/10 rounded-2xl p-6 flex justify-between items-center">
          <div className="font-black text-sm">{post.download.label}</div>
          <a href={post.download.file} download target="_blank" className="bg-white text-black rounded-full px-6 py-3 font-black text-xs">SCARICA PDF</a>
        </div>
      )}
    </div>
  );
}
