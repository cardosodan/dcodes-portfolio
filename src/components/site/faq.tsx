import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { FAQ_ITEMS } from "@/lib/site-data";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Dúvidas frequentes
          </p>
          <TextReveal
            as="h2"
            text="Perguntas frequentes"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
        </div>

        <MotionAccordion
          items={FAQ_ITEMS.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
          className="[&>div]:p-0"
        />
      </div>
    </section>
  );
}
