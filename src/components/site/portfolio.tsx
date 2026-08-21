import { SideBySideSlide } from "@/components/unlumen-ui/side-by-side-slide";
import { TooltipPreview } from "@/components/unlumen-ui/tooltip-preview";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";
import { PORTFOLIO_SECONDARY } from "@/lib/site-data";

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="mb-3">
            Portfólio
          </Eyebrow>
          <TextReveal
            as="h2"
            text="Do wireframe ao site no ar"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mt-4 text-muted-foreground">
            Um case real já entregue — arraste pra ver do rascunho de layout
            até o site publicado. Os demais são estilos ilustrativos que a
            DCodes constrói.
          </p>
        </div>

        {/* Case em destaque — sem grid uniforme: um card grande com
            comparação antes/depois real do processo de construção. */}
        <div className="group relative mb-10 overflow-hidden rounded-xl border border-line bg-card">
          <ViewfinderCorners />
          <SideBySideSlide
            beforeImage="/images/wireframe-amazonvisto.svg"
            afterImage="/images/portfolio-amazonvisto.jpg"
            beforeAlt="Wireframe inicial do Amazon Visto"
            afterAlt="Amazon Visto — site publicado"
            className="aspect-[860/576] w-full"
            dividerColor="var(--primary)"
            handleColor="var(--primary)"
            cursor="col-resize"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 p-6">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Amazon Visto
              </h3>
              <p className="text-sm text-muted-foreground">
                Assessoria de vistos — caso real
              </p>
            </div>
            <TooltipPreview
              href="https://amazonvisto.com.br"
              title="Amazon Visto"
              description="Assessoria de vistos americano, canadense, chinês e passaporte."
              image="/images/portfolio-amazonvisto.jpg"
              className="font-mono text-sm"
            >
              amazonvisto.com.br ↗
            </TooltipPreview>
          </div>
        </div>

        {/* Estilos ilustrativos — trilha com scroll horizontal em vez de
            grid simétrico, cartões com profundidade (tilt) no lugar de
            mockups de navegador clonados. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {PORTFOLIO_SECONDARY.map((item) => (
            <div
              key={item.title}
              className="group relative w-72 shrink-0 snap-start sm:w-auto"
            >
              <ViewfinderCorners />
              <TiltCard title={item.title} description={item.category}>
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
