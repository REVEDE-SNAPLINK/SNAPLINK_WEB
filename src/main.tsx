import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/global.css'
import App from './App.tsx'
import { useAuthStore } from '@/store/authStore'

// 앱 시작 시 인증 상태 복원
useAuthStore.getState().bootstrap();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
