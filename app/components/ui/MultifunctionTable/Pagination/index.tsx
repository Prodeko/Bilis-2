import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import styles from './Pagination.module.scss'
import { PaginationButton } from './PaginationButton'
import { PaginationInput } from './PaginationInput'

export const Pagination = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <div className={styles.paginationContainer}>
      <PaginationButton
        Icon={FiChevronsLeft}
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationButton
        Icon={FiChevronLeft}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationInput
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        onBlur={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        defaultValue={table.getState().pagination.pageIndex + 1}
      />
      <PaginationButton
        Icon={FiChevronRight}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      />
      <PaginationButton
        Icon={FiChevronsRight}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      />
    </div>
  )
}
