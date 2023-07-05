'use client'

import { TableWithPagination } from '@ui/MultifunctionTable'
import { PlayerTableSchema, getPlayerColumnSchema } from '@ui/MultifunctionTable/schemas'

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
