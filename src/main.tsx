import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { FloatingTooltip } from '@/components/unlumen-ui/floating-tooltip'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <FloatingTooltip.Provider variant="outline" size="md">
        <App />
      </FloatingTooltip.Provider>
    </ThemeProvider>
  </StrictMode>,
)
