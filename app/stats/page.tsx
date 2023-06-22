import { IconType } from 'react-icons'
import { HiArchiveBox } from 'react-icons/hi2'

import { Player } from '@common/types'
import { Card } from '@components/ui/Card'
import { getRandomPlayer } from '@server/db/players'

import styles from './Layout.module.scss'

interface Props {
  statNumber: number
  statName: string
  Icon: IconType
  player?: Player
}

const HofStat = ({ statName, statNumber, player, Icon }: Props) => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.leftContainer}>
        <Icon className={styles.icon} size={40} />
        <div className={styles.statTexts}>
          <span className={styles.titleHolder}>Mika Siirilä</span>
          <span className={styles.titleName}>{statName}</span>
        </div>
      </div>
      <span className={styles.statNumber}>{statNumber}</span>
    </div>
  )
}

const StatsPage = async () => {
  const stats = await Promise.all(
    [400, 11, 222, 11111, 111].map(async stat => {
      const randomPlayer = await getRandomPlayer()
      return {
        statNumber: stat,
        statName: 'Longest winning streak',
        player: randomPlayer,
      }
    })
  )
  return (
    <div className={styles.grid}>
      <Card
        style={{
          gridRow: '1 / -1',
        }}
      >
        <div className={styles.hofLayout}>
          <h1 className={styles.hofTitle}>Hall of Fame</h1>
          <div className={styles.hofStatContainer}>
            {stats.map(stat => {
              return (
                <HofStat
                  key={`${stat.player?.id} ${stat}`}
                  statNumber={stat.statNumber}
                  statName={stat.statName}
                  Icon={HiArchiveBox}
                />
              )
            })}
          </div>
        </div>
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
