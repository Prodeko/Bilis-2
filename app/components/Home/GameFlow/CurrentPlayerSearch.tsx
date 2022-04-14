import { useState } from 'react'
import type { NextPage } from 'next'
import { FiX, FiSearch } from 'react-icons/fi'
import type { PlayerWithoutElo } from '../../../common/types'
import PlayerSearchResult from './PlayerSearchResult'
import usePlayerSearch from '../../../hooks/usePlayerSearch'

interface Props {
  selectedPlayer?: PlayerWithoutElo | null
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  setEditing: (expanded: boolean) => void
  handleSelect: (selectedPlayer: PlayerWithoutElo) => void
}

const CurrentPlayerSearch: NextPage<Props> = ({
  selectedPlayer,
  expanded,
  setExpanded,
  setEditing,
  handleSelect,
}) => {
  const [searchText, setSearchText] = useState<string>('')
  const searchResults = usePlayerSearch(searchText)

  return (
    <div className="flex flex-col bg-white shadow-xl w-full h-fit  p-4 rounded-md transition-all">
      <div className="flex flex-none w-full">
        {expanded ? (
          <button
            className="mx-2"
            onClick={() => {
              setExpanded(false)
              setEditing(false)
            }}
          >
            <FiX size="36" />
          </button>
        ) : (
          <button className="mx-2" onClick={() => setExpanded(true)}>
            <FiSearch size="36" />
          </button>
        )}
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b-4 border-prodekoBlue py-1">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 leading-tight focus:outline-none"
              type="text"
              placeholder="Etsi pelaajaa"
              aria-label="Full name"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onClick={() => setExpanded(true)}
            />
          </div>
        </form>
      </div>
      {expanded && (
        <select value={searchText} size={10}>
          {searchResults
            .map((player) => (
              <option key={player.id} value={player.firstName} onClick={() => handleSelect(player)}>
                {player.firstName} #{player.id}
              </option>
            ))}
        </select>
      )}
    </div>
  )
}

export default CurrentPlayerSearch
