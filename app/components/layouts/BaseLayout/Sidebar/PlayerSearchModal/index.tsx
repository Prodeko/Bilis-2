import { FiSearch, FiX } from 'react-icons/fi'
import Table from '@components/utility/Table'
import type { HomeLeaderboard } from '@common/types'
import { useState, ChangeEvent } from 'react'
import styles from './PlayerSearchModal.module.scss'

interface Props {
  visible: boolean
  toggleModal: () => void
  players: HomeLeaderboard
}

const PlayerSearchModal = ({ visible, toggleModal, players }: Props) => {
  const [filter, setFilter] = useState<string>('')

  const changeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  if (!visible) return null

  return (
    <dialog className={styles.modal}>
      <div className={styles.content}>
        <button type="button" className={styles.button} onClick={toggleModal}>
          <FiX className={styles.buttonIcon} />
        </button>
        <h2 className={styles.title}>Player Search</h2>
        <form className={styles.layout}>
          <label htmlFor="#modal-search" className={styles.searchbox}>
            <FiSearch className={styles.searchboxIcon} />
            <input
              id="#modal-search"
              className={styles.input}
              placeholder="Petri 'Raikku' Ranta"
              onChange={changeFilter}
            />
          </label>
          <Table players={players} variation="modal" filter={filter} />
        </form>
      </div>
    </dialog>
  )
}

export default PlayerSearchModal
