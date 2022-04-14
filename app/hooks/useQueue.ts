import { useState } from 'react'

import { PlayerWithoutElo, QueueInfo } from '../common/types'

const useQueue = () => {
  const [queue, setQueue] = useState<QueueInfo[]>([])

  const getQueue = () => {
    const _queue = localStorage.getItem('BilisKilkeQueue')
    if (_queue) {
      setQueue(JSON.parse(_queue) as QueueInfo[])
    } else {
      setQueue([])
    }

  }

  const addToQueue = (player: PlayerWithoutElo | null) => {
    if (!player || queue.some(({ id }) => id == player.id)) {
      throw new Error(
        `Player already in queue or not defined: ${player?.nickname}`
      )
    }
    const newQueue: QueueInfo[] = queue 
      ? [...queue, {...player, time: new Date()}]
      : [{...player, time: new Date()}]
      
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
    setQueue(newQueue)
  }

  const removeFromQueue = (id: PlayerWithoutElo['id']) => {
    const newQueue = queue.filter((player) => player.id != id)
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
    setQueue(newQueue)
  }

  const removeLastFromQueue = () => {
    const newQueue = queue.slice(1)
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
    setQueue(newQueue)
  }

  return {
    queue,
    getQueue,
    addToQueue,
    removeFromQueue,
    removeLastFromQueue
  }
}

export default useQueue
