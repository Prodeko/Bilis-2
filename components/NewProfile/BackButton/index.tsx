import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

import styles from './BackButton.module.scss'

const BackButton = ({ route }: { route: string }) => {
  return (
    <Link className={styles.button} href={route}>
      <BsArrowLeft className={styles.icon} />
    </Link>
  )
}

export default BackButton
