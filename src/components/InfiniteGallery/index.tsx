import { useEffect, useRef } from 'react'
import type { GalleryItem } from '@/types/gallery'
import GalleryImg from './galleryImg'
import './styles.scss'

const InfiniteGallery = ({
  gallery,
  onFetchPhotos,
  loading,
  updateLoadingState,
}: {
  gallery: GalleryItem[]
  onFetchPhotos: () => Promise<void>
  loading: boolean
  updateLoadingState: (state: boolean) => void
}) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastGalleryItem = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (lastGalleryItem.current) {
      const options = {
        rootMargin: '50px',
      }

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          updateLoadingState(true)
          setTimeout(async () => {
            await onFetchPhotos()
            updateLoadingState(false)
          }, 500) // gives a little debounce effect
        }
      }, options)

      observer.current.observe(lastGalleryItem.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [onFetchPhotos, loading, updateLoadingState])

  return (
    <div className="gallery">
      {gallery.map((item, index) => {
        if (index === gallery.length - 1) {
          return (
            <div key={item.id} ref={lastGalleryItem}>
              <GalleryImg item={item} />
            </div>
          )
        }
        return <GalleryImg key={item.id} item={item} />
      })}
    </div>
  )
}

export default InfiniteGallery
