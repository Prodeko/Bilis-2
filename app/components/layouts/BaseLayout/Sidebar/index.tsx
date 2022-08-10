import { FiHome, FiSearch } from 'react-icons/fi'
import Rainbow from '@components/utility/Rainbow'
import { useState } from 'react'
import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'
import SidebarButton from './SidebarButton'
import PlayerSearchModal from './PlayerSearchModal'

const Sidebar = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <Rainbow />
        <SidebarLink path="/">
          <FiHome size="42" />
        </SidebarLink>
        <SidebarButton onClick={() => setVisible(!visible)}>
          <FiSearch size="42" />
        </SidebarButton>
        <PlayerSearchModal visible setVisible={setVisible} />
      </nav>
    </aside>
  )
}

export default Sidebar
