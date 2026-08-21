import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { ScrambleText } from "@/components/unlumen-ui/scramble-text";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { GlowButton } from "@/components/unlumen-ui/glow";
import { GlowingBadge } from "@/components/unlumen-ui/glowing-badge";
import { CountUp } from "@/components/unlumen-ui/count-up";
import { GithubGraph } from "@/components/unlumen-ui/github-graph";
import { FloatingTooltip } from "@/components/unlumen-ui/floating-tooltip";
import { CONTACT, STATS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const LIME = ["#CBFF3D", "#8FCC1F", "#EFFFB0", "#CBFF3D"];

// Aurora em CSS puro (blobs radiais + blur, sem three.js/WebGL) — o mesmo
// resultado visual do padrão "aurora background" que motores de template de
// IA costumam empacotar com ~800kb de bundle, coerente com o diferencial de
// "performance de verdade" que o próprio site promete.
function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-[-20%] h-[70%] w-[70%] rounded-full bg-[#CBFF3D] opacity-25 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-[10%] h-[60%] w-[60%] rounded-full bg-[#8FCC1F] opacity-20 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-1/3 h-[55%] w-[55%] rounded-full bg-[#3a4a12] opacity-30 blur-[110px]"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const SEGMENTS = [
  "VAREJO",
  "SAÚDE",
  "EDUCAÇÃO",
  "SERVIÇOS",
  "INDÚSTRIA",
  "STARTUPS",
].map((label) => ({
  node: (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs tracking-wider text-muted-foreground">
      {label}
    </span>
  ),
  ariaLabel: label,
}));

const ANNOTATIONS = [
  { label: "font: Sora / 800", className: "left-[2%] top-[14%]" },
  { label: "grid: 12 col · gap 16", className: "left-[58%] top-[6%]" },
  { label: "#0B0C10", className: "right-[4%] top-[36%]" },
  { label: "lh: 0.95 · tracking: -2%", className: "left-[6%] bottom-[30%]" },
];

function InspectorTag({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute hidden select-none items-center gap-1.5 rounded-full border border-line bg-card/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-sm lg:inline-flex",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-1 w-1 rounded-full bg-primary" />
      {label}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background pt-32 pb-0"
    >
      {/* Fundo — aurora em tons de "signal" (lima) sobre grade de coordenadas,
          no lugar do mockup de navegador genérico: o site "se inspeciona"
          ao vivo, reforçando o vocabulário de precisão (referência GetLayers). */}
      <div className="absolute inset-0 -z-10">
        <HeroGlow />
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-12 gap-4 px-4 sm:px-6">
        {ANNOTATIONS.map((a) => (
          <InspectorTag key={a.label} label={a.label} className={a.className} />
        ))}

        <div className="col-span-12 flex flex-col justify-center gap-7 py-10 lg:col-span-8">
          <GlowingBadge variant="neutral" pulse>
            Agência de desenvolvimento web
          </GlowingBadge>

          <h1 className="font-display text-[12vw] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.2rem]">
            <ScrambleText text="Sites que fazem seu negócio" />
            <br />
            <span className="text-signal">
              <ScrambleText text="vender de verdade." delay={550} />
            </span>
          </h1>

          <TextReveal
            as="p"
            text="Criamos sites institucionais, landing pages e e-commerces rápidos, bonitos e pensados pra converter visitante em cliente — do briefing ao ar em poucos dias."
            className="max-w-xl text-lg text-muted-foreground"
            staggerDelay={0.02}
          />

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
            <ClickSpark sparkColor="#CBFF3D" sparkCount={10} sparkRadius={22} className="inline-block">
              <GlowButton
                colors={LIME}
                mode="breathe"
                blur="strong"
                size="lg"
                className="h-12 gap-2 rounded-full bg-primary px-7 text-base text-primary-foreground hover:bg-primary/90"
                onClick={() =>
                  window.open(
                    CONTACT.whatsappUrl(
                      "Olá, vim pelo site e quero um orçamento.",
                    ),
                    "_blank",
                  )
                }
              >
                Peça seu orçamento
                <ArrowRight weight="bold" className="size-4" />
              </GlowButton>
            </ClickSpark>

            <a
              href="#portfolio"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 underline decoration-line underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
            >
              Ver portfólio
              <ArrowRight weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            resposta em até 1 dia útil · sem compromisso
          </p>
        </div>

        <div className="col-span-4 hidden lg:block" aria-hidden="true" />
      </div>

      {/* Segmentos atendidos — faixa em loop infinito (marquee), não a
          lista estática de antes. */}
      <div className="relative mt-6 border-t border-line py-5">
        <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Negócios de vários segmentos já confiam na DCodes
        </p>
        <LogoLoop
          logos={SEGMENTS}
          speed={40}
          gap={16}
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Segmentos atendidos"
        />
      </div>

      {/* Ticker de números — faixa fina embutida no rodapé do hero, não uma
          section separada de cards (evita clonar a mesma gramática de grid). */}
      <div className="relative mt-10 border-t border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-line sm:flex sm:flex-wrap sm:divide-y-0 sm:px-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 items-baseline gap-1.5 px-4 py-5 sm:pr-4"
            >
              <span className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
                <CountUp to={stat.value} duration={2.2} />
                {stat.suffix}
              </span>
              <span className="pl-2 text-xs leading-tight text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget de contribuições reais do GitHub — prova de que quem faz o
          site também escreve código de verdade, não só decoração. */}
      <FloatingTooltip.Trigger
        content="Atividade real de commits"
        description="Sim, a gente escreve código de verdade — não é só decoração."
      >
        <div className="relative mx-auto hidden max-w-6xl px-6 pb-6 pt-4 lg:block">
          <GithubGraph
            account={CONTACT.githubAccount}
            months={4}
            variant="graphite"
            cellSize={10}
            cellGap={3}
            showAccount={false}
            ambientEffect="none"
            className="opacity-70 transition-opacity hover:opacity-100"
          />
        </div>
      </FloatingTooltip.Trigger>
    </section>
  );
}
