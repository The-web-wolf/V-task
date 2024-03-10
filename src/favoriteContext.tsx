import { createContext, useState, useEffect } from 'react'

import type { FavoriteProvider, FavoriteItem } from '@/types/gallery'

const FavoritesContext = createContext<FavoriteProvider>({} as FavoriteProvider)

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    if (data) {
      setFavorites(JSON.parse(data))
    }
  }, [])

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id)
  }

  const addFavorite = (id: number) => {
    if (!isFavorite(id)) {
      const newFavorites = [...favorites, { id }]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }
  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter((item) => item.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesContext, FavoritesProvider }
