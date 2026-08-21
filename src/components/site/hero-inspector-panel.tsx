import ElectricBorder from "@/components/react-bits/ElectricBorder";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { cn } from "@/lib/utils";

/**
 * Centro visual do hero — no lugar do espaço vazio que sobrava na coluna
 * direita. Um mockup de site sendo "inspecionado" (referência GetLayers),
 * com as anotações de medida presas a ELE especificamente, não soltas por
 * cima do texto do hero (causa do bug de sobreposição na v1).
 */
function PanelTag({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-20 hidden select-none items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-card/90 px-2.5 py-1 font-mono text-[10px] text-muted-foreground shadow-lg backdrop-blur-sm lg:inline-flex",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-signal" />
      {label}
    </span>
  );
}

export function HeroInspectorPanel() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <Tilt rotationFactor={7} className="relative">
        <ElectricBorder
          color="#CBFF3D"
          speed={0.8}
          chaos={0.35}
          borderRadius={16}
          className="block"
        >
        <div className="relative overflow-hidden rounded-2xl border border-line bg-card/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* barra de navegador */}
          <div className="flex items-center gap-1.5 border-b border-line bg-background/60 px-4 py-3">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="ml-2 truncate rounded-sm bg-foreground/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              seusite.com.br
            </span>
          </div>

          {/* conteúdo esquemático */}
          <div className="space-y-3 p-4">
            <div className="h-2.5 w-2/3 rounded-full bg-foreground/20" />
            <div className="h-2.5 w-2/5 rounded-full bg-foreground/10" />

            <div className="relative mt-4 h-28 overflow-hidden rounded-lg border border-signal/30 bg-gradient-to-br from-signal/25 via-signal/5 to-transparent">
              <div className="absolute inset-3 flex flex-col justify-end gap-1.5">
                <div className="h-2 w-1/2 rounded-full bg-background/60" />
                <div className="h-6 w-1/3 rounded-md bg-signal/70" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="h-14 rounded-md border border-line bg-foreground/[0.04]" />
              <div className="h-14 rounded-md border border-line bg-foreground/[0.04]" />
              <div className="h-14 rounded-md border border-line bg-foreground/[0.04]" />
            </div>
          </div>

          {/* régua de medida no topo, reforça "inspecionado com precisão" */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-full opacity-[0.15] lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--signal) 0 1px, transparent 1px 16px)",
              backgroundSize: "16px 100%",
              backgroundRepeat: "repeat-x",
              backgroundPositionY: "0",
              maskImage: "linear-gradient(to bottom, black 0, black 6px, transparent 6px)",
            }}
            aria-hidden="true"
          />
        </div>
        </ElectricBorder>
      </Tilt>

      {/* anotações presas ao painel — não mais soltas sobre o texto do hero */}
      <PanelTag label="font: Sora / 800" className="-top-3 left-6" />
      <PanelTag label="grid: 12 col · gap 16" className="top-10 -right-9" />
      <PanelTag label="#0B0C10" className="bottom-16 -left-8" />
      <PanelTag label="lh: 0.95 · tracking: -2%" className="-bottom-3 right-4" />
    </div>
  );
}
