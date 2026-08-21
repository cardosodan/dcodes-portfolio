import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { HeroInspectorPanel } from "@/components/site/hero-inspector-panel";
import { ScrambleText } from "@/components/unlumen-ui/scramble-text";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { GlowButton } from "@/components/unlumen-ui/glow";
import { GlowingBadge } from "@/components/unlumen-ui/glowing-badge";
import { CountUp } from "@/components/unlumen-ui/count-up";
import { GithubGraph } from "@/components/unlumen-ui/github-graph";
import { FloatingTooltip } from "@/components/unlumen-ui/floating-tooltip";
import { CONTACT, STATS } from "@/lib/site-data";

const LIME = ["#CBFF3D", "#8FCC1F", "#EFFFB0", "#CBFF3D"];

// Aurora em CSS puro (blobs radiais + blur, sem three.js/WebGL) — o mesmo
// resultado visual do padrão "aurora background" que motores de template de
// IA costumam empacotar com ~800kb de bundle, coerente com o diferencial de
// "performance de verdade" que o próprio site promete.
function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-[-20%] h-[70%] w-[70%] rounded-full bg-[#CBFF3D] opacity-40 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-[10%] h-[60%] w-[60%] rounded-full bg-[#8FCC1F] opacity-30 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-1/3 h-[55%] w-[55%] rounded-full bg-[#3a4a12] opacity-40 blur-[110px]"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* quarto acento — mancha menor e mais brilhante pra dar um "hotspot"
          de contraste, em vez do verde uniformemente abafado da v1. */}
      <motion.div
        className="absolute right-[8%] top-[30%] h-[28%] w-[28%] rounded-full bg-[#EFFFB0] opacity-30 blur-[90px]"
        animate={{ x: [0, -15, 0], y: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* vinheta radial: escurece os cantos pra o centro (texto + painel)
          ganhar contraste, em vez do blur ficar homogêneo por toda a tela. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)] opacity-70" />
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

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background pt-24 pb-0"
    >
      {/* Fundo — aurora em tons de "signal" (lima) sobre grade de coordenadas,
          no lugar do mockup de navegador genérico: o site "se inspeciona"
          ao vivo, reforçando o vocabulário de precisão (referência GetLayers). */}
      <div className="absolute inset-0 -z-10">
        <HeroGlow />
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-12 items-center gap-8 px-4 pb-20 sm:px-6 lg:pb-16">
        <div className="col-span-12 flex flex-col gap-5 py-6 lg:col-span-7">
          <GlowingBadge variant="neutral" pulse>
            Agência de desenvolvimento web
          </GlowingBadge>

          <h1 className="font-display text-[12vw] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.4rem]">
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

        <div className="col-span-5 hidden lg:block">
          <HeroInspectorPanel />
        </div>
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
