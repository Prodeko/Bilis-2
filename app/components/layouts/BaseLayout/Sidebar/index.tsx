import { FiHome, FiSearch } from 'react-icons/fi'
import Rainbow from '@components/utility/Rainbow'
import { useState } from 'react'
import { useStateValue } from '@state/index'
import styles from './Sidebar.module.scss'
import SidebarLink from './SidebarLink'
import SidebarButton from './SidebarButton'
import PlayerSearchModal from './PlayerSearchModal'

const Sidebar = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [state] = useStateValue()

  const toggleModal = () => {
    if (visible) {
      document.body.style.position = 'static'
      setVisible(false)
    } else {
      document.body.style.position = 'fixed'
      setVisible(true)
    }
  }

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.linkContainer}>
        <Rainbow />
        <SidebarLink path="/">
          <FiHome size="42" />
        </SidebarLink>
        <SidebarButton onClick={toggleModal}>
          <FiSearch size="42" />
        </SidebarButton>
        <PlayerSearchModal visible={visible} toggleModal={toggleModal} players={state.players} />
      </nav>
    </aside>
  )
}

export default Sidebar
