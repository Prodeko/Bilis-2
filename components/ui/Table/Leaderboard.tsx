import { round } from 'lodash'

import { Player, WithId } from '@common/types'
import { formatFullName } from '@common/utils/helperFunctions'
import { createColumnHelper } from '@tanstack/react-table'

export interface LeaderboardPlayer extends WithId {
  position: string
  fullName: string
  fargo: number
}

export const prepareLeaderboardData = (data: Player[]): LeaderboardPlayer[] => {
  return data.map((row, index) => ({
    id: row.id,
    position: `${index + 1}.`,
    fullName: formatFullName(row, true, true),
    fargo: round(row.elo),
  }))
}

const columnHelper = createColumnHelper<LeaderboardPlayer>()

export const leaderboardColumns = [
  columnHelper.accessor('position', {
    header: 'Position',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('fullName', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('fargo', {
    header: 'Fargo',
    cell: info => info.getValue(),
  }),
]
