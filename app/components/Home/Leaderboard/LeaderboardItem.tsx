import { round } from 'lodash'
import type { NextPage } from 'next'
import { Player } from '../../../common/types'
import { renderEmoji } from '../../../common/utils/render'
import Card from '../../Utility/Card'

interface Props {
  player: Player
  position: number
}

const LeaderboardItem: NextPage<Props> = ({ player, position }) => {
  return (
    <Card id={player.id} cols={4}>
      <p>{position}.</p>
      <div className="shadow-l w-14 h-14 rounded-full bg-blue-500 text-xl flex justify-center items-center">
        {renderEmoji(player.emoji)}
      </div>
      <p className="font-bold">
        {player.firstName} {player.lastName}
      </p>
      <p>Pisteet {round(player.elo, 2)}</p>
    </Card>
  )
}

export default LeaderboardItem
