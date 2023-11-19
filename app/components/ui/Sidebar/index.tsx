'use client'

import { FiBarChart2, FiHome, FiUser } from 'react-icons/fi'

import { Season } from '@common/types'

import SeasonToggle from './SeasonToggle'
import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'

interface Props {
  currentSeason: Season
}

const Sidebar = ({ currentSeason }: Props) => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <SidebarLink path="/" Icon={FiHome} />
        <SidebarLink path="/stats" Icon={FiBarChart2} />
        <SidebarLink path="/player" Icon={FiUser} />
      </nav>
      <div className={styles.bottomContainer}>
        {currentSeason && <SeasonToggle />}
        <p className={styles.versioning}>Version 1.2.0 - Isac 💸</p>
      </div>
    </aside>
  )
}

export default Sidebar
