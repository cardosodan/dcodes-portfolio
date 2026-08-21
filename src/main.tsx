import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'
import { FloatingTooltip } from '@/components/unlumen-ui/floating-tooltip'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user": toda animação Motion do site (hero, reveals,
        dock, glow, etc.) reduz automaticamente pra quem tem
        prefers-reduced-motion ativado no SO — sem precisar checar isso em
        cada componente individualmente. */}
    <MotionConfig reducedMotion="user">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <FloatingTooltip.Provider variant="outline" size="md">
          <App />
        </FloatingTooltip.Provider>
      </ThemeProvider>
    </MotionConfig>
  </StrictMode>,
)
