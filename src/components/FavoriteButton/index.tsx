import { useContext } from 'react'
import { FavoritesContext } from '@/contexts/favoriteContext'
import './style.scss'

const FavoriteButton = ({ id, showText = true }: { id: number; showText?: boolean }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const handleFavoriteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <button
      className={`favorite-button ${isFavorite(id) ? 'favorited' : ''}`}
      onClick={handleFavoriteButton}
      aria-label="Favorite"
      title="Favorite"
    >
      {showText ? 'Favorite ' : ''}
      <span className="material-symbols-rounded">
        {isFavorite(id) ? 'favorite' : showText ? '' : 'favorite'}
      </span>
    </button>
  )
}

export default FavoriteButton
