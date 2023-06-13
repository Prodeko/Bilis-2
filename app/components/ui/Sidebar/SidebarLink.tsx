'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons'

import styles from './Sidebar.module.scss'

interface Props {
  path: string
  Icon: IconType
}

const SidebarLink = ({ path, Icon }: Props) => {
  const pathName = usePathname()
  const isActive = pathName?.split('/')[1] === path.slice(1)
  return (
    <Link
      className={`${styles.sidebarLink} ${isActive ? styles['sidebarLink--active'] : ''}`}
      href={path}
    >
      <Icon className={styles.sidebarIcon} />
    </Link>
  )
}

export default SidebarLink
