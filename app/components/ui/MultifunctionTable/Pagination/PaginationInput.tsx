import React, { ComponentProps } from 'react'

import styles from './Pagination.module.scss'

type InputProps = ComponentProps<'input'>

type PaginationInputProps = InputProps

export const PaginationInput = ({ ...props }: PaginationInputProps) => {
  return <input {...props} type="number" className={styles.paginationInput} />
}
