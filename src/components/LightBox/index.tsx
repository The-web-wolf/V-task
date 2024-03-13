import { useContext, useEffect } from 'react'
import { LightBoxContext } from '@/contexts/lightBoxContext'
import Loader from '@/components/Loader'
import './style.scss'
import FavoriteButton from '@/components/FavoriteButton'

const LightBox = () => {
  const {
    lightbox,
    imgLoaded,
    idxInfoText,
    canFetch,
    hasNext,
    hasPrev,
    onNext,
    onPrev,
    onClose,
    onImgLoaded,
    onFetchPhotos,
  } = useContext(LightBoxContext)

  // events listener for keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && hasNext()) {
        onNext()
      }
      if (e.key === 'ArrowLeft' && hasPrev()) {
        onPrev()
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [hasNext, hasPrev, onNext, onPrev, onClose])

  return (
    <div
      className={`lightboxWrapper ${lightbox ? 'show' : ''}`}
      aria-hidden={!lightbox}
      role="lightbox"
    >
      {lightbox && (
        <div className="lightbox">
          <div className="lightboxInfo">
            <h6 className="idxInfo">{idxInfoText}</h6>
            <h4 className="title">{lightbox.alt}</h4>
            <h6 className="photographer">
              <span>Photograher </span>
              {lightbox.photographer}
            </h6>
          </div>
          <div className="img">
            <img
              src={lightbox.src.xx}
              alt={lightbox.alt}
              onLoad={onImgLoaded}
              className={`mainImg ${imgLoaded ? 'loaded' : ''}`}
            />
            {!imgLoaded && (
              <div className="loadingImg">
                <Loader theme="dark" />
              </div>
            )}
          </div>
          <button
            className="prev material-symbols-rounded"
            onClick={onPrev}
            disabled={!hasPrev()}
            aria-label="Prev"
          >
            west
          </button>
          {(hasNext() || !canFetch) && (
            <button
              className="next material-symbols-rounded"
              onClick={onNext}
              aria-label="Next"
              disabled={!hasNext()}
            >
              east
            </button>
          )}
          {!hasNext() && canFetch && (
            <button
              className="fetch-more material-symbols-rounded"
              onClick={onFetchPhotos}
              aria-label="Fetch more photos"
            >
              steppers
            </button>
          )}

          <div className="header">
            <FavoriteButton id={lightbox.id} showText={false} />
            <button className="close material-symbols-rounded" onClick={onClose} aria-label="Close">
              close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LightBox
