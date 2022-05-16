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
    <div className="flex flex-col bg-white shadow-xl hover:scale-[1.005] rounded-[52px] hover:cursor-pointer">
      <div className="flex w-full">
        <div className="pt-6 pl-6 pr-4 ">{children}</div>
        <form className="w-full max-w-sm pt-4 pr-4 ">
          <div className="items-center border-b-4 border-prodekoBlue py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-500 pr-3 py-1 leading-tight focus:outline-none"
              type="text"
              placeholder="Etsi pelaajaa"
              aria-label="Full name"
            />
          </div>
        </form>
        <button
          onClick={onClick}
          className="border-transparent pt-6 pr-6 text-sm rounded"
          type="button"
        >
          <FiX size="36" />
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-scroll h-[calc(100vh-520px)] px-4 mt-6 mb-12">
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
