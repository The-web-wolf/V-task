// gallery type

export type GalleryItem = {
  id: number
  photographer: string
  url: string
  src: string
  alt?: string
  favorite?: boolean
}

export type GalleryResponse = {
  next_page: string
  page: number
  per_page: number
  photos: GalleryItem[]
  total_results: number
}

export type FavoriteProvider = {
  favorites: GalleryItem[]
  isFavorite: (id: number) => boolean
  addFavorite: (item: GalleryItem) => void
  removeFavorite: (id: number) => void
}
