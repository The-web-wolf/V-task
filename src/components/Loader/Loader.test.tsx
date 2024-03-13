import Loader from '@/components/Loader'
import { render } from '@test-utils'

describe('Loader', () => {
  test('renders loader with default theme', () => {
    const { getByRole } = render(<Loader />)
    const loader = getByRole('loader')

    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('loader')
    expect(loader).toHaveClass('light') // Default theme
  })

  test('renders loader with dark theme', () => {
    const { getByRole } = render(<Loader theme="dark" />)
    const loader = getByRole('loader')

    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('loader')
    expect(loader).toHaveClass('dark')
  })
})
