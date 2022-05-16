import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import QueueItem from './QueueItem'
import { QueueInfo, PlayerWithoutElo } from '../../../common/types'
import QueueSearchBox from './QueueSearchBox'

interface Props {
  queue: QueueInfo[]
  addToQueue: (player: PlayerWithoutElo | null) => void
  removeFromQueue: (id: PlayerWithoutElo['id']) => void
}
const Queue = ({ queue, addToQueue, removeFromQueue }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithoutElo | null>(null)

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2>Jono</h2>
      <QueueSearchBox
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        addToQueue={addToQueue}
        queue={queue}
      />
      <div className="flex flex-col p-2 gap-2 overflow-y-auto ">
        {/* slice used here because the reverse method mutates the array */}
        {queue
          .slice()
          .reverse()
          .map((queuePlayerInfo, i) => {
            return (
              <QueueItem
                key={queuePlayerInfo.id}
                rank={queue.length - i}
                handleRemove={removeFromQueue}
                {...queuePlayerInfo}
                first={queue.length - i == 1}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Queue
