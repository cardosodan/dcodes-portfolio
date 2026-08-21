// Conteúdo central do site — copy migrado do dcodes-site original,
// separado da composição visual para os componentes ficarem data-driven.

export const CONTACT = {
  whatsappNumber: "5592992162419",
  whatsappUrl: (message: string) =>
    `https://wa.me/5592992162419?text=${encodeURIComponent(message)}`,
  email: "engdancardoso@gmail.com",
  githubAccount: "cardosodan",
};

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export const STATS = [
  { value: 40, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 10, suffix: " dias", label: "Prazo médio de entrega" },
  { value: 24, suffix: "/7", label: "Suporte após o lançamento" },
];

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  bullets: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "institucional",
    title: "Site Institucional",
    tag: "presença",
    description:
      "Presença profissional online, com design sob medida pra sua marca e estrutura pensada pra passar credibilidade.",
    bullets: [
      "Estrutura sob medida pro seu segmento",
      "Design exclusivo, sem template genérico",
      "Otimizado pra SEO desde a fundação",
    ],
  },
  {
    id: "landing",
    title: "Landing Page de Alta Conversão",
    tag: "conversão",
    description:
      "Página focada em resultado: captar leads, vender um produto ou lançar uma campanha com o máximo de conversão possível.",
    bullets: [
      "Copy e hierarquia focados em uma ação só",
      "Testado pra carregar rápido em 4G",
      "Pronta pra campanhas de tráfego pago",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    tag: "vendas",
    description:
      "Loja virtual completa, integrada a pagamento e pronta pra vender 24 horas por dia, todos os dias.",
    bullets: [
      "Catálogo, carrinho e checkout integrados",
      "Pagamento via Pix, cartão e boleto",
      "Painel de gestão de pedidos e estoque",
    ],
  },
  {
    id: "sistema",
    title: "Sistema Web Sob Medida",
    tag: "produto",
    description:
      "Aplicações, painéis e integrações feitas especificamente pra resolver o processo do seu negócio.",
    bullets: [
      "Levantamento de processo antes do código",
      "Painel administrativo sob medida",
      "Integrações com as ferramentas que você já usa",
    ],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Briefing",
    description:
      "Entendemos seu negócio, objetivo e público antes de desenhar qualquer tela.",
  },
  {
    number: "02",
    title: "Proposta",
    description: "Escopo, prazo e investimento claros, por escrito, antes de começar.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Protótipo visual do site pra você aprovar antes de qualquer linha de código.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Construção real do site: rápido, responsivo e otimizado pra buscadores.",
  },
  {
    number: "05",
    title: "Lançamento",
    description:
      "Site no ar, com suporte pós-entrega pra qualquer ajuste que precisar.",
  },
];

export interface PortfolioItem {
  title: string;
  category: string;
  stack: string[];
  icon: "shopping-cart" | "rocket" | "gauge" | "heartbeat" | "cube";
}

export const PORTFOLIO_SECONDARY: PortfolioItem[] = [
  { title: "E-commerce", category: "Loja virtual", stack: ["React", "Stripe", "Pix"], icon: "shopping-cart" },
  { title: "Landing Page", category: "Lançamento de produto", stack: ["Vite", "GSAP"], icon: "rocket" },
  { title: "Sistema Web", category: "Painel interno", stack: ["React", "Node", "Postgres"], icon: "gauge" },
  { title: "Saúde & Bem-estar", category: "Clínica / consultório", stack: ["HTML", "CSS", "JS"], icon: "heartbeat" },
  { title: "SaaS / Startup", category: "Página de produto", stack: ["Next.js", "Tailwind"], icon: "cube" },
];

export interface Differential {
  title: string;
  description: string;
  icon: "paint-brush" | "lightning" | "trend-up" | "device-mobile" | "headset" | "hand-coins";
  size: "lg" | "sm";
}

