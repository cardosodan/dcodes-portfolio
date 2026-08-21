/* ==========================================================================
   DCODES — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade é uma função separada,
   com verificação de existência dos elementos no início — se uma seção for
   removida do HTML, a função correspondente simplesmente não faz nada, sem
   quebrar as outras.
   ========================================================================== */

const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  ativarAvisoDispensavel();
  ativarMenuMobile();
  ativarSombraDoCabecalhoAoRolar();
  ativarRevelacaoAoRolar();
  ativarLinkAtivoNaNavegacao();
  ativarContadores();
  ativarBotaoTopo();
  atualizarAnoDoRodape();
  ativarBotoesMagneticos();
  ativarCartoesComGlow();
});

/* --------------------------------------------------------------------------
   1. BARRA DE AVISO
   Fecha e lembra a escolha (localStorage) pra não voltar a mostrar depois
   de dispensada. Protegido com try/catch: em alguns navegadores/modos de
   privacidade o acesso ao localStorage pode lançar erro.
   -------------------------------------------------------------------------- */
function ativarAvisoDispensavel() {
  const aviso = document.getElementById("aviso");
  const botaoFechar = document.getElementById("botaoFecharAviso");
  if (!aviso || !botaoFechar) return;

  const chave = "dcodesAvisoFechado";

  try {
    if (localStorage.getItem(chave) === "1") {
      aviso.classList.add("aviso--escondida");
      return;
    }
  } catch (erro) {
    /* segue sem lembrar a escolha */
  }

  botaoFechar.addEventListener("click", () => {
    aviso.classList.add("aviso--escondida");
    try {
      localStorage.setItem(chave, "1");
    } catch (erro) {
      /* sem problema, só não vai lembrar na próxima visita */
    }
  });
}

/* --------------------------------------------------------------------------
   2. MENU MOBILE (painel deslizante + fundo escurecido)
   -------------------------------------------------------------------------- */
function ativarMenuMobile() {
  const botaoAbrir = document.getElementById("botaoMenuMobile");
  const botaoFechar = document.getElementById("botaoFecharMenu");
  const navegacao = document.getElementById("navegacao");
  const fundo = document.getElementById("navegacaoFundo");
  if (!botaoAbrir || !navegacao || !fundo) return;

  let fecharComAtraso = null;

  const abrirMenu = () => {
    if (fecharComAtraso) {
      clearTimeout(fecharComAtraso);
      fecharComAtraso = null;
    }
    fundo.hidden = false;
    requestAnimationFrame(() => {
      navegacao.classList.add("navegacao--aberta");
      fundo.classList.add("navegacao__fundo--visivel");
    });
    botaoAbrir.setAttribute("aria-expanded", "true");
    botaoAbrir.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  };

  const fecharMenu = () => {
    navegacao.classList.remove("navegacao--aberta");
    fundo.classList.remove("navegacao__fundo--visivel");
    botaoAbrir.setAttribute("aria-expanded", "false");
    botaoAbrir.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
    fecharComAtraso = window.setTimeout(() => {
      fundo.hidden = true;
    }, 450);
  };

  botaoAbrir.addEventListener("click", () => {
    const estaAberto = navegacao.classList.contains("navegacao--aberta");
    estaAberto ? fecharMenu() : abrirMenu();
  });

  if (botaoFechar) botaoFechar.addEventListener("click", fecharMenu);
  fundo.addEventListener("click", fecharMenu);

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharMenu();
  });
}

/* --------------------------------------------------------------------------
   3. SOMBRA/FUNDO SÓLIDO NO CABEÇALHO AO ROLAR
   -------------------------------------------------------------------------- */
function ativarSombraDoCabecalhoAoRolar() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  const verificarRolagem = () => {
    cabecalho.classList.toggle("cabecalho--rolado", window.scrollY > 12);
  };

  verificarRolagem();
  window.addEventListener("scroll", verificarRolagem, { passive: true });
}

