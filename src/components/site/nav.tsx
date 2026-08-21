import { useEffect, useState } from "react";
import {
  House,
  Stack,
  FlowArrow,
  Briefcase,
  Tag,
  Question,
  WhatsappLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

import { Dock, type DockItem } from "@/components/unlumen-ui/dock";
import { ThemeSwitch } from "@/components/unlumen-ui/theme-switch";
import { CommandMenu } from "@/components/unlumen-ui/command-menu";
import { CONTACT } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const WHATSAPP_HREF = CONTACT.whatsappUrl(
  "Olá, vim pelo site e quero um orçamento.",
);

const DOCK_ITEMS: DockItem[] = [
  { icon: <House weight="bold" />, label: "Início", href: "#inicio" },
  { icon: <Stack weight="bold" />, label: "Serviços", href: "#servicos" },
  { icon: <FlowArrow weight="bold" />, label: "Processo", href: "#processo" },
  { icon: <Briefcase weight="bold" />, label: "Portfólio", href: "#portfolio" },
  { icon: <Tag weight="bold" />, label: "Planos", href: "#planos" },
  { icon: <Question weight="bold" />, label: "FAQ", href: "#faq", separator: true },
  {
    icon: <WhatsappLogo weight="bold" />,
    label: "Falar no WhatsApp",
    href: WHATSAPP_HREF,
  },
];

export function SiteNav() {
  // Some no topo: em viewports curtos o CTA do hero fica exatamente onde o
  // dock flutuaria por cima (colisão real reportada). Em vez de tentar
  // "adivinhar" padding suficiente pra qualquer altura de tela, o dock só
  // aparece depois de rolar um pouco — momento em que o hero já saiu do
  // caminho de qualquer forma.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra superior mínima — sem links de menu tradicionais (eles vivem
          no dock flutuante embaixo). Só marca + busca (⌘K) + tema. */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"
          aria-label="DCodes — página inicial"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-xs">
            {"</>"}
          </span>
          <span className="hidden sm:inline">
            D<span className="text-signal">Codes</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CommandMenu
              placeholder="Ir para uma seção, copiar contato…"
              groups={[
                {
                  heading: "Navegação",
                  items: DOCK_ITEMS.filter((i) => i.href?.startsWith("#")).map(
                    (i) => ({ label: i.label, href: i.href }),
                  ),
                },
                {
                  heading: "Contato",
                  items: [
                    {
                      label: "Falar no WhatsApp",
                      icon: WhatsappLogo,
                      href: WHATSAPP_HREF,
                    },
                    {
                      label: `Copiar e-mail (${CONTACT.email})`,
                      icon: EnvelopeSimple,
                      action: () =>
                        navigator.clipboard.writeText(CONTACT.email),
                    },
                  ],
                },
              ]}
            />
          </div>
          <ThemeSwitch />
        </div>
      </div>

      {/* Dock flutuante — navegação principal do site. Só some no topo
          absoluto (ver comentário acima); a partir daí fica sempre visível. */}
      <nav
        className={cn(
          "fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300",
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-label="Navegação principal"
      >
        <Dock items={DOCK_ITEMS} iconSize={38} magnification={1.7} />
      </nav>
    </>
  );
}
