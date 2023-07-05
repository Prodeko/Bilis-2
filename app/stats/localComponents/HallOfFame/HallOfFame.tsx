import { ComponentProps } from 'react'
import {
  AiOutlineFire,
  AiOutlineHistory,
  AiOutlineLineChart,
  AiOutlinePercentage,
  AiOutlineSketch,
  AiOutlineTrophy,
} from 'react-icons/ai'

import { NEXT_PUBLIC_API_URL } from '@/config'

import { StatsTitle } from '../StatsTitle/StatsTitle'
import styles from './HallOfFame.module.scss'
import { HallOfFameStatRow } from './HallOfFameStatRow'

type DivProps = ComponentProps<'div'>

type Props = DivProps

export const HallOfFame = async ({ ...props }: Props) => {
  const hofIcons = [
    {
      statName: 'Highest Peak Fargo',
      Icon: AiOutlineTrophy,
    },
    {
      statName: 'Longest Win Streak',
      Icon: AiOutlineLineChart,
    },
    {
      statName: 'Current Highest Win Percentage',
      Icon: AiOutlinePercentage,
    },
    {
      statName: 'Most Games Played Alltime',
      Icon: AiOutlineSketch,
    },
    {
      statName: 'Most Opponents Put Undertable',
      Icon: AiOutlineFire,
    },
    {
      statName: 'Most Games Played In A Single Day',
      Icon: AiOutlineHistory,
    },
  ]

  const req = await fetch(`${NEXT_PUBLIC_API_URL}/hof`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const hofPlayersStats = await req.json()
  const hofPlayers = hofIcons.map((icon, i) => {
    return {
      ...icon,
      hofPlayer: hofPlayersStats[i],
    }
  })

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
