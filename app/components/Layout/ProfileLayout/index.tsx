import styles from './ProfileLayout.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const ProfileLayout = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}

export default ProfileLayout
