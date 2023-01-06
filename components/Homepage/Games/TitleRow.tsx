import { createPortal } from 'react-dom'

import { RecentGame } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './Games.module.scss'
import Modal from './Modal'

interface Props {
  games: RecentGame[]
  setGames: (x: RecentGame[]) => void
  visible: boolean
  closeModal: () => void
  showModal: () => void
}

const TitleRow = ({ games, setGames, visible, closeModal, showModal }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 250 })

  return (
    <div ref={parent} className={styles.titleRow}>
      <h2 className={styles.title}>Games</h2>
      <button className={styles.removeButton} onClick={showModal}>
        Remove latest
      </button>
      {visible &&
        createPortal(
          <Modal games={games} setGames={setGames} closeModal={closeModal} />,
          document?.getElementById('__next') as HTMLElement
        )}
    </div>
  )
}

export default TitleRow
