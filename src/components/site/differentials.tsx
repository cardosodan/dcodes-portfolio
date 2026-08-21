import {
  PaintBrush,
  Lightning,
  TrendUp,
  DeviceMobile,
  Headset,
  HandCoins,
  type Icon,
} from "@phosphor-icons/react";

import GlareHover from "@/components/react-bits/GlareHover";
import { Eyebrow } from "@/components/site/eyebrow";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { DIFFERENTIALS, type Differential } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ICONS: Record<Differential["icon"], Icon> = {
  "paint-brush": PaintBrush,
  lightning: Lightning,
  "trend-up": TrendUp,
  "device-mobile": DeviceMobile,
  headset: Headset,
  "hand-coins": HandCoins,
};

function DifferentialCard({
  item,
  index,
}: {
  item: Differential;
  index: number;
}) {
  const Icon = ICONS[item.icon];
  const isLarge = item.size === "lg";

  return (
    <GlareHover
      width="100%"
      height="100%"
      background="transparent"
      borderColor="transparent"
      glareColor="#CBFF3D"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={260}
      className={cn(
        "!border-0",
        isLarge ? "sm:col-span-2" : "sm:col-span-1",
      )}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-line bg-card/60 p-6 transition-colors hover:border-signal/40",
          isLarge && "sm:flex-row sm:items-start sm:gap-6",
        )}
      >
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] text-muted-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 text-signal transition-transform duration-300 group-hover:scale-110",
            isLarge ? "size-12" : "size-11",
          )}
        >
          <Icon size={isLarge ? 26 : 22} weight="bold" />
        </span>

        <div className="flex flex-col gap-1.5">
          <h3
            className={cn(
              "font-display font-semibold",
              isLarge ? "text-xl" : "text-base",
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "text-muted-foreground",
              isLarge ? "text-sm" : "text-sm",
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </GlareHover>
  );
}

export function Differentials() {
  return (
    <section className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="mb-3">Diferenciais</Eyebrow>
          <TextReveal
            as="h2"
            text="Por que escolher a DCodes"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {DIFFERENTIALS.map((item, i) => (
            <DifferentialCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
