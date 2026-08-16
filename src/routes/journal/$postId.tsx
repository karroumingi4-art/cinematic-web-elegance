import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import slidesData from "@/data/slides-ritorno.json";
import { useState, useEffect } from "react";


export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});


function MagliaSlider7() {
  const [slide][setSlide] = useState(0);
  const [paused][setPaused] = useState(false);


  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slidesData.length), 3500);
    return () => clearInterval(id);
  }, [paused]);


  return (
    <div className="w-full mt-10 rounded-[28px] overflow-hidden border border-white/10 bg-black" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/9] w-full">
        {slidesData.map((s:any, i:number) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === slide? "opacity-100" : "opacity-0"} flex items-center justify-center p-12`} style={{ background: s.bg }}>
            <div className="text-center">
              <div className="text-[10px] tracking-[0.3em] text-[#7DD3E0] font-black">{s.sottotitolo}</div>
              <h2 className="font-black text-[42px] leading-[0.9] mt-3 whitespace-pre-wrap">{s.titolo}</h2>
              <p className="text-white/60 text-sm mt-4 max-w-[400px] mx-auto">{s.testo}</p>
              {s.immagine && <img src={s.immagine} className="h-32 mx-auto mt-6" alt="" />}
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-[#7DD3E0] transition-all" style={{ width: `${((slide + 1) / slidesData.length) * 100}%` }} /></div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slidesData.map((_:any, i:number) => <button key={i} onClick={() => setSlide(i)} className={i === slide? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"} />)}
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
      <h1 className="font-black text-[40px] mt-6 leading-[0.9]">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full rounded-[24px] mt-8 border border-white/10" alt="" />
      <p className="mt-8 text-[17px] opacity-80 whitespace-pre-wrap leading-[1.7]">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlider7 />}
      {post.id === "maglia-ritorno-2026" && (
        <div className="mt-10 bg-white text-black rounded-[24px] p-6 flex justify-between items-center">
          <div className="font-black">MAGLIA UFFICIALE 2026-27 - 89€</div>
          <Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text-[13px]">ACQUISTA LA MAGLIA →</Link>
        </div>
      )}
      <div className="h-24" />
    </div>
  );
}
