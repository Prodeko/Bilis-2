import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import styles from './BackButton.module.scss'

const BackButton = () => {
  return (
    <Link href="/">
      <button className={styles.button} onClick={() => null}>
        <BsArrowLeft className={styles.icon} />
      </button>
    </Link>
  )
}

export default BackButton
