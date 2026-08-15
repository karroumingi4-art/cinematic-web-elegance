import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { Link } from "@tanstack/react-router";
import n1 from "@/assets/news-1.jpg";
import n2 from "@/assets/gaston-villa-maglia (2).jpg";
import n3 from "@/assets/news-3.jpg";

// --- UTILITY ARCHIVIO AUTOMATICO ---
function parseDate(d: string) {
  const [day, month, year] = d.split(".").map(Number);
  return new Date(year, month - 1, day);
}
function isArchived(dateStr: string) {
  const newsDate = parseDate(dateStr);
  const today = new Date();
  const diff = (today.getTime() - newsDate.getTime()) / (1000*60*60*24);
  return diff > 7; // dopo 7 giorni va in archivio
}

export const posts = [
  {
    id: "giovani-prima-squadra",
    src: n1,
    tag: "Accademia",
    date: "06.09.2026", // >7 giorni fa = va in archivio da solo
    title: "4 giovani in prima squadra, l'idea di Gastone",
    body: "Come il gruppo di giovani si approccia con i senatori del Team.",
    fullBody: "...",
  },
  {
    id: "maglia-ritorno-2026",
    src: n2,
    tag: "Kit 2026-2027",
    date: "05.05.2026",
    title: "LA Maglia per il ritorno",
    body: "C'è chi vince una volta e si accontenta...",
    fullBody: "...",
  },
  {
    id: "nuovo-centro-preparativo",
    src: n3,
    tag: "Club",
    date: "06.08.2026",
    title: "Dentro al nuovo centro preparativo",
    body: "dieci mila metri quadrati per ritornare in forma.",
    fullBody: "...",
  },
];

export function Journal() {
  const freshPosts = posts.filter(p => !isArchived(p.date));
  const countArchivio = posts.filter(p => isArchived(p.date)).length;

  return (
    <section id="journal" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Journal" title={<>Le Ultime da <span className="text-[#95BFE5]">Trento</span></>} />
          <div className="flex gap-4">
            <Link to="/journal/archivio" className="link-underline inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/60">
              Archivio ({countArchivio}) <ArrowUpRight className="size-4" />
            </Link>
            <a href="#contact" className="link-underline inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary">
              Tutte le Storie <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {freshPosts.map((post, i) => (
            <Reveal key={post.id} delay={0.09 * i}>
              <motion.article whileHover={{ y: -10 }} className="group h-full">
                <Link to="/journal/$postId" params={{ postId: post.id }} className="block">
                  <div className="overflow-hidden rounded-lg"><img src={post.src} className="aspect-4/3 w-full object-cover group-hover:scale-107 transition-transform duration-[1.2s]" /></div>
                  <div className="mt-6 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                    <span className="text-primary">{post.tag}</span><span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="display mt-4 text-2xl group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {freshPosts.length === 0 && <div className="mt-10 text-white/40">Nessuna news fresca questa settimana. Guarda in archivio.</div>}
      </div>
    </section>
  );
}
