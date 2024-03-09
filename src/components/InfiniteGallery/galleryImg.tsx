import { GalleryItem } from '@/types/gallery'
import { useContext } from 'react'
import { FavoritesContext } from '@/favoriteContext'

const GalleryImg = ({ item }: { item: GalleryItem }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const handleFavoriteButton = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id)
    } else {
      addFavorite(item)
    }
  }

  return (
    <div className="gallery-item">
      <img src={item.src} alt={item.alt} />

      <div className="gallery-item-info">
        <h4 className="title">{item.alt}</h4>
        <h6 className="photographer">{item.photographer}</h6>
        <button
          className={`favorite-button ${isFavorite(item.id) ? 'favorited' : ''}`}
          onClick={handleFavoriteButton}
        >
          Favorite
        </button>
      </div>
    </div>
  )
}

export default GalleryImg
