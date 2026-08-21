import { ArrowRight } from "lucide-react";

import { GlowButton } from "@/components/unlumen-ui/glow";
import { CopyButton } from "@/components/unlumen-ui/copy";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { CONTACT } from "@/lib/site-data";

const LIME = ["#CBFF3D", "#8FCC1F", "#EFFFB0", "#CBFF3D"];

export function CtaFinal() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <TextReveal
          as="h2"
          text="Vamos tirar seu site do papel?"
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <p className="max-w-md text-muted-foreground">
          Fale com a gente agora e receba uma proposta sob medida pro seu
          projeto.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <GlowButton
            colors={LIME}
            mode="breathe"
            size="lg"
            className="h-12 gap-2 rounded-full bg-primary px-7 text-base text-primary-foreground hover:bg-primary/90"
            onClick={() =>
              window.open(
                CONTACT.whatsappUrl("Olá, vim pelo site e quero um orçamento."),
                "_blank",
              )
            }
          >
            Falar no WhatsApp
            <ArrowRight className="size-4" />
          </GlowButton>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-line py-1.5 pl-4 pr-1.5 font-mono text-sm">
            {CONTACT.email}
            <CopyButton
              content={CONTACT.email}
              variant="ghost"
              size="sm"
              aria-label="Copiar e-mail"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
