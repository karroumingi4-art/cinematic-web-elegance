import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const faqs = [
  {
    q: "How do I join the Gold Circle?",
    a: "Membership opens twice a year and is capped at 1,200 places. Register your interest through the contact form and we will write to you before the next intake.",
  },
  {
    q: "Can I visit the stadium on a non-matchday?",
    a: "Yes. Guided tours run Tuesday to Saturday and include the dressing rooms, the tunnel and the club archive. Members receive priority booking.",
  },
  {
    q: "What age can a child join the academy?",
    a: "Trials begin at age eight. Every intake includes schooling support, nutrition guidance and a mentor from the senior squad.",
  },
  {
    q: "Is hospitality accessible?",
    a: "All hospitality tiers are step-free, with companion seating, hearing loops and quiet rooms available on request at no additional cost.",
  },
  {
    q: "Where does the Legacy Fund money go?",
    a: "Published annually and independently audited: community pitches, coaching bursaries and the restoration of the original east stand.",
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
              Answers, <span className="text-gradient-gold">plainly given</span>
            </>
          }
          intro="If something is not covered here, the club office replies within one working day."
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
