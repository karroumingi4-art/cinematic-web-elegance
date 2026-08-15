import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaSlides() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full mt-12">
      <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] rounded- overflow-hidden border border-white/10">
        {slide === 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#080808] p-8 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="bg-white text-black text- font-black px-3 py-1 rounded-full">KIT 2026-27</div>
              <div className="text-white/40 text-">GASTON VILLA</div>
            </div>
            <h2 className="font-black text- leading-[0.85]">LA MAGLIA<br/>PER IL<br/>RITORNO</h2>
          </div>
        )}
        {slide === 1 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#1a0a12] flex items-center justify-center">
            <img src={imageMap["maglia-trasparente"]} className="h-[85%] w-auto object-contain" alt="maglia" />
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 bg-black/70 border border-white/20 rounded-full px-4 py-2 flex items-center gap-3">
              <span className="text- text-white/60">adidas</span>
              <span className="text-[#FFD700] text-">★</span>
              <span className="text- font-black text-white">GASTON</span>
            </div>
          </div>
        )}
        {slide === 2 && (
          <div className="absolute inset-0 bg-[#f5f5f0] text-black p-8 flex gap-8">
            <div className="flex-1">
              <div className="text- font-black opacity-40 mb-6">SCHEDA TECNICA</div>
              <div>Colore: Bordeaux #2B0A14</div>
              <div>Stella: tra logo e sponsor</div>
              <div>Scudetto 2024 ★</div>
            </div>
            <div className="w-[45%] bg-[#2B0A14] rounded-2xl flex items-center justify-center">
              <img src={imageMap["maglia-trasparente"]} className="w-full h-auto -rotate-3" alt="maglia" />
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button onClick={() => setSlide(0)} className={slide===0? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"} />
          <button onClick={() => setSlide(1)} className={slide===1? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"} />
          <button onClick={() => setSlide(2)} className={slide===2? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"} />
        </div>
      </div>
    </div>
  );
}

function PostPage() {
  const { postId } = Route.useParams();
  const post = newsData.find((p: any) => p.id === postId) as any;
  if (!post) return <div className="p-20 text-white">Not found</div>;
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="text-xs opacity-50">← Torna</Link>
      <h1 className="font-black text-4xl mt-6">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full rounded-2xl mt-10 border border-white/10" alt="" />
      <p className="mt-10 text-lg opacity-80 whitespace-pre-wrap">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlides />}
      {post.id === "maglia-ritorno-2026" && (
        <div className="mt-12 bg-white text-black rounded- p-6 flex justify-between items-center">
          <div className="font-black">MAGLIA 2026-27 - 89€</div>
          <Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text-sm">ACQUISTA ORA →</Link>
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
