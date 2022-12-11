import { useContext, useMemo, useState } from 'react'
import { ModalContext } from '../../ModalContextProvider'
import styles from './ChoosePlayer.module.scss'
import PlayerList from './PlayerList'
import PlayerSearch from './PlayerSearch'
import QueuePlayers from './QueuePlayers'
import QueueTitle from './QueueTitle'

type PlayerProps = {
  filterId: number | undefined
  side: 'winner' | 'loser'
}

const ChoosePlayer = ({ filterId, side }: PlayerProps) => {
  const { playerSearchLists, setGameField } = useContext(ModalContext)
  const [r, forceReRender] = useState<null>(null)

  const onChoose = () => setGameField(`${side}Id`)

  return (
    <>
      <div className={styles.searchCard}>
        <QueueTitle />
        <QueuePlayers filterId={filterId} onChoose={onChoose} side={side} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch side={side} forceReRender={forceReRender} />
        <PlayerList
          onChoose={onChoose}
          side={side}
          playerSearchList={playerSearchLists[side].filter(p => p.id !== filterId)}
        />
      </div>
    </>
  )
}

export default ChoosePlayer
