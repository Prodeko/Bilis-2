import PlayerSearchSelect from '@components/utility/PlayerSearch/PlayerSearchSelect'
import type { Player, MutualGames } from '@common/types'
import PieChart from '@components/utility/PieChart'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useState } from 'react'
import styles from './ProfileCharts.module.scss'
import { SingleValue } from 'react-select'

interface PieChartProps {
  currentPlayer: Player
  opposingPlayer: Player
  mutualGames: MutualGames
}

interface OptionType {
  label: string
  value: Player
}

const PlayerComparison = ({ currentPlayerId }: { currentPlayerId: number }) => {
  const [pieChartProps, setPieChartProps] = useState<PieChartProps | undefined>(undefined)

  const handleClick = async (newValue: SingleValue<OptionType>) => {
    if (newValue?.value) {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/player/mutual-stats`, {
          params: { id1: currentPlayerId, id2: newValue.value },
        })
        const data = response.data as PieChartProps
        setPieChartProps(data)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.warn('Trying to select player for player comparison but failed')
    }
  }

  return (
    <div className={styles.pieContainer}>
      <PlayerSearchSelect handleClick={handleClick} />
      {pieChartProps && <PieChart {...pieChartProps} />}
    </div>
  )
}

export default PlayerComparison
