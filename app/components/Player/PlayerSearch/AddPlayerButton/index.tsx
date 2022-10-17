import Link from 'next/link'
import { FiUserPlus } from 'react-icons/fi'

import styles from './AddPlayerButton.module.scss'

const AddPlayerButton = () => {
  return (
    <Link href="/player/add">
      <button className={styles.button}>
        <FiUserPlus className={styles.icon} /> <span>create a new player</span>
      </button>
    </Link>
  )
}

export default AddPlayerButton
