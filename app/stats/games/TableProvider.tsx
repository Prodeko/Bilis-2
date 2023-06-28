'use client'

import { TableWithPagination } from '@components/ui/MultifunctionTable'
import { GameTableSchema, getGameColumnSchema } from '@components/ui/MultifunctionTable/schemas'

interface Props {
  data: GameTableSchema[]
}

export const TableProvider = ({ data }: Props) => {
  const columns = getGameColumnSchema()
  return (
    <TableWithPagination
      {...{
        data,
        columns,
      }}
    />
  )
}
