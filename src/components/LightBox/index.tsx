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
    hasNext,
    hasPrev,
    onNext,
    onPrev,
    onClose,
    onImgLoaded,
    onFetchPhotos,
  } = useContext(LightBoxContext)

  const handleNext = async () => {
    if (hasNext()) {
      onNext()
    } else {
      onFetchPhotos()
    }
  }

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
    <div className={`lightboxWrapper ${lightbox ? 'show' : ''}`} aria-hidden={!lightbox}>
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
          <button className="prev" onClick={onPrev} disabled={!hasPrev()} aria-label="Prev">
            &larr;
          </button>
          <button className="next" onClick={handleNext} aria-label="Next">
            {hasNext() ? <span>&rarr;</span> : '...'}
          </button>
          <div className="header">
            <FavoriteButton id={lightbox.id} showText={false} />
            <button className="close" onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LightBox
