import { useState } from 'react'

import type { NextPage } from "next"
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
  
  return (
    <List>
    <Queue {...queue}/>
    <WinnerSelectionBox  {...queue} playerLeft={playerLeft} playerRight={playerRight} setPlayerLeft={setPlayerLeft} setPlayerRight={setPlayerRight}/>
    <Recents recents={recents} />
  </List>
  )
}

export default GameFlow
