import { ComponentProps } from 'react'
import {
  AiOutlineFire,
  AiOutlineHistory,
  AiOutlineLineChart,
  AiOutlinePercentage,
  AiOutlineSketch,
  AiOutlineTrophy,
} from 'react-icons/ai'

import {
  getHighestEloAllTimePlayer,
  getHighestStreak,
  getHighestWinPercentage,
  getMostGamesPlayed,
  getMostPlayedGamesInOneDay,
  getMostUndertableWins,
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
    {
      hofPlayer: await getMostGamesPlayed(),
      statName: 'Most Games Played Alltime',
      Icon: AiOutlineSketch,
    },
    {
      hofPlayer: await getMostUndertableWins(),
      statName: 'Most Opponents Put Undertable',
      Icon: AiOutlineFire,
    },
    {
      hofPlayer: await getMostPlayedGamesInOneDay(),
      statName: 'Most Games Played In A Single Day',
      Icon: AiOutlineHistory,
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
