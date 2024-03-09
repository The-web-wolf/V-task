import type { GalleryItem } from '@/types/gallery'
import GalleryImg from './galleryImg'
import './styles.scss'

const InfiniteGallery = ({ gallery }: { gallery: GalleryItem[] }) => {
  return gallery.length ? (
    <div className="gallery">
      {gallery.map((item) => (
        <GalleryImg key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <div className="no-images">No images found</div>
  )
}

export default InfiniteGallery
