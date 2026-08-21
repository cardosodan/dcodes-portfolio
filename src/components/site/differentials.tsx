import { Eyebrow } from "@/components/site/eyebrow";
import { FloatingTooltip } from "@/components/unlumen-ui/floating-tooltip";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { DIFFERENTIALS } from "@/lib/site-data";

function parseCoord(coord: string) {
  const [x, y] = coord
    .split(" ")
    .map((part) => Number(part.split(":")[1]));
  return { x, y };
}

export function Differentials() {
  return (
    <section className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="mb-3">
            Diferenciais
          </Eyebrow>
          <TextReveal
            as="h2"
            text="Por que escolher a DCodes"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mt-4 text-muted-foreground">
            Passe o mouse pelos marcadores — cada um é um ponto que a gente
            leva a sério em todo projeto.
          </p>
        </div>

        {/* Painel "inspecionado": ao invés de 6 cards com ícone repetidos,
            os diferenciais viram anotações fixadas sobre um preview de
            site, como um devtools real. */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-blueprint-grid bg-card/40 sm:aspect-[21/9]">
          <div className="absolute inset-6 flex flex-col gap-3 rounded-lg border border-dashed border-line/80 p-4 opacity-40 sm:inset-10">
            <div className="h-3 w-1/3 rounded bg-foreground/20" />
            <div className="h-24 rounded bg-foreground/10" />
            <div className="flex gap-2">
              <div className="h-12 flex-1 rounded bg-foreground/10" />
              <div className="h-12 flex-1 rounded bg-foreground/10" />
              <div className="h-12 flex-1 rounded bg-foreground/10" />
            </div>
          </div>

          {DIFFERENTIALS.map((item, i) => {
            const { x, y } = parseCoord(item.coord);
            return (
              <FloatingTooltip.Trigger
                key={item.title}
                content={item.title}
                description={item.description}
              >
                <button
                  type="button"
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-label={item.title}
                >
                  <span className="absolute size-8 rounded-full bg-primary/20 transition-transform group-hover:scale-150" />
                  <span className="relative flex size-5 items-center justify-center rounded-full border border-signal bg-background font-mono text-[9px] font-bold text-signal">
                    {i + 1}
                  </span>
                </button>
              </FloatingTooltip.Trigger>
            );
          })}
        </div>

        <ol className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item, i) => (
            <li key={item.title} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 font-mono text-xs font-bold text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground/80">{item.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
