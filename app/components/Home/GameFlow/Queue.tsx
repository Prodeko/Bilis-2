import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import QueueItem from './QueueItem'
import { QueueInfo } from '../../../common/types'
import QueueSearchBox from './QueueSearchBox'
import { PlayerWithoutElo } from '../../../common/types'

interface Props {
  queue: QueueInfo[]
  addToQueue: (player: PlayerWithoutElo | null) => void
  removeFromQueue: (id: PlayerWithoutElo['id']) => void
}
const Queue = ({ 
  queue, 
  addToQueue,
  removeFromQueue,
}: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithoutElo | null>(
    null
  )

  return (
    <div className="w-full">
      <h2 className="p-8">Jono</h2>
      <div className="mx-6 ">
        <QueueSearchBox
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          addToQueue={addToQueue}
          queue={queue}
        />
      </div>
      <div className='overflow-y-auto my-4 max-h-[30vh]'>
        {/* slice used here because the reverse method mutates the array */}
        {queue.slice().reverse().map((queuePlayerInfo, i) => {
          return (
            <QueueItem
              key={queuePlayerInfo.id}
              rank={queue.length-i}
              handleRemove={removeFromQueue}
              {...queuePlayerInfo}
              first={queue.length-i==1}
            />
          )
        })}
    
        
      </div>
    </div>
  )
}

export default Queue
