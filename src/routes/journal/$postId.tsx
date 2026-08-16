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
    const id = setInterval(() => setSlide((s) => (s + 1) % slidesData.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="w-full mt-10 rounded- overflow-hidden border border-white/10 bg-black select-none" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/9] w-full">
        {(slidesData as any[]).map((s: any, i: number) => {
          const imgs = s.immagini || (s.immagine? [s.immagine] : []);
          const isActive = i === slide;
          return (
            <div
              key={s.id || i}
              className={`absolute inset-0 transition-opacity duration-700 ${isActive? "opacity-100" : "opacity-0"} overflow-hidden`}
              style={{
                backgroundColor: s.bgColor || s.bg || "#1a0a0f",
                backgroundImage: s.bgImage? `url(${s.bgImage})` : s.bg?.startsWith("linear")? s.bg : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="h-full w-full p-8 md:p-12 flex flex-col justify-between relative">
                <div className="flex justify-between items-center z-10">
                  <span
                    style={{
                      fontFamily: s.styles?.sottotitolo?.font || "Inter",
                      fontSize: `${s.styles?.sottotitolo?.size || 10}px`,
                      backgroundColor: s.subColor || "#7DD3E0",
                    }}
                    className="font-black tracking-[0.2em] px-4 py-1.5 rounded-full text-black uppercase"
                  >
                    {s.sottotitolo}
                  </span>
                  <span className="text-white/30 text-">26 FC 27</span>
                </div>

                <div className="flex-1 flex items-center gap-8 mt-6 relative">
                  <div className="flex-1 z-10 max-w-[55%]">
                    <h2
                      style={{
                        fontFamily: s.styles?.titolo?.font || "Anton",
                        fontSize: `${s.styles?.titolo?.size || 52}px`,
                        color: s.textColor || "#fff",
                      }}
                      className="font-black leading-[0.85] whitespace-pre-wrap uppercase"
                    >
                      {s.titolo}
                    </h2>
                    <p
                      style={{
                        fontFamily: s.styles?.testo?.font || "Inter",
                        fontSize: `${s.styles?.testo?.size || 14}px`,
                        color: s.textColor || "#fff",
                      }}
                      className="opacity-70 mt-4 whitespace-pre-wrap leading-relaxed"
                    >
                      {s.testo}
                    </p>
                  </div>

                  <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[48%] h-[85%] pointer-events-none">
                    {imgs.map((img: string, idxImg: number) => (
                      <img
                        key={idxImg}
                        src={img}
                        style={{
                          left: `calc(50% + ${s.posizioni?.[idxImg]?.x || 0}px)`,
                          top: `calc(50% + ${s.posizioni?.[idxImg]?.y || 0}px)`,
                          transform: `translate(-50%,-50%) scale(${s.posizioni?.[idxImg]?.scale || 1})`,
                        }}
                        className="absolute w- max-w-full object-contain drop-shadow-[0_20px_50px_black]"
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div className="h-full bg-[#7DD3E0] transition-all duration-300" style={{ width: `${((slide + 1) / slidesData.length) * 100}%` }} />
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {(slidesData as any[]).map((_: any, i: number) => (
            <button key={i} onClick={() => setSlide(i)} className={`transition-all ${i === slide? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostPage() {
  const { postId } = Route.useParams();
  const post = (newsData as any[]).find((p: any) => p.id === postId) as any;
  if (!post) return <div className="p-20 text-white">Not found</div>;
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 px-6 max-w-5xl mx-auto">
      <Link to="/" className="text-xs opacity-50">← Torna</Link>
      <h1 className="font-black text-4xl md:text-6xl mt-6 leading-[0.9]">{post.title}</h1>
      <img src={imageMap[post.image]} className="w-full rounded- mt-8 border border-white/10 object-cover" alt="" />
      <p className="mt-8 text- opacity-80 whitespace-pre-wrap leading-[1.7]">{post.fullBody}</p>
      {post.id === "maglia-ritorno-2026" && <MagliaSlider7 />}
      <div className="h-24" />
    </div>
  );
}
