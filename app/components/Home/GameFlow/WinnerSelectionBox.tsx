import { useEffect, useState } from 'react'
import { PlayerWithoutElo, QueueInfo } from '../../../common/types'
import CurrentPlayerButton from './CurrentPlayerButton'
import HeaderRow from '../../Utility/HeaderRow'
import WinnerSelectionButton from './WinnerSelectionButton'
import useQueue from '../../../hooks/useQueue'
import { useRouter } from 'next/router'

interface Props {
  queue: QueueInfo[]
  removeLastFromQueue: () => void
  getQueue: () => void
  playerRight: PlayerWithoutElo | null
  setPlayerRight: (arg0: PlayerWithoutElo) => void
  playerLeft: PlayerWithoutElo | null
  setPlayerLeft: (arg0: PlayerWithoutElo) => void
}
const WinnerSelectionBox = ({
  queue,
  removeLastFromQueue,
  getQueue,
  playerRight,
  playerLeft,
  setPlayerRight,
  setPlayerLeft,
}: Props) => {
  interface NewGame {
    winnerId: number | undefined
    loserId: number | undefined
    underTable: boolean
  }

  interface PlayerStorage {
    playerRight: PlayerWithoutElo
    playerLeft: PlayerWithoutElo
  }

  useEffect(() => {
    const item = localStorage.getItem('BilisKilkePlayers')
    const { playerLeft: newLeft, playerRight: newRight } = JSON.parse(item ?? '') as PlayerStorage
    setPlayerLeft(newLeft)
    setPlayerRight(newRight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('BilisKilkePlayers', JSON.stringify({ playerLeft, playerRight }))
  }, [playerLeft, playerRight])

  const router = useRouter()

  //if the boxes are empty, a person added to queue moves straight to them
  useEffect(() => {
    if (!playerLeft && queue.length > 0 && (!playerRight || playerRight.id != queue[0].id)) {
      setPlayerLeft(queue[0])
      removeLastFromQueue()
    } else if (!playerRight && queue.length > 0 && (!playerLeft || playerLeft.id != queue[0].id)) {
      setPlayerRight(queue[0])
      removeLastFromQueue()
    }
  }, [queue, playerLeft, setPlayerLeft, playerRight, setPlayerRight, removeLastFromQueue])

  const postGame = async (winner: string) => {
    let game: NewGame
    if (!(playerLeft && playerRight)) return

    switch (winner) {
      case 'normal':
        game = {
          winnerId: playerLeft?.id,
          loserId: playerRight?.id,
          underTable: false,
        }
        setPlayerRight(queue[0])
        removeLastFromQueue()
        break
      case 'under the table':
        game = {
          winnerId: playerLeft?.id,
          loserId: playerRight?.id,
          underTable: true,
        }
        setPlayerLeft(queue[0])
        removeLastFromQueue()
        break

      default:
        throw new Error(`Undefinded case of winner: ${winner}`)
    }

    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game) as any,
    })

    // updates the serverside props, no idea how/why
    router.replace(router.asPath)
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <HeaderRow middleColumn="VS" />
      <div className="w-full flex flex-row gap-4 flex-nowrap justify-evenly items-center">
        <div className="w-full flex flex-col items-center">
          <CurrentPlayerButton
            selectedPlayer={playerLeft}
            setSelectedPlayer={setPlayerLeft}
            leftSide={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="btn bg-green-600 hover:bg-green-500"
            onClick={() => postGame('normal')}
          >
            Voittaja
          </button>
          <button
            className="btn bg-slate-600 hover:bg-slate-500"
            onClick={() => postGame('under the table')}
          >
            Pöytä
          </button>
        </div>
        <div className="w-full flex flex-col items-center">
          <CurrentPlayerButton
            selectedPlayer={playerRight}
            setSelectedPlayer={setPlayerRight}
            leftSide={false}
          />
        </div>
      </div>
    </div>
  )
}

export default WinnerSelectionBox
