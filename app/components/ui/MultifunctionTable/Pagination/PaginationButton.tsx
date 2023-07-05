import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

import styles from './Pagination.module.scss'

type ButtonProps = ComponentProps<'button'>

interface PaginationButtonProps extends ButtonProps {
  Icon: IconType
}

export const PaginationButton = ({ Icon, ...props }: PaginationButtonProps) => {
  return (
    <button {...props} className={styles.paginationButton}>
      <Icon size={24} />
    </button>
  )
}
