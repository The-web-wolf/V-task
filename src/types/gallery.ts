export type GalleryItem = {
  id: number
  photographer: string
  url: string
  src: {
    x: string
    xx: string
  }
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

export interface LightBoxItem extends GalleryItem {}

export type LightBoxProvider = {
  lightbox: LightBoxItem | null
  imgLoaded: boolean
  idxInfoText: string
  onShow: (item: GalleryItem) => void
  onClose: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
  onNext: () => void
  onPrev: () => void
  onImgLoaded: () => void
  onFetchPhotos: () => Promise<void>
}
