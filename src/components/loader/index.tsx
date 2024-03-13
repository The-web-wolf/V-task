import './style.scss'

interface LoaderProps {
  theme?: 'light' | 'dark'
}
const Loader = ({ theme = 'light' }: LoaderProps) => {
  return <span className={`loader ${theme}`} role="loader" />
}

export default Loader
