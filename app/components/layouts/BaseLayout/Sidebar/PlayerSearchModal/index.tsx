import { FiSearch, FiX } from 'react-icons/fi'
import Table from '@components/utility/Table'
import type { HomeLeaderboard } from '@common/types'
import styles from './PlayerSearchModal.module.scss'

interface Props {
  visible: boolean
  toggleModal: () => void
  players: HomeLeaderboard
}

const PlayerSearchModal = ({ visible, toggleModal, players }: Props) => {
  if (!visible) return null

  return (
    <dialog className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Player Search</h2>
        <button type="button" className={styles.button} onClick={toggleModal}>
          <FiX size={32} />
        </button>
        <form className={styles.layout}>
          <label htmlFor="#modal-search" className={styles.searchbox}>
            <FiSearch size="42" />
            <input id="#modal-search" className={styles.input} placeholder="Petri 'Raikku' Ranta" />
          </label>
          <Table players={players} variation="modal" />
        </form>
      </div>
    </dialog>
  )
}

export default PlayerSearchModal
