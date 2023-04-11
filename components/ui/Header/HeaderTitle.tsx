import styles from './Header.module.scss'

const HeaderTitle = ({ title }: { title: string }) => {
  return <h1 className={styles.title}>{title}</h1>
}

export default HeaderTitle
