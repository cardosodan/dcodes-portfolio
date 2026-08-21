import { Check } from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/unlumen-ui/primitives/tabs";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// Diagrama esquemático (estilo devtools) por serviço — substitui a foto/ícone
// genérico por uma anotação de layout real, mantendo o vocabulário de
// "inspeção" consistente com o resto do site.
const PREVIEW_REGIONS: Record<string, string[]> = {
  institucional: ["header", "hero", "sobre", "contato", "footer"],
  landing: ["hero", "prova social", "oferta", "cta"],
  ecommerce: ["catálogo", "carrinho", "checkout", "conta"],
  sistema: ["painel", "api", "banco de dados", "auth"],
};

function SchematicPreview({ serviceId }: { serviceId: string }) {
  const regions = PREVIEW_REGIONS[serviceId] ?? [];
  return (
    <div className="relative h-full min-h-56 w-full overflow-hidden rounded-lg border border-line bg-blueprint-grid bg-background/40 p-3">
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-2">
        {regions.map((region, i) => (
          <div
            key={region}
            className={cn(
              "flex items-center justify-between rounded-md border border-dashed border-primary/40 bg-card/60 px-3 py-2",
              i === 1 && regions.length > 3 && "row-span-1",
            )}
          >
            <span className="font-mono text-[11px] text-muted-foreground">
              &lt;{region}/&gt;
            </span>
            <span className="font-mono text-[10px] text-primary/70">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            O que fazemos
          </p>
          <TextReveal
            as="h2"
            text="Um site pra cada momento do seu negócio"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mt-4 text-muted-foreground">
            Escolha o formato certo pra sua necessidade agora — ou fale com a
            gente e a gente ajuda a decidir.
          </p>
        </div>

        <Tabs defaultValue={SERVICES[0].id} className="grid gap-8 lg:grid-cols-12">
          <TabsList className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible">
            {SERVICES.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className={cn(
                  "flex shrink-0 flex-col items-start gap-1 rounded-lg border border-transparent px-4 py-3 text-left transition-colors lg:shrink",
                  "data-[state=inactive]:hover:border-line data-[state=inactive]:hover:bg-card/60",
                  "data-[state=active]:border-line data-[state=active]:bg-card",
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {service.tag}
                </span>
                <span className="font-display font-semibold">
                  {service.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="lg:col-span-8">
            <TabsContents>
              {SERVICES.map((service) => (
                <TabsContent
                  key={service.id}
                  value={service.id}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contato"
                      className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Falar sobre esse serviço →
                    </a>
                  </div>
                  <SchematicPreview serviceId={service.id} />
                </TabsContent>
              ))}
            </TabsContents>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
