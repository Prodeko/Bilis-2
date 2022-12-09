import PlayerSearchQueue from '@components/utility/PlayerSearch/PlayerSearchQueue'

import styles from './Queue.module.scss'

const TitleRow = () => {
  return (
    <div className={styles.titlerow}>
      <h2 className={styles.title}>Queue</h2>
      <PlayerSearchQueue />
    </div>
  )
}

export default TitleRow
