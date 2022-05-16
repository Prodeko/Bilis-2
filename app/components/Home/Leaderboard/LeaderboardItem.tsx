import type { NextPage } from 'next'
import { PlayerWithStats } from '../../../common/types'

interface Props extends PlayerWithStats {
  rank: number
}

const LeaderboardItem: NextPage = () => {
  return (
    <div className="bg-white shadow-xl hover:scale-[1.01] px-8 py-4 rounded-md flex items-center justify-between gap-5 hover:cursor-pointer transition-all">
      <div>1.</div>
      <div className="shadow-l w-14 h-14 rounded-full bg-blue-500 flex justify-center items-center text-xl">
        😍
      </div>
      <h5 className="font-bold">Pelaajanimi</h5>
      <p>Pisteet</p>
    </div>
  )
}

export default LeaderboardItem
