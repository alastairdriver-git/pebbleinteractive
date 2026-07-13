import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@gradeui/ui";

/* Single-island wrapper for the Grade Accordion. Radix compound components
   share state via React context, which doesn't cross Astro's island boundary
   when the parent + children are authored separately in .astro. Rendering the
   whole accordion inside one React component keeps it in a single tree. */
export default function FaqAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible>
      {faqs.map((f, i) => (
        <AccordionItem value={`faq-${i}`} key={i}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
