import type { Dispatch, SetStateAction } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { useStateValue } from '@state/index'
import styles from './Sidebar.module.scss'

interface Props {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const PlayerSearchModal = ({ visible, setVisible }: Props) => {
  console.log(styles)
  return (
    <dialog open className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Player Search</h2>
        <button type="button" className={styles.modalButton}>
          <FiX size={32} />
        </button>
        <div className={styles.modalLayout}>
          <form>
            <label className={styles.modalHeader}>
              <FiSearch size="42" />
              <input className={styles.modalInput} placeholder="Petri 'Raikku' Ranta" />
            </label>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default PlayerSearchModal
