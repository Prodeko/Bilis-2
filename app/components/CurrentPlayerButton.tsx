import React, { useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import type { PlayerWithoutElo } from '../common/types'
import PlayerSearchResult from './PlayerSearchResult';
import CurrentPlayerSearch from './CurrentPlayerSearch';

const CurrentPlayerButton = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithoutElo | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (    
    <div className="flex flex-row w-full items-center mx-4">
      {searchExpanded || !selectedPlayer
        ?
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
        : 
          <div className="flex flex-row items-center w-full">
            <button onClick={() => {
              setEditing(!editing)
              setSearchExpanded(true)
            }}>
              <FiEdit2 size="32" className="mx-4"/>
            </button>
            <PlayerSearchResult {...selectedPlayer}/>
          </div>
      }
    </div>
  )
}

export default CurrentPlayerButton