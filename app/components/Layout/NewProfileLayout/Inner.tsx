import styles from './NewProfileLayout.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const NewProfileLayoutInner = ({ children }: Props) => {
  return <div className={styles.newProfileContainerInner}>{children}</div>
}
