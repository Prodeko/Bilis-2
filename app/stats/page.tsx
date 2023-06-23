import { Card } from '@components/ui/Card'

import styles from './Layout.module.scss'
import { HallOfFame } from './localComponents/HallOfFame'

const StatsPage = async () => {
  return (
    <div className={styles.grid}>
      <Card
        style={{
          gridRow: '1 / -1',
        }}
      >
        <HallOfFame />
      </Card>
      <Card
        style={{
          gridRow: '1 / 3',
          gridColumn: '2 / -1',
        }}
      ></Card>
      <Card
        style={{
          gridRow: '3 / -1',
          gridColumn: '2 / -1',
        }}
      ></Card>
    </div>
  )
}

export default StatsPage