/* --------------------------------------------------------------------------
   4. ANIMAÇÃO DE ENTRADA AO ROLAR (SCROLL REVEAL)
   Usa GSAP + ScrollTrigger quando disponível (stagger automático por
   grupo, easing mais rico) — com fallback pro IntersectionObserver puro
   de antes se o GSAP não tiver carregado por qualquer motivo (bloqueio de
   CDN, ad blocker agressivo etc.), pra nunca deixar conteúdo preso em
   opacity:0 pra sempre.
   -------------------------------------------------------------------------- */
function ativarRevelacaoAoRolar() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  if (prefereMenosMovimento) {
    elementos.forEach((el) => el.classList.add("reveal--visivel"));
    return;
  }

  const gsapDisponivel = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (!gsapDisponivel) {
    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("reveal--visivel"));
      return;
    }
    const observadorFallback = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("reveal--visivel");
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    elementos.forEach((el) => observadorFallback.observe(el));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Marca o estado inicial via gsap.set (inline style, fácil de depurar no
  // devtools) em vez de depender só do opacity:0 do CSS — se algo impedir
  // o ScrollTrigger.batch de disparar depois, ainda dá pra achar a causa
  // rápido inspecionando o elemento.
  gsap.set(elementos, { opacity: 0, y: 26 });

  ScrollTrigger.batch(elementos, {
    start: "top 88%",
    once: true,
    onEnter: (lote) => {
      // IMPORTANTE: nunca usar clearProps aqui — a CSS base de .reveal é
      // opacity:0 (pensada pro toggle de classe .reveal--visivel do
      // fallback), então "limpar" o estilo inline reverteria pra
      // invisível de novo em vez de mostrar. Sempre valores explícitos.
      gsap.to(lote, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true,
      });
    },
  });

  // Rede de segurança GLOBAL — bug real encontrado depois (mesma causa no
  // CalculaBR): uma versão anterior desta rede ficava DENTRO do onEnter
  // acima, ou seja, só disparava se o ScrollTrigger já tivesse disparado
  // primeiro. Se o gatilho de rolagem nunca dispara pra um lote (posição
  // calculada errada por causa de fonte/imagem carregando tarde, usuário
  // pulando com Page Down/teclado, etc.), esse lote inteiro ficava
  // opacity:0 pra sempre — sem essa rede aqui embaixo, incondicional.
  // gsap.set num elemento que já está visível é inofensivo (idempotente).
  setTimeout(() => gsap.set(elementos, { opacity: 1, y: 0 }), 5000);

  // Corrige a causa raiz também (não só o sintoma): recalcula a posição
  // de todos os gatilhos depois que fontes/imagens terminarem de carregar
  // e o layout parar de se mexer — prática oficial recomendada pelo GSAP.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/* --------------------------------------------------------------------------
   5. DESTACAR O LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
   -------------------------------------------------------------------------- */
