import { useState } from 'react'

import List from '../../Utility/List'
import Queue from './Queue'
import WinnerSelectionBox from './WinnerSelectionBox'
import Recents from './Recents'
import { PlayerWithoutElo, QueueInfo } from '../../../common/types'

const GameFlow = (): JSX.Element => {
  const [queue, setQueue] = useState<QueueInfo[]>([])

  return (
    <List>
      <Queue queue={queue} setQueue={setQueue} />
      <WinnerSelectionBox queue={queue} setQueue={setQueue} />
      <Recents queue={queue} setQueue={setQueue} />
    </List>
  )
}

export default GameFlow
