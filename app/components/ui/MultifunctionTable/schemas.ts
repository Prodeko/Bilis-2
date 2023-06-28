import { createColumnHelper } from '@tanstack/react-table'

export interface PlayerTableSchema {
  position: number
  fullName: string
  fargo: number
  gameCount: number
  winCount: number
  winPercentage: string
}

export interface GameTableSchema {
  time: string
  winner: string
  winnerFargoNow: number
  winnerFargoDifference: number
  winner: string
  loserFargoNow: number
  loserFargoDifference: number
  underTable: boolean
}

export const getGameColumnSchema = () => {
  const columnHelper = createColumnHelper<GameTableSchema>()
  return [
    columnHelper.accessor('time', {
      header: 'time',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winner', {
      header: 'winner',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winnerFargoNow', {
      header: 'w.fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('loser', {
      header: 'loser',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('loserFargoNow', {
      header: 'l.fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('underTable', {
      header: 'ut',
      cell: info => info.getValue(),
    }),
  ]
}

export const getPlayerColumnSchema = () => {
  const columnHelper = createColumnHelper<PlayerTableSchema>()
  return [
    columnHelper.accessor('position', {
      header: 'pos',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('fullName', {
      header: 'name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('fargo', {
      header: 'fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('gameCount', {
      header: 'games',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winCount', {
      header: 'wins',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winPercentage', {
      header: 'win %',
      cell: info => info.getValue(),
    }),
  ]
}
