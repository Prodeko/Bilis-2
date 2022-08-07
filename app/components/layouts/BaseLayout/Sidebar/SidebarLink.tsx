import Link from 'next/link'
import { useState, ReactNode } from 'react'
import styles from './Sidebar.module.scss'

interface Props {
  path: string
  children: ReactNode
}

const SidebarLink = ({ path, children }: Props) => {
  const baseClass = styles.sidebarLink
  const showAnimation = `${baseClass} ${styles.fade}`
  const [classes, setClasses] = useState<string>(baseClass)
  return (
    <Link href={path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        role="link"
        tabIndex={0}
        className={classes}
        onKeyUp={() => setClasses(showAnimation)}
        onClick={() => setClasses(showAnimation)}
        onAnimationEnd={() => setClasses(baseClass)}
      >
        {children}
      </a>
    </Link>
  )
}

export default SidebarLink
