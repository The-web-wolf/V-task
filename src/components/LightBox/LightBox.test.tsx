import { render, screen, fireEvent } from '@test-utils'
import LightBox from '@/components/LightBox'
import { LightBoxProvider, LightBoxContext } from '@/contexts/lightBoxContext'

type LightBoxRenderProps = {
  lightbox: {
    id: number
    photographer: string
    url: string
    src: {
      x: string
      xx: string
    }
    alt: string
  } | null
  canFetch?: boolean
}

const initialLightbox = null
const lightbox = {
  id: 1,
  photographer: 'Emmanuel',
  url: 'https://example.com',
  src: {
    x: 'https://example.com/x',
    xx: 'https://example.com/xx',
  },
  alt: 'A nice photo',
}

const gallery = [lightbox]

const onShow = vi.fn()
const onClose = vi.fn()
const hasNext = vi.fn()
const hasPrev = vi.fn()
const onNext = vi.fn()
const onPrev = vi.fn()
const onImgLoaded = vi.fn()
const onFetchPhotos = vi.fn()
const idxInfoText = '1 of 10'
const imgLoaded = true

const renderLightBox = ({ lightbox, canFetch = true }: LightBoxRenderProps) => {
  render(
    <LightBoxProvider gallery={gallery} canFetch={canFetch} onFetchPhotos={onFetchPhotos}>
      <LightBoxContext.Provider
        value={{
          lightbox,
          imgLoaded,
          idxInfoText,
          canFetch,
          onShow,
          onClose,
          hasNext,
          hasPrev,
          onNext,
          onPrev,
          onImgLoaded,
          onFetchPhotos,
        }}
      >
        <LightBox />
      </LightBoxContext.Provider>
    </LightBoxProvider>
  )
}

describe('LightBox', () => {
  it('Does not render initially', () => {
    renderLightBox({ lightbox: initialLightbox })
    const lightboxEl = screen.queryByRole('lightbox')
    expect(lightboxEl).not.toBeInTheDocument()
  })

  it('Gets rendered when lightbox is not null', () => {
    renderLightBox({ lightbox })
    const lightboxEl = screen.getByRole('lightbox')
    expect(lightboxEl).toBeInTheDocument()
  })

  it('Renders the title', () => {
    renderLightBox({ lightbox })
    const title = screen.getByText(lightbox.alt)
    expect(title).toBeInTheDocument()
  })

  it("Renders the photographer's name", () => {
    renderLightBox({ lightbox })
    const photographer = screen.getByText(lightbox.photographer)
    expect(photographer).toBeInTheDocument()
  })

  it('Renders the idxInfoText', () => {
    renderLightBox({ lightbox })
    const idxInfo = screen.getByText(idxInfoText)
    expect(idxInfo).toBeInTheDocument()
  })

  it('Renders the image', () => {
    renderLightBox({ lightbox })
    const img = screen.getByAltText(lightbox.alt)
    expect(img).toBeInTheDocument()
  })

  describe('Close Button', () => {
    it('Calls onClose upon clicking', () => {
      renderLightBox({ lightbox })
      const closeButton = screen.getByRole('button', { name: /close/i })
      closeButton.click()
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('Next Button', () => {
    it('Gets rendered when there is a next photo', () => {
      hasNext.mockReturnValue(true)
      renderLightBox({ lightbox })
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeInTheDocument()
    })

    it('Gets disabled when there is no next photo and more photos cannot be fetched', () => {
      hasNext.mockReturnValue(false)
      renderLightBox({ lightbox, canFetch: false })
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })

    it('Calls onNext upon clicking', () => {
      hasNext.mockReturnValue(true)
      renderLightBox({ lightbox })
      const nextButton = screen.getByRole('button', { name: /next/i })
      fireEvent.click(nextButton)
      expect(onNext).toHaveBeenCalled()
    })
  })

  describe('Fetch Photos button', () => {
    it('Gets rendered when there are no more photos to fetch and more photos can be fetched', () => {
      hasNext.mockReturnValue(false)
      renderLightBox({ lightbox })
      const fetchButton = screen.getByRole('button', { name: /fetch more photos/i })
      expect(fetchButton).toBeInTheDocument()
    })

    it('Calls onFetchPhotos upon clicking', () => {
      hasNext.mockReturnValue(false)
      renderLightBox({ lightbox })
      const fetchButton = screen.getByRole('button', { name: /fetch more photos/i })
      fireEvent.click(fetchButton)
      expect(onFetchPhotos).toHaveBeenCalled()
    })
  })

  describe('Prev Button', () => {
    it('Gets rendered when there is a previous photo', () => {
      hasPrev.mockReturnValue(true)
      renderLightBox({ lightbox })
      const prevButton = screen.getByRole('button', { name: /prev/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('Gets disabled when there is no previous photo', () => {
      hasPrev.mockReturnValue(false)
      renderLightBox({ lightbox })
      const prevButton = screen.getByRole('button', { name: /prev/i })
      expect(prevButton).toBeDisabled()
    })

    it('Calls onPrev upon clicking', () => {
      hasPrev.mockReturnValue(true)
      renderLightBox({ lightbox })
      const prevButton = screen.getByRole('button', { name: /prev/i })
      fireEvent.click(prevButton)
      expect(onPrev).toHaveBeenCalled()
    })
  })
})
