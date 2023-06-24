import { ComponentProps } from 'react'
import { HiArchiveBox } from 'react-icons/hi2'

import {
  getHighestEloAllTimePlayer,
  getHighestStreak,
  getHighestWinPercentage,
} from '@server/db/players/derivatives'

import { StatsTitle } from '../StatsTitle/StatsTitle'
import styles from './HallOfFame.module.scss'
import { HallOfFameStatRow } from './HallOfFameStatRow'

type DivProps = ComponentProps<'div'>

type Props = DivProps

export const HallOfFame = async ({ ...props }: Props) => {
  const hofPlayers = await Promise.all([
    {
      hofPlayer: await getHighestEloAllTimePlayer(),
      statName: 'Highest Peak Elo',
    },
    {
      hofPlayer: await getHighestStreak(),
      statName: 'Highest Win Streak',
    },
    {
      hofPlayer: await getHighestWinPercentage(),
      statName: 'Current Highest Win Percentage',
    },
  ])

  return (
    <div {...props} className={styles.hofLayout}>
      <StatsTitle
        style={{
          textTransform: 'uppercase',
        }}
        title="Hall of Fame"
      />
      <div className={styles.hofStatContainer}>
        {hofPlayers.map(player => {
          return (
            <HallOfFameStatRow
              key={player.statName}
              hofPlayer={player.hofPlayer}
              statName={player.statName}
              Icon={HiArchiveBox}
            />
          )
        })}
      </div>
    </div>
  )
}
