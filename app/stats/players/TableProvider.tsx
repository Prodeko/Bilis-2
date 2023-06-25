'use client'

import { PlayerTableSchema, Table, getColumnSchema } from '@components/ui/MultifunctionTable'

interface Props {
  data: PlayerTableSchema[]
}

export const TableProvider = ({ data }: Props) => {
  const columns = getColumnSchema()
  return (
    <Table
      {...{
        data,
        columns,
      }}
    />
  )
}
