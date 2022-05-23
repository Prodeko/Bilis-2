import { useState } from 'react'
import type { NextPage } from 'next'
import { FiX, FiSearch } from 'react-icons/fi'
import type { PlayerWithoutElo } from '../../../common/types'
import PlayerSearchResult from './PlayerSearchResult'
import BlackFilter from '../../Utility/BlackFilter'
import usePlayerSearch from '../../../hooks/usePlayerSearch'

interface Props {
  selectedPlayer?: PlayerWithoutElo | null
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  setEditing: (expanded: boolean) => void
  handleSelect: (selectedPlayer: PlayerWithoutElo) => void
  usedForQueue?: boolean
  queue?: PlayerWithoutElo[]
}

const CurrentPlayerSearch: NextPage<Props> = ({
  expanded,
  setExpanded,
  setEditing,
  handleSelect,
  usedForQueue = false,
  queue = [],
}) => {
  const [searchText, setSearchText] = useState<string>('')
  const searchResults = usePlayerSearch(searchText)

  return (
    <div className="flex flex-col gap-4 relative z-20 bg-white shadow-xl w-full h-fit p-4 rounded-md transition-all">
      <div className="flex gap-4 w-full">
        {expanded ? (
          <button
            onClick={() => {
              setExpanded(false)
              setEditing(false)
            }}
          >
            <FiX size="36" />
          </button>
        ) : (
          <button onClick={() => setExpanded(true)}>
            <FiSearch size="36" />
          </button>
        )}
        <form className="flex items-center border-b-4 border-prodekoBlue py-1 w-full">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 leading-tight focus:outline-none"
            type="text"
            placeholder="Etsi pelaajaa"
            aria-label="Full name"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            autoFocus
            onClick={() => setExpanded(true)}
          />
        </form>
      </div>
      <div className={`${expanded ? 'absolute' : 'hidden'} top-[4.3rem] left-0 w-full`}>
        <select className="w-full h-[calc(50vh-20rem)]" value={searchText} size={10}>
          {searchResults
            .filter(player => !usedForQueue || queue.every(q => q.id != player.id))
            .map(player => (
              <option
                className="px-4 py-2 hover:bg-gray-200 active:bg-gray-300 text-lg"
                key={player.id}
                value={player.firstName}
                onClick={() => handleSelect(player)}
              >
                #{player.id} {player.firstName} "{player.nickname}" {player.lastName}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default CurrentPlayerSearch
