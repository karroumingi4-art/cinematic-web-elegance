import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaSlider7() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 7), 3500);
    return () => clearInterval(id);
  }, [paused]);

  const slides = [
    {
      bg: "bg-gradient-to-br from-[#1a0a12] via-[#2B0A14] to-black",
      content: (
        <div className="h-full p-8 md:p-12 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="bg-white text-black text- font-black px-4 py-1.5 rounded-full">KIT 2026-27</span>
            <span className="text-white/30 text- font-bold tracking-[0.2em]">GASTON VILLA</span>
          </div>
          <div className="flex gap-8 items-end">
            <div className="flex-1">
              <h2 className="font-black text- md:text- leading-[0.85] text-[#C8F1F8]">LA MAGLIA<br/>PER IL<br/>RITORNO</h2>
              <p className="text-white/50 text-xs md:text-sm mt-4 max-w-">C'è chi vince una volta e si accontenta. Noi abbiamo capito che possiamo farlo ancora.</p>
            </div>
            <div className="w-[42%] hidden md:flex items-center justify-center">
              <img src="/maglia-gaston-2026.png" className="w-full -rotate-2" alt="maglia" />
            </div>
          </div>
        </div>
      )
    },
    {
      bg: "bg-[#0c1812]",
      content: (
        <div className="h-full p-8 md:p-12">
          <div className="text- font-black tracking-[0.3em] text-[#7DD3E0] mb-2">2024 - 2025 - 2026</div>
          <h2 className="font-black text- md:text- leading-[0.9]">IL NOSTRO ARCO</h2>
          <p className="text-white/60 text-sm mb-6">Due anni fa la gloria. L'anno scorso il peso. Quest'anno la fame.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5"><div className="text-[#7DD3E0] font-black text-xl">2024</div><div className="font-black mt-2 text-sm">CAMPIONI</div></div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 opacity-60"><div className="text-white/40 font-black text-xl">2025</div><div className="font-black mt-2 text-sm">DELUSIONE</div></div>
            <div className="bg-[#5C0A2D] rounded-2xl p-5"><div className="text-[#FFD700] font-black text-xl">2026</div><div className="font-black mt-2 text-sm">RITORNO</div></div>
          </div>
        </div>
      )
    },
    { bg: "bg-[#f7f3ef]", content: <div className="h-full p-10 flex gap-6 text-black"><div className="flex-1"><h2 className="font-black text- leading-[0.9]">BORDEAUX X CELESTE</h2><div className="mt-6">#5C0A2D + #7DD3E0</div></div><div className="w-[48%] bg-black rounded- flex items-center justify-center p-6"><img src="/maglia-gaston-2026.png" className="w-full" alt="" /></div></div> },
    { bg: "bg-[#0f0a12]", content: <div className="h-full p-12 flex flex-col items-center justify-center text-center"><div className="text-[#FFD700] text-">★</div><h2 className="font-black text- mt-4">LA STELLA</h2><p className="text-white/70 text-sm mt-3">Oro ricamata tra adidas e stemma Gaston Villa</p><img src="/maglia-gaston-2026.png" className="h-20 mt-6" alt="" /></div> },
    { bg: "bg-[#f5f5f0]", content: <div className="h-full p-10 flex gap-6 text-black"><div className="flex-1"><h2 className="font-black text-">ANATOMIA 2026-27</h2><div className="mt-4 text-xs space-y-2"><div>BASE #5C0A2D</div><div>COLLETTO #7DD3E0</div><div><b>STELLA ORO TRA ADIDAS E STEMMA</b></div></div></div><div className="w-[48%] bg-[#2B0A14] rounded- p-4 flex items-center justify-center"><img src="/maglia-gaston-2026.png" className="w-full" alt="" /></div></div> },
    { bg: "bg-[#0a0a0a]", content: <div className="h-full p-12"><h2 className="font-black text-">I DETTAGLI CHE CONTANO</h2><div className="grid grid-cols-3 gap-4 mt-8"><div className="bg-white/5 rounded-2xl p-5 border border-white/10">Unieuro</div><div className="bg-white/5 rounded-2xl p-5 border border-white/10">adidas celeste</div><div className="bg-[#FFD700]/10 rounded-2xl p-5">Oro</div></div></div> },
    { bg: "bg-gradient-to-br from-[#2B0A14] to-black", content: <div className="h-full p-12 flex flex-col justify-between text-center"><div><div className="bg-[#7DD3E0] text-black text- font-black px-4 py-1 rounded-full inline-block">TRENTO 6 SETTEMBRE</div><h2 className="font-black text- leading-[0.85] mt-6">GASTON VILLA<br/><span className="text-[#7DD3E0]">IL RITORNO</span></h2></div><div className="flex justify-center"><img src="/maglia-gaston-2026.png" className="h-40" alt="" /></div></div> },
  ];

  return (
    <div className="w-full mt-10 rounded- overflow-hidden border border-white/10 bg-black" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/9] w-full">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide? "opacity-100" : "opacity-0"} ${s.bg}`}>{s.content}</div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-[#7DD3E0] transition-all" style={{ width: `${((slide + 1) / 7) * 100}%` }} /></div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => <button key={i} onClick={() => setSlide(i)} className={i === slide? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"} />)}
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
      <h1 className="font-black text- md:text- mt-6 leading-[0.9]">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full rounded- mt-8 border border-white/10" alt="" />
      <p className="mt-8 text- opacity-80 whitespace-pre-wrap leading-[1.7]">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlider7 />}
      {post.id === "maglia-ritorno-2026" && (
        <div className="mt-10 bg-white text-black rounded- p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div><div className="font-black text-">MAGLIA UFFICIALE 2026-27 - 89€</div><div className="text- opacity-60">Bordeaux x Celeste • Stella oro tra adidas e stemma</div></div>
          <Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text-">ACQUISTA LA MAGLIA → 89€</Link>
        </div>
      )}
      <div className="h-24" />
    </div>
  );
}
