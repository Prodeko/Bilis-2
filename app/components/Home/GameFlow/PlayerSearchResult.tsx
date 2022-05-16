import type { PlayerWithoutElo } from '../../../common/types'

const PlayerSearchResult = ({ nickname, id, favoriteColor }: PlayerWithoutElo) => {
  return (
    <div
      className={`w-full h-16 my-2 bg-white shadow-xl hover:scale-[1.01] rounded-md flex items-center justify-evenly transition-all`}
    >
      <div
        style={{ background: favoriteColor }}
        className={`shadow-l w-8 h-8 p-4 rounded-full flex justify-center items-center text-xl`}
      >
        😍
      </div>
      <h5 className="font-bold">{nickname}</h5>
      <p>#{id}</p>
    </div>
  )
}

export default PlayerSearchResult
