import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Navbar } from "@/components/site/Navbar";
import { Loader } from "@/components/site/Loader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Programmes } from "@/components/site/Programmes";
import { Gallery } from "@/components/site/Gallery";
import { Journal } from "@/components/site/Journal";
import { Voices } from "@/components/site/Voices";
import { Partners } from "@/components/site/Partners";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Ardente FC — A Century of Craft, Courage and Belonging";
const description =
  "Official home of Ardente Football Club. Membership, matchday hospitality, the academy and the Legacy Fund — a club built in the dark and forged for the light.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <Hero />
        <About />
        <Programmes />
        <Gallery />
        <Journal />
        <Voices />
        <Partners />
        <Faq />
        <Contact />
      </motion.main>
      <Footer />
    </>
  );
}
