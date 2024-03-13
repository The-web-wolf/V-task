import { render, screen, fireEvent } from '@/utils/test-utils'
import { FavoritesContext } from '@/contexts/favoriteContext'
import FavoriteButton from '@/components/FavoriteButton'

const mockContextValue = {
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  isFavorite: vi.fn(),
  favorites: [],
}

const renderWithFavoritesContext = (ui: React.ReactNode, contextValue = mockContextValue) => {
  return render(<FavoritesContext.Provider value={contextValue}>{ui}</FavoritesContext.Provider>)
}

describe('FavoriteButton', () => {
  it("Get's Rendered", () => {
    renderWithFavoritesContext(<FavoriteButton id={1} />)
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    expect(favoriteButton).toBeInTheDocument()
  })

  it('Calls addFavorite when the button is clicked and item is not favorited', () => {
    mockContextValue.isFavorite.mockReturnValue(false)
    renderWithFavoritesContext(<FavoriteButton id={1} />)
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })

    fireEvent.click(favoriteButton)

    expect(mockContextValue.addFavorite).toHaveBeenCalledWith(1)
  })

  it('Calls removeFavorite when the button is clicked and item is favorited', () => {
    mockContextValue.isFavorite.mockReturnValue(true)
    renderWithFavoritesContext(<FavoriteButton id={1} />)
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })

    fireEvent.click(favoriteButton)

    expect(mockContextValue.removeFavorite).toHaveBeenCalledWith(1)
  })

  it("Doesn't include text when showText is false", () => {
    renderWithFavoritesContext(<FavoriteButton id={1} showText={false} />)
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })

    expect(favoriteButton).not.toHaveTextContent('Favorite')
  })
})