export const DIFFERENTIALS: Differential[] = [
  {
    title: "Design exclusivo",
    description: "Nada de template genérico — cada site é desenhado do zero pra sua marca.",
    icon: "paint-brush",
    size: "lg",
  },
  {
    title: "Performance de verdade",
    description: "Sites leves e rápidos, otimizados pelas métricas que o Google avalia.",
    icon: "lightning",
    size: "sm",
  },
  {
    title: "Suporte pós-entrega",
    description: "O site no ar não é o fim — continuamos por perto pra ajustes e dúvidas.",
    icon: "headset",
    size: "lg",
  },
  {
    title: "SEO desde o início",
    description: "Estrutura pensada pra ser encontrada no Google, não só bonita.",
    icon: "trend-up",
    size: "sm",
  },
  {
    title: "Responsivo de verdade",
    description: 'Testado em celular, tablet e desktop — não só "encolhido" pra caber.',
    icon: "device-mobile",
    size: "sm",
  },
  {
    title: "Preço justo e claro",
    description: "Orçamento fechado antes de começar, sem surpresa na fatura.",
    icon: "hand-coins",
    size: "sm",
  },
];

export interface Plan {
  name: string;
  description: string;
  price: string;
  priceLabel: string;
  featured?: boolean;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const PLANS: Plan[] = [
  {
    name: "Essencial",
    description: "Pra quem precisa de presença online rápida e profissional.",
    price: "R$ 897",
    priceLabel: "projeto único, a partir de",
    items: [
      "Site institucional de 1 página",
      "Design responsivo",
      "Formulário de contato",
      "Integração com WhatsApp",
      "SEO básico",
    ],
    ctaLabel: "Escolher plano",
    ctaHref: "#contato",
  },
  {
    name: "Profissional",
    description: "Pra negócios que querem crescer e converter mais visitantes.",
    price: "R$ 1.997",
    priceLabel: "projeto único, a partir de",
    featured: true,
    items: [
      "Site multi-página sob medida",
      "Design exclusivo pra sua marca",
      "Blog/seção de conteúdo",
      "SEO avançado + Google Analytics",
      "Integrações (WhatsApp, redes, formulários)",
      "30 dias de suporte após a entrega",
    ],
    ctaLabel: "Escolher plano",
    ctaHref: CONTACT.whatsappUrl("Olá, quero o plano Profissional."),
  },
  {
    name: "Sob Medida",
    description: "Pra e-commerces e sistemas com necessidades específicas.",
    price: "Sob consulta",
    priceLabel: "escopo personalizado",
    items: [
      "E-commerce completo ou sistema web",
      "Integrações de pagamento e API",
      "Painel administrativo",
      "Escalável pro tamanho do seu negócio",
      "Suporte contínuo sob contrato",
    ],
    ctaLabel: "Solicitar orçamento",
    ctaHref: "#contato",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Quanto tempo leva pra ficar pronto?",
    answer:
      "Depende do escopo: uma landing page costuma ficar pronta em 5 a 10 dias úteis; sites maiores e e-commerces levam de 3 a 6 semanas. Você recebe um prazo fechado ainda na proposta.",
  },
  {
    question: "Preciso ter o conteúdo (textos e fotos) pronto?",
    answer:
      "Ajuda bastante, mas não é obrigatório. A gente te orienta sobre o que é preciso e pode ajudar a organizar/redigir os textos se precisar.",
  },
  {
    question: "Vocês cuidam do domínio e da hospedagem?",
    answer:
      "Sim, ajudamos a registrar o domínio e colocar o site no ar numa hospedagem confiável — ou usamos a que você já tiver.",
  },
  {
    question: "Como funciona o suporte depois que o site vai ao ar?",
    answer:
      "Todo plano inclui um período de suporte pós-entrega pra ajustes e dúvidas. Depois disso, oferecemos planos de manutenção contínua opcionais.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Pix, transferência e cartão (com opção de parcelamento). O pagamento costuma ser dividido em etapas do projeto.",
  },
  {
    question: "O site funciona bem no celular?",
    answer:
      "Sim — todo site é construído e testado primeiro pensando em celular (a maioria dos visitantes acessa por lá), depois adaptado pra tablet e desktop.",
  },
];
