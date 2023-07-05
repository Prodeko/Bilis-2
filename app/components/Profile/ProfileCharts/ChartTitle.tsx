import styles from './ProfileCharts.module.scss'

export const ChartTitle = ({ title }: { title: string }) => {
  return <h2 className={styles.chartTitle}>{title}</h2>
}
