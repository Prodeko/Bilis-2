import { Table as ReactTable } from '@tanstack/react-table'

interface Props<Schema> {
  table: ReactTable<Schema>
}

export const DisplayPageAmount = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <div>
      {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}
