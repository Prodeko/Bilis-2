import { Dispatch, SetStateAction } from 'react'

import type { Player, RecentGame } from '@common/types'
import { ModalProvider, reducer } from '@state/Modal'
import ModalBlur from '@ui/ModalBlur'

import styles from './AddGameModal.module.scss'
import CloseButton from './CloseButton'
import Content from './Content'

type PlayerProps = {
  recentPlayers: Player[]
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const AddGame = ({ recentPlayers, onClose, setGames }: PlayerProps) => {
  return (
    <ModalBlur>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <ModalProvider reducer={reducer} recentPlayers={recentPlayers}>
          <Content setGames={setGames} onClose={onClose} />
        </ModalProvider>
      </div>
    </ModalBlur>
  )
}

export default AddGame
