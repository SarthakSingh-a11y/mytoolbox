import { Link } from 'react-router-dom'
import { HomeIcon } from '../components/icons.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This drawer is empty</h1>
        <p className={styles.text}>
          The page you’re looking for isn’t on the bench. It may have been moved,
          or the link is off.
        </p>
        <Link to="/" className={styles.home}>
          <HomeIcon size={18} />
          Back to the toolbox
        </Link>
      </div>
    </div>
  )
}
