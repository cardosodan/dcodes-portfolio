# Site da DCodes

Site institucional da própria DCodes — agência de criação de sites. Direção
visual "ferramenta de precisão": vocabulário de devtools/inspetor de layout
(referência direta ao [GetLayers](https://getlayers.pro/)) no lugar da
vitrine genérica de agência — dock de navegação flutuante, botões e textos
animados via [Unlumen UI](https://ui.unlumen.com/), zero grid simétrico de
cards repetidos.

**Stack:** Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui (estilo
`base-nova`, sobre Base UI). `npm run build` gera arquivos estáticos puros em
`dist/` — o deploy final continua sendo só HTML/CSS/JS, só o
desenvolvimento passou a ter um passo de build.

---

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` (ou a porta que o Vite escolher).

```bash
npm run build    # gera dist/ pronto pra qualquer hospedagem estática
npm run preview  # serve o dist/ localmente pra conferir o build de produção
```

---

## Estrutura

```
dcodes-site/
├── src/
│   ├── components/
│   │   ├── site/           → seções da página (hero, serviços, portfólio…)
│   │   ├── unlumen-ui/      → componentes instalados via shadcn CLI
│   │   │                       (@unlumen-ui/*) — animações em Motion
│   │   └── ui/              → primitivos shadcn base (button, command…)
│   ├── lib/site-data.ts    → todo o copy do site (textos, planos, FAQ…)
│   ├── App.tsx              → composição das seções
│   └── index.css            → tokens de cor (claro/escuro), fontes, grid
├── public/                  → favicon, imagens, wireframe do case real
├── .github/workflows/deploy.yml → publica em GitHub Pages a cada push
└── components.json           → config do shadcn CLI (registry @unlumen-ui)
```

---

## O que trocar antes de publicar

Todo o conteúdo editável (textos, WhatsApp, e-mail, planos, FAQ, GitHub
account do widget de commits) está centralizado em
[`src/lib/site-data.ts`](src/lib/site-data.ts) — não precisa mexer nos
componentes visuais pra atualizar copy.

1. **WhatsApp / e-mail**: objeto `CONTACT` no topo do arquivo.
2. **Estatísticas**: array `STATS` — números ilustrativos, ajuste pra sua
   realidade.
3. **Planos e preços**: array `PLANS`.
4. **Portfólio**: `PORTFOLIO_SECONDARY` (cards ilustrativos) — o case real
   (Amazon Visto) está direto em
   [`src/components/site/portfolio.tsx`](src/components/site/portfolio.tsx).
5. **GitHub do widget de commits** (hero): `CONTACT.githubAccount` — hoje
   aponta pro perfil pessoal (`cardosodan`); troque se quiser outro.
6. **`public/images/og-image.jpg`**: crie essa imagem (1200×630px) pra
   aparecer bonita ao compartilhar o link — o `<meta property="og:image">`
   em `index.html` já espera esse arquivo.

---

## Adicionar mais componentes do Unlumen UI

```bash
npx shadcn@latest add @unlumen-ui/nome-do-componente
```

Funciona sem autenticação pros componentes gratuitos (a maioria). Os
marcados como `premium` no registry (`gravity-stars`, `dia-text-reveal`,
`smart-animate-text`, etc.) exigem uma licença paga — nesse caso o CLI avisa
pedindo `UNLUMEN_LICENSE_KEY`.

Alguns componentes do registry assumem Next.js (`next/image`, `next/navigation`,
`next-themes`) — se o novo componente importar algo de `next/...`, ajuste
manualmente (trocar `next/image` por `<img>`, `useRouter` do
`next/navigation` por navegação simples) do mesmo jeito que já foi feito em
`scroll-reveal-image.tsx` e `command-menu.tsx`.

---

## Deploy no GitHub Pages

Já vem pronto: `.github/workflows/deploy.yml` builda e publica a `dist/`
automaticamente a cada push na branch `main` (usando
`actions/deploy-pages`). Só precisa habilitar em **Settings → Pages → Source:
GitHub Actions** no repositório, uma vez.

`vite.config.ts` usa `base: './'` (caminhos relativos), então funciona tanto
em `usuario.github.io` quanto em `usuario.github.io/nome-do-repo` sem
configuração extra.

---

## Detalhes de implementação

- **Cores**: tokens em `src/index.css` (`:root` = claro, `.dark` =
  escuro) — acento único "signal" (lima/chartreuse, `oklch(0.84 0.21 126)`)
  no lugar do gradiente roxo-índigo-ciano genérico de SaaS de IA.
- **Tipografia**: Sora (display/headings) + Inter (texto corrido) +
  JetBrains Mono (rótulos/coordenadas tipo devtools).
- **Tema claro/escuro**: `next-themes`, toggle no canto superior direito.
  Escuro é o padrão (`defaultTheme="dark"`).
- **Sem three.js**: o brilho de fundo do hero é CSS puro (blobs radiais com
  blur, animados via Motion) — o pacote `@unlumen-ui/aurora-blur` (WebGL)
  foi avaliado mas descartado por adicionar ~800kb ao bundle só por um
  efeito decorativo, inconsistente com o diferencial de performance que o
  próprio site promete.
