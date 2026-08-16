import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/journal/$postId")({
  component: PostPage,
});

function MagliaSlider7() {
  const [slide][setSlide] = useState(0);
  const [paused][setPaused] = useState(false);

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
            <span className="bg-white text-black text- font-black px-4 py-1.5 rounded-full tracking-widest">KIT 2026-27</span>
            <span className="text-white/30 text- font-bold tracking-[0.2em]">GASTON VILLA</span>
          </div>
          <div className="flex gap-8 items-end">
            <div className="flex-1">
              <h2 className="font-black text- md:text- leading-[0.85] text-[#C8F1F8]">LA MAGLIA<br/>PER IL<br/>RITORNO</h2>
              <p className="text-white/50 text-xs md:text-sm mt-4 max-w- leading-relaxed">C'è chi vince una volta e si accontenta. Noi abbiamo capito che possiamo farlo ancora. E che la prossima volta vogliamo farlo insieme.</p>
              <div className="mt-6 text- text-white/30 tracking-widest">PRESENTAZIONE UFFICIALE STAGIONE 2026-27</div>
            </div>
            <div className="w-[42%] hidden md:flex items-center justify-center">
              <img src="/maglia-gaston-2026.png" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] -rotate-2" alt="maglia" />
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
          <h2 className="font-black text- md:text- leading-[0.9] mb-2">IL NOSTRO ARCO</h2>
          <p className="text-white/60 text-sm mb-8">Due anni fa la gloria. L'anno scorso il peso. Quest'anno la fame.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5"><div className="text-[#7DD3E0] font-black text-2xl">2024</div><div className="font-black mt-2 text-sm">CAMPIONI</div><div className="text- text-white/40 mt-2">Una cavalcata che non dimenticheremo mai. Tutti contro, tutti dentro.</div></div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 opacity-60"><div className="text-white/40 font-black text-2xl">2025</div><div className="font-black mt-2 text-sm">DELUSIONE</div><div className="text- text-white/40 mt-2">Un anno complicato, fuori ai playoff. Fa parte del percorso.</div></div>
            <div className="bg-[#5C0A2D] border border-[#7DD3E0]/30 rounded-2xl p-5"><div className="text-[#FFD700] font-black text-2xl">2026</div><div className="font-black mt-2 text-sm">RITORNO</div><div className="text- text-white/80 mt-2">Non è una rivincita. È la conferma che sappiamo chi siamo.</div></div>
          </div>
        </div>
      )
    },
    {
      bg: "bg-[#f7f3ef]",
      content: (
        <div className="h-full p-8 md:p-10 flex gap-6 text-black">
          <div className="flex-1">
            <div className="text- font-black tracking-widest opacity-40">I NOSTRI COLORI</div>
            <h2 className="font-black text- leading-[0.9] mt-2">BORDEAUX X<br/>CELESTE</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-[#5C0A2D] border border-black/10"></div><div><div className="font-black text-xs">#5C0A2D BORDEAUX</div><div className="text- opacity-60">Eleganza, sangue, appartenenza</div></div></div>
              <div className="flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-[#7DD3E0] border border-black/10"></div><div><div className="font-black text-xs">#7DD3E0 CELESTE</div><div className="text- opacity-60">Cielo, leggerezza, futuro</div></div></div>
            </div>
          </div>
          <div className="w-[48%] bg-[#0a0a0a] rounded- flex items-center justify-center p-6 relative overflow-hidden">
            <img src="/maglia-gaston-2026.png" className="w-full relative z-10" alt="" />
            <div className="absolute bottom-3 left-3 bg-white text-black text- font-black px-2 py-1 rounded-full">STELLA TRA LOGHI</div>
          </div>
        </div>
      )
    },
    {
      bg: "bg-[#0f0a12]",
      content: (
        <div className="h-full p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
          <div className="text-[#FFD700] text- leading-none drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">★</div>
          <h2 className="font-black text- mt-4">LA STELLA</h2>
          <p className="text-white/70 text-sm max-w- mt-3 leading-relaxed">Una stella oro ricamata <b className="text-white">tra il logo adidas e lo stemma Gaston Villa</b> in alto. Non è un ricordo. È una promessa.</p>
          <div className="mt-6 bg-white/5 border border-[#FFD700]/30 rounded-full px-5 py-2 text- tracking-widest">2024 • SCUDETTO • 26 FC 27</div>
          <div className="mt-8 flex gap-3 items-center justify-center"><img src="/maglia-gaston-2026.png" className="h-20 opacity-80" alt="" /><span className="text-[#FFD700]">★</span><div className="w-16 h-16 rounded-full overflow-hidden border border-white/20"><img src="/GASTON_VILLA-logo.png" className="w-full h-full object-cover" alt="" /></div></div>
        </div>
      )
    },
    {
      bg: "bg-[#f5f5f0]",
      content: (
        <div className="h-full p-7 md:p-10 flex gap-6 text-black">
          <div className="flex-1">
            <div className="text- font-black tracking-widest opacity-40">ANATOMIA 2026-27</div>
            <h2 className="font-black text- leading-[0.9] mt-2">LA MAGLIA<br/>DISEGNATA PER<br/>IL RITORNO</h2>
            <div className="mt-6 space-y-3 text-">
              <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">BASE</span><b>#5C0A2D</b></div>
              <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">COLLETTO POLO + BORDO MANICA</span><b>#7DD3E0</b></div>
              <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">STELLA</span><b className="text-[#8a6d00]">ORO TRA ADIDAS E STEMMA</b></div>
              <div className="flex justify-between border-b border-black/10 pb-2"><span className="opacity-50">STEMMA</span><b>GASTON VILLA 26 FC 27</b></div>
            </div>
          </div>
          <div className="w-[48%] bg-[#2B0A14] rounded- flex items-center justify-center p-4">
            <img src="/maglia-gaston-2026.png" className="w-full" alt="maglia anatomia" />
          </div>
        </div>
      )
    },
    {
      bg: "bg-[#0a0a0a]",
      content: (
        <div className="h-full p-8 md:p-12">
          <div className="text- tracking-widest text-white/40 font-black">I DETTAGLI CHE CONTANO</div>
          <h2 className="font-black text- mt-2">PERCHÉ LA INDOSSERAI<br/>OVUNQUE</h2>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10"><div className="text- opacity-40">SPONSOR</div><div className="font-black mt-2">Unieuro</div><div className="text- opacity-60 mt-2">Al centro, discreto. Come deve essere.</div></div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10"><div className="text- opacity-40">TECHNICAL</div><div className="font-black mt-2">adidas</div><div className="text- opacity-60 mt-2">Logo celeste a destra petto</div></div>
            <div className="bg-[#FFD700]/10 rounded-2xl p-5 border border-[#FFD700]/20"><div className="text- text-[#FFD700]">INSERTI</div><div className="font-black mt-2 text-[#FFD700]">ORO</div><div className="text- opacity-60 mt-2">Stella e dettagli stemma</div></div>
          </div>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#2B0A14] to-black",
      content: (
        <div className="h-full p-8 md:p-12 flex flex-col justify-between">
          <div className="text-center">
            <div className="inline-block bg-[#7DD3E0] text-black text- font-black px-4 py-1 rounded-full tracking-widest">TRENTO • 6 SETTEMBRE</div>
            <h2 className="font-black text- md:text- leading-[0.85] mt-6">GASTON VILLA<br/><span className="text-[#7DD3E0]">IL RITORNO</span></h2>
            <p className="text-white/50 text-xs mt-4 tracking-widest">SORTEGGIO GIRONI E ASTA UFFICIALE 2026-27</p>
          </div>
          <div className="flex justify-center gap-4">
            <img src="/maglia-gaston-2026.png" className="h-32 md:h-44 drop-shadow-[0_20px_40px_black]" alt="" />
            <div className="self-end bg-white text-black rounded-2xl p-4 text-left"><div className="font-black text-sm">26 FC 27</div><div className="text- opacity-60">FOR GASTON VILLA THE WIN</div></div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="w-full mt-10 rounded- overflow-hidden border border-white/10 bg-black select-none" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/9] w-full">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide? "opacity-100" : "opacity-0"} ${s.bg}`}>
            {s.content}
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-[#7DD3E0] transition-all duration-300" style={{ width: `${((slide + 1) / 7) * 100}%` }} /></div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`transition-all ${i === slide? "w-8 h-1.5 bg-white rounded-full" : "w-1.5 h-1.5 bg-white/30 rounded-full"}`} />
          ))}
        </div>
        <div className="absolute top-4 right-4 text- bg-black/50 backdrop-blur border border-white/10 rounded-full px-3 py-1">{slide + 1} / 7</div>
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
      <Link to="/" className="text-xs opacity-50 hover:opacity-100">← Torna al Journal</Link>
      <h1 className="font-black text- md:text- mt-6 leading-[0.9] tracking-tight">{post.title}</h1>
      <div className="text- opacity-40 mt-3 tracking-widest">{post.date} • {post.tag}</div>
      <img src={imageMap[post.image]} className="w-full rounded- mt-8 border border-white/10" alt="" />
      <p className="mt-8 text- opacity-80 whitespace-pre-wrap leading-[1.7]">{post.fullBody}</p>

      {post.id === "maglia-ritorno-2026" && <MagliaSlider7 />}

      {post.id === "maglia-ritorno-2026"? (
        <div className="mt-10 bg-white text-black rounded- p-6 md:p-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-black text-">MAGLIA UFFICIALE 2026-27</div>
            <div className="text- opacity-60 mt-1">Bordeaux #5C0A2D x Celeste #7DD3E0 • Stella oro tra adidas e stemma • 89€</div>
          </div>
          <Link to="/shop" className="bg-black text-white rounded-full px-8 py-4 font-black text- hover:bg-zinc-900 transition-colors whitespace-nowrap">
            ACQUISTA LA MAGLIA → 89€
          </Link>
        </div>
      ) : post.download? (
        <div className="mt-10 bg-[#111] border border-white/10 rounded-2xl p-6 flex justify-between items-center">
          <div className="font-black text-sm">{post.download.label}</div>
          <a href={post.download.file} download className="bg-white text-black rounded-full px-6 py-3 font-black text-xs">SCARICA PDF</a>
        </div>
      ) : null}

      <div className="h-24" />
    </div>
  );
}
