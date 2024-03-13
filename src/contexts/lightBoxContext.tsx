import { createContext, useEffect, useState } from 'react'

import type {
  LightBoxContextProps,
  LightBoxProviderProps,
  LightBoxItem,
  GalleryItem,
} from '@/types/gallery'

const LightBoxContext = createContext<LightBoxContextProps>({} as LightBoxContextProps)

const LightBoxProvider = ({
  children,
  canFetch,
  gallery,
  onFetchPhotos,
}: LightBoxProviderProps) => {
  const [lightbox, setLightBox] = useState<LightBoxItem | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [idxInfoText, setIdxInfoText] = useState('')

  const onShow = (item: GalleryItem) => {
    setLightBox(item)
    setImgLoaded(false)
    document.body.classList.add('no-scroll')
  }

  const onClose = () => {
    setLightBox(null)
    document.body.classList.remove('no-scroll')
  }
  const hasNext = () => {
    if (!lightbox) return false
    const idx = gallery.findIndex((i) => i.id === lightbox.id) // get the index of the current lightbox
    return idx < gallery.length - 1 // check if the current lightbox is not the last one
  }
  const hasPrev = () => {
    if (!lightbox) return false
    const idx = gallery.findIndex((i) => i.id === lightbox.id)
    return idx > 0
  }

  const onNext = () => {
    if (!lightbox) return
    setImgLoaded(false)
    const idx = gallery.findIndex((i) => i.id === lightbox.id)
    if (idx < gallery.length - 1) {
      setLightBox(gallery[idx + 1])
    }
  }

  const onPrev = () => {
    if (!lightbox) return
    setImgLoaded(false)
    const idx = gallery.findIndex((i) => i.id === lightbox.id)
    if (idx > 0) {
      setLightBox(gallery[idx - 1])
    }
  }

  const onImgLoaded = () => {
    setImgLoaded(true)
  }

  useEffect(() => {
    if (lightbox) {
      const idx = gallery.findIndex((i) => i.id === lightbox.id)
      setIdxInfoText(`${idx + 1} / ${gallery.length}`)
    }
  }, [lightbox, gallery])

  return (
    <LightBoxContext.Provider
      value={{
        canFetch,
        lightbox,
        imgLoaded,
        idxInfoText,
        onShow,
        onClose,
        hasNext,
        hasPrev,
        onNext,
        onPrev,
        onImgLoaded,
        onFetchPhotos,
      }}
    >
      {children}
    </LightBoxContext.Provider>
  )
}

export { LightBoxContext, LightBoxProvider }
