import styles from './NewProfileLayout.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const NewProfileLayoutOuter = ({ children }: Props) => {
  return <div className={styles.newProfileContainerOuter}>{children}</div>
}
