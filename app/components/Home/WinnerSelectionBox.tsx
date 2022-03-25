import { useEffect, useState } from "react";
import { PlayerWithoutElo, QueueInfo } from "../../common/types";
import CurrentPlayerButton from "./CurrentPlayerButton";
import useQueue from "../../hooks/useQueue";

interface Props {
  queue: QueueInfo[],
  setQueue: Function
}
const WinnerSelectionBox = ({queue, setQueue}: Props) => {
  const [playerLeft, setPlayerLeft] = useState<PlayerWithoutElo | null>(null)
  const [playerRight, setPlayerRight] = useState<PlayerWithoutElo | null>(null)
  const {removeLastFromQueue, getQueue} = useQueue()

  interface NewGame {
    winnerId: number | undefined
    loserId: number | undefined
    underTable: boolean
  };

  //if the boxes are empty, a person added to queue moves straight to them
  useEffect(() => {
    if(!playerLeft && queue.length>0 && (!playerRight || playerRight.id != queue[0].id)) {
      console.log(playerLeft)
      setPlayerLeft(queue[0])
      setQueue(removeLastFromQueue())

    } else if (!playerRight && queue.length>0 && (!playerLeft || playerLeft.id != queue[0].id)){
      console.log('there')
      setPlayerRight(queue[0])
      setQueue(removeLastFromQueue())
    }
  }, [queue, playerLeft, playerRight, setQueue, removeLastFromQueue])

  const postGame = async (winner: string) => {
    let game: NewGame = {winnerId: undefined, loserId: undefined, underTable: false}

    if(!(playerLeft && playerRight)) {
      return
    }

    switch (winner) {
      case 'left':
        game = {
          winnerId: playerLeft?.id,
          loserId: playerRight?.id,
          underTable: false
        }
        setPlayerRight(queue[0])
        setQueue(removeLastFromQueue())
        break;
      case 'right':
        game = {
          winnerId: playerRight?.id,
          loserId: playerLeft?.id,
          underTable: false
        } 
        setPlayerLeft(getQueue()[0])
        removeLastFromQueue()
        break;
    
      default:
        throw new Error ( `Undefinded case of winner: ${winner}`)
    }
    console.log(game)
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game) as any,
    })
    
    
  }

  return (
    <div className="flex flex-row flex-nowrap px-2 mx-4 justify-evenly items-center">
      <div className="flex flex-col items-center">
        <CurrentPlayerButton selectedPlayer={playerLeft} setSelectedPlayer={setPlayerLeft} />
        <WinnerSelectionButton handleClick={() => postGame('left')}/>
      </div>
      <p className="mx-6">vs</p>
      <div className="flex flex-col items-center">
        <CurrentPlayerButton selectedPlayer={playerRight} setSelectedPlayer={setPlayerRight}/>
        <WinnerSelectionButton handleClick={() => postGame('right')}/>
      </div>
    </div>
  )

}

const WinnerSelectionButton = ({ handleClick }: {handleClick: () => Promise<void>}) => {
  return (
    <button className='bg-green-600 text-white w-full' onClick={handleClick}>Voittaja</button>
  )
}

export default WinnerSelectionBox