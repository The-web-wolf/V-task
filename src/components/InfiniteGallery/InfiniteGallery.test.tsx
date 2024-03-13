import InfiniteGallery from '@/components/InfiniteGallery'
import { render, screen } from '@test-utils'

// mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

const InfiniteGalleryValues = ({
  gallery = [
    {
      id: 1,
      photographer: 'Emmanuel',
      url: 'https://example.com',
      src: {
        x: 'https://example.com/x',
        xx: 'https://example.com/xx',
      },
      alt: 'A nice photo',
    },
  ],
  canFetch = true,
  loading = false,
}: {
  canFetch?: boolean
  loading?: boolean
  gallery?:
    | {
        id: number
        photographer: string
        url: string
        src: { x: string; xx: string }
        alt: string
      }[]
    | []
}) => {
  const onUpdateLoadingState = vi.fn()
  const onFetchPhotos = vi.fn()
  return { canFetch, gallery, onFetchPhotos, loading, onUpdateLoadingState }
}

describe('InfiniteGallery', () => {
  it('Gets rendered', () => {
    render(<InfiniteGallery {...InfiniteGalleryValues({})} />)
    const gallery = screen.getByRole('gallery')
    expect(gallery).toBeInTheDocument()
  })

  it('Renders gallery items', () => {
    render(<InfiniteGallery {...InfiniteGalleryValues({})} />)
    const galleryItems = screen.getAllByRole('gallery-last-item')
    expect(galleryItems).toHaveLength(1)
  })

  it('Does not render gallery items when gallery is empty', () => {
    render(<InfiniteGallery {...InfiniteGalleryValues({ gallery: [] })} />)
    const galleryItems = screen.queryByRole('gallery-last-item')
    expect(galleryItems).not.toBeInTheDocument()
  })

  it('Calls the observer when canFetch is true', () => {
    render(<InfiniteGallery {...InfiniteGalleryValues({})} />)
    expect(IntersectionObserverMock).toHaveBeenCalled()
  })

  it('Doesnt call the observer when canFetch is false', () => {
    render(<InfiniteGallery {...InfiniteGalleryValues({ canFetch: false })} />)
    expect(IntersectionObserverMock).not.toHaveBeenCalled()
  })
})
