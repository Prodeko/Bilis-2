import { Player } from '@common/types'
import usePlayers from 'hooks/usePlayers'
import { FunctionComponent, useState } from 'react'
import styles from './PlayerSearch.module.scss'

interface PlayerSearchProps {
  initialPlayers: Player[]
}

const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ initialPlayers: players }) => {
  const [query, setQuery] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Search for a player"
        onClick={() => {
          if (!isVisible) setIsVisible(true)
        }}
        onChange={e => setQuery(e.target.value)}
      />
      <div className={styles.results}>
        {isVisible &&
          players
            .filter(p => new RegExp(query, 'i').test(p.firstName + p.lastName))
            .map(player => (
              <div className={styles.player}>
                {player.firstName} {player.lastName}
              </div>
            ))}
      </div>
    </div>
  )
}

export default PlayerSearch
