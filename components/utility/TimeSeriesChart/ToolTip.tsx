import { TimeSeriesGame } from '@common/types'
import styles from './TimeSeriesChart.module.scss'

interface Props {
  gameData: TimeSeriesGame[]
  dataPointIndex: number
}

const Tooltip = ({ gameData, dataPointIndex }: Props) => {
  const eloDiff = gameData[dataPointIndex].eloDiff

  return (
    <div className={styles.arrow__box}>
      <div className={styles.data__row}>
        <span>Elo: </span>
        <span>{gameData[dataPointIndex].currentElo.toFixed(2)}</span>
      </div>
      <div className={styles.data__row}>
        <span>Opponent: </span>
        <span>{gameData[dataPointIndex].opponentName}</span>
      </div>
      <div className={styles.data__row}>
        <span>Elo Change: </span>
        <span className={eloDiff >= 0 ? styles.positive : styles.negative}>
          {eloDiff >= 0 && '+'}
          {eloDiff.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default Tooltip
