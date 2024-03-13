import Spinner from '@/components/Spinner'
import { render } from '@/utils/test-utils'

describe('Spinner', () => {
  test('renders spinner with default theme', () => {
    const { getByRole } = render(<Spinner />)
    const spinner = getByRole('spinner')

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner')
    expect(spinner).toHaveClass('light') // Default theme
  })

  test('renders spinner with dark theme', () => {
    const { getByRole } = render(<Spinner theme="dark" />)
    const spinner = getByRole('spinner')

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner')
    expect(spinner).toHaveClass('dark')
  })
})
