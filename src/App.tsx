import { useState } from 'react'
import { createClient } from 'pexels'
import InfiniteGallery from '@/components/InfiniteGallery'
import type { GalleryItem } from '@/types/gallery'
import { PER_PAGE, TOTAL_LIMIT, QUERY } from '@/constants'

function App() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const client = createClient(import.meta.env.VITE_PEXELS_API_KEY)

  interface PhotosPayload {
    page: number
  }

  const fetchPhotos = async ({ page }: PhotosPayload) => {
    if (gallery.length >= TOTAL_LIMIT) {
      console.log("Don't you think that's enough? 🤔")
      return
    }
    setLoading(true)
    try {
      const response = await client.photos.search({
        query: QUERY,
        per_page: PER_PAGE,
        page,
      })
      if ('photos' in response) {
        const photos = response.photos.map((photo) => ({
          id: photo.id,
          photographer: photo.photographer,
          url: photo.url,
          src: photo.src.medium,
          alt: photo.alt || 'No title',
        }))
        setGallery((gallery) => [...gallery, ...photos])
        setPage(page + 1)
      }
    } catch (error) {
      console.error(error)
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    fetchPhotos({ page })
  }
  return (
    <>
      {error && <div className="err">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      <InfiniteGallery gallery={gallery} />
      {!loading && !error && (
        <div className="load-more">
          <button onClick={loadMore}>Load More {page} </button>
        </div>
      )}
    </>
  )
}

export default App
