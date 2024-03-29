import ComingSoon from '@components/ComingSoon'
import { Card } from '@components/ui/Card'

import styles from './Layout.module.scss'
import { GameCountTracker } from './localComponents/GameCountTracker/GameCountTracker'
import { HallOfFame } from './localComponents/HallOfFame/HallOfFame'

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
      >
        <ComingSoon />
      </Card>
      <Card
        style={{
          gridRow: '3 / -1',
          gridColumn: '2 / -1',
        }}
      >
        <GameCountTracker />
      </Card>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default StatsPage
