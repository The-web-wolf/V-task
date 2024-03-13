import './style.scss'

interface SpinnerProps {
  theme?: 'light' | 'dark'
}
const Spinner = ({ theme = 'light' }: SpinnerProps) => {
  return <span className={`spinner ${theme}`} role="spinner" />
}

export default Spinner
