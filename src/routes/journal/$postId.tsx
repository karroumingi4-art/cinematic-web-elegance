import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";


export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});


function MagliaVideo() {
  return (
    <div className="relative w-full aspect-video bg-[#1a0a12] rounded-2xl overflow-hidden border border-white/10 mt-12">
      <img src={imageMap["maglia"]} className="absolute inset-0 w-full h-full object-contain p-8 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a12] via-transparent to-transparent" />
      <div className="absolute top-6 left-6 bg-[#B8E6F0] text-black text-[10px] font-black px-3 py-1 rounded-full">GASTON VILLA 2026-27</div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-white font-black text-2xl md:text-4xl leading-none">LA MAGLIA PER IL RITORNO</div>
        <div className="flex gap-2 mt-3">
          <div className="h-1 w-12 bg-[#7A1B2F]" />
          <div className="h-1 w-12 bg-[#B8E6F0]" />
          <div className="h-1 w-12 bg-[#FFD700]" />
        </div>
        <div className="mt-2 text-[11px] tracking-[0.2em] opacity-60">BORDEAUX • CELESTE • STELLA • RITORNO</div>
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2">
        <div className="text-[#FFD700] text-4xl animate-pulse">★</div>
        <div className="text-[9px] text-[#FFD700] font-black mt-1">SCUDETTO<br/>2024</div>
      </div>
    </div>
  );
}


function PostPage() {
  const { postId } = Route.useParams();
  const post: any = newsData.find((p: any) => p.id === postId);
  if (!post) return <div className="p-20 text-white">Notizia non trovata</div>;


  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="text-xs opacity-50 hover:opacity-100">← Torna</Link>
      <div className="text-[10px] tracking-widest opacity-40 mt-6">{post.tag}</div>
      <h1 className="font-black text-4xl md:text-6xl mt-2 leading-[0.9]">{post.title}</h1>
      <div className="text-xs opacity-40 mt-3">{post.date}</div>


      <img src={imageMap[post.image]} className="w-full h-auto rounded-2xl mt-10 border border-white/10" />
      <p className="mt-10 text-lg opacity-80 whitespace-pre-wrap leading-relaxed">{post.fullBody}</p>


      {post.gallery && post.gallery.length > 0 && (
        <div className="mt-12">
          {post.gallery.map((k: string) => (
            <img key={k} src={imageMap[k]} className="w-full h-auto rounded-2xl border border-white/10 mt-6" />
          ))}
        </div>
      )}


      {post.id === "maglia-ritorno-2026" && <MagliaVideo />}


      {post.download && (
        <div className="mt-12 bg-[#111] border border-white/10 rounded-2xl p-6 flex justify-between items-center gap-4">
          <div className="font-black text-sm">{post.download.label}</div>
          <a href={post.download.file} download target="_blank" className="bg-white text-black rounded-full px-6 py-3 font-black text-xs shrink-0">SCARICA PDF</a>
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
