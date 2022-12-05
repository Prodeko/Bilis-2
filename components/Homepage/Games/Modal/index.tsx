import axios from 'axios'

import styles from './Modal.module.scss'
import { RecentGame } from '@common/types'
import ModalBlur from '@components/utility/ModalBlur'
import { NEXT_PUBLIC_API_URL } from '@config/index'

interface Props {
  games: RecentGame[]
  setGames: (x: RecentGame[]) => void
  closeModal: () => void
}

const Modal = ({ games, setGames, closeModal }: Props) => {
  const handleRemove = async () => {
    const { data } = await axios.delete(`${NEXT_PUBLIC_API_URL}/game/latest`)

    if (typeof data == 'string') return console.error(data)

    setGames(games.slice(1))
    closeModal()
  }

  return (
    <ModalBlur>
      <div className={styles.modal}>
        <header className={styles.header}>Do you want to delete the last game?</header>
        <div className={styles.buttons}>
          <button className={styles.delete} type="button" autoFocus onClick={handleRemove}>
            Delete Game
          </button>
          <button className={styles.cancel} type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </ModalBlur>
  )
}

export default Modal
