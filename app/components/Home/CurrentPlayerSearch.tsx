import { useState } from 'react'
import type { NextPage } from 'next'
import { FiX, FiSearch } from 'react-icons/fi'
import type { PlayerWithoutElo } from '../../common/types'
import PlayerSearchResult from './PlayerSearchResult'

const placeHolderPlayers: PlayerWithoutElo[] = [
  {
    id: 123,
    firstName: 'Aada',
    lastName: 'Korhonen',
    nickname: 'Aadaaada',
    favoriteColor: '#32a852',
  },
  {
    id: 456,
    firstName: 'Aatos',
    lastName: 'Virtanen',
    nickname: 'Bilismaisteri',
    favoriteColor: '#e04cbb',
  },
  {
    id: 789,
    firstName: 'Aava',
    lastName: 'Mäkinen',
    nickname: 'Aavavaan',
    favoriteColor: '#7e1cd9',
  },
  {
    id: 987,
    firstName: 'Aino',
    lastName: 'Nieminen',
    nickname: 'Ainoa',
    favoriteColor: '#f5ff3d',
  },
]

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

  return (
    <div className="flex flex-col bg-white shadow-xl w-full h-fit my-4 p-4 rounded-md gap-5 transition-all">
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
        <ul>
          {placeHolderPlayers
            .filter(
              (player) =>
                player.nickname
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                player.id.toString().includes(searchText)
            )
            .map((player) => (
              <li key={player.id} className="flex flex-col">
                <button
                  className="mx-4"
                  onClick={() => {
                    handleSelect(player)
                  }}
                >
                  <PlayerSearchResult
                    selected={player.id === selectedPlayer?.id}
                    {...player}
                  />
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default CurrentPlayerSearch
