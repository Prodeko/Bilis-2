import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import type { PlayerWithoutElo } from '../../../common/types'
import PlayerSearchResult from './PlayerSearchResult'
import CurrentPlayerSearch from './CurrentPlayerSearch'
import WinnerSelectionButton from './WinnerSelectionButton'

interface Props {
  selectedPlayer: PlayerWithoutElo | null
  setSelectedPlayer: (arg0: PlayerWithoutElo) => void
  leftSide: boolean
}

const CurrentPlayerButton = ({ selectedPlayer, setSelectedPlayer, leftSide }: Props) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (
    <div className="flex flex-row w-full items-center">
      {searchExpanded || !selectedPlayer ? (
        <CurrentPlayerSearch
          expanded={searchExpanded}
          selectedPlayer={selectedPlayer}
          setExpanded={setSearchExpanded}
          setEditing={setEditing}
          handleSelect={player => {
            setSelectedPlayer(player)
            setSearchExpanded(false)
            setEditing(false)
          }}
        />
      ) : (
        <div className="flex flex-row items-center w-full">
          {/* {leftSide ? <PlayerSearchResult {...selectedPlayer} /> : <></>} */}
          <button
            className="flex-grow"
            onClick={() => {
              setEditing(!editing)
              setSearchExpanded(true)
            }}
          >
            <PlayerSearchResult {...selectedPlayer} />
            {/* <FiEdit2 size="32" className="mx-2" /> */}
          </button>
          {/* {!leftSide ? <PlayerSearchResult {...selectedPlayer} /> : <></>} */}
        </div>
      )}
    </div>
  )
}

export default CurrentPlayerButton
