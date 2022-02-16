import type { NextPage } from 'next'
import { FiX } from "react-icons/fi";
import type { PlayerWithoutElo } from '../common/types'
import LeaderboardItem from './LeaderboardItem';
import PlayerSearchResult from './PlayerSearchResult';

const placeHolderPlayers: PlayerWithoutElo[] = [
  {
    id: 123,
    firstName: 'Aada',
    lastName: 'Korhonen',
    nickname: 'Aadaaada',
    favoriteColor: '#32a852'
  },
  {
    id: 456,
    firstName: 'Aatos',
    lastName: 'Virtanen',
    nickname: 'Bilismaisteri',
    favoriteColor: '#e04cbb'
  },
  {
    id: 789,
    firstName: 'Aava',
    lastName: 'Mäkinen',
    nickname: 'Aavavaan',
    favoriteColor: '#7e1cd9'
  },
  {
    id: 987,
    firstName: 'Aino',
    lastName: 'Nieminen',
    nickname: 'Ainoa',
    favoriteColor: '#f5ff3d'
  },
]


interface Props {
  children?: JSX.Element | JSX.Element[]
  expanded: boolean
  handleSelect: (selectedPlayer: PlayerWithoutElo) => void
  onClick: () => void
}

const CurrentPlayerSearch: NextPage<Props> = ({ children, expanded, handleSelect, onClick }) => {
    return (
        <div className='flex flex-col bg-white w-full mx-6 my-4 py-2 h-fit min-h-16 shadow-xl rounded-md gap-5 hover:cursor-pointer transition-all'>
            <div className='flex flex-none w-full'>
              <div className='flex-none pt-4 ml-6 mr-4'>{children}</div>
              <form className="w-full max-w-sm mt-4">
                <div className="flex items-center border-b-4 border-prodekoBlue py-1">
                  <input className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Etsi pelaajaa" aria-label="Full name" />
                </div>
              </form>
            </div>
            {expanded && 
              <div className="flex flex-col p-4">
                {placeHolderPlayers.map(player => (
                  <button className="" key={player.id} onClick={() => handleSelect(player)}>
                    <PlayerSearchResult {...player}/>
                  </button>
                ))}
              </div>
            }
        </div>
    )
}

export default CurrentPlayerSearch