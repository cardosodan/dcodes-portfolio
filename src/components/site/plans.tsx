import { Check } from "lucide-react";

import { Tilt } from "@/components/unlumen-ui/tilt";
import { GlowButton } from "@/components/unlumen-ui/glow";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { PLANS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const LIME = ["#CBFF3D", "#8FCC1F", "#EFFFB0"];

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6 rounded-xl border p-7",
        plan.featured
          ? "border-primary bg-card shadow-[0_0_0_1px_var(--primary)]"
          : "border-line bg-card/50",
      )}
    >
      {plan.featured && (
        <span className="w-fit rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          Mais popular
        </span>
      )}
      <div>
        <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {plan.description}
        </p>
      </div>

      <div>
        <p className="font-display text-3xl font-bold tracking-tight">
          {plan.price}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {plan.priceLabel}
        </p>
      </div>

      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      {plan.featured ? (
        <GlowButton
          colors={LIME}
          mode="pulse"
          blur="medium"
          className="rounded-full bg-primary py-2.5 text-primary-foreground hover:bg-primary/90"
          onClick={() => window.open(plan.ctaHref, "_blank")}
        >
          {plan.ctaLabel}
        </GlowButton>
      ) : (
        <a
          href={plan.ctaHref}
          className="rounded-full border border-line py-2.5 text-center text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-accent"
        >
          {plan.ctaLabel}
        </a>
      )}
    </div>
  );
}

export function Plans() {
  return (
    <section id="planos" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Investimento
          </p>
          <TextReveal
            as="h2"
            text="Planos que cabem no seu momento"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mt-4 text-muted-foreground">
            Valores de referência — todo projeto recebe um orçamento fechado
            antes de começar.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) =>
            plan.featured ? (
              <Tilt key={plan.name} rotationFactor={5} className="h-full">
                <PlanCard plan={plan} />
              </Tilt>
            ) : (
              <PlanCard key={plan.name} plan={plan} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
