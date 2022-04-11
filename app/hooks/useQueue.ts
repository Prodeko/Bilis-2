import { useState } from 'react'

import { PlayerWithoutElo, QueueInfo } from '../common/types'

const useQueue = () => {
  const [queue, setQueue] = useState<QueueInfo[]>([])

  const getQueue = () => {
    const _queue = localStorage.getItem('BilisKilkeQueue')
    if (_queue) {
      setQueue(JSON.parse(_queue) as QueueInfo[])
    }
  }

  const addToQueue = (player: PlayerWithoutElo | null) => {
    if (!player || queue.some(({ id }) => id == player.id)) {
      throw new Error(
        `Player already in queue or not defined: ${player?.nickname}`
      )
    }
    let newQueue: QueueInfo[]
    if (queue) {
      newQueue = [...queue, {...player, time: new Date()}]
    } else {
      newQueue = [{...player, time: new Date()}]
    }
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
    setQueue(newQueue)
  }

  const removeFromQueue = (id: PlayerWithoutElo['id']) => {
    const newQueue = queue.filter((player) => player.id != id)
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
    setQueue(newQueue)
  }

  const removeLastFromQueue = () => {
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(queue.slice(1)))
    setQueue(queue.slice(1))
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
