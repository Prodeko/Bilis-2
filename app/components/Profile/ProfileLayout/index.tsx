import { ReactNode } from 'react'
import styles from './ProfileLayout.module.scss'

interface Props {
  children: ReactNode
}

const ProfileLayout = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}

export default ProfileLayout
