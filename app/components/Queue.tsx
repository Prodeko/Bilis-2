import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import QueueItem from './QueueItem'
import { QueueInfo } from '../common/types'
import CurrentPlayerButton from './CurrentPlayerButton'
import QueueSearchBox from './QueueSearchBox'
import { PlayerWithoutElo } from '../common/types'
import useQueue from '../hooks/useQueue'
const Queue: NextPage = () => {
  const [queue, setQueue] = useState<QueueInfo[]>([])
  const { getQueue, removeFromQueue } = useQueue()
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithoutElo | null>(
    null
  )

  useEffect(() => {
    setQueue(getQueue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayer])

  const handleRemove = (id: PlayerWithoutElo['id']) => {
    removeFromQueue(id)
    setQueue(getQueue)
  }
  return (
    <div className="w-full">
      <h2 className="p-8">Jono</h2>
      <div className="mx-6 ">
        <QueueSearchBox
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
        />
      </div>
      {queue.map((queuePlayerInfo) => {
        return (
          <QueueItem
            key={queuePlayerInfo.id}
            handleRemove={handleRemove}
            {...queuePlayerInfo}
          />
        )
      })}
    </div>
  )
}

export default Queue
