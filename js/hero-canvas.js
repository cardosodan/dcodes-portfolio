/* ==========================================================================
   DCODES — NUVEM DE PARTÍCULAS 3D DO HERO (three.js)
   ==========================================================================
   Camada extra por cima dos blobs CSS já existentes (nunca os substitui) —
   se o WebGL não existir/falhar aqui, os blobs sozinhos já sustentam o
   visual do hero, sem nenhum buraco perceptível. Módulo isolado de
   propósito: um erro aqui nunca deve derrubar o menu/reveal/contadores de
   main.js.
   ========================================================================== */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js";

(function iniciar() {
  const canvas = document.getElementById("heroCanvas");
  const hero = document.getElementById("inicio");
  if (!canvas || !hero) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch (erro) {
    return; // sem WebGL (dispositivo antigo/contexto negado) — sem problema
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 18;

  function ajustarTamanho() {
    const largura = hero.clientWidth;
    const altura = hero.clientHeight;
    renderer.setSize(largura, altura, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.aspect = largura / Math.max(altura, 1);
    camera.updateProjectionMatrix();
  }

  /* Nuvem de partículas na paleta da marca (violeta → índigo → ciano, o
     mesmo --gradiente-principal usado em botões/logo). */
  const CONTAGEM = 240;
  const posicoes = new Float32Array(CONTAGEM * 3);
  const cores = new Float32Array(CONTAGEM * 3);
  const paleta = [new THREE.Color("#8b5cf6"), new THREE.Color("#6366f1"), new THREE.Color("#22d3ee")];

  for (let i = 0; i < CONTAGEM; i++) {
    posicoes[i * 3] = (Math.random() - 0.5) * 34;
    posicoes[i * 3 + 1] = (Math.random() - 0.5) * 20;
    posicoes[i * 3 + 2] = (Math.random() - 0.5) * 16;

    const cor = paleta[i % paleta.length];
    cores[i * 3] = cor.r;
    cores[i * 3 + 1] = cor.g;
    cores[i * 3 + 2] = cor.b;
  }

  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute("position", new THREE.BufferAttribute(posicoes, 3));
  geometria.setAttribute("color", new THREE.BufferAttribute(cores, 3));

  // Textura de ponto com falloff suave (glow) desenhada em <canvas> — sem
  // depender de nenhum arquivo de imagem externo (mesmo princípio do
  // favicon.svg "gerado por código" já usado no projeto).
  const texturaCanvas = document.createElement("canvas");
  texturaCanvas.width = 64;
  texturaCanvas.height = 64;
  const ctx = texturaCanvas.getContext("2d");
  const gradiente = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradiente.addColorStop(0, "rgba(255,255,255,1)");
  gradiente.addColorStop(0.4, "rgba(255,255,255,0.45)");
  gradiente.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, 0, 64, 64);
  const textura = new THREE.CanvasTexture(texturaCanvas);

  const material = new THREE.PointsMaterial({
    size: 0.62,
    map: textura,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const pontos = new THREE.Points(geometria, material);
  scene.add(pontos);

  ajustarTamanho();
  window.addEventListener("resize", ajustarTamanho);

  // Parallax bem sutil com o mouse — só em telas com mouse de verdade.
  let alvoX = 0;
  let alvoY = 0;
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("pointermove", (evento) => {
      alvoX = (evento.clientX / window.innerWidth - 0.5) * 2;
      alvoY = (evento.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  // Só anima enquanto o hero está visível e a aba está em foco — evita
  // gastar CPU/bateria à toa com a página rolada lá pra baixo.
  let heroVisivel = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entrada]) => { heroVisivel = entrada.isIntersecting; },
      { threshold: 0 }
    ).observe(hero);
  }

  let relogio = 0;
  function animar() {
    requestAnimationFrame(animar);
    if (!heroVisivel || document.hidden) return;

    relogio += 0.0022;
    pontos.rotation.y = relogio;
    pontos.rotation.x = Math.sin(relogio * 0.6) * 0.08;

    camera.position.x += (alvoX * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (-alvoY * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animar();
})();
