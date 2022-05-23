import { round } from 'lodash'
import type { NextPage } from 'next'
import { Player } from '../../../common/types'
import { renderEmoji } from '../../../common/utils/render'

interface Props {
  player: Player,
  position: number
}

const LeaderboardItem: NextPage<Props> = ({player, position}) => {
  return (
    <div className="bg-white shadow-xl hover:scale-[1.01] px-8 py-4 rounded-md flex items-center justify-between gap-5 hover:cursor-pointer transition-all">
      <div>{position}.</div>
      <div className="shadow-l w-14 h-14 rounded-full bg-blue-500 flex justify-center items-center text-xl">
        { renderEmoji(player.emoji) }
      </div>
      <h5 className="font-bold">{player.firstName} {player.lastName}</h5>
      <p>Pisteet {round(player.elo, 2)}</p>
    </div>
  )
}

export default LeaderboardItem
