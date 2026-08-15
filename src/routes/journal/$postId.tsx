import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaSlides() {
  const [slide][setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1)%3), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full mt-12 select-none">
      <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] rounded- overflow-hidden border border-white/10">
        {slide === 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#080808] p-8 flex flex-col justify-between">
            <div className="flex justify-between"><div className="bg-white text-black text- font-black px-3 py-1 rounded-full">KIT 2026-27</div><div className="text-white/40 text- tracking-[0.3em]">GASTON VILLA</div></div>
            <div><div className="flex gap-2 mb-4"><div className="h-1 w-12 bg-[#5C0A2D]" /><div className="h-1 w-12 bg-[#B8E6F0]" /><div className="h-1 w-12 bg-[#FFD700]" /></div><h2 className="font-black text- md:text- leading-[0.85]">LA MAGLIA<br/>PER IL<br/>RITORNO</h2></div>
          </div>
        )}
        {slide === 1 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#1a0a12] flex items-center justify-center p-6">
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={imageMap["maglia-trasparente"]} className="h-[85%] w-auto object-contain" alt="maglia" />
              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-3">
                <span className="text- font-bold text-white/60">adidas</span>
                <span className="text-[#FFD700] text-">★</span>
                <span className="text- font-black text-white">GASTON VILLA</span>
              </div>
            </div>
          </div>
        )}
        {slide === 2 && (
          <div className="absolute inset-0 bg-[#f5f5f0] text-black p-8 flex gap-8">
            <div className="flex-1"><div className="text- font-black tracking-[0.2em] opacity-40 mb-6">SCHEDA TECNICA</div><div className="space-y-4 text-sm"><div className="flex justify-between border-b border-black/10 pb-2"><span>Colore</span><span className="font-black">Bordeaux</span></div><div className="flex justify-between border-b border-black/10 pb-2"><span>Scudetto</span><span className="font-black">2024 ★</span></div></div></div>
            <div className="w-[45%] bg-gradient-to-br from-[#2B0A14] to-[#5C0A2D] rounded-2xl flex items-center justify-center p-4"><img src={imageMap["maglia-trasparente"]} className="w-full h-auto -rotate-3" /></div>
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">{[0][1][2].map(i => (<button key={i} onClick={()=>setSlide(i)} className={`h-1.5 rounded-full transition-all ${slide===i? 'w-8 bg-white' : 'w-1.5 bg-white/30'}`} />))}</div>
      </div>
    </div>
  )
}

function PostPage() {
  const { postId } = Route.useParams();
  const post: any = newsData.find((p: any) => p.id === postId);
  if (!post) return <div className="p-20 text-white">Not found</div>;
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="text-xs opacity-50">← Torna</Link>
      <div className="text- tracking-widest opacity-40 mt-6">{post.tag}</div>
      <h1 className="font-black text-4xl md:text-6xl mt-2 leading-[0.9]">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full h-auto rounded-2xl mt-10 border border-white/10" />
      <p className="mt-10 text-lg opacity-80 whitespace-pre-wrap">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlides />}
      {post.id === "maglia-ritorno-2026"? (
        <div className="mt-12 bg-white text-black rounded- p-6 flex justify-between items-center"><div className="font-black">MAGLIA 2026-27 - 89€</div><Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text-sm">ACQUISTA ORA →</Link></div>
      ) : null}
      <div className="h-20" />
    </div>
  );
}
