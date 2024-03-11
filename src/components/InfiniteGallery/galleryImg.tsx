import { GalleryItem } from '@/types/gallery'
import { useContext } from 'react'
import { LightBoxContext } from '@/contexts/lightBoxContext'
import { PER_PAGE } from '@/constants'
import FavoriteButton from '@/components/FavoriteButton'

interface GalleryImgProps {
  item: GalleryItem
  idx: number
}

const GalleryImg = ({ item, idx }: GalleryImgProps) => {
  const { onShow } = useContext(LightBoxContext)

  const handleShowLightBox = () => {
    onShow(item)
  }

  return (
    <div className="gallery-item">
      <img src={item.src.x} alt={item.alt} loading={idx <= PER_PAGE ? 'eager' : 'lazy'} />
      <div className="gallery-item-info" onClick={handleShowLightBox}>
        <h4 className="title">{item.alt}</h4>
        <h6 className="photographer">{item.photographer}</h6>
        <FavoriteButton id={item.id} />
      </div>
    </div>
  )
}

export default GalleryImg
