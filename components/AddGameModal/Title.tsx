import styles from './AddGameModal.module.scss'

const Title = ({ title }: { title: string }) => {
  return (
    <div className={styles.cardLabel}>
      <h3>{title}</h3>
    </div>
  )
}

export default Title
