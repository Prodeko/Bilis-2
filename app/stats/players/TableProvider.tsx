'use client'

import {
  PlayerTableSchema,
  TableWithPagination,
  getColumnSchema,
} from '@components/ui/MultifunctionTable'

interface Props {
  data: PlayerTableSchema[]
}

export const TableProvider = ({ data }: Props) => {
  const columns = getColumnSchema()
  return (
    <TableWithPagination
      {...{
        data,
        columns,
      }}
    />
  )
}
