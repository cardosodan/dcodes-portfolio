import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Eyebrow } from "@/components/site/eyebrow";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { PROCESS_STEPS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Process() {
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active];

  return (
    <section
      id="processo"
      className="scroll-mt-24 border-t border-line bg-card/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="mb-3">
            Como funciona
          </Eyebrow>
          <TextReveal
            as="h2"
            text="Do briefing ao site no ar"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
        </div>

        {/* Trilha horizontal navegável — no lugar da lista numerada 01-05
            empilhada: o estágio ativo é escolhido, não só listado. */}
        <div className="relative mb-4">
          <div className="absolute left-0 right-0 top-4 h-px bg-line" />
          <div className="relative flex justify-between">
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={s.number}
                type="button"
                onClick={() => setActive(i)}
                className="group flex flex-1 cursor-pointer flex-col items-center gap-3 outline-none"
              >
                <span
                  className={cn(
                    "relative flex size-8 items-center justify-center rounded-full border font-mono text-xs transition-colors",
                    i === active
                      ? "border-primary bg-primary text-primary-foreground"
                      : i < active
                        ? "border-signal/60 bg-background text-signal"
                        : "border-line bg-background text-muted-foreground group-hover:border-foreground/30",
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="process-active-ring"
                      className="absolute -inset-1.5 rounded-full border border-primary/40"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {s.number}
                </span>
                <span
                  className={cn(
                    "hidden text-center text-xs font-medium transition-colors sm:block",
                    i === active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-10 grid gap-6 rounded-xl border border-line bg-card p-8 sm:grid-cols-[auto_1fr] sm:items-start"
          >
            <span className="font-display text-5xl font-bold text-primary/30">
              {step.number}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold sm:hidden">
                {step.title}
              </h3>
              <h3 className="hidden font-display text-2xl font-semibold sm:block">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
