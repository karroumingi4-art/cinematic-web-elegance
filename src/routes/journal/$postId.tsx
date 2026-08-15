import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaVideo() {
  return (
    <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#5C0A2D] rounded-2xl overflow-hidden border border-white/10 mt-12 group">
      {/* glow celeste */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#B8E6F0]/20 blur-[80px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFD700]/10 blur-[80px] rounded-full" />
      
      {/* maglia fluttuante */}
      <div className="absolute inset-0 flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
        <img 
          src={imageMap["maglia-trasparente"] || imageMap["maglia"]} 
          className="w-[58%] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-contain"
          alt="Maglia Gaston Villa"
        />
      </div>

      {/* stella */}
      <div className="absolute top-[28%] right-[36%] animate-[ping_2s_ease-in-out_infinite]">
        <div className="text-[#FFD700] text-3xl drop-shadow-[0_0_12px_#FFD700]">★</div>
      </div>

      {/* testi */}
      <div className="absolute top-5 left-5 flex gap-2">
        <div className="bg-white text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest">2026-27</div>
        <div className="bg-[#B8E6F0] text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest">BORDEAUX × CELESTE</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex gap-2 mb-3">
          <div className="h-[3px] w-10 bg-[#5C0A2D]" />
          <div className="h-[3px] w-10 bg-[#B8E6F0]" />
          <div className="h-[3px] w-10 bg-[#FFD700]" />
        </div>
        <h3 className="text-white font-black text-[22px] md:text-[32px] leading-[0.9] tracking-tight">
          LA MAGLIA<br/>PER IL RITORNO
        </h3>
        <p className="text-white/50 text-[10px] tracking-[0.2em] mt-2">CON LA STELLA DELLO SCUDETTO 2024 • TRENTO 6 SETTEMBRE</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(-5deg); }
          50% { transform: translateY(-12px) rotateY(5deg); }
        }
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
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
