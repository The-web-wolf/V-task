import './style.scss'

interface LoaderProps {
  theme?: 'light' | 'dark'
}
const Loader = ({ theme = 'light' }: LoaderProps) => {
  return <span className={`loader ${theme}`}></span>
}

export default Loader
