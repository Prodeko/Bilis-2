import type { PlayerExtended } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import PlayerRow from './PlayerRow'
import styles from './Table.module.scss'

const TableBody = ({ leaderboard }: { leaderboard: PlayerExtended[] }) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 200 })

  return (
    <div ref={parent} className={styles.tablebody}>
      {leaderboard.map((player, position) => {
        return <PlayerRow key={player.id} player={player} position={position + 1} />
      })}
    </div>
  )
}

export default TableBody
