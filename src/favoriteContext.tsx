import { createContext, useState, useEffect } from 'react'

import type { FavoriteProvider, GalleryItem } from '@/types/gallery'

const FavoritesContext = createContext<FavoriteProvider>({} as FavoriteProvider)

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<GalleryItem[]>([])

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    if (data) {
      setFavorites(JSON.parse(data))
    }
  }, [])

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id)
  }

  const addFavorite = (item: GalleryItem) => {
    if (!isFavorite(item.id)) {
      const newFavorites = [...favorites, { ...item, favorite: true }]
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
