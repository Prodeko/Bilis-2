import Link from 'next/link'
import styles from './AddPlayerButton.module.scss'

const AddPlayerButton = () => {
  return (
    <Link href="/player/add">
      <button className={styles.button}>create a new player</button>
    </Link>
  )
}

export default AddPlayerButton
