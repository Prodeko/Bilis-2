'use client'

import {
  GameTableSchema,
  TableWithPagination,
  getGameColumnSchema,
} from '@components/ui/MultifunctionTable'

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
