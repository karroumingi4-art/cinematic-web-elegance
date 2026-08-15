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
      {/* SLIDE CONTAINER */}
      <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] rounded- overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        {/* SLIDE 1 - PRESENTAZIONE */}
        {slide === 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#080808] p-8 flex flex-col justify-between animate-[fadeIn_0.6s]">
            <div className="flex justify-between">
              <div className="bg-white text-black text- font-black px-3 py-1 rounded-full">KIT 2026-27</div>
              <div className="text-white/40 text- tracking-[0.3em]">GASTON VILLA</div>
            </div>
            <div>
              <div className="flex gap-2 mb-4">
                <div className="h-1 w-12 bg-[#5C0A2D]" />
                <div className="h-1 w-12 bg-[#B8E6F0]" />
                <div className="h-1 w-12 bg-[#FFD700]" />
              </div>
              <h2 className="font-black text- md:text- leading-[0.85] tracking-[-0.03em]">LA MAGLIA<br/>PER IL<br/>RITORNO</h2>
              <p className="text-white/50 text-xs mt-4 max-w-">C'è chi vince una volta e si accontenta. Noi abbiamo capito che possiamo farlo ancora.</p>
            </div>
          </div>
        )}

        {/* SLIDE 2 - MAGLIA CON STELLA TRA LOGO E SPONSOR */}
        {slide === 1 && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-[#1a0a12] flex items-center justify-center p-6 animate-[fadeIn_0.6s]">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Maglia */}
              <img src={imageMap["maglia-trasparente"]} className="h-[85%] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]" alt="maglia" />

              {/* Dettaglio ingrandito stella */}
              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-3">
                <span className="text- font-bold text-white/60">adidas</span>
                <span className="text-[#FFD700] text- leading-none drop-shadow-[0_0_10px_#FFD700]">★</span>
                <span className="text- font-black text-white">GASTON</span>
              </div>

              <div className="absolute bottom-6 left-6 bg-[#B8E6F0] text-black text- font-black px-3 py-1.5 rounded-full">
                STELLA TRA LOGO E SPONSOR • COME DA TRADIZIONE
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3 - DETTAGLI */}
        {slide === 2 && (
          <div className="absolute inset-0 bg-[#f5f5f0] text-black p-8 flex gap-8 animate-[fadeIn_0.6s]">
            <div className="flex-1">
              <div className="text- font-black tracking-[0.2em] opacity-40 mb-6">SCHEDA TECNICA 2026-27</div>
              <div className="space-y-4 text-sm leading-tight">
                <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">Colore</span><span className="font-black">Bordeaux #2B0A14</span></div>
                <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">Dettagli</span><span className="font-black">Celeste #B8E6F0</span></div>
                <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">Scudetto</span><span className="font-black flex items-center gap-1">2024 <span className="text-[#FFD700]">★</span></span></div>
                <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">Debutto</span><span className="font-black">Trento, 6 Settembre</span></div>
              </div>
              <div className="mt-8 bg-black text-white rounded-full px-5 py-3 text- font-black inline-block">CON MENO CHIACCHIERE E PIÙ FAME</div>
            </div>
            <div className="w-[45%] bg-gradient-to-br from-[#2B0A14] to-[#5C0A2D] rounded-2xl flex items-center justify-center p-4">
              <img src={imageMap["maglia-trasparente"]} className="w-full h-auto object-contain -rotate-3" />
            </div>
          </div>
        )}

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0][1][2].map(i => (
            <button key={i} onClick={()=>setSlide(i)} className={`h-1.5 rounded-full transition-all ${slide===i? 'w-8 bg-white' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)}}`}</style>
    </div>
  )
}

function PostPage() {
  const { postId } = Route.useParams();
  const post: any = newsData.find((p: any) => p.id === postId);
  if (!post) return <div className="p-20 text-white">Notizia non trovata</div>;
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="text-xs opacity-50 hover:opacity-100">← Torna</Link>
      <div className="text- tracking-widest opacity-40 mt-6">{post.tag}</div>
      <h1 className="font-black text-4xl md:text-6xl mt-2 leading-[0.9]">{post.title}</h1>
      <div className="text-xs opacity-40 mt-3">{post.date}</div>
      <img src={imageMap[post.image]} className="w-full h-auto rounded-2xl mt-10 border border-white/10" />
      <p className="mt-10 text-lg opacity-80 whitespace-pre-wrap leading-relaxed">{post.fullBody}</p>
      {post.gallery?.length > 0 && post.gallery.map((k: string) => (
        <img key={k} src={imageMap[k]} className="w-full h-auto rounded-2xl border border-white/10 mt-6" />
      ))}
      {post.id === "maglia-ritorno-2026" && <MagliaSlides />}
      {post.download && (
        <div className="mt-12 bg-[#111] border border-white/10 rounded-2xl p-6 flex justify-between items-center gap-4">
          <div className="font-black text-sm">{post.download.label}</div>
          <a href={post.download.file} download target="_blank" className="bg-white text-black rounded-full px-6 py-3 font-black text-xs">SCARICA PDF</a>
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
