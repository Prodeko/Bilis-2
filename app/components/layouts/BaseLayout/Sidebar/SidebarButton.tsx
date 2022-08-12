import { ReactNode } from 'react'
import styles from './Sidebar.module.scss'

interface Props {
  onClick: () => void
  children: ReactNode
}

const SidebarButton = ({ onClick, children }: Props) => {
  const classes = styles.sidebarLink
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default SidebarButton
