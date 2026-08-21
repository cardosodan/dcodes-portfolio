import { cn } from "@/lib/utils";

/**
 * Cantos de mira/viewfinder que aparecem no hover — inspirado em padrões de
 * micro-interação estilo uiverse.io, mas escritos do zero. Reforça o
 * vocabulário de "inspeção/precisão" do site: o cursor "mira" o card como
 * uma ferramenta de crop/foco, não um hover genérico de escala/sombra.
 * Uso: envolver o alvo num elemento com a classe `group` e soltar este
 * componente como irmão absoluto por cima.
 */
export function ViewfinderCorners({ className }: { className?: string }) {
  const base =
    "absolute size-4 border-primary opacity-0 transition-all duration-300 ease-out group-hover:opacity-100";
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20",
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          base,
          "top-2 left-2 border-t-2 border-l-2 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0",
        )}
      />
      <span
        className={cn(
          base,
          "top-2 right-2 border-t-2 border-r-2 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0",
        )}
      />
      <span
        className={cn(
          base,
          "bottom-2 left-2 border-b-2 border-l-2 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0",
        )}
      />
      <span
        className={cn(
          base,
          "bottom-2 right-2 border-b-2 border-r-2 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0",
        )}
      />
    </div>
  );
}
