import type { NextPage } from 'next'
import { FiX } from 'react-icons/fi'
import LeaderboardItem from '../Home/Leaderboard/LeaderboardItem'
type Props = {
  children: JSX.Element
  onMouseEnter: () => void
  onClick: () => void
  marginP: Boolean
  marginF: Boolean
}

const SideBarSearchBar: NextPage<Props> = ({
  children,
  marginP,
  marginF,
  onMouseEnter,
  onClick,
}) => {
  if (!marginF) {
    return (
      <div
        className={`bg-gray-100 hover:bg-blue-50 rounded-[48px] h-24 ${
          marginP ? 'w-40' : 'w-24'
        } flex items-center justify-left transition-[width] shadow-2xl hover:cursor-pointer`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseEnter}
        onClick={onClick}
      >
        <div className="ml-7">{children}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col align-center p-6 gap-6 bg-white shadow-xl hover:scale-[1.005] rounded-[52px] hover:cursor-pointer">
      <div className="grid grid-cols-[3rem_1fr_3rem] gap-4 w-full">
        <div className="flex items-center justify-center">{children}</div>
        <form className="w-full ">
          <div className="items-center border-b-4 border-prodekoBlue py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-500 pr-3 py-1 leading-tight focus:outline-none"
              type="text"
              placeholder="Etsi pelaajaa"
              aria-label="Full name"
            />
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button onClick={onClick} className="border-transparent text-sm rounded" type="button">
            <FiX size="36" />
          </button>
        </div>
      </div>
      <div className="flex flex-col grow gap-2 overflow-scroll max-h-[calc(100vh-32rem)] mb-6">
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
      </div>
    </div>
  )
}

export default SideBarSearchBar
