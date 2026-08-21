import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Rótulo mono pequeno usado antes de cada título de seção ("O QUE FAZEMOS",
 * "COMO FUNCIONA"...). Entrada inspirada no "tracking-in-expand" clássico do
 * Animista: letter-spacing bem aberto + esmaecido, fechando pro normal ao
 * entrar na tela — em vez do fade-in genérico usado em quase todo template.
 */
export function Eyebrow({
  children,
  className,
  center = false,
}: {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(2px)" }}
      animate={
        isInView
          ? { opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "font-mono text-xs uppercase text-signal",
        center && "text-center",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