function ativarLinkAtivoNaNavegacao() {
  const secoes = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".navegacao__link");
  if (!secoes.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkPorId = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkPorId.set(id, link);
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const link = linkPorId.get(entrada.target.id);
        if (!link) return;
        if (entrada.isIntersecting) {
          links.forEach((l) => l.classList.remove("navegacao__link--ativo"));
          link.classList.add("navegacao__link--ativo");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secoes.forEach((secao) => observador.observe(secao));
}

/* --------------------------------------------------------------------------
   6. CONTADORES ANIMADOS (seção de estatísticas)
   -------------------------------------------------------------------------- */
function ativarContadores() {
  const elementos = document.querySelectorAll("[data-contador]");
  if (!elementos.length) return;

  const gsapDisponivel = typeof window.gsap !== "undefined";

  const animar = (elemento) => {
    const alvo = parseInt(elemento.dataset.contador, 10);
    const sufixo = elemento.dataset.sufixo || "";

    if (prefereMenosMovimento) {
      elemento.textContent = alvo + sufixo;
      return;
    }

    if (gsapDisponivel) {
      // Tween sobre um objeto comum (não o DOM diretamente) — o GSAP
      // interpola "valor", o onUpdate escreve o texto formatado.
      const estado = { valor: 0 };
      let finalizado = false;
      const finalizar = () => {
        if (finalizado) return;
        finalizado = true;
        elemento.textContent = alvo + sufixo;
      };
      gsap.to(estado, {
        valor: alvo,
        duration: 1.7,
        ease: "power3.out",
        onUpdate: () => { if (!finalizado) elemento.textContent = Math.round(estado.valor) + sufixo; },
        onComplete: finalizar,
      });
      // Rede de segurança: garante o número final certo mesmo se o tween
      // travar no meio (rAF irregular) — nunca deixa um valor errado
      // parado na tela (ver mesmo cuidado em ScrollTrigger.batch acima).
      setTimeout(finalizar, 2900);
      return;
    }

    if (!window.requestAnimationFrame) {
      elemento.textContent = alvo + sufixo;
      return;
    }

    const duracao = 1600;
    const inicio = performance.now();

    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3);
      elemento.textContent = Math.round(alvo * suavizado) + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
    };

    requestAnimationFrame(passo);
  };

  if (!("IntersectionObserver" in window)) {
    elementos.forEach(animar);
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          animar(entrada.target);
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   7. BOTÃO "VOLTAR AO TOPO"
   -------------------------------------------------------------------------- */
function ativarBotaoTopo() {
  const botao = document.getElementById("botaoTopo");
  if (!botao) return;

  botao.hidden = false;

  const verificarRolagem = () => {
    botao.classList.toggle("topo-flutuante--visivel", window.scrollY > 480);
  };

  verificarRolagem();
  window.addEventListener("scroll", verificarRolagem, { passive: true });

  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefereMenosMovimento ? "auto" : "smooth" });
  });
}

/* --------------------------------------------------------------------------
   8. ANO ATUAL NO RODAPÉ
   -------------------------------------------------------------------------- */
function atualizarAnoDoRodape() {
  const spanAno = document.getElementById("anoAtual");
  if (!spanAno) return;
  spanAno.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   9. BOTÕES "MAGNÉTICOS" (seguem o cursor levemente)
   Só em telas com mouse de verdade (hover:hover + pointer:fine) — em touch
   não faz sentido e pointermove ali seria só ruído. Usa gsap.quickTo (mais
   leve que gsap.to repetido — reaproveita o mesmo tween interpolado a cada
   chamada, feito exatamente pra isso: atualizar posição em alta frequência).
   -------------------------------------------------------------------------- */
function ativarBotoesMagneticos() {
  if (prefereMenosMovimento) return;
  if (typeof window.gsap === "undefined") return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const FORCA = 0.3;
  document.querySelectorAll(".botao--grande").forEach((botao) => {
    const moverX = gsap.quickTo(botao, "x", { duration: 0.5, ease: "power3" });
    const moverY = gsap.quickTo(botao, "y", { duration: 0.5, ease: "power3" });

    botao.addEventListener("pointermove", (evento) => {
      const caixa = botao.getBoundingClientRect();
      moverX((evento.clientX - caixa.left - caixa.width / 2) * FORCA);
      moverY((evento.clientY - caixa.top - caixa.height / 2) * FORCA);
    });

    botao.addEventListener("pointerleave", () => {
      moverX(0);
      moverY(0);
    });
  });
}

/* --------------------------------------------------------------------------
   10. CARTÕES COM GLOW QUE SEGUE O CURSOR ("spotlight card")
   Atualiza --spot-x/--spot-y (lidas pelo ::before em style.css) com a
   posição do cursor relativa ao cartão. Só em telas com mouse — em touch o
   glow simplesmente nunca acontece (comportamento normal, sem prejuízo).
   -------------------------------------------------------------------------- */
function ativarCartoesComGlow() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".cartao-servico, .cartao-plano").forEach((cartao) => {
    cartao.addEventListener("pointermove", (evento) => {
      const caixa = cartao.getBoundingClientRect();
      cartao.style.setProperty("--spot-x", `${evento.clientX - caixa.left}px`);
      cartao.style.setProperty("--spot-y", `${evento.clientY - caixa.top}px`);
    });
  });
}
