// Disable force anchor tag for this file since <Link> copies the href attribute to the child

/* eslint-disable jsx-a11y/anchor-is-valid */
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
  const isActive = router.pathname === path
  return (
    <Link href={path}>
      <a
        role="link"
        tabIndex={0}
        className={`${styles.sidebarLink} ${isActive ? styles['sidebarLink--active'] : ''}`}
      >
        {children}
      </a>
    </Link>
  )
}

export default SidebarLink
