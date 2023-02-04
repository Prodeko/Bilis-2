// Disable force anchor tag for this file since <Link> copies the href attribute to the child
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { IconType } from 'react-icons'

import styles from './Sidebar.module.scss'

interface Props {
  path: string
  Icon: IconType
}

const SidebarLink = ({ path, Icon }: Props) => {
  const router = useRouter()
  const isActive = router.pathname.split('/')[1] === path.slice(1)
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
