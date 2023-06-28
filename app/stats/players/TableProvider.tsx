'use client'

import {
  PlayerTableSchema,
  TableWithPagination,
  getPlayerColumnSchema,
} from '@components/ui/MultifunctionTable'

interface Props {
  data: PlayerTableSchema[]
}

export const TableProvider = ({ data }: Props) => {
  const columns = getPlayerColumnSchema()
  return (
    <TableWithPagination
      {...{
        data,
        columns,
      }}
    />
  )
}
