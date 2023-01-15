import Card from '@components/utility/Card'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQueueState } from '@state/Queue'

import styles from './Queue.module.scss'
import QueueItem from './QueueItem'
import TitleRow from './TitleRow'

const Queue = () => {
  const [queue] = useQueueState()
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  return (
    <Card rowspan="1 / 2" colspan="2 / 3">
      <TitleRow />
      <ul ref={parent} className={styles.list}>
        {queue.map((player, i) => (
          <QueueItem player={player} place={i + 1} key={player.id} />
        ))}
      </ul>
    </Card>
  )
}

export default Queue
