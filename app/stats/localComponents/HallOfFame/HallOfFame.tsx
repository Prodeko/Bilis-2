import { ComponentProps } from 'react'
import { HiArchiveBox } from 'react-icons/hi2'

import { getRandomPlayer } from '@server/db/players'

import styles from './HallOfFame.module.scss'
import { HallOfFameStatRow } from './HallOfFameStatRow'

type DivProps = ComponentProps<'div'>

type Props = DivProps

export const HallOfFame = async ({ ...props }: Props) => {
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
    <div {...props} className={styles.hofLayout}>
      <h1 className={styles.hofTitle}>Hall of Fame</h1>
      <div className={styles.hofStatContainer}>
        {stats.map(stat => {
          return (
            <HallOfFameStatRow
              key={`${stat.player?.id} ${stat}`}
              statNumber={stat.statNumber}
              statName={stat.statName}
              Icon={HiArchiveBox}
            />
          )
        })}
      </div>
    </div>
  )
}
