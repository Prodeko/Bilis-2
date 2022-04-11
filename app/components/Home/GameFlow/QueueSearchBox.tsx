import CurrentPlayerSearch from './CurrentPlayerSearch'
import { useState } from 'react'
import { PlayerWithoutElo } from '../../common/types'
import useQueue from '../../hooks/useQueue'
interface Props {
  selectedPlayer: PlayerWithoutElo | null
  setSelectedPlayer: (selectedPlayer: PlayerWithoutElo | null) => void
}

const QueueSearchBox = ({ selectedPlayer, setSelectedPlayer }: Props) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const { addToQueue } = useQueue()

  return (
    <CurrentPlayerSearch
      expanded={searchExpanded}
      selectedPlayer={selectedPlayer}
      setExpanded={setSearchExpanded}
      setEditing={setEditing}
      handleSelect={(player) => {
        addToQueue(player)
        setSelectedPlayer(player)
        setSearchExpanded(false)
        setEditing(false)
      }}
    />
  )
}

export default QueueSearchBox
