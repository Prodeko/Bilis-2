import { FiBarChart2, FiHome, FiUser } from 'react-icons/fi'

import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <SidebarLink path="/" Icon={FiHome} />
        <SidebarLink path="/stats" Icon={FiBarChart2} />
        <SidebarLink path="/player" Icon={FiUser} />
      </nav>
    </aside>
  )
}

export default Sidebar
