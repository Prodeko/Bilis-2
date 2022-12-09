import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading...</h1>
      <svg className={styles.spinner}>
        <circle cx="20" cy="20" r="18"></circle>
      </svg>
    </div>
  )
}

export default LoadingSpinner
