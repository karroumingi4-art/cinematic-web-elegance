import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import slidesData from "@/data/slides-ritorno.json";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaSlider7() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slidesData.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="w-full mt-10 rounded- overflow-hidden border border-white/10 bg-black select-none" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/9] w-full">
        {slidesData.map((s: any, i: number) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === slide? "opacity-100" : "opacity-0"} overflow-hidden`} style={{ background: s.bg.startsWith("linear")? undefined : s.bg, backgroundImage: s.bg.startsWith("linear")? s.bg : undefined }}>
            <div className="h-full w-full p-8 md:p-12 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text- font-black tracking-[0.2em] px-4 py-1.5 rounded-full bg-white text-black">{s.sottotitolo}</span>
                <span className="text-white/30 text-">26 FC 27</span>
              </div>
              <div className="flex-1 flex items-center gap-8 mt-6">
                <div className="flex-1">
                  <h2 className="font-black text- md:text- leading-[0.85] whitespace-pre-wrap text-white">{s.titolo}</h2>
                  <p className="text-white/60 text- mt-4 max-w- whitespace-pre-wrap leading-relaxed">{s.testo}</p>
                  {s.timeline && (
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {s.timeline.map((t: any) => (
                        <div key={t.anno} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <div className="text-[#7DD3E0] font-black">{t.anno}</div>
                          <div className="font-black text-xs mt-1">{t.titolo}</div>
                          <div className="text- opacity-50 mt-1">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.highlight && <div className="mt-4 bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700] text- font-black tracking-widest px-4 py-2 rounded-full inline-block">{s.highlight}</div>}
                </div>
                {s.immagine && <div className="w-[40%] hidden md:flex items-center justify-center"><img src={s.immagine} className="w-full drop-shadow-[0_20px_40px_black] -rotate-2" alt="" /></div>}
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-[#7DD3E0] transition-all duration-300" style={{ width: `${((slide + 1) / slidesData.length) * 100}%` }} /></div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slidesData.map((_: any, i: number) => <button key={i} onClick={() => setSlide(i)} className={`transition-all ${i === slide? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"}`} />)}
        </div>
        <div className="absolute top-4 right-4 text- bg-black/60 border border-white/10 rounded-full px-3 py-1">{slide + 1} / {slidesData.length}</div>
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
      <h1 className="font-black text- md:text- mt-6 leading-[0.9]">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full rounded- mt-8 border border-white/10" alt="" />
      <p className="mt-8 text- opacity-80 whitespace-pre-wrap leading-[1.7]">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlider7 />}
      {post.id === "maglia-ritorno-2026" && (
        <div className="mt-10 bg-white text-black rounded- p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div><div className="font-black text-">MAGLIA UFFICIALE 2026-27 - 89€</div><div className="text- opacity-60">Bordeaux #5C0A2D x Celeste #7DD3E0 • Stella oro tra adidas e stemma</div></div>
          <Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text-">ACQUISTA LA MAGLIA → 89€</Link>
        </div>
      )}
      <div className="h-24" />
    </div>
  );
}
