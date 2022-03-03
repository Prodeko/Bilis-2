import { useState } from 'react'
import { PlayerWithoutElo, QueueInfo } from '../common/types'

const useQueue = () => {
  const getQueue = (): QueueInfo[] => {
    const _queue = localStorage.getItem('BilisKilkeQueue')
    if (_queue) {
      return JSON.parse(_queue) as QueueInfo[]
    }
    return []
  }

  const addToQueue = (player: PlayerWithoutElo | null) => {
    const _queue = getQueue()

    if (!player || _queue.some(({ id }) => id == player.id)) {
      throw new Error(
        `Player already in queue or not defined: ${player?.nickname}`
      )
    }
    let newQueue
    if (_queue) {
      newQueue = [player, ..._queue]
    } else {
      newQueue = [player]
    }
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
  }

  const removeFromQueue = (id: PlayerWithoutElo['id']) => {
    const newQueue = getQueue().filter((player) => player.id != id)
    localStorage.setItem('BilisKilkeQueue', JSON.stringify(newQueue))
  }

  return {
    getQueue,
    addToQueue,
    removeFromQueue,
  }
}

export default useQueue
