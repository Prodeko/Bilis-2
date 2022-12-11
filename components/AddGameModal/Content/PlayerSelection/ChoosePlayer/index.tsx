import type { PlayerWithStats } from '@common/types'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import styles from './ChoosePlayer.module.scss'
import QueuePlayers from './QueuePlayers'
import QueueTitle from './QueueTitle'
import { Dispatch, SetStateAction } from 'react'

type PlayerProps = {
  onChoose: (id: number) => void
  setPlayers: (arg: PlayerWithStats[]) => void
  filterId: number | undefined
  playerSearchList: PlayerWithStats[]
  closeSearch: () => void
  selectedIdx: number
  setSelectedIdx: Dispatch<SetStateAction<number>>
}

const ChoosePlayer = ({
  onChoose,
  filterId,
  setPlayers,
  closeSearch,
  playerSearchList,
  selectedIdx,
  setSelectedIdx,
}: PlayerProps) => {
  return (
    <>
      <div className={styles.searchCard}>
        <QueueTitle />
        <QueuePlayers selectedIdx={selectedIdx} filterId={filterId} onChoose={onChoose} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch
          closeSearch={closeSearch}
          setPlayers={setPlayers}
          setSelectedIdx={setSelectedIdx}
        />
        <PlayerList
          onChoose={onChoose}
          playerSearchList={playerSearchList.filter(p => p.id !== filterId)}
          selectedIdx={selectedIdx}
        />
      </div>
    </>
  )
}

export default ChoosePlayer
