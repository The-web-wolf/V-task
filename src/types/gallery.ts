export type GalleryItem = {
  id: number
  photographer: string
  url: string
  src: string
  alt?: string
}

export type GalleryResponse = {
  next_page: string
  page: number
  per_page: number
  photos: GalleryItem[]
  total_results: number
}

export type FavoriteItem = {
  id: number
}

export type FavoriteProvider = {
  favorites: FavoriteItem[]
  isFavorite: (id: number) => boolean
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
}
