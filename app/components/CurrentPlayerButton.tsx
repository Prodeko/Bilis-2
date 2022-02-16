import React, { MouseEventHandler, useState } from 'react'
import { FiX, FiSearch } from "react-icons/fi";
import type { PlayerWithoutElo } from '../common/types'
import SideBarSearchBar from './SideBarSearchBar'
import PlayerSearchResult from './PlayerSearchResult';
import CurrentPlayerSearch from './CurrentPlayerSearch';

const CurrentPlayerButton = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithoutElo | null>(null)
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false)

  const toggleExpanded = () => setSearchExpanded(!searchExpanded)

  return (    
    <div className="flex flex-row w-full">
      {selectedPlayer
          ? 
            <PlayerSearchResult {...selectedPlayer}/>
          :
            <CurrentPlayerSearch
              handleSelect={(player: PlayerWithoutElo) => setSelectedPlayer(player)}
              expanded={searchExpanded}
              onClick={() => setSearchExpanded(!searchExpanded)}
            >
              <button onClick={() => setSearchExpanded(!searchExpanded)}>
                {searchExpanded ? <FiX size="36"/> : <FiSearch size="36"/>}
              </button>
            </CurrentPlayerSearch>  
      }
    </div>
  )
}

export default CurrentPlayerButton