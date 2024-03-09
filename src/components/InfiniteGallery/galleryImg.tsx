import { GalleryItem } from '@/types/gallery'

const GalleryImg = ({ item }: { item: GalleryItem }) => {
  return (
    <div className="gallery-item">
      <img src={item.src} alt={item.alt} />

      <div className="gallery-item-info">
        <h4 className="title">{item.alt}</h4>
        <h6 className="author">{item.photographer}</h6>
        <button>Favorite</button>
      </div>
    </div>
  )
}

export default GalleryImg
