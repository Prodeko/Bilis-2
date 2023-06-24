import { ComponentProps } from 'react'
import { AiOutlineLineChart, AiOutlinePercentage, AiOutlineTrophy } from 'react-icons/ai'

import {
  getHighestEloAllTimePlayer,
  getHighestStreak,
  getHighestWinPercentage,
} from '@server/db/players/hofQueries'

import { StatsTitle } from '../StatsTitle/StatsTitle'
import styles from './HallOfFame.module.scss'
import { HallOfFameStatRow } from './HallOfFameStatRow'

type DivProps = ComponentProps<'div'>

type Props = DivProps

export const HallOfFame = async ({ ...props }: Props) => {
  const hofPlayers = await Promise.all([
    {
      hofPlayer: await getHighestEloAllTimePlayer(),
      statName: 'Highest Peak Fargo',
      Icon: AiOutlineTrophy,
    },
    {
      hofPlayer: await getHighestStreak(),
      statName: 'Longest Win Streak',
      Icon: AiOutlineLineChart,
    },
    {
      hofPlayer: await getHighestWinPercentage(),
      statName: 'Current Highest Win Percentage',
      Icon: AiOutlinePercentage,
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
              Icon={player.Icon}
            />
          )
        })}
      </div>
    </div>
  )
}
