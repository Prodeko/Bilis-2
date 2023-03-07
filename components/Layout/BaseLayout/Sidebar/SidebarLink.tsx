// Disable force anchor tag for this file since <Link> copies the href attribute to the child
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import styles from './Sidebar.module.scss'

interface Props {
  path: string
  children: ReactNode
}

const SidebarLink = ({ path, children }: Props) => {
  const router = useRouter()
  const isActive = router.pathname.split('/')[1] === path.slice(1)
  return (
    <Link
      className={`${styles.sidebarLink} ${isActive ? styles['sidebarLink--active'] : ''}`}
      href={path}
    >
      {children}
    </Link>
  )
}

export default SidebarLink