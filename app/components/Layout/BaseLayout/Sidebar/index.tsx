import { FiBarChart2, FiHome, FiUser } from 'react-icons/fi'

import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <SidebarLink path="/">
          <FiHome className={styles.sidebarIcon} />
        </SidebarLink>
        <SidebarLink path="/stats">
          <FiBarChart2 className={styles.sidebarIcon} />
        </SidebarLink>
        <SidebarLink path="/player">
          <FiUser className={styles.sidebarIcon} />
        </SidebarLink>
      </nav>
    </aside>
  )
}

export default Sidebar
