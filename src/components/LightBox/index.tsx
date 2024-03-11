import { useContext, useEffect } from 'react'
import { LightBoxContext } from '@/contexts/lightBoxContext'
import Loader from '@/components/Loader'
import './style.scss'

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
        </div>
      )}
      <button className="prev" onClick={onPrev} disabled={!hasPrev()} aria-label="Prev">
        &larr;
      </button>
      <button className="next" onClick={onNext} disabled={!hasNext()} aria-label="Next">
        &rarr;
      </button>
      <button className="close" onClick={onClose} aria-label="Close">
        &times;
      </button>
    </div>
  )
}

export default LightBox
