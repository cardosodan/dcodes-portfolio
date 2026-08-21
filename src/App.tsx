import Noise from "@/components/react-bits/Noise";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Portfolio } from "@/components/site/portfolio";
import { Differentials } from "@/components/site/differentials";
import { Plans } from "@/components/site/plans";
import { Faq } from "@/components/site/faq";
import { CtaFinal } from "@/components/site/cta-final";
import { Footer } from "@/components/site/footer";

function App() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      {/* Grão sutil sitewide (uiverse/Animista-style texture, via ReactBits) —
          refresh bem espaçado pra não ficar redesenhando o canvas 30x/s à
          toa: reforça a superfície "material" sem custo de CPU perceptível. */}
      <Noise patternAlpha={8} patternRefreshInterval={12} />

      <SiteNav />

      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Differentials />
        <Plans />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
    </>
  );
}

export default App;
