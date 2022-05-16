import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import type { PlayerWithoutElo } from '../../../common/types'
import PlayerSearchResult from './PlayerSearchResult'
import CurrentPlayerSearch from './CurrentPlayerSearch'
import WinnerSelectionButton from './WinnerSelectionButton'

interface Props {
  selectedPlayer: PlayerWithoutElo | null
  setSelectedPlayer: (arg0: PlayerWithoutElo) => void
  handleClick: () => Promise<void>
}

const CurrentPlayerButton = ({ selectedPlayer, setSelectedPlayer, handleClick }: Props) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
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
            <button
              onClick={() => {
                setEditing(!editing)
                setSearchExpanded(true)
              }}
            >
              <FiEdit2 size="32" className="mx-2" />
            </button>
            <PlayerSearchResult {...selectedPlayer} />
          </div>
        )}
      </div>
      <WinnerSelectionButton handleClick={handleClick} />
    </div>
  )
}

export default CurrentPlayerButton
