import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { Link } from "@tanstack/react-router"; // <--- aggiungi questo
import n1 from "@/assets/news-1.jpg";
import n2 from "@/assets/gaston-villa-maglia (2).jpg";
import n3 from "@/assets/news-3.jpg";

export const posts = [
  {
    id: "giovani-prima-squadra", // <--- id per la rotta
    src: n1,
    tag: "Accademia",
    date: "06.09.2026",
    title: "4 giovani in prima squadra, l'idea di Gastone",
    body: "Come il gruppo di giovani si approccia con i senatori del Team.",
    fullBody: "Come il gruppo di giovani si approccia con i senatori del Team. Il nuovo centro di Gaston Villa Park ha visto l'integrazione di 4 talenti dell'Accademia. Mister Gastone ha voluto fortemente questo salto, con l'idea bordeaux celeste di costruire il futuro da Trento.",
  },
  {
    id: "maglia-ritorno-2026",
    src: n2,
    tag: "Kit 2026-2027",
    date: "05.05.2026",
    title: "LA Maglia per il ritorno",
    body: "C'è chi vince una volta e si accontenta. Noi abbiamo vinto una volta e abbiamo capito che possiamo farlo ancora. Questa maglia porta addosso quella convinzione.",
    fullBody: "C'è chi vince una volta e si accontenta. Noi abbiamo vinto una volta e abbiamo capito che possiamo farlo ancora. Questa maglia bordeaux celeste con sponsor Unieuro porta addosso quella convinzione. GASTON VILLA, FOR THE WIN non è solo una scritta nel tunnel, è cucita dentro.",
  },
  {
    id: "nuovo-centro-preparativo",
    src: n3,
    tag: "Club",
    date: "06.08.2026",
    title: "Dentro al nuovo centro preparativo",
    body: "dieci mila metri quadrati per ritornare in forma.",
    fullBody: "Dieci mila metri quadrati per ritornare in forma. Il nuovo centro preparativo di Gaston Villa è stato inaugurato con la sala trofei con la Coppa Serie A in teca, lo spogliatoio curvo con le maglie Unieuro e il tunnel con i colori bordeaux celeste.",
  },
];

export function Journal() {
  return (
    <section id="journal" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Journal"
            title={<>Le Ultime da <span className="text-[#95BFE5]">Trento</span></>}
          />
          <Reveal delay={0.2}>
            <Link to="/journal" className="link-underline inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary">
              Tutte le Storie <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={0.09 * i}>
              <motion.article whileHover={{ y: -10 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="group h-full">
                <Link to="/journal/$postId" params={{ postId: post.id }} className="block">
                  <div className="overflow-hidden rounded-lg">
                    <img src={post.src} alt="" width={1200} height={800} loading="lazy" className="aspect-4/3 w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107" />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                    <span className="text-primary">{post.tag}</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="display mt-4 text-2xl transition-colors duration-500 group-hover:text-primary">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
