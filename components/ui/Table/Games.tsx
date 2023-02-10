import { round } from 'lodash'
import { FiChevronRight } from 'react-icons/fi'

import type { RecentGame } from '@common/types'
import { createColumnHelper } from '@tanstack/react-table'

export interface TableGame {
  time: string
  winner: string
  winnerFargo: JSX.Element
  loser: string
  loserFargo: JSX.Element
}

/**
 *
 * @param data - Most recent games from the database
 * @returns Formatted games that can be passed to the Games table
 */
export const prepareGamesData = (data: RecentGame[]): TableGame[] => {
  return data.map((game, _index) => ({
    time: game.formattedTimeString,
    winner: game.winner,
    winnerFargo: (
      <>
        {round(game.winnerEloBefore)} <FiChevronRight /> {round(game.winnerEloAfter)}
      </>
    ),
    loser: game.loser,
    loserFargo: (
      <>
        {round(game.loserEloBefore)} <FiChevronRight /> {round(game.loserEloAfter)}
      </>
    ),
  }))
}

const columnHelper = createColumnHelper<TableGame>()

export const gameColumns = [
  columnHelper.accessor('time', {
    header: 'Time',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('winner', {
    header: 'Winner',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('winnerFargo', {
    header: 'Winner Fargo',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('loser', {
    header: 'Loser',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('loserFargo', {
    header: 'Loser Fargo',
    cell: info => info.getValue(),
  }),
]
