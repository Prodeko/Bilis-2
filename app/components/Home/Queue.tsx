import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import QueueItem from './QueueItem'
import { QueueInfo } from '../../common/types'
import CurrentPlayerButton from './CurrentPlayerButton'
import QueueSearchBox from './QueueSearchBox'
import { PlayerWithoutElo } from '../../common/types'
import useQueue from '../../hooks/useQueue'

interface Props {
  queue: QueueInfo[],
  setQueue: Function
}
const Queue = ({ queue, setQueue }: Props) => {
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
      <div className='overflow-y-auto my-4 max-h-[30vh]'>
        {queue.reverse().map((queuePlayerInfo, i) => {
          return (
            <QueueItem
              key={queuePlayerInfo.id}
              rank={queue.length-i}
              handleRemove={handleRemove}
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
