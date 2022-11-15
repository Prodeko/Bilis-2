import Card from '@components/utility/Card'
import { StateContext } from '@state/state'
import { useContext } from 'react'
import styles from './Queue.module.scss'
import QueueItem from './QueueItem'
import TitleRow from './TitleRow'

const Queue = () => {
  const [{ queue }] = useContext(StateContext)

  return (
    <Card rowspan="1 / 2" colspan="2 / 3">
      <TitleRow />
      <div className={styles.list}>
        {queue.map((player, i) => (
          <QueueItem player={player} place={i + 1} key={player.id} />
        ))}
      </div>
    </Card>
  )
}

export default Queue
