import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const faqs = [
  {
    q: "Come divento un membro del circolo d'oro?",
    a: "Le iscrizioni aprono due volte all'anno, AGosto e Gennaio e hanno una capienza di 25000 posti. Registra il tuo interesse e ti scriveremo subito",
  },
  {
    q: "Posso visitare lo stadio in un giorno non di partita?",
    a: "Certamente, i tour guidati sono aperti dal lunedì al giovedì, dalle 07:00 alle 15:00. c'è anche l'opzione per osservare gli allenamenti, dalle 17:00 alle 20:00. Gli abbonati hanno priorità sulle prenotazioni",
  },
  {
    q: "a qaule età posso entrare nell'accademia?",
    a: "I provini iniziano dall'età di 8 anni. i Membri dell'Accademia riceveranno consultazioni private da medici dello sport, nutrizionisti e lezioni private da membri della prima squadra",
  },
  {
    q: "L'Ospitalità è accessibile?",
    a: "Certamente, l'ospitalità è accessibile a tutti i tifosi, camere insonorizzate e altre aggiunte enon hanno costi aggiuntivi.",
  },
  {
    q: "Dove vanno i soldi del Fondo Eredità?",
    a: "Il bilacio viene pubblicato annualmente a fine stagione. Principalmente viene utilizato per nuove butique del Club, Ristrutturzione dei campi, Attrezzature e molto altro....",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative bg-background py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              DOMANDE, <span className="text-[#95BFE5]">A CUI C'è UNA RISPOSTA</span>
            </>
          }
          intro="se avete ulteriori domande, l'uffcio vi risponderà in un giorno lavorativo."
        />

        <Reveal delay={0.12}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-6 text-left text-base font-semibold hover:text-primary hover:no-underline sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
