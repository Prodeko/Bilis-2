import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { RecentGame } from '@common/types'
import styles from './Games.module.scss'
import Modal from './Modal'

interface Props {
  games: RecentGame[]
  setGames: (x: RecentGame[]) => void
}

const TitleRow = ({ games, setGames }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 250 })

  const closeModal = () => setVisible(false)

  return (
    <div ref={parent} className={styles.titleRow}>
      <h2 className={styles.title}>Games</h2>
      <button className={styles.removeButton} onClick={() => setVisible(true)}>
        Remove latest
      </button>
      {visible && <Modal games={games} setGames={setGames} closeModal={closeModal} />}
    </div>
  )
}

export default TitleRow
