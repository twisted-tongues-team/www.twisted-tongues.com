import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { About } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <About />
  </StrictMode>,
)
