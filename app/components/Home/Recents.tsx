import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { FiCloudLightning } from 'react-icons/fi'
import { GameListItem, QueueInfo } from '../../common/types'
import RecentGame from './RecentGame'

interface Props {
  queue: QueueInfo[],
  setQueue: Function
}
// queue is needed to update the recent games when a game has been played
const Recents = ({queue, setQueue}: Props) => {
  const [recents, setRecents] = useState<GameListItem[]>([])
  
  const searchUrl = `/api/games/latest`
    
  useEffect(() => {
    ;(async () => {
      const response = await fetch(searchUrl)
      const result = (await response.json()) as GameListItem[]
      setRecents(result)
    })()
  }, [searchUrl, queue, setQueue])

  console.log(recents)
  return(
    <div>
      <h2 className='p-8'>Viimeisimmät pelit</h2>
      <div className='h-[30vh] overflow-y-auto'> 
        {recents.map(game => <RecentGame game={game} key={game.id}/>)}
      </div>
    </div>
  )
}

export default Recents