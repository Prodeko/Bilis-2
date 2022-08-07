import { FiHome, FiSearch } from 'react-icons/fi'
import Rainbow from '@components/utility/Rainbow'
import styles from '@components/Layout/Layout.module.scss'
import SidebarLink from './SidebarLink'
import Searchbar from './Searchbar'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <Rainbow />
        <SidebarLink path="/">
          <FiHome size="42" />
        </SidebarLink>
        <Searchbar>
          <FiSearch size="42" />
        </Searchbar>
      </nav>
    </aside>
  )
}

export default Sidebar
