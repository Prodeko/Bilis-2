import { ComponentProps } from 'react'

import { getPlayerDetailedGames } from '@server/db/games/derivatives'
import TimeSeriesChart from '@ui/TimeSeriesChart/TimeSeriesChart'

import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  playerId: number
}

const ProfileCharts = async ({ playerId, ...props }: Props) => {
  const gameData = await getPlayerDetailedGames(playerId)
  return (
    <div {...props} className={styles.container}>
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Fargo Graph</h2>
        <TimeSeriesChart
          gameData={gameData}
          dataName="Fargo Data"
          chartTitle="All Time Fargo"
          height="100%"
        />
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Player Comparison</h2>
        <PlayerComparison currentPlayerId={playerId} />
      </div>
    </div>
  )
}

export default ProfileCharts
