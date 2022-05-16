import CurrentPlayerSearch from './CurrentPlayerSearch'
import { useState } from 'react'
import { PlayerWithoutElo } from '../../../common/types'
import useQueue from '../../../hooks/useQueue'
interface Props {
  selectedPlayer: PlayerWithoutElo | null
  setSelectedPlayer: (selectedPlayer: PlayerWithoutElo | null) => void
  addToQueue: (player: PlayerWithoutElo) => void
  queue: PlayerWithoutElo[]
}

const QueueSearchBox = ({ selectedPlayer, setSelectedPlayer, addToQueue, queue }: Props) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (
    <CurrentPlayerSearch
      expanded={searchExpanded}
      selectedPlayer={selectedPlayer}
      setExpanded={setSearchExpanded}
      setEditing={setEditing}
      handleSelect={player => {
        if (queue.every(queuePlayer => queuePlayer.id != player.id)) {
          addToQueue(player)
          setSelectedPlayer(player)
          setSearchExpanded(false)
          setEditing(false)
        }
      }}
      usedForQueue={true}
      queue={queue}
    />
  )
}

export default QueueSearchBox
