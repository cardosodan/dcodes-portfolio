import { NAV_LINKS, CONTACT } from "@/lib/site-data";

// lucide-react não inclui mais logos de marca — ícones sociais como
// SVG inline (mesmo approach do site original).
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 10.5V17M8 7.5v.01M12.5 17v-4a2 2 0 1 1 4 0v4M12.5 10.5V17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.35-3.37-1.35-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#inicio" className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-xs">
              {"</>"}
            </span>
            D<span className="text-primary">Codes</span>
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
                <InstagramIcon />
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
                <LinkedinIcon />
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
                <GithubIcon />
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
