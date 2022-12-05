import { useState } from 'react'

import type { Player, MutualGames } from '@common/types'
import PlayerSearchSelect from '@components/utility/PlayerSearch/PlayerSearchSelect'
import PieChart from '@components/utility/PieChart'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './ProfileCharts.module.scss'

export interface PieChartProps {
  currentPlayer: Player
  opposingPlayer: Player
  mutualGames: MutualGames
}

const PlayerComparison = ({ currentPlayerId }: { currentPlayerId: number }) => {
  const [pieChartProps, setPieChartProps] = useState<PieChartProps | undefined>(undefined)
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 400 })

  return (
    <div ref={parent} className={styles.pieContainer}>
      <PlayerSearchSelect currentPlayerId={currentPlayerId} setPieChartProps={setPieChartProps} />
      {pieChartProps && <PieChart {...pieChartProps} />}
    </div>
  )
}

export default PlayerComparison
