import { Dispatch, SetStateAction } from 'react'

import type { PlayerWithStats, RecentGame } from '@common/types'
import ModalBlur from '@components/utility/ModalBlur'
import { ModalProvider, reducer } from '@state/Modal'

import styles from './AddGameModal.module.scss'
import CloseButton from './CloseButton'
import Content from './Content'
import PlayerLabel from './PlayerLabel'

type PlayerProps = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const AddGame = ({ recentPlayers, onClose, setGames }: PlayerProps) => {
  return (
    <ModalBlur>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <PlayerLabel type="winner" />
        <ModalProvider reducer={reducer} recentPlayers={recentPlayers}>
          <Content setGames={setGames} onClose={onClose} />
        </ModalProvider>
        <PlayerLabel type="loser" />
      </div>
    </ModalBlur>
  )
}

export default AddGame
