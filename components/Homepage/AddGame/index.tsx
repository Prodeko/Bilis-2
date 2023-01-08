import { Dispatch, SetStateAction } from 'react'

import { PlayerWithStats, RecentGame } from '@common/types'

import styles from './AddGameButton.module.scss'
import AddGameModal from './AddGameModal'

type Props = {
  onOpen: () => void
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  open: boolean
  recentPlayers: PlayerWithStats[]
}

const AddGameButton = (props: Props) => {
  // TODO refactor card to support element without cardgrid
  const { open, onOpen, ...modalProps } = props
  const inlineStyles = {
    gridColumn: '3 / 3',
    gridRow: '1 / 2',
  }

  return (
    <>
      <div
        className={styles.card}
        style={inlineStyles}
        onClick={onOpen}
        role="button"
        id={'button'}
      >
        <h3 className={styles.text}>Add New Game</h3>
      </div>
      {open && <AddGameModal {...modalProps} />}
    </>
  )
}

export default AddGameButton
