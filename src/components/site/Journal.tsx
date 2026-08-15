import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";

// --- LOGICA ARCHIVIO AUTOMATICO ---
function parseDate(d: string) {
  const [day, month, year] = d.split(".").map(Number);
  return new Date(year, month - 1, day);
}
function isArchived(dateStr: string) {
  const diff = (new Date().getTime() - parseDate(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  return diff > 7; // dopo 7 giorni va in archivio
}

export const posts = newsData.map((n: any) => ({
  ...n,
  src: imageMap[n.image],
}));

export function Journal() {
  const freshPosts = posts.filter((p) => !isArchived(p.date));
  const countArchivio = posts.filter((p) => isArchived(p.date)).length;

  return (
    <section id="journal" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Journal"
            title={
              <>
                Le Ultime da <span className="text-[#95BFE5]">Trento</span>
              </>
            }
          />
          <div className="flex items-center gap-6">
            <Reveal delay={0.2}>
              <Link
                to="/journal/archivio"
                className="link-underline inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition"
              >
                Archivio ({countArchivio}) <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                to="/journal/archivio"
                className="link-underline inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary"
              >
                Tutte le Storie <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {freshPosts.map((post, i) => (
            <Reveal key={post.id} delay={0.09 * i}>
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <Link to="/journal/$postId" params={{ postId: post.id }} className="block">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={post.src}
                      alt={post.title}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                    <span className="text-primary">{post.tag}</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="display mt-4 text-2xl transition-colors duration-500 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {freshPosts.length === 0 && (
          <div className="mt-16 text-center text-white/30 text-sm">
            Nessuna news fresca questa settimana. Tutte in archivio.
          </div>
        )}
      </div>
    </section>
  );
}
