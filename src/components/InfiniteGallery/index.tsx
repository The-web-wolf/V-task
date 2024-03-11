import { useEffect, useRef } from 'react'
import type { GalleryItem } from '@/types/gallery'
import GalleryImg from './galleryImg'
import './style.scss'

const InfiniteGallery = ({
  gallery,
  onFetchPhotos,
  loading,
  onUpdateLoadingState,
}: {
  gallery: GalleryItem[]
  onFetchPhotos: () => Promise<void>
  loading: boolean
  onUpdateLoadingState: (state: boolean) => void
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
          onUpdateLoadingState(true)
          setTimeout(async () => {
            await onFetchPhotos()
            onUpdateLoadingState(false)
          }, 500) // gives a little debounce effect
        }
      }, options)

      observer.current.observe(lastGalleryItem.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [onFetchPhotos, loading, onUpdateLoadingState])

  return (
    <div className="gallery">
      {gallery.map((item, index) => {
        if (index === gallery.length - 1) {
          // add ref to the last img to use later for scroll
          return (
            <div key={item.id} ref={lastGalleryItem}>
              <GalleryImg item={item} idx={index} />
            </div>
          )
        }
        return <GalleryImg key={item.id} item={item} idx={index} />
      })}
    </div>
  )
}

export default InfiniteGallery
