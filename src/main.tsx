import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/main.scss'
import { FavoritesProvider } from '@/favoriteContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
)
