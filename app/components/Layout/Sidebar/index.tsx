import { FiHome } from 'react-icons/fi'
import Rainbow from '@components/utility/Rainbow'
import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <Rainbow />
        <SidebarLink path="/">
          <FiHome size="42" />
        </SidebarLink>
      </nav>
      {/* <SidebarImage /> */}
    </aside>
  )
}

export default Sidebar
