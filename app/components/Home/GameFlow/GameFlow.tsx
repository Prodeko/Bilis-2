import { useEffect, useState } from 'react'

import List from '../../Utility/List'
import Queue from "./Queue"
import WinnerSelectionBox from "./WinnerSelectionBox"
import Recents from "./Recents"
import { GameListItem, PlayerWithoutElo, QueueInfo } from '../../../common/types'
import useQueue from '../../../hooks/useQueue'

interface Props {
  recents: GameListItem[]
}

const GameFlow = ({ recents }: Props): JSX.Element => {
  const [playerLeft, setPlayerLeft] = useState<PlayerWithoutElo | null>(null)
  const [playerRight, setPlayerRight] = useState<PlayerWithoutElo | null>(null)

  const queue = useQueue()

  useEffect(() => {
    queue.getQueue()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full grid grid-rows-[60fr_40fr] gap-4">
      <List>
        <div className="flex flex-col gap-5">
          <Queue {...queue}/>
          <WinnerSelectionBox  {...queue} playerLeft={playerLeft} playerRight={playerRight} setPlayerLeft={setPlayerLeft} setPlayerRight={setPlayerRight}/>
        </div>
      </List>
      <List>
        <Recents recents={recents} />
      </List>
    </div>
  )
}

export default GameFlow
