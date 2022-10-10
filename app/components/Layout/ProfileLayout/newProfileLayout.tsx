import styles from './ProfileLayout.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const NewProfileLayout = ({ children }: Props) => {
  return <div className={styles.newProfileContainer}>{children}</div>
}

export default NewProfileLayout
