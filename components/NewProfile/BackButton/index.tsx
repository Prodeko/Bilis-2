import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import styles from './BackButton.module.scss'

const BackButton = ({ route }: { route: string }) => {
  return (
    <Link href={route}>
      <a className={styles.button}>
        <BsArrowLeft className={styles.icon} />
      </a>
    </Link>
  )
}

export default BackButton
