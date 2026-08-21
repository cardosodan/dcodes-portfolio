import {
  ShoppingCartSimple,
  Rocket,
  Gauge,
  Heartbeat,
  Cube,
  type Icon,
} from "@phosphor-icons/react";

import { SideBySideSlide } from "@/components/unlumen-ui/side-by-side-slide";
import { TooltipPreview } from "@/components/unlumen-ui/tooltip-preview";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";
import { PORTFOLIO_SECONDARY, type PortfolioItem } from "@/lib/site-data";

// import.meta.env.BASE_URL (= vite.config's `base`, "./") em vez de path
// absoluto "/images/...": num deploy de subpasta (GitHub Pages de repo de
// projeto) um "/..." resolve contra a RAIZ do domínio, não a subpasta do
// site, e a imagem cai em 404 — foi o que quebrou o reveal antes/depois
// no ar.
const ASSET_BASE = import.meta.env.BASE_URL;
const WIREFRAME_IMG = `${ASSET_BASE}images/wireframe-amazonvisto.svg`;
const AMAZONVISTO_IMG = `${ASSET_BASE}images/portfolio-amazonvisto.jpg`;

const ICONS: Record<PortfolioItem["icon"], Icon> = {
  "shopping-cart": ShoppingCartSimple,
  rocket: Rocket,
  gauge: Gauge,
  heartbeat: Heartbeat,
  cube: Cube,
};

function SecondaryCard({ item }: { item: PortfolioItem }) {
  const Icon = ICONS[item.icon];
  return (
    <Tilt rotationFactor={6} className="group relative h-full w-72 shrink-0 snap-start sm:w-auto">
      <ViewfinderCorners />
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors group-hover:border-signal/40">
        {/* faixa de topo com ícone — no lugar do card só-texto de antes */}
        <div className="relative flex h-24 items-center justify-center overflow-hidden border-b border-line bg-blueprint-grid bg-gradient-to-br from-signal/15 via-transparent to-transparent">
          <Icon
            size={34}
            weight="duotone"
            className="text-signal transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="font-display font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="mb-3">Portfólio</Eyebrow>
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
        <div className="group relative mb-10 overflow-hidden rounded-xl border border-line bg-card shadow-[0_20px_60px_-25px_rgba(0,0,0,0.45)]">
          <ViewfinderCorners />

          <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-background/90 px-3 py-1 font-mono text-[11px] font-semibold text-signal shadow-lg backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-signal" />
            Caso real
          </span>

          <SideBySideSlide
            beforeImage={WIREFRAME_IMG}
            afterImage={AMAZONVISTO_IMG}
            beforeAlt="Wireframe inicial do Amazon Visto"
            afterAlt="Amazon Visto — site publicado"
            className="aspect-[860/576] w-full"
            dividerColor="var(--signal)"
            handleColor="var(--signal)"
            cursor="col-resize"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-6">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Amazon Visto
              </h3>
              <p className="text-sm text-muted-foreground">
                Assessoria de vistos — americano, canadense, chinês e
                passaporte
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["HTML", "CSS", "JS", "SEO local"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <TooltipPreview
              href="https://amazonvisto.com.br"
              title="Amazon Visto"
              description="Assessoria de vistos americano, canadense, chinês e passaporte."
              image={AMAZONVISTO_IMG}
              className="font-mono text-sm"
            >
              amazonvisto.com.br ↗
            </TooltipPreview>
          </div>
        </div>

        {/* Estilos ilustrativos — trilha com scroll horizontal em vez de
            grid simétrico, cartões com faixa de ícone + tilt no lugar de
            texto solto sem nenhum elemento visual. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {PORTFOLIO_SECONDARY.map((item) => (
            <SecondaryCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
