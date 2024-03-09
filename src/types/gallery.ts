// gallery type

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
