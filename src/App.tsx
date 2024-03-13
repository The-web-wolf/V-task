import { useState, useContext, useEffect } from 'react'
import InfiniteGallery from '@/components/InfiniteGallery'
import type { GalleryItem } from '@/types/gallery'
import { PER_PAGE, TOTAL_LIMIT, QUERY } from '@/constants'
import { FavoritesContext } from '@/contexts/favoriteContext'
import Spinner from '@/components/Spinner'
import LightBox from '@/components/LightBox'
import { LightBoxProvider } from '@/contexts/lightBoxContext'
import queryPexels from '@/utils/query-pexels'

function App() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [canFetch, setCanFetch] = useState<boolean>(true)
  const { isFavorite } = useContext(FavoritesContext)

  const fetchPhotos = async () => {
    if (loading || !canFetch) return
    if (gallery.length >= TOTAL_LIMIT) {
      console.log("Don't you think that's enough? 🤔")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await queryPexels({
        query: QUERY,
        per_page: PER_PAGE,
        page,
      })

      // this makes sure that it is not an error response
      if ('photos' in response) {
        if (!response.photos.length || !response.next_page) {
          //if there are no more photos to fetch, stop fetching
          setCanFetch(false)

          //if there are no photos at all, show a message
          if (![...gallery, ...response.photos].length) {
            setError('Sorry, No photos found 😢')
          }
        }

        const photos = response.photos.map((photo) => {
          return {
            id: photo.id,
            photographer: photo.photographer,
            url: photo.url,
            src: {
              x: photo.src.medium,
              xx: photo.src.large2x,
            },
            alt: photo.alt || 'No Title',
            favorite: isFavorite(photo.id),
          }
        })
        setGallery((gallery) => [...gallery, ...photos])
        setPage((page) => page + 1)
      }
    } catch (error) {
      console.error(error)
      setError('Error fetching data, check the console for more info.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="AppContainer">
      <LightBoxProvider gallery={gallery} canFetch={canFetch} onFetchPhotos={fetchPhotos}>
        <LightBox />
        <InfiniteGallery
          canFetch={canFetch}
          gallery={gallery}
          onFetchPhotos={fetchPhotos}
          loading={loading}
          onUpdateLoadingState={(loadState: boolean) => setLoading(loadState)}
        />
      </LightBoxProvider>
      {error && <div className="error">{error}</div>}
      {loading && <Spinner />}
    </div>
  )
}

export default App
