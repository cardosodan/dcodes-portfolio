# Site da DCodes

Site institucional da própria DCodes — agência de criação de sites. Visual
escuro/premium, com animações, feito pra passar credibilidade e converter
visitante em contato (WhatsApp).

**Stack:** HTML + CSS + JavaScript puro. Sem build, sem framework, sem
dependência pra instalar (só o Google Fonts, via link no `<head>`). 100%
estático — funciona em qualquer hospedagem, inclusive gratuitas.

---

## Estrutura

```
dcodes-site/
├── index.html          → todo o conteúdo do site
├── css/style.css        → visual: cores, fontes, layout, animações
├── js/main.js             → menu mobile, animações de rolagem, contadores
├── images/
│   └── favicon.svg          → ícone da aba (logomarca "</>"), gerado por código
└── README.md
```

Não há fotos/imagens externas: o hero, o portfólio e os ícones são todos
desenhados em CSS/SVG puro (mockups de navegador, ícones, avatares com
iniciais). Isso significa que o site já sai "pronto" visualmente, mas os
textos e links marcados com `TROCAR` (Ctrl+F no `index.html`) ainda
precisam da sua informação real antes de publicar.

---

## O que trocar antes de publicar

Busque por `TROCAR` no `index.html` — é o mesmo padrão dos seus outros
templates. Pontos principais:

1. **WhatsApp**: procure `5511999999999` (aparece no cabeçalho, hero, seção
   de planos, CTA final, rodapé e botão flutuante) e troque pelo número
   real, só dígitos, formato `55` + DDD + número.
2. **E-mail**: procure `contato@dcodes.com.br` (2 ocorrências: CTA final e
   rodapé).
3. **Redes sociais**: no rodapé, troque os links de Instagram/LinkedIn/GitHub.
4. **Domínio final**: `og:url` no `<head>`, quando o domínio estiver definido
   (se `dcodes.com.br` não estiver disponível e o nome mudar, atualize
   também `<title>`, o texto do logo e as meta tags).
5. **Estatísticas** (seção logo abaixo do hero): os números (40+ projetos,
   98%, etc.) são ilustrativos — ajuste pra sua realidade atual, mesmo que
   comece com números menores/mais honestos.
6. **Planos e preços**: valores em `#planos` são só referência de mercado —
   ajuste pra sua precificação real.
7. **Depoimentos**: são fictícios/exemplo — troque pelos primeiros
   depoimentos reais assim que tiver (ou remova a seção se ainda não tiver
   nenhum).
8. **Portfólio**: o 1º card (Amazon Visto) já é um case real — usa a imagem
   `images/portfolio-amazonvisto.jpg` dentro de
   `<div class="mock-navegador__corpo mock-navegador__corpo--imagem">`. Os
   outros 5 cards ainda são "mockups de navegador" ilustrativos (representam
   estilos, não projetos reais) — troque cada um pelo mesmo padrão (uma
   imagem real dentro do `mock-navegador__corpo--imagem`) assim que tiver
   mais cases prontos.
9. **`images/og-image.jpg`**: crie essa imagem (1200×630px) com uma prévia
   do site pra aparecer bonita ao compartilhar o link no WhatsApp — o
   `<meta property="og:image">` já está pronto esperando esse arquivo.

---

## Testar localmente

Dê duplo clique em `index.html` (funciona offline, sem instalar nada) ou,
pra um teste mais parecido com produção:

```powershell
cd dcodes-site
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## Deploy gratuito

Mesmas opções do seu template de cliente — Netlify (arrastar a pasta em
[app.netlify.com](https://app.netlify.com)), Vercel (`vercel --prod`) ou
GitHub Pages. Veja o README de `site-institucional-estatico` pro passo a
passo detalhado de cada uma; o processo é idêntico.

Depois do deploy, se `dcodes.com.br` não estiver disponível: registre uma
alternativa (`.com`, `dcodes.dev`, `dcodescriativa.com.br`, etc.), aponte o
DNS pra hospedagem escolhida, e atualize `og:url` e o texto "DCodes" em
`index.html` se o nome final mudar.

---

## Detalhes de implementação (pra você, se for customizar depois)

- **Cores**: bloco `:root` no topo de `css/style.css` — a marca usa um
  gradiente violeta → índigo → ciano (`--gradiente-principal`), aplicado em
  botões, títulos de destaque, ícones e números da seção de estatísticas.
- **Tipografia**: "Sora" (títulos, mais geométrica/impactante) + "Inter"
  (texto corrido) + "JetBrains Mono" (etiquetas pequenas tipo `// serviços`,
  reforça a identidade "código/dev" da marca).
- **Animações**: reveal ao rolar (IntersectionObserver), contadores
  animados, botões "magnéticos" (seguem o cursor levemente — só em telas
  com mouse), tudo respeitando `prefers-reduced-motion` (quem tem essa
  preferência ativada no sistema vê tudo sem animação, direto).
- **Acessibilidade**: link de pular pro conteúdo, `aria-label`/`aria-expanded`
  no menu mobile, FAQ com `<details>/<summary>` nativo (funciona mesmo sem
  JavaScript).
- **Sem imagens externas**: o hero, o portfólio e os ícones são
  desenhados em CSS/SVG — se preferir usar fotos reais no lugar dos
  "mockups de navegador" (por exemplo, prints de projetos reais), é só
  trocar o bloco `.mock-navegador` correspondente por uma tag `<img>`.
