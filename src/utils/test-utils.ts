import { ReactElement } from 'react'
import { render, RenderOptions, cleanup } from '@testing-library/react'
import { FavoritesProvider } from '@/contexts/favoriteContext'
import { afterEach, beforeEach } from 'vitest'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  vi.clearAllMocks()
})

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: FavoritesProvider, ...options })

export * from '@testing-library/react'
export { customRender as render }
