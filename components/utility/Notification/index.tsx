import { ReactNode } from 'react'

import styles from './Notification.module.scss'

interface Props {}

const Notification = ({}: Props) => {
  return (
    <header className={styles.notification_container}>
      <div className={styles.notification + ' ' + styles.success}>
        <h4>TIEDOTE</h4>
        <p>Joku on huijannut.</p>
      </div>
      <div className={styles.notification + ' ' + styles.warning}>
        <h4>TIEDOTE</h4>
        <p>Joku on huijannut.</p>
      </div>
      <div className={styles.notification + ' ' + styles.danger}>
        <h4>TIEDOTE</h4>
        <p>Joku on huijannut.</p>
      </div>
    </header>
  )
}

export default Notification
