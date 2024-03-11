import { GalleryItem } from '@/types/gallery'
import { useContext } from 'react'
import { FavoritesContext } from '@/contexts/favoriteContext'
import { LightBoxContext } from '@/contexts/lightBoxContext'
import { PER_PAGE } from '@/constants'

interface GalleryImgProps {
  item: GalleryItem
  idx: number
}

const GalleryImg = ({ item, idx }: GalleryImgProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)
  const { onShow } = useContext(LightBoxContext)

  const handleFavoriteButton = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id)
    } else {
      addFavorite(item.id)
    }
  }

  const handleShowLightBox = () => {
    onShow(item)
  }

  return (
    <div className="gallery-item">
      <img src={item.src.x} alt={item.alt} loading={idx <= PER_PAGE ? 'eager' : 'lazy'} />
      <div className="gallery-item-info" onClick={handleShowLightBox}>
        <h4 className="title">{item.alt}</h4>
        <h6 className="photographer">{item.photographer}</h6>
        <button
          className={`favorite-button ${isFavorite(item.id) ? 'favorited' : ''}`}
          onClick={handleFavoriteButton}
        >
          Favorite {isFavorite(item.id) ? '✔️' : ''}
        </button>
      </div>
    </div>
  )
}

export default GalleryImg
