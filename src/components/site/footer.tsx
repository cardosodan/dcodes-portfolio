import {
  InstagramLogo,
  LinkedinLogo,
  GithubLogo,
} from "@phosphor-icons/react";

import { NAV_LINKS, CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#inicio" className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-xs">
              {"</>"}
            </span>
            D<span className="text-signal">Codes</span>
          </a>
          <p className="max-w-xs text-sm text-muted-foreground">
            Criamos sites que unem design, performance e conversão — pra fazer
            seu negócio vender mais na internet.
          </p>
          <ul className="flex gap-3">
            <li>
              <a
                href="https://instagram.com/dcodes"
                target="_blank"
                rel="noopener"
                aria-label="Instagram da DCodes"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <InstagramLogo weight="bold" className="size-[18px]" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/dcodes"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn da DCodes"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinLogo weight="bold" className="size-[18px]" />
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${CONTACT.githubAccount}`}
                target="_blank"
                rel="noopener"
                aria-label="GitHub da DCodes"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubLogo weight="bold" className="size-[18px]" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Navegação
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.filter((l) => l.href !== "#inicio").map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Serviços
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="#servicos" className="text-foreground/80 transition-colors hover:text-foreground">
                Site institucional
              </a>
            </li>
            <li>
              <a href="#servicos" className="text-foreground/80 transition-colors hover:text-foreground">
                Landing page
              </a>
            </li>
            <li>
              <a href="#servicos" className="text-foreground/80 transition-colors hover:text-foreground">
                E-commerce
              </a>
            </li>
            <li>
              <a href="#servicos" className="text-foreground/80 transition-colors hover:text-foreground">
                Sistema sob medida
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Contato
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="text-muted-foreground">Atendimento em todo o Brasil</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col-reverse items-center gap-2 border-t border-line px-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} DCodes. Todos os direitos reservados.</p>
        <p className="font-mono">
          Feito com <span aria-hidden="true">{"</>"}</span> pela própria DCodes
        </p>
      </div>
    </footer>
  );
}
