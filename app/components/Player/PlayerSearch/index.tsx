import { Player } from '@common/types'
import usePlayers from 'hooks/usePlayers'
import { FunctionComponent, useState } from 'react'

interface PlayerSearchProps {
  initialPlayers: Player[]
}

const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ initialPlayers: players }) => {
  const [query, setQuery] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div>
      <input
        placeholder="Search for a player"
        onClick={() => {
          if (!isVisible) setIsVisible(true)
        }}
        onChange={e => setQuery(e.target.value)}
      />
      {isVisible && players.map(player => <div>{player.firstName}</div>)}
    </div>
  )
}

export default PlayerSearch
