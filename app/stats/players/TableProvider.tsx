'use client'

import { TableWithPagination } from '@components/ui/MultifunctionTable'
import { PlayerTableSchema, getPlayerColumnSchema } from '@components/ui/MultifunctionTable/schemas'

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
