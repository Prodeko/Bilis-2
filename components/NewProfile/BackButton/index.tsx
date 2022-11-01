import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import styles from './BackButton.module.scss'

const BackButton = () => {
  return (
    <Link href="/player">
      <a className={styles.button}>
        <BsArrowLeft className={styles.icon} />
      </a>
    </Link>
  )
}

export default BackButton
