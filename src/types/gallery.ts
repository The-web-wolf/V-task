export type PexelsPhoto = {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export type PexelsGalleryResponse =
  | {
      total_results: number
      page: number
      per_page: number
      photos: PexelsPhoto[]
      next_page: string
    }
  | {
      error: string
    }

export type GalleryItem = {
  id: number
  photographer: string
  url: string
  src: {
    x: string
    xx: string
  }
  alt: string
}

export type InfiniteGalleryProps = {
  gallery: GalleryItem[]
  onFetchPhotos: () => Promise<void>
  loading: boolean
  canFetch: boolean
  onUpdateLoadingState: (state: boolean) => void
}

export type FavoriteItem = {
  id: number
}

export type FavoriteContextProps = {
  favorites: FavoriteItem[]
  isFavorite: (id: number) => boolean
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
}

export interface LightBoxItem extends GalleryItem {}

export type LightBoxContextProps = {
  lightbox: LightBoxItem | null
  imgLoaded: boolean
  idxInfoText: string
  canFetch: boolean
  onShow: (item: GalleryItem) => void
  onClose: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
  onNext: () => void
  onPrev: () => void
  onImgLoaded: () => void
  onFetchPhotos: () => Promise<void>
}

export type LightBoxProviderProps = {
  children: React.ReactNode
  gallery: GalleryItem[]
  canFetch: boolean
  onFetchPhotos: () => Promise<void>
}

export type FavoriteProviderProps = {
  children: React.ReactNode
}
