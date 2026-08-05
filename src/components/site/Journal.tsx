import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import n1 from "@/assets/news-1.jpg";
import n2 from "@/assets/news-2.jpg";
import n3 from "@/assets/news-3.jpg";

const posts = [
  {
    src: n1,
    tag: "Academy",
    date: "12 May",
    title: "Nine graduates, one philosophy",
    body: "How the under-19 group rewrote our approach to pre-season conditioning.",
  },
  {
    src: n2,
    tag: "Kit",
    date: "28 April",
    title: "The centenary shirt, explained",
    body: "Every seam references an era. A conversation with the design studio behind it.",
  },
  {
    src: n3,
    tag: "Club",
    date: "09 April",
    title: "Inside the new performance centre",
    body: "Twelve thousand square metres built around recovery, data and daylight.",
  },
];

export function Journal() {
  return (
    <section id="journal" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Journal"
            title={
              <>
                Latest from <span className="text-gradient-gold">Ardente</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <a
              href="#contact"
              className="link-underline inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary"
            >
              All stories <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={0.09 * i}>
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <a href="#journal" className="block">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={post.src}
                      alt=""
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
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
